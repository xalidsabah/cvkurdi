import sql from "@/app/api/utils/sql";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export async function GET(request, { params }) {
	try {
		const { id } = params;

		if (!id) {
			return Response.json({ error: 'CV ID is required' }, { status: 400 });
		}

		const cv = await sql`
			SELECT * FROM cvs WHERE id = ${id}
		`;

		if (cv.length === 0) {
			return Response.json({ error: 'CV not found' }, { status: 404 });
		}

		// Generate PDF (simplified version)
		const pdf = new jsPDF();
		pdf.text('CV Preview', 20, 20);
		pdf.text(`Generated for CV ID: ${id}`, 20, 40);

		const pdfBuffer = pdf.output('arraybuffer');

		return new Response(pdfBuffer, {
			headers: {
				'Content-Type': 'application/pdf',
				'Content-Disposition': `attachment; filename="cv-${id}.pdf"`,
			},
		});
	} catch (error) {
		console.error('PDF generation error:', error);
		return Response.json({ error: 'PDF generation failed' }, { status: 500 });
	}
}
