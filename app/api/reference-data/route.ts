import { NextResponse } from 'next/server';

/**
 * @swagger
 * /api/reference-data:
 *   get:
 *     summary: Retrieve reference data
 *     description: Fetches various reference data sets like units, quality grades, etc.
 *     tags:
 *       - Reference Data
 *     responses:
 *       200:
 *         description: A JSON object containing reference data.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 units:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: ['kg', 'quintal', 'ton', 'dozen', 'piece']
 *                 qualityGrades:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: ['A', 'B', 'C', 'Premium', 'Standard']
 *                 paymentTerms:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: ['Cash', 'Credit', 'Advance']
 *       500:
 *         description: Internal server error.
 */
export async function GET(request: Request) {
  // In a real application, you would fetch reference data from a database, configuration files, or other services.
  try {
    // Example reference data. This should be expanded or fetched from a persistent source.
    const referenceData = {
      units: ['kg', 'quintal', 'ton', 'dozen', 'piece', 'liter', 'bag', 'box'],
      qualityGrades: ['Grade A', 'Grade B', 'Grade C', 'Premium', 'Standard', 'Fair'],
      paymentTerms: ['Cash on Delivery', 'Bank Transfer', 'Credit (30 days)', 'Advance Payment'],
      produceCategories: ['Fruits', 'Vegetables', 'Grains', 'Spices', 'Dairy', 'Poultry', 'Livestock'],
      marketTypes: ['Wholesale', 'Retail', 'Farmers Market', 'Cooperative'],
      // Add other relevant reference data categories as needed for the marketplace
    };

    return NextResponse.json(referenceData, { status: 200 });
  } catch (error) {
    console.error('Error fetching reference data:', error);
    // In a production environment, log the error to a monitoring service
    return NextResponse.json({ message: 'Error fetching reference data. Please try again later.' }, { status: 500 });
  }
}

// Future consideration: POST, PUT, DELETE methods for managing reference data
// These would typically be admin-only endpoints.
// For example, to add a new unit or quality grade:
/*
export async function POST(request: Request) {
  try {
    // Ensure this is an authenticated and authorized user (e.g., admin)
    const body = await request.json();
    // Logic to add new reference data item (e.g., to a database)
    // Validate the input body
    console.log('Received data for new reference item:', body);
    // Example: await prisma.unit.create({ data: { name: body.unitName } });
    return NextResponse.json({ message: 'Reference data item created successfully', data: body }, { status: 201 });
  } catch (error) {
    console.error('Error creating reference data item:', error);
    return NextResponse.json({ message: 'Error creating reference data item' }, { status: 500 });
  }
}
*/