import { NextResponse } from 'next/server';
import { getRazorpay } from '@/lib/razorpay';
import dbConnect from '@/lib/mongodb';
import Order from '@/models/Order';

export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();
    const { amount, user, shippingAddress, items } = body;

    if (!amount || !user || !items || items.length === 0) {
      return NextResponse.json(
        { success: false, message: 'Missing required order fields' },
        { status: 400 }
      );
    }

    // Parse shipping address
    const addressParts = (shippingAddress || '').split(',').map((s: string) => s.trim());

    // Create the order with the schema's expected structure
    const newOrder = await Order.create({
      items: items.map((item: any) => ({
        productId: item.product || item.productId,
        name: item.name || 'Product',
        price: item.price,
        quantity: item.quantity,
        size: item.size || '',
        image: item.image || '',
      })),
      customer: {
        name: user.name,
        email: user.email,
        phone: user.phone,
      },
      address: {
        line1: addressParts[0] || '',
        city: addressParts[1] || '',
        state: addressParts[2]?.split('-')[0]?.trim() || '',
        pincode: addressParts[2]?.split('-')[1]?.trim() || '',
      },
      subtotal: amount,
      deliveryCharge: 0,
      total: amount,
      paymentStatus: 'pending',
      orderStatus: 'placed',
    });

    const options = {
      amount: amount * 100, // Razorpay works in paise
      currency: "INR",
      receipt: newOrder._id.toString(),
    };

    const razorpay = getRazorpay();
    const razorpayOrder = await razorpay.orders.create(options);

    // Update order with razorpay ID
    newOrder.razorpayOrderId = razorpayOrder.id;
    await newOrder.save();

    return NextResponse.json({
      success: true,
      orderId: newOrder._id,
      razorpayOrder: {
        id: razorpayOrder.id,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency
      }
    });
  } catch (error: any) {
    console.error('Payment create error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to create payment', error: error.message },
      { status: 500 }
    );
  }
}
