import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file) {
      return Response.json({ error: 'No file provided' }, { status: 400 });
    }

    // Read file into buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Ensure uploads directory exists
    const uploadDir = join(process.cwd(), 'public', 'uploads');
    await mkdir(uploadDir, { recursive: true });

    // Create a unique filename preserving extension
    const originalName = typeof file.name === 'string' ? file.name : 'upload';
    const ext = originalName.includes('.') ? `.${originalName.split('.').pop()}` : '';
    const safeBase = originalName.replace(/[^a-zA-Z0-9-_]/g, '').slice(0, 24) || 'file';
    const fileName = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}-${safeBase}${ext}`;

    // Save file
    const filePath = join(uploadDir, fileName);
    await writeFile(filePath, buffer);

    // Build public URL
    const url = `/uploads/${fileName}`;

    if (!url) {
      return Response.json({ error: 'Upload failed' }, { status: 500 });
    }

    return Response.json({ url }, { status: 200 });
  } catch (error) {
    console.error('Upload error:', error);
    return Response.json({ error: 'Upload failed' }, { status: 500 });
  }
}