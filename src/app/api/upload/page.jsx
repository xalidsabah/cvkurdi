import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { randomUUID } from 'crypto';

export const action = async ({ request }) => {
	try {
		const formData = await request.formData();
		const file = formData.get('file');

		if (!file) {
			return Response.json({ error: 'No file received' }, { status: 400 });
		}

		const bytes = await file.arrayBuffer();
		const buffer = Buffer.from(bytes);

		// Generate unique filename
		const originalName = typeof file.name === 'string' ? file.name : 'upload';
		const fileExtension = originalName.includes('.') ? originalName.split('.').pop() : '';
		const fileName = `${randomUUID()}.${fileExtension || 'bin'}`;

		// Create uploads directory if it doesn't exist
		const uploadDir = join(process.cwd(), 'public', 'uploads');
		await mkdir(uploadDir, { recursive: true });

		// Save file
		const filePath = join(uploadDir, fileName);
		await writeFile(filePath, buffer);

		// Return file URL
		const fileUrl = `/uploads/${fileName}`;

		return Response.json({
			url: fileUrl,
			fileName: originalName,
			size: buffer.length
		});
	} catch (error) {
		console.error('Upload error:', error);
		return Response.json({ error: 'Upload failed' }, { status: 500 });
	}
};
