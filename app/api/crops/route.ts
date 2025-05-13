import { NextRequest, NextResponse } from 'next/server';
import { getAuth } from '@clerk/nextjs/server';
import prisma from '@/lib/db';

export async function GET(request: NextRequest) {
  const { userId } = getAuth(request);
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const searchParams = request.nextUrl.searchParams;
  const lang = searchParams.get('lang') || 'en'; // Default to 'en'

  try {
    const cropTypes = await prisma.cropType.findMany({
      orderBy: { name_en: 'asc' }, // Default sort
    });

    const localizedCropTypes = cropTypes.map(crop => {
      let localizedName = crop.name_en; // Fallback to English
      const langFieldName = `name_${lang}` as keyof typeof crop;
      
      if (lang && crop[langFieldName]) {
        localizedName = crop[langFieldName] as string;
      }
      
      return {
        id: crop.id,
        name: localizedName,
      };
    });

    return NextResponse.json(localizedCropTypes, { status: 200 });

  } catch (error) {
    console.error("Error fetching crop types:", error);
    return NextResponse.json({ error: 'Failed to fetch crop types' }, { status: 500 });
  }
}