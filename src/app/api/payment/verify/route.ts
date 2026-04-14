import { NextResponse } from 'next/server';
import crypto from 'crypto';
import dbConnect from '@/lib/mongodb';
import Order from '@/models/Order';

export async function POST(request: Request) {
  try {
    await dbConnect();
    const { 
      razorpay_order_id, 
      razorpay_payment_id, 
      razorpay_signature,
      db_order_id
    } = await request.json();

    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(sign.toString())
      .digest("hex");

    const isAuthentic = expectedSign === razorpay_signature;

    if (isAuthentic) {
      // Payment is successful
      await Order.findByIdAndUpdate(db_order_id, {
        paymentStatus: 'paid',
        orderStatus: 'confirmed',
        razorpayPaymentId: razorpay_payment_id,
        razorpaySignature: razorpay_signature
      });

      return NextResponse.json({ success: true, message: 'Payment verified successfully' });
    } else {
      // Payment signature mismatch
      await Order.findByIdAndUpdate(db_order_id, {
        paymentStatus: 'failed'
      });
      return NextResponse.json(
        { success: false, message: 'Invalid payment signature' },
        { status: 400 }
      );
    }
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: 'Failed to verify payment', error: error.message },
      { status: 500 }
    );
  }
}
