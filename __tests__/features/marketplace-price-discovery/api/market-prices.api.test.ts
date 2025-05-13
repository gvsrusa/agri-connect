import { NextRequest } from 'next/server';
import { GET as marketPricesGetHandler } from '@/app/api/market-prices/route'; // Adjust path
import { getAuth } from '@clerk/nextjs/server';
import prisma from '@/lib/db'; // Use the same prisma import style as listings.api.test.ts

// Mock Clerk's getAuth
jest.mock('@clerk/nextjs/server', () => ({
  getAuth: jest.fn(),
}));

// Mock the database client (Prisma)
jest.mock('@/lib/db', () => {
  const prismaMock = {
    marketPrice: { // Corrected: Model name is MarketPrice
      findFirst: jest.fn(),
    },
    cropType: {
      findUnique: jest.fn(),
    },
    // Removed 'market' model as it's not separate in schema
  };
  return {
    __esModule: true,
    default: prismaMock,
  };
});

const mockGetAuth = getAuth as jest.Mock;

describe('/api/market-prices API Route', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /api/market-prices', () => {
    it('should retrieve market price data for an authenticated user with valid cropId and marketName', async () => {
      mockGetAuth.mockReturnValue({ userId: 'user_test_id_marketprice' });
      const mockCropId = 'crop_tomato_uuid';
      const mockMarketName = 'Nashik Market'; // Query by marketName
      const lang = 'en';

      const mockDbMarketPriceRecord = { // Represents a record from MarketPrice model
        id: 'price_data_uuid_123',
        cropTypeId: mockCropId,
        marketName: mockMarketName,
        price: "2500", // Schema: String
        unit: "quintal", // Schema: String
        date: new Date('2024-05-10T00:00:00.000Z'), // Schema: date
        source: 'TestSource',
      };
      const mockCropTypeRecord = { id: mockCropId, name_en: 'Tomato', name_hi: 'टमाटर' };

      (prisma.marketPrice.findFirst as jest.Mock).mockResolvedValue(mockDbMarketPriceRecord);
      (prisma.cropType.findUnique as jest.Mock).mockResolvedValue(mockCropTypeRecord);

      const request = new NextRequest(`http://localhost/api/market-prices?cropId=${mockCropId}&marketName=${encodeURIComponent(mockMarketName)}&lang=${lang}`, {
        method: 'GET',
      });

      const response = await marketPricesGetHandler(request);
      expect(response.status).toBe(200);
      const jsonResponse = await response.json();

      expect(jsonResponse).toEqual({
        cropName: 'Tomato',
        marketName: mockMarketName,
        price: 2500, // API should parse to number
        priceUnit: 'INR per quintal', // API constructs this (assuming INR)
        dateRecorded: mockDbMarketPriceRecord.date.toISOString(),
        source: 'TestSource',
      });

      expect(prisma.marketPrice.findFirst).toHaveBeenCalledWith({
        where: {
          cropTypeId: mockCropId,
          marketName: mockMarketName,
        },
        orderBy: {
          date: 'desc', // Corrected field name from schema
        },
      });
      expect(prisma.cropType.findUnique).toHaveBeenCalledWith({ where: { id: mockCropId } });
    });

    it('should return 401 if the user is unauthenticated', async () => {
      mockGetAuth.mockReturnValue({ userId: null }); // Simulate unauthenticated user

      const request = new NextRequest('http://localhost/api/market-prices?cropId=anyCrop&marketName=anyMarket', {
        method: 'GET',
      });

      const response = await marketPricesGetHandler(request);
      expect(response.status).toBe(401);
      const jsonResponse = await response.json();
      expect(jsonResponse).toEqual({ error: 'Unauthorized' });
      expect(prisma.marketPrice.findFirst).not.toHaveBeenCalled();
    });

    it('should return 400 if cropId query parameter is missing', async () => {
      mockGetAuth.mockReturnValue({ userId: 'user_test_id_marketprice' });
      const request = new NextRequest('http://localhost/api/market-prices?marketName=anyMarket', {
        method: 'GET',
      });
      const response = await marketPricesGetHandler(request);
      expect(response.status).toBe(400);
      const jsonResponse = await response.json();
      expect(jsonResponse).toEqual({ error: 'Missing cropId or marketName' });
    });

    it('should return 400 if marketName query parameter is missing', async () => {
      mockGetAuth.mockReturnValue({ userId: 'user_test_id_marketprice' });
      const request = new NextRequest('http://localhost/api/market-prices?cropId=anyCrop', {
        method: 'GET',
      });
      const response = await marketPricesGetHandler(request);
      expect(response.status).toBe(400);
      const jsonResponse = await response.json();
      expect(jsonResponse).toEqual({ error: 'Missing cropId or marketName' });
    });

    it('should return 400 if both cropId and marketName query parameters are missing', async () => {
      mockGetAuth.mockReturnValue({ userId: 'user_test_id_marketprice' });
      const request = new NextRequest('http://localhost/api/market-prices', {
        method: 'GET',
      });
      const response = await marketPricesGetHandler(request);
      expect(response.status).toBe(400);
      const jsonResponse = await response.json();
      expect(jsonResponse).toEqual({ error: 'Missing cropId or marketName' });
    });

    it('should correctly retrieve localized crop name based on user language', async () => {
      mockGetAuth.mockReturnValue({ userId: 'user_test_id_marketprice_hi' });
      const mockCropId = 'crop_tomato_uuid';
      const mockMarketName = 'Nashik Market';
      const lang = 'hi'; // Hindi

      const mockDbMarketPriceRecord = {
        id: 'price_data_uuid_456',
        cropTypeId: mockCropId,
        marketName: mockMarketName,
        price: "2600",
        unit: "क्विंटल", // Assuming unit might also be stored localized or is language-agnostic
        date: new Date('2024-05-11T00:00:00.000Z'),
        source: 'TestSourceHindi',
      };
      const mockCropTypeRecord = {
        id: mockCropId,
        name_en: 'Tomato',
        name_hi: 'टमाटर' // Hindi name for Tomato
      };

      (prisma.marketPrice.findFirst as jest.Mock).mockResolvedValue(mockDbMarketPriceRecord);
      (prisma.cropType.findUnique as jest.Mock).mockResolvedValue(mockCropTypeRecord);

      const request = new NextRequest(`http://localhost/api/market-prices?cropId=${mockCropId}&marketName=${encodeURIComponent(mockMarketName)}&lang=${lang}`, {
        method: 'GET',
      });

      const response = await marketPricesGetHandler(request);
      expect(response.status).toBe(200);
      const jsonResponse = await response.json();

      expect(jsonResponse).toEqual({
        cropName: 'टमाटर', // Expected Hindi crop name
        marketName: mockMarketName,
        price: 2600,
        priceUnit: `INR per ${mockDbMarketPriceRecord.unit}`, // "per" is not localized by current API
        dateRecorded: mockDbMarketPriceRecord.date.toISOString(),
        source: 'TestSourceHindi',
      });
    });
    
    it('should return 404 if no price data is found for the given crop and market', async () => {
      mockGetAuth.mockReturnValue({ userId: 'user_test_id_marketprice_nodata' });
      const mockCropId = 'crop_nonexistent_uuid';
      const mockMarketName = 'MarketNonExistent';
      const lang = 'en';

      (prisma.marketPrice.findFirst as jest.Mock).mockResolvedValue(null); // Simulate no data found
      // cropType.findUnique might not be called if marketPrice.findFirst returns null,
      // but it's good to have a mock for it in case the logic changes.
      (prisma.cropType.findUnique as jest.Mock).mockResolvedValue(null);


      const request = new NextRequest(`http://localhost/api/market-prices?cropId=${mockCropId}&marketName=${encodeURIComponent(mockMarketName)}&lang=${lang}`, {
        method: 'GET',
      });

      const response = await marketPricesGetHandler(request);
      expect(response.status).toBe(404);
      const jsonResponse = await response.json();
      expect(jsonResponse).toEqual({ error: 'Price data not found' });
    });

    it('should return 500 if the database query fails', async () => {
      mockGetAuth.mockReturnValue({ userId: 'user_test_id_marketprice_dberror' });
      const mockCropId = 'crop_any_uuid';
      const mockMarketName = 'AnyMarketWithError';
      const lang = 'en';

      const dbError = new Error('Simulated database error');
      (prisma.marketPrice.findFirst as jest.Mock).mockRejectedValue(dbError);

      const request = new NextRequest(`http://localhost/api/market-prices?cropId=${mockCropId}&marketName=${encodeURIComponent(mockMarketName)}&lang=${lang}`, {
        method: 'GET',
      });

      const response = await marketPricesGetHandler(request);
      expect(response.status).toBe(500);
      const jsonResponse = await response.json();
      expect(jsonResponse).toEqual({ error: 'Failed to fetch market price' });
      expect(prisma.marketPrice.findFirst).toHaveBeenCalledTimes(1);
    });
  });

  // Add tests for other HTTP methods if applicable
});