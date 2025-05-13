import { NextRequest } from 'next/server';
import { POST as listingsPostHandler, GET as listingsGetHandler } from '@/app/api/listings/route';
import { getAuth } from '@clerk/nextjs/server';

// Mock Clerk's getAuth
jest.mock('@clerk/nextjs/server', () => ({
  getAuth: jest.fn(),
}));

// Mock the database client (Prisma)
jest.mock('@/lib/db', () => {
  const prismaMock = {
    produceListing: {
      create: jest.fn(),
      findMany: jest.fn(),
    },
  };
  return {
    __esModule: true,
    default: prismaMock,
  };
});

// Get access to the mocked client after mocking
import prisma from '@/lib/db';

const mockGetAuth = getAuth as jest.Mock;

describe('/api/listings API Route', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    });
  
    afterEach(() => {
      jest.clearAllMocks();
    });

  describe('POST /api/listings', () => {
    it('should create a new listing for an authenticated user with valid data', async () => {
      mockGetAuth.mockReturnValue({ userId: 'user_test_id_123' });
      const mockListingPayload = {
        cropTypeId: 'crop_type_uuid_abc',
        quantity: '50 kg',
        pricePerUnit: '1500 INR per quintal',
        description: 'Fresh organic tomatoes',
      };
      const mockDbResponse = { 
        id: 'new_listing_uuid_xyz',
        sellerUserId: 'user_test_id_123',
        cropTypeId: 'crop_type_uuid_abc',
        quantity: '50 kg',
        pricePerUnit: '1500 INR per quintal',
        description: 'Fresh organic tomatoes',
        listingDate: new Date('2024-01-01T10:00:00.000Z'),
        isActive: true,
      };
      (prisma.produceListing.create as jest.Mock).mockResolvedValue(mockDbResponse);

      const request = new NextRequest('http://localhost/api/listings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(mockListingPayload),
      });

      const response = await listingsPostHandler(request);
      
      expect(response.status).toBe(201);
      const jsonResponse = await response.json();
      
      expect(jsonResponse).toEqual(expect.objectContaining({
        id: 'new_listing_uuid_xyz',
        sellerUserId: 'user_test_id_123',
        cropTypeId: 'crop_type_uuid_abc',
        quantity: '50 kg',
        pricePerUnit: '1500 INR per quintal',
        description: 'Fresh organic tomatoes',
        isActive: true,
      }));
      expect(new Date(jsonResponse.listingDate).toISOString()).toEqual(mockDbResponse.listingDate.toISOString());

      expect(prisma.produceListing.create).toHaveBeenCalledWith({
        data: {
          sellerUserId: 'user_test_id_123',
          cropTypeId: 'crop_type_uuid_abc',
          quantity: '50 kg',
          pricePerUnit: '1500 INR per quintal',
          description: 'Fresh organic tomatoes',
        },
      });
    });

    it('should return 401 if the user is unauthenticated', async () => {
      mockGetAuth.mockReturnValue({ userId: null }); // Simulate unauthenticated user

      const mockListingPayload = {
        cropTypeId: 'crop_type_uuid_abc',
        quantity: '50 kg',
        pricePerUnit: '1500 INR per quintal',
        description: 'Fresh organic tomatoes',
      };

      const request = new NextRequest('http://localhost/api/listings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(mockListingPayload),
      });

      const response = await listingsPostHandler(request);

      expect(response.status).toBe(401);
      const jsonResponse = await response.json();
      expect(jsonResponse).toEqual({ error: 'Unauthorized' });
      expect(prisma.produceListing.create).not.toHaveBeenCalled();
    });
    it('should return 400 if input data is invalid (e.g., missing cropTypeId)', async () => {
      mockGetAuth.mockReturnValue({ userId: 'user_test_id_123' }); // Authenticated user

      const invalidPayload = {
        // cropTypeId is missing
        quantity: '50 kg',
        pricePerUnit: '1500 INR per quintal',
      };

      const request = new NextRequest('http://localhost/api/listings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(invalidPayload),
      });

      const response = await listingsPostHandler(request);

      expect(response.status).toBe(400);
      const jsonResponse = await response.json();
      expect(jsonResponse).toEqual({ error: 'Missing required fields' });
      expect(prisma.produceListing.create).not.toHaveBeenCalled();
    });

    it('should return 500 if the database insertion fails', async () => {
      mockGetAuth.mockReturnValue({ userId: 'user_test_id_123' }); // Authenticated user
      const mockListingPayload = {
        cropTypeId: 'crop_type_uuid_abc',
        quantity: '50 kg',
        pricePerUnit: '1500 INR per quintal',
      };

      // Mock the database create method to throw an error
      const dbError = new Error('Database connection failed');
      (prisma.produceListing.create as jest.Mock).mockRejectedValue(dbError);

      const request = new NextRequest('http://localhost/api/listings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(mockListingPayload),
      });

      const response = await listingsPostHandler(request);

      expect(response.status).toBe(500);
      const jsonResponse = await response.json();
      expect(jsonResponse).toEqual({ error: 'Failed to create listing' });
      expect(prisma.produceListing.create).toHaveBeenCalledTimes(1); // Ensure it was called
    });
  });
