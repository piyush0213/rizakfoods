import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json({ success: false, message: 'No file received' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const originalName = file.name || 'image.jpg';
    const sanitizedName = originalName.replace(/[^a-zA-Z0-9.\-_]/g, '_');
    const finalName = `${uniqueSuffix}-${sanitizedName}`;

    // Write to public/uploads/products directory
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'products');
    
    try {
      await mkdir(uploadDir, { recursive: true });
    } catch (err: any) {
      if (err.code !== 'EEXIST') throw err;
    }

    const filepath = path.join(uploadDir, finalName);
    await writeFile(filepath, buffer);

    const fileUrl = `/uploads/products/${finalName}`;

    return NextResponse.json({ success: true, url: fileUrl });
  } catch (error: any) {
    console.error('Upload Error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to upload file', error: error.message },
      { status: 500 }
    );
  }
}
