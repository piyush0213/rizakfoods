import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Order from '@/models/Order';

export async function GET(request: Request) {
  try {
    // Should be protected for admin
    await dbConnect();
    
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const payment = searchParams.get('payment');
    
    const query: any = {};
    if (status) query.orderStatus = status;
    if (payment) query.paymentStatus = payment;

    const orders = await Order.find(query).sort({ createdAt: -1 });

    return NextResponse.json({ success: true, count: orders.length, data: orders });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: 'Failed to fetch orders', error: error.message },
      { status: 500 }
    );
  }
}
