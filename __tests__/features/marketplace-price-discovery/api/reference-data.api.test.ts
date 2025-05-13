import { NextRequest } from 'next/server';
import { GET as cropsGetHandler } from '@/app/api/crops/route';
import { GET as marketsGetHandler } from '@/app/api/markets/route';
import { getAuth } from '@clerk/nextjs/server';
import prisma from '@/lib/db';

// Mock Clerk's getAuth
jest.mock('@clerk/nextjs/server', () => ({
  getAuth: jest.fn(),
}));

// Mock the database client (Prisma)
jest.mock('@/lib/db', () => {
  const prismaMock = {
    cropType: {
      findMany: jest.fn(),
    },
    marketPrice: { // For fetching distinct market names later
      findMany: jest.fn(),
    }
  };
  return {
    __esModule: true,
    default: prismaMock,
  };
});

const mockGetAuth = getAuth as jest.Mock;

describe('Reference Data API Routes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /api/crops', () => {
    it('should retrieve a list of crops for an authenticated user, with names localized based on lang param', async () => {
      mockGetAuth.mockReturnValue({ userId: 'user_test_id_crops' });
      const lang = 'hi'; // Test with Hindi

      const mockDbCropTypes = [
        { id: 'crop_1', name_en: 'Wheat', name_hi: 'गेहूँ', name_mr: 'गहू' },
        { id: 'crop_2', name_en: 'Rice', name_hi: 'चावल', name_mr: 'तांदूळ' },
        { id: 'crop_3', name_en: 'Tomato', name_hi: 'टमाटर', name_mr: 'टोमॅटो' }, // Has name_hi
        { id: 'crop_4', name_en: 'Potato', name_mr: 'बटाटा' }, // Does not have name_hi, should fallback to name_en
      ];
      (prisma.cropType.findMany as jest.Mock).mockResolvedValue(mockDbCropTypes);

      const request = new NextRequest(`http://localhost/api/crops?lang=${lang}`, {
        method: 'GET',
      });

      const response = await cropsGetHandler(request);
      expect(response.status).toBe(200);
      const jsonResponse = await response.json();

      expect(jsonResponse).toEqual([
        { id: 'crop_1', name: 'गेहूँ' },
        { id: 'crop_2', name: 'चावल' },
        { id: 'crop_3', name: 'टमाटर' },
        { id: 'crop_4', name: 'Potato' }, // Fallback to name_en
      ]);

      expect(prisma.cropType.findMany).toHaveBeenCalledWith({
        orderBy: { name_en: 'asc' } // Assuming a default sort order
      });
    });

    it('should return 401 if the user is unauthenticated for /api/crops', async () => {
      mockGetAuth.mockReturnValue({ userId: null }); // Simulate unauthenticated user

      const request = new NextRequest('http://localhost/api/crops', {
        method: 'GET',
      });

      const response = await cropsGetHandler(request);
      expect(response.status).toBe(401);
      const jsonResponse = await response.json();
      expect(jsonResponse).toEqual({ error: 'Unauthorized' });
      expect(prisma.cropType.findMany).not.toHaveBeenCalled();
    });

    // This combines the original 'localized names' test with the first one for simplicity.
    // it.todo('should retrieve localized crop names based on the lang query parameter or user preference');
    it('should return 500 if the database query for /api/crops fails', async () => {
      mockGetAuth.mockReturnValue({ userId: 'user_test_id_crops_dberror' });
      const dbError = new Error('Simulated DB error for crops');
      (prisma.cropType.findMany as jest.Mock).mockRejectedValue(dbError);

      const request = new NextRequest('http://localhost/api/crops', {
        method: 'GET',
      });

      const response = await cropsGetHandler(request);
      expect(response.status).toBe(500);
      const jsonResponse = await response.json();
      expect(jsonResponse).toEqual({ error: 'Failed to fetch crop types' });
      expect(prisma.cropType.findMany).toHaveBeenCalledTimes(1);
    });
  });

  describe('GET /api/markets', () => {
    it('should retrieve a list of unique market names for an authenticated user', async () => {
      mockGetAuth.mockReturnValue({ userId: 'user_test_id_markets' });

      const mockDbMarketPriceRecords = [
        { marketName: 'Mumbai APMC' },
        { marketName: 'Delhi Azadpur' },
        { marketName: 'Mumbai APMC' }, // Duplicate to test distinct
        { marketName: 'Pune Market Yard' },
      ];
      // The actual distinct logic will be in the API handler.
      // The mock here just needs to return what findMany would return before distinct processing by Prisma.
      // However, Prisma's `distinct` works on the DB level.
      // So, we mock findMany to return the already distinct values as the API would receive.
      const expectedDistinctMarkets = [
        { marketName: 'Mumbai APMC' },
        { marketName: 'Delhi Azadpur' },
        { marketName: 'Pune Market Yard' },
      ];
      (prisma.marketPrice.findMany as jest.Mock).mockResolvedValue(expectedDistinctMarkets);

      const request = new NextRequest('http://localhost/api/markets', {
        method: 'GET',
      });

      const response = await marketsGetHandler(request);
      expect(response.status).toBe(200);
      const jsonResponse = await response.json();

      // Expecting an array of objects like { name: 'Market Name' } or just strings.
      // Let's assume the API returns { name: string }[] for consistency with crops.
      expect(jsonResponse).toEqual([
        { name: 'Mumbai APMC' },
        { name: 'Delhi Azadpur' },
        { name: 'Pune Market Yard' },
      ]);
      
      expect(prisma.marketPrice.findMany).toHaveBeenCalledWith({
        select: { marketName: true },
        distinct: ['marketName'],
        orderBy: { marketName: 'asc' }, // Assuming a default sort order
      });
    });

    it('should return 401 if the user is unauthenticated for /api/markets', async () => {
      mockGetAuth.mockReturnValue({ userId: null }); // Simulate unauthenticated user

      const request = new NextRequest('http://localhost/api/markets', {
        method: 'GET',
      });

      const response = await marketsGetHandler(request);
      expect(response.status).toBe(401);
      const jsonResponse = await response.json();
      expect(jsonResponse).toEqual({ error: 'Unauthorized' });
      expect(prisma.marketPrice.findMany).not.toHaveBeenCalled();
    });

    // it.todo('should retrieve localized market names based on the lang query parameter or user preference'); // This is N/A for now as marketName is not localized in the schema
    
    it('should return 500 if the database query for /api/markets fails', async () => {
      mockGetAuth.mockReturnValue({ userId: 'user_test_id_markets_dberror' });
      const dbError = new Error('Simulated DB error for markets');
      (prisma.marketPrice.findMany as jest.Mock).mockRejectedValue(dbError);

      const request = new NextRequest('http://localhost/api/markets', {
        method: 'GET',
      });

      const response = await marketsGetHandler(request);
      expect(response.status).toBe(500);
      const jsonResponse = await response.json();
      expect(jsonResponse).toEqual({ error: 'Failed to fetch market names' });
      expect(prisma.marketPrice.findMany).toHaveBeenCalledTimes(1);
    });
  });
});