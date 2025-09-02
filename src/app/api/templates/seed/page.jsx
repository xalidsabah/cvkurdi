import sql from "@/app/api/utils/sql";
import { templates as templateConfigs } from "@/templates";

export async function POST(request) {
	try {
		// Check if database is configured
		if (!process.env.DATABASE_URL) {
			return Response.json({
				error: "Database not configured",
				message: "DATABASE_URL environment variable is required"
			}, { status: 400 });
		}

		// Clear existing templates
		await sql`DELETE FROM templates`;

		// Insert new templates
		const insertedTemplates = [];
		for (const template of templateConfigs) {
			const result = await sql`
				INSERT INTO templates (id, name_ku, name_en, name_ar, category, category_en, preview_url, template_data)
				VALUES (
					${template.id},
					${template.name_ku},
					${template.name_en},
					${template.name_ar || ''},
					${template.category},
					${template.category_en},
					${template.preview_url},
					${JSON.stringify(template.template_data)}
				)
				ON CONFLICT (id) DO UPDATE SET
					name_ku = EXCLUDED.name_ku,
					name_en = EXCLUDED.name_en,
					name_ar = EXCLUDED.name_ar,
					category = EXCLUDED.category,
					category_en = EXCLUDED.category_en,
					preview_url = EXCLUDED.preview_url,
					template_data = EXCLUDED.template_data,
					updated_at = NOW()
				RETURNING *
			`;
			insertedTemplates.push(result[0]);
		}

		return Response.json({
			message: `Successfully seeded ${insertedTemplates.length} templates`,
			templates: insertedTemplates
		});
	} catch (error) {
		console.error("Error seeding templates:", error);
		return Response.json({
			error: "Failed to seed templates",
			details: error.message
		}, { status: 500 });
	}
}
