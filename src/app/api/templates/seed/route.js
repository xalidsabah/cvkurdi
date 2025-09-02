import sql from "@/app/api/utils/sql";
import { templates } from "../../../../templates";

export async function POST(request) {
  try {
    // Clear existing templates
    await sql`DELETE FROM templates`;

    // Insert new templates
    for (const template of templates) {
      await sql`
        INSERT INTO templates (id, name_ku, name_en, name_ar, category, category_en, preview_url, template_data)
        VALUES (
          ${template.id},
          ${template.name_ku},
          ${template.name_en},
          ${template.name_ar},
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
      `;
    }

    return Response.json({
      message: "Templates seeded successfully",
      count: templates.length
    }, { status: 200 });
  } catch (error) {
    console.error("Error seeding templates:", error);
    return Response.json(
      { error: "Failed to seed templates" },
      { status: 500 }
    );
  }
}
