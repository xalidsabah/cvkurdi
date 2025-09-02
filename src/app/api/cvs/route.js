import sql from "@/app/api/utils/sql";

export async function POST(request) {
  try {
    const body = await request.json();
    const { 
      personal_info, 
      experience = [], 
      education = [], 
      skills = [], 
      languages = [],
      template_id = 1,
      user_id 
    } = body;

    // Validate required fields
    if (!personal_info || !personal_info.fullName || !personal_info.email) {
      return Response.json(
        { error: "Personal info with fullName and email is required" },
        { status: 400 }
      );
    }

    const result = await sql`
      INSERT INTO cvs (user_id, personal_info, experience, education, skills, languages, template_id)
      VALUES (
        ${user_id || sql`gen_random_uuid()`},
        ${JSON.stringify(personal_info)},
        ${JSON.stringify(experience)},
        ${JSON.stringify(education)},
        ${skills},
        ${languages},
        ${template_id}
      )
      RETURNING *
    `;

    return Response.json({ cv: result[0] }, { status: 201 });
  } catch (error) {
    console.error("Error creating CV:", error);
    return Response.json(
      { error: "Failed to create CV" },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const user_id = searchParams.get('user_id');
    const limit = parseInt(searchParams.get('limit') || '10');
    const offset = parseInt(searchParams.get('offset') || '0');

    let query;
    if (user_id) {
      query = sql`
        SELECT * FROM cvs 
        WHERE user_id = ${user_id}
        ORDER BY updated_at DESC 
        LIMIT ${limit} OFFSET ${offset}
      `;
    } else {
      query = sql`
        SELECT * FROM cvs 
        ORDER BY updated_at DESC 
        LIMIT ${limit} OFFSET ${offset}
      `;
    }

    const cvs = await query;
    return Response.json({ cvs });
  } catch (error) {
    console.error("Error fetching CVs:", error);
    return Response.json(
      { error: "Failed to fetch CVs" },
      { status: 500 }
    );
  }
}