it('should return 400 if the request body is invalid JSON', async () => {
  mockGetAuth.mockReturnValue({ userId: 'user_test_id_invalid_body' });

  const request = new NextRequest('http://localhost/api/listings', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: 'This is not valid JSON', // Invalid JSON
  });

  const response = await listingsPostHandler(request);
  expect(response.status).toBe(400);

  const jsonResponse = await response.json();
  expect(jsonResponse).toEqual({ error: 'Invalid request body' });
  expect(prisma.produceListing.create).not.toHaveBeenCalled();
});

  describe('GET /api/listings', () => {
    it('should retrieve listings for an authenticated user', async () => {
      mockGetAuth.mockReturnValue({ userId: 'user_test_id_456' }); // Authenticated user
      const mockDbListings = [
        {
          id: 'listing_uuid_1',
          sellerUserId: 'user_test_id_other',
          cropTypeId: 'crop_type_1',
          quantity: '100 kg',
          pricePerUnit: '2000 INR/q',
          listingDate: new Date('2024-01-02T11:00:00.000Z'),
          isActive: true,
          // Mock relation if needed for localization test later
          cropType: { name_en: 'Wheat' }
        },
        {
          id: 'listing_uuid_2',
          sellerUserId: 'user_test_id_456', // Belongs to current user (though GET usually shows all)
          cropTypeId: 'crop_type_2',
          quantity: '50 bags',
          pricePerUnit: '500 INR/bag',
          listingDate: new Date('2024-01-01T12:00:00.000Z'),
          isActive: true,
          cropType: { name_en: 'Rice' }
        },
      ];
      (prisma.produceListing.findMany as jest.Mock).mockResolvedValue(mockDbListings);

      const request = new NextRequest('http://localhost/api/listings', {
        method: 'GET',
      });

      const response = await listingsGetHandler(request);
      expect(response.status).toBe(200);
      const jsonResponse = await response.json();

      // Basic check: Ensure it returns an array of listings
      expect(Array.isArray(jsonResponse)).toBe(true);
      expect(jsonResponse.length).toBe(2);
      expect(jsonResponse[0]).toHaveProperty('id', 'listing_uuid_1');
      expect(jsonResponse[1]).toHaveProperty('id', 'listing_uuid_2');
      
      // Verify findMany was called (can add more specific checks later for filters/pagination)
      expect(prisma.produceListing.findMany).toHaveBeenCalledWith(expect.objectContaining({
        where: { isActive: true }, // Assuming we only fetch active listings by default
        orderBy: { listingDate: 'desc' }, // Assuming default sort order
        include: { cropType: true } // Assuming we include cropType for names
      }));
    });

    it('should return 401 if the user is unauthenticated', async () => {
      mockGetAuth.mockReturnValue({ userId: null }); // Simulate unauthenticated user

      const request = new NextRequest('http://localhost/api/listings', {
        method: 'GET',
      });

      const response = await listingsGetHandler(request);

      expect(response.status).toBe(401);
      const jsonResponse = await response.json();
      expect(jsonResponse).toEqual({ error: 'Unauthorized' });
      expect(prisma.produceListing.findMany).not.toHaveBeenCalled();
    });
    it('should correctly retrieve localized crop names based on user language preference (mock session)', async () => {
      // Mock session with language preference (e.g., 'hi' for Hindi)
      // How language preference is stored might vary (e.g., publicMetadata, sessionClaims)
      // Let's assume publicMetadata for this example. Adjust if your setup differs.
      mockGetAuth.mockReturnValue({
        userId: 'user_test_id_hindi',
        sessionClaims: { /* other claims */ },
        /* If using user profile data fetched separately:
        user: { publicMetadata: { preferred_language: 'hi' } }
        */
       // Simpler approach for now: Pass lang via header or query param?
       // Let's assume the handler will eventually read a lang preference.
       // For the test, we'll mock the DB response with multiple languages
       // and expect the handler to pick the right one based on *some* mechanism.
       // We'll need to modify the handler later to actually *use* a language preference.
      });

      const mockDbListingsLocalized = [
        {
          id: 'listing_uuid_3',
          cropTypeId: 'crop_type_wheat',
          quantity: '100 kg',
          pricePerUnit: '2000 INR/q',
          listingDate: new Date(),
          isActive: true,
          cropType: {
            id: 'crop_type_wheat',
            name_en: 'Wheat',
            name_hi: 'गेहूँ', // Hindi name
            name_mr: 'गहू'
          }
        },
         {
          id: 'listing_uuid_4',
          cropTypeId: 'crop_type_rice',
          quantity: '50 bags',
          pricePerUnit: '500 INR/bag',
          listingDate: new Date(),
          isActive: true,
          cropType: {
            id: 'crop_type_rice',
            name_en: 'Rice',
            name_hi: 'चावल', // Hindi name
            name_mr: 'तांदूळ'
          }
        },
      ];
      (prisma.produceListing.findMany as jest.Mock).mockResolvedValue(mockDbListingsLocalized);

      // How do we signal the desired language to the GET handler in the test?
      // Option 1: Modify getAuth mock further (complex depending on Clerk setup)
      // Option 2: Assume handler reads 'Accept-Language' header or a query param like '?lang=hi'
      // Let's assume query param for simplicity in the test setup for now.
      const request = new NextRequest('http://localhost/api/listings?lang=hi', {
        method: 'GET',
        // headers: { 'Accept-Language': 'hi' } // Alternative if using header
      });

      const response = await listingsGetHandler(request);
      expect(response.status).toBe(200);
      const jsonResponse = await response.json();

      expect(Array.isArray(jsonResponse)).toBe(true);
      expect(jsonResponse.length).toBe(2);
      
      // Crucial check: Verify the crop name is localized
      // This WILL FAIL until the GET handler is updated to map the name based on lang
      expect(jsonResponse[0]).toHaveProperty('cropName', 'गेहूँ'); // Expecting Hindi name
      expect(jsonResponse[1]).toHaveProperty('cropName', 'चावल'); // Expecting Hindi name

      // Also check that the original cropType object might be removed or modified
      expect(jsonResponse[0]).not.toHaveProperty('cropType');
    });

    it('should return an empty array if no listings are found', async () => {
      mockGetAuth.mockReturnValue({ userId: 'user_test_id_789' });
      (prisma.produceListing.findMany as jest.Mock).mockResolvedValue([]); // No listings

      const request = new NextRequest('http://localhost/api/listings', {
        method: 'GET',
      });

      const response = await listingsGetHandler(request);
      expect(response.status).toBe(200);
      const jsonResponse = await response.json();
      expect(jsonResponse).toEqual([]);
      expect(prisma.produceListing.findMany).toHaveBeenCalledTimes(1);
    });

    it('should return 500 if the database query fails', async () => {
      mockGetAuth.mockReturnValue({ userId: 'user_test_id_101' });
      const dbError = new Error('Database query failed');
      (prisma.produceListing.findMany as jest.Mock).mockRejectedValue(dbError);

      const request = new NextRequest('http://localhost/api/listings', {
        method: 'GET',
      });

      const response = await listingsGetHandler(request);
      expect(response.status).toBe(500);
      const jsonResponse = await response.json();
      expect(jsonResponse).toEqual({ error: 'Failed to fetch listings' });
      expect(prisma.produceListing.findMany).toHaveBeenCalledTimes(1);
    });

it('should handle filtering parameters (e.g., cropTypeId) if implemented', async () => {
      mockGetAuth.mockReturnValue({ userId: 'user_test_id_filtering' });
      const mockDbListingsFiltered = [
        { id: 'listing_4', cropType: { name_en: 'Wheat' }, cropTypeId: 'crop_type_wheat', listingDate: new Date() },
      ];
      (prisma.produceListing.findMany as jest.Mock).mockResolvedValue(mockDbListingsFiltered);

      const request = new NextRequest('http://localhost/api/listings?cropTypeId=crop_type_wheat', { method: 'GET' });
      const response = await listingsGetHandler(request);
      expect(response.status).toBe(200);
      const jsonResponse = await response.json();
      expect(jsonResponse.length).toBe(1);
      expect(jsonResponse[0].id).toBe('listing_4');
      expect(prisma.produceListing.findMany).toHaveBeenCalledWith(expect.objectContaining({
        where: { 
          isActive: true,
          cropTypeId: 'crop_type_wheat'
         },
        orderBy: { listingDate: 'desc' },
        include: { cropType: true },
      }));
    });


    it('should handle pagination parameters (page, limit) if implemented', async () => {
      mockGetAuth.mockReturnValue({ userId: 'user_test_id_pagination' });
      const mockDbListingsPage1 = [
        { id: 'listing_1', cropType: { name_en: 'Tomato' }, listingDate: new Date('2024-01-05') },
        { id: 'listing_2', cropType: { name_en: 'Potato' }, listingDate: new Date('2024-01-04') },
      ];
      const mockDbListingsPage2 = [
        { id: 'listing_3', cropType: { name_en: 'Onion' }, listingDate: new Date('2024-01-03') },
      ];

      (prisma.produceListing.findMany as jest.Mock)
        .mockImplementationOnce(async (args) => {
          if (args.skip === 0 && args.take === 2) return mockDbListingsPage1;
          if (args.skip === 2 && args.take === 2) return mockDbListingsPage2;
          return [];
        });
      
      // Test page 1
      let request = new NextRequest('http://localhost/api/listings?page=1&limit=2', { method: 'GET' });
      let response = await listingsGetHandler(request);
      expect(response.status).toBe(200);
      let jsonResponse = await response.json();
      expect(jsonResponse.length).toBe(2);
      expect(jsonResponse[0].id).toBe('listing_1');
      expect(jsonResponse[1].id).toBe('listing_2');
      expect(prisma.produceListing.findMany).toHaveBeenCalledWith(expect.objectContaining({
        skip: 0,
        take: 2,
        where: { isActive: true },
        orderBy: { listingDate: 'desc' },
        include: { cropType: true },
      }));

      // Test page 2
      request = new NextRequest('http://localhost/api/listings?page=2&limit=2', { method: 'GET' });
      response = await listingsGetHandler(request);
      expect(response.status).toBe(200);
      jsonResponse = await response.json();
      // This assertion depends on the mockImplementationOnce behavior.
      // If the second call to findMany is for page 2, it should return mockDbListingsPage2
      // However, the current mock setup will call the *first* mockImplementationOnce again
      // because jest.clearAllMocks() is not called between these two "pages" within the same test.
      // For a more robust test, we'd need to ensure the mock is reset or the implementation
      // is more dynamic based on args.
      // For now, let's adjust the expectation based on current mock behavior or refine the mock.

      // Re-setting up the mock for the second call to be more explicit for this test case
      (prisma.produceListing.findMany as jest.Mock).mockResolvedValueOnce(mockDbListingsPage1); // for page 1
      (prisma.produceListing.findMany as jest.Mock).mockResolvedValueOnce(mockDbListingsPage2); // for page 2

      // Re-run page 1 with fresh mock
      request = new NextRequest('http://localhost/api/listings?page=1&limit=2', { method: 'GET' });
      await listingsGetHandler(request); // Call and discard, just to advance the mock

      // Actual test for page 2
      request = new NextRequest('http://localhost/api/listings?page=2&amp;limit=2', { method: 'GET' });
      response = await listingsGetHandler(request);
      expect(response.status).toBe(200);
      jsonResponse = await response.json();
      expect(jsonResponse.length).toBe(1);
      expect(jsonResponse[0].id).toBe('listing_3');
       expect(prisma.produceListing.findMany).toHaveBeenCalledWith(expect.objectContaining({
        skip: 2, // (2-1) * 2
        take: 2,
        where: { isActive: true },
        orderBy: { listingDate: 'desc' },
        include: { cropType: true },
      }));

      // Test invalid page/limit (e.g., page 0, negative limit) - should default or error
      request = new NextRequest('http://localhost/api/listings?page=0&limit=5', { method: 'GET' });
      response = await listingsGetHandler(request);
      // Assuming the API defaults to page 1 or handles it gracefully
      // The exact behavior (error or default) depends on implementation.
      // For now, let's assume it defaults or the findMany mock handles it.
      // This part of the test needs the API to be implemented to be fully verifiable.
      // We'll expect a 200 for now and assume the findMany mock is called with default/corrected pagination.
      (prisma.produceListing.findMany as jest.Mock).mockResolvedValueOnce(mockDbListingsPage1); // Default to page 1
      response = await listingsGetHandler(request);
      expect(response.status).toBe(200);
       expect(prisma.produceListing.findMany).toHaveBeenCalledWith(expect.objectContaining({
        skip: 0, // Defaulting page 0 to page 1 (skip 0)
        take: 5,
      }));

      request = new NextRequest('http://localhost/api/listings?page=1&limit=-1', { method: 'GET' });
      (prisma.produceListing.findMany as jest.Mock).mockResolvedValueOnce(mockDbListingsPage1); // Default to a sensible limit
      response = await listingsGetHandler(request);
      expect(response.status).toBe(200);
      expect(prisma.produceListing.findMany).toHaveBeenCalledWith(expect.objectContaining({
        skip: 0,
        take: 10, // Assuming API defaults negative limit to a standard e.g. 10
      }));
    });
    it('should handle filtering parameters (e.g., cropTypeId) if implemented', async () => {
      mockGetAuth.mockReturnValue({ userId: 'user_test_id_filtering' });
      const mockDbListingsFiltered = [
        { id: 'listing_4', cropType: { name_en: 'Wheat' }, cropTypeId: 'crop_type_wheat', listingDate: new Date() },
      ];
      (prisma.produceListing.findMany as jest.Mock).mockResolvedValue(mockDbListingsFiltered);

      const request = new NextRequest('http://localhost/api/listings?cropTypeId=crop_type_wheat', { method: 'GET' });
      const response = await listingsGetHandler(request);
      expect(response.status).toBe(200);
      const jsonResponse = await response.json();
      expect(jsonResponse.length).toBe(1);
      expect(jsonResponse[0].id).toBe('listing_4');
      expect(prisma.produceListing.findMany).toHaveBeenCalledWith(expect.objectContaining({
        where: {
          isActive: true,
          cropTypeId: 'crop_type_wheat'
        },
        orderBy: { listingDate: 'desc' },
        include: { cropType: true },
      }));
    });
  });
});