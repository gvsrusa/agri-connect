import { NextRequest, NextResponse } from 'next/server';
import { getAuth } from '@clerk/nextjs/server';
import prisma from '@/lib/db';

export async function GET(request: NextRequest) {
  const { userId } = getAuth(request);
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // const searchParams = request.nextUrl.searchParams;
  // const lang = searchParams.get('lang') || 'en'; // Language might not be applicable here as marketName is a single string field

  try {
    const distinctMarketRecords = await prisma.marketPrice.findMany({
      select: {
        marketName: true,
      },
      distinct: ['marketName'],
      orderBy: {
        marketName: 'asc',
      },
    });

    // Transform the data to match the expected format { name: string }[]
    const markets = distinctMarketRecords.map(record => ({
      name: record.marketName,
      // If an ID is needed and marketName is unique enough to be an ID,
      // you could potentially use it, or this structure might need rethinking
      // if a separate Market entity with its own ID is desired in the future.
      // For now, just returning the name as per the test expectation.
    }));

    return NextResponse.json(markets, { status: 200 });

  } catch (error) {
    console.error("Error fetching market names:", error);
    return NextResponse.json({ error: 'Failed to fetch market names' }, { status: 500 });
  }
}