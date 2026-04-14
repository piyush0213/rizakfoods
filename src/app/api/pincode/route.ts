import { NextResponse } from 'next/server';

// Mock list of serviceable PIN codes for Punjab area
// In a real app, this might come from a database or shipping partner API
const PUNJAB_PINCODES = [
  '140001', '140101', '140108', '140110', '143001', // Example codes
  '144001', '152001', '160014', '160017', '160022'
];

export async function POST(request: Request) {
  try {
    const { pincode } = await request.json();

    if (!pincode) {
      return NextResponse.json(
        { success: false, message: 'PIN code is required' },
        { status: 400 }
      );
    }

    // Basic logic: if it starts with 14-16 (Punjab area) we'll say available for now,
    // or if it's explicitly in the list
    const isServiceable = 
      PUNJAB_PINCODES.includes(pincode) || 
      (pincode.startsWith('14') || pincode.startsWith('15') || pincode.startsWith('16'));

    if (isServiceable) {
      return NextResponse.json({ 
        success: true, 
        available: true,
        message: 'Delivery Available in your area!' 
      });
    } else {
      return NextResponse.json({ 
        success: true, 
        available: false,
        message: 'Coming Soon to your area. Register interest below!' 
      });
    }
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: 'Failed to validate PIN code', error: error.message },
      { status: 500 }
    );
  }
}
