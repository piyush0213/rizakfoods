import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Lead from '@/models/Lead';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();

    const { name, phone, pincode, productInterest, productCategory } = body;

    if (!name || !phone || !pincode || !productInterest) {
      return NextResponse.json(
        { success: false, message: 'Please provide all required fields' },
        { status: 400 }
      );
    }

    const lead = await Lead.create(body);

    // Send email notification to Admin
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        secure: false, // true for 465, false for other ports
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      await transporter.sendMail({
        from: `"Rizak Foods Web" <${process.env.SMTP_USER}>`,
        to: process.env.ADMIN_NOTIFICATION_EMAIL || process.env.ADMIN_EMAIL,
        subject: `New Lead: ${productInterest} - ${pincode}`,
        html: `
          <h2>New Product Interest Registration</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>PIN Code:</strong> ${pincode}</p>
          <p><strong>Product:</strong> ${productInterest} (${productCategory})</p>
          <p><strong>Message:</strong> ${body.message || 'N/A'}</p>
        `,
      });
    } catch (emailError) {
      console.error('Failed to send notification email:', emailError);
      // We don't fail the request if email fails, just log it.
    }

    return NextResponse.json({ success: true, data: lead }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: 'Failed to submit interest', error: error.message },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    // Should be protected
    await dbConnect();
    
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const pincode = searchParams.get('pincode');
    
    const query: any = {};
    if (status) query.status = status;
    if (pincode) query.pincode = new RegExp(pincode, 'i');

    const leads = await Lead.find(query).sort({ createdAt: -1 });

    return NextResponse.json({ success: true, count: leads.length, data: leads });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: 'Failed to fetch leads', error: error.message },
      { status: 500 }
    );
  }
}
