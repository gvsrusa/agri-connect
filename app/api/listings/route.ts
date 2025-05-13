import { NextRequest, NextResponse } from 'next/server';
import { getAuth } from '@clerk/nextjs/server';
import prisma from '@/lib/db';
import { z } from 'zod';
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