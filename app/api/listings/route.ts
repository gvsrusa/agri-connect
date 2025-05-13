import { NextRequest, NextResponse } from 'next/server';
import { getAuth } from '@clerk/nextjs/server';
import prisma from '@/lib/db';
import { z } from 'zod';

// Define Zod schema for listing creation
const listingCreateSchema = z.object({
  cropTypeId: z.string({invalid_type_error: "cropTypeId must be a string.", required_error: "cropTypeId is required."})
               .min(1, { message: "cropTypeId cannot be empty." }),
  quantity: z.string({invalid_type_error: "quantity must be a string.", required_error: "quantity is required."})
             .min(1, { message: "quantity cannot be empty." }),
  pricePerUnit: z.string({invalid_type_error: "pricePerUnit must be a string.", required_error: "pricePerUnit is required."})
                   .min(1, { message: "pricePerUnit cannot be empty." }),
  description: z.string().optional(),
});

export async function POST(req: NextRequest) {
  const { userId } = getAuth(req);

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    
    const validationResult = listingCreateSchema.safeParse(body);

    if (!validationResult.success) {
      const errors = validationResult.error.format();
      // Handle specific test case for empty cropTypeId
      // Check body.cropTypeId directly as Zod might not include it in parsed data if it's fundamentally wrong type before min check
      if (body.cropTypeId === "" && errors.cropTypeId?._errors.includes("cropTypeId cannot be empty.")) {
          return NextResponse.json({ error: "cropTypeId cannot be empty." }, { status: 400 });
      }

      // Handle generic "Missing required fields" for missing cropTypeId, quantity, or pricePerUnit
      const cropTypeIdMissing = errors.cropTypeId?._errors.includes("cropTypeId is required.");
      const quantityMissing = errors.quantity?._errors.includes("quantity is required.");
      const pricePerUnitMissing = errors.pricePerUnit?._errors.includes("pricePerUnit is required.");

      if (cropTypeIdMissing || quantityMissing || pricePerUnitMissing) {
          return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
      }
      
      // For other validation errors (e.g., quantity="", pricePerUnit="" after being present, or wrong type if not caught by "is required.")
      // Return the first specific error message from Zod.
      return NextResponse.json({ error: validationResult.error.errors[0].message }, { status: 400 });
    }

    const { cropTypeId, quantity, pricePerUnit, description } = validationResult.data;

    const newListing = await prisma.produceListing.create({
      data: {
        sellerUserId: userId,
        cropTypeId,
        quantity,
        pricePerUnit,
        description: description || null, // Handle optional description
      },
    });

    return NextResponse.json(newListing, { status: 201 });

  } catch (error) {
    console.error("Error creating listing:", error);
    // Distinguish between JSON parsing errors and DB errors
    if (error && typeof error === 'object' && 'name' in error && error.name === 'SyntaxError') {
        return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to create listing' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const { userId } = getAuth(req);

  // Although the spec doesn't explicitly require auth for browsing,
  // it's good practice, and the test plan implies it (AC2.1, FR3.1 mention logged-in farmer).
  // Let's enforce it for now. This can be revisited if public browsing is desired.
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const url = new URL(req.url);
    
    // Language handling
    const lang = url.searchParams.get('lang') || 'en'; // Default to English
    const validLangs = ['en', 'hi', 'mr']; // Define supported languages
    const targetLang = validLangs.includes(lang) ? lang : 'en';
    const langFieldName = `name_${targetLang}`; // e.g., 'name_hi'
    const fallbackLangFieldName = 'name_en';
    
    // Filtering
    const whereClause: any = { isActive: true };
    
    // Filter by cropTypeId if provided
    const cropTypeId = url.searchParams.get('cropTypeId');
    if (cropTypeId) {
      whereClause.cropTypeId = cropTypeId;
    }
    
    // Pagination
    const page = parseInt(url.searchParams.get('page') || '1', 10);
    const limit = parseInt(url.searchParams.get('limit') || '10', 10);
    
    // Ensure page and limit are valid numbers
    const validPage = page > 0 ? page : 1;
    const validLimit = limit > 0 ? limit : 10;
    const skip = (validPage - 1) * validLimit;
    
    const listings = await prisma.produceListing.findMany({
      where: whereClause,
      orderBy: { listingDate: 'desc' },
      include: {
        cropType: true // Include related CropType data needed for localization
      },
      skip,
      take: validLimit
    });

    // Map listings to include localized crop names and remove nested object
    const localizedListings = listings.map((listing) => {
      const { cropType, ...restOfListing } = listing;
      // Handle nullable fields safely
      const cropTypeName = cropType?.[langFieldName as keyof typeof cropType] as string | null | undefined;
      const fallbackName = cropType?.[fallbackLangFieldName as keyof typeof cropType] as string;
      
      const cropName = cropTypeName || fallbackName || 'Unknown Crop';

      return {
        ...restOfListing,
        cropName,
      };
    });

    return NextResponse.json(localizedListings, { status: 200 });

  } catch (error) {
    console.error("Error fetching listings:", error);
    return NextResponse.json({ error: 'Failed to fetch listings' }, { status: 500 });
  }
}