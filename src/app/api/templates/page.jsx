import sql from "@/app/api/utils/sql";
import { templates as templateConfigs } from "@/templates";

// Loader function for GET requests
export async function loader({ request }) {
  try {
    const url = new URL(request.url);
    const category = url.searchParams.get('category');
    const forceRefresh = url.searchParams.get('refresh') === 'true';

    // Check if database is configured
    if (!process.env.DATABASE_URL) {
      console.warn("DATABASE_URL not configured, returning static templates");
      // Return static templates when database is not available
      const staticTemplates = templateConfigs.filter(template =>
        !category || template.category === category
      );
      return Response.json({ templates: staticTemplates });
    }

    // If force refresh is requested, seed the database first
    if (forceRefresh) {
      await seedTemplates();
    }

    let query;
    if (category) {
      query = sql`
        SELECT * FROM templates
        WHERE category = ${category}
        ORDER BY id ASC
      `;
    } else {
      query = sql`
        SELECT * FROM templates
        ORDER BY id ASC
      `;
    }

    const templates = await query;

    // If no templates in database, seed them
    if (templates.length === 0) {
      await seedTemplates();
      const seededTemplates = await query;
      return Response.json({ templates: seededTemplates });
    }

    return Response.json({ templates });
  } catch (error) {
    console.error("Error fetching templates:", error);

    // Fallback to static templates if database fails
    console.warn("Database error, falling back to static templates");
    const staticTemplates = templateConfigs.filter(template =>
      !category || template.category === category
    );
    return Response.json({ templates: staticTemplates });
  }
}

// Action function for POST requests
export async function action({ request }) {
  try {
    const method = request.method;

    if (method === "POST") {
      const body = await request.json();
      const { name_ku, name_en, category, preview_url, template_data = {} } = body;

      // Validate required fields
      if (!name_ku || !name_en || !category) {
        return Response.json(
          { error: "name_ku, name_en, and category are required" },
          { status: 400 }
        );
      }

      const result = await sql`
        INSERT INTO templates (name_ku, name_en, category, preview_url, template_data)
        VALUES (${name_ku}, ${name_en}, ${category}, ${preview_url}, ${JSON.stringify(template_data)})
        RETURNING *
      `;

      return Response.json({ template: result[0] }, { status: 201 });
    }

    return Response.json({ error: "Method not allowed" }, { status: 405 });
  } catch (error) {
    console.error("Error in templates API:", error);
    return Response.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

async function seedTemplates() {
  try {
    // Check if database is configured
    if (!process.env.DATABASE_URL) {
      console.warn("DATABASE_URL not configured, skipping database seeding");
      return;
    }

    // Clear existing templates
    await sql`DELETE FROM templates`;

    // Insert new templates
    for (const template of templateConfigs) {
      await sql`
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
      `;
    }

    console.log(`Seeded ${templateConfigs.length} templates`);
  } catch (error) {
    console.error("Error seeding templates:", error);
    throw error;
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { name_ku, name_en, category, preview_url, template_data = {} } = body;

    // Validate required fields
    if (!name_ku || !name_en || !category) {
      return Response.json(
        { error: "name_ku, name_en, and category are required" },
        { status: 400 }
      );
    }

    const result = await sql`
      INSERT INTO templates (name_ku, name_en, category, preview_url, template_data)
      VALUES (${name_ku}, ${name_en}, ${category}, ${preview_url}, ${JSON.stringify(template_data)})
      RETURNING *
    `;

    return Response.json({ template: result[0] }, { status: 201 });
  } catch (error) {
    console.error("Error creating template:", error);
    return Response.json(
      { error: "Failed to create template" },
      { status: 500 }
    );
  }
}
