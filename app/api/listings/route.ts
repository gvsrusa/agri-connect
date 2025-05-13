import { NextRequest, NextResponse } from 'next/server';
import { getAuth } from '@clerk/nextjs/server';
import { db } from '@/lib/db'; // Assuming db client is setup here
// Removed incorrect Prisma import

export async function POST(req: NextRequest) {
  const { userId } = getAuth(req);

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { cropTypeId, quantity, pricePerUnit, description } = body;

    // Basic validation (can be expanded)
    if (!cropTypeId || !quantity || !pricePerUnit) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const newListing = await db.produceListing.create({
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
    if (error instanceof SyntaxError) {
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
    const lang = url.searchParams.get('lang') || 'en'; // Default to English
    const validLangs = ['en', 'hi', 'mr']; // Define supported languages
    const targetLang = validLangs.includes(lang) ? lang : 'en';
    // Define language field names dynamically
    const langFieldName = `name_${targetLang}`; // e.g., 'name_hi'
    const fallbackLangFieldName = 'name_en';

    // TODO: Implement pagination and filtering based on query params later
    const listings = await db.produceListing.findMany({
      where: { isActive: true },
      orderBy: { listingDate: 'desc' },
      include: {
        cropType: true // Include related CropType data needed for localization
        // TODO: Include seller info (UserProfile) if needed, respecting privacy (NFR4)
      },
      // Add take/skip for pagination later
    });

    // Map listings to include localized crop names and remove nested object
    // Explicitly type 'listing' based on expected structure from findMany include
    const localizedListings = listings.map((listing: {
        cropType: { [key: string]: string | undefined } | null; // Assuming cropType has string names
        [key: string]: any; // Allow other properties
    }) => {
      const { cropType, ...restOfListing } = listing;
      // Use type assertion for dynamic field access or check existence
      const cropName = (cropType && cropType[langFieldName])
                       || (cropType && cropType[fallbackLangFieldName])
                       || 'Unknown Crop';

      return {
        ...restOfListing,
        cropName: cropName, // Add the localized name
      };
    });

    return NextResponse.json(localizedListings, { status: 200 });

  } catch (error) {
    console.error("Error fetching listings:", error);
    return NextResponse.json({ error: 'Failed to fetch listings' }, { status: 500 });
  }
}