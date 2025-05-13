import { NextRequest, NextResponse } from 'next/server';
import { getAuth } from '@clerk/nextjs/server';
import prisma from '@/lib/db';
import { getLocale } from 'next-intl/server'; // For potential future use if not using query param

export async function GET(request: NextRequest) {
  const { userId } = getAuth(request);
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const searchParams = request.nextUrl.searchParams;
  const cropId = searchParams.get('cropId');
  const marketName = searchParams.get('marketName');
  const lang = searchParams.get('lang') || 'en'; // Default to 'en' if lang is not provided

  if (!cropId || !marketName) {
    return NextResponse.json({ error: 'Missing cropId or marketName' }, { status: 400 });
  }

  try {
    const marketPriceRecord = await prisma.marketPrice.findFirst({
      where: {
        cropTypeId: cropId,
        marketName: marketName,
      },
      orderBy: {
        date: 'desc',
      },
    });

    if (!marketPriceRecord) {
      return NextResponse.json({ error: 'Price data not found' }, { status: 404 });
    }

    const cropTypeRecord = await prisma.cropType.findUnique({
      where: { id: marketPriceRecord.cropTypeId },
    });

    if (!cropTypeRecord) {
      // This case should ideally not happen if data integrity is maintained
      return NextResponse.json({ error: 'Crop type not found for the price record' }, { status: 500 });
    }

    let localizedCropName = cropTypeRecord.name_en; // Default to English
    const langField = `name_${lang}` as keyof typeof cropTypeRecord;
    if (lang && cropTypeRecord[langField]) {
      localizedCropName = cropTypeRecord[langField] as string;
    }
    
    // Assuming currency is INR for now. This could be made more dynamic.
    const currency = "INR";
    const priceUnit = `${currency} per ${marketPriceRecord.unit}`;

    const responsePayload = {
      cropName: localizedCropName,
      marketName: marketPriceRecord.marketName,
      price: parseFloat(marketPriceRecord.price), // Convert string price to number
      priceUnit: priceUnit,
      dateRecorded: marketPriceRecord.date.toISOString(),
      source: marketPriceRecord.source,
    };

    return NextResponse.json(responsePayload, { status: 200 });

  } catch (error) {
    console.error("Error fetching market price:", error);
    return NextResponse.json({ error: 'Failed to fetch market price' }, { status: 500 });
  }
}