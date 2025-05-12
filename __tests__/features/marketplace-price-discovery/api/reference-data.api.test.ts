// import { createMocks } from 'node-mocks-http';
// import cropsHandler from '@/app/api/crops/route'; // Adjust path
// import marketsHandler from '@/app/api/markets/route'; // Adjust path
// import { getAuth } from '@clerk/nextjs/server';
// import { db } from '@/lib/db';

// Mock Clerk's getAuth
jest.mock('@clerk/nextjs/server', () => ({
  getAuth: jest.fn(),
}));

// Mock the database client
jest.mock('@/lib/db', () => ({
  db: {
    cropType: {
      findMany: jest.fn(),
    },
    marketLocation: {
      findMany: jest.fn(),
    },
    // Mock translation tables/logic if separate
  },
}));

// Mock i18n utilities if used within the API route
jest.mock('next-i18next/serverSideTranslations', () => ({
  serverSideTranslations: jest.fn().mockResolvedValue({}),
}));

describe('Reference Data API Routes (/api/crops, /api/markets)', () => {

  beforeEach(() => {
    jest.clearAllMocks();
    // Setup default mocks
    // (getAuth as jest.Mock).mockReturnValue({ userId: 'user_test_id' });
    // (db.cropType.findMany as jest.Mock).mockResolvedValue([{ id: '1', name_en: 'Wheat', name_hi: 'गेहूँ' }]);
    // (db.marketLocation.findMany as jest.Mock).mockResolvedValue([{ id: '10', name_en: 'Mumbai', name_hi: 'मुंबई' }]);
  });

  describe('GET /api/crops', () => {
    it.todo('should retrieve a list of crops for an authenticated user');
    it.todo('should return 401/403 if the user is unauthenticated');
    it.todo('should retrieve localized crop names based on the lang query parameter or user preference');
    it.todo('should return 500 if the database query fails');
  });

  describe('GET /api/markets', () => {
    it.todo('should retrieve a list of markets for an authenticated user');
    it.todo('should return 401/403 if the user is unauthenticated');
    it.todo('should retrieve localized market names based on the lang query parameter or user preference');
    it.todo('should return 500 if the database query fails');
  });
});