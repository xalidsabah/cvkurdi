import sql from "@/app/api/utils/sql";

export async function GET(request, { params }) {
  try {
    const { id } = params;

    const result = await sql`
      SELECT * FROM cvs WHERE id = ${id}
    `;

    if (result.length === 0) {
      return Response.json(
        { error: "CV not found" },
        { status: 404 }
      );
    }

    return Response.json({ cv: result[0] });
  } catch (error) {
    console.error("Error fetching CV:", error);
    return Response.json(
      { error: "Failed to fetch CV" },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();
    
    const { 
      personal_info, 
      experience, 
      education, 
      skills, 
      languages,
      template_id 
    } = body;

    // Check if CV exists
    const existing = await sql`
      SELECT id FROM cvs WHERE id = ${id}
    `;

    if (existing.length === 0) {
      return Response.json(
        { error: "CV not found" },
        { status: 404 }
      );
    }

    // Build update query dynamically
    const updates = [];
    const values = [];
    let paramCount = 1;

    if (personal_info !== undefined) {
      updates.push(`personal_info = $${paramCount}`);
      values.push(JSON.stringify(personal_info));
      paramCount++;
    }

    if (experience !== undefined) {
      updates.push(`experience = $${paramCount}`);
      values.push(JSON.stringify(experience));
      paramCount++;
    }

    if (education !== undefined) {
      updates.push(`education = $${paramCount}`);
      values.push(JSON.stringify(education));
      paramCount++;
    }

    if (skills !== undefined) {
      updates.push(`skills = $${paramCount}`);
      values.push(skills);
      paramCount++;
    }

    if (languages !== undefined) {
      updates.push(`languages = $${paramCount}`);
      values.push(languages);
      paramCount++;
    }

    if (template_id !== undefined) {
      updates.push(`template_id = $${paramCount}`);
      values.push(template_id);
      paramCount++;
    }

    if (updates.length === 0) {
      return Response.json(
        { error: "No fields to update" },
        { status: 400 }
      );
    }

    updates.push(`updated_at = CURRENT_TIMESTAMP`);
    values.push(id);

    const query = `
      UPDATE cvs 
      SET ${updates.join(', ')}
      WHERE id = $${paramCount}
      RETURNING *
    `;

    const result = await sql(query, values);

    return Response.json({ cv: result[0] });
  } catch (error) {
    console.error("Error updating CV:", error);
    return Response.json(
      { error: "Failed to update CV" },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params;

    const result = await sql`
      DELETE FROM cvs WHERE id = ${id}
      RETURNING id
    `;

    if (result.length === 0) {
      return Response.json(
        { error: "CV not found" },
        { status: 404 }
      );
    }

    return Response.json({ message: "CV deleted successfully" });
  } catch (error) {
    console.error("Error deleting CV:", error);
    return Response.json(
      { error: "Failed to delete CV" },
      { status: 500 }
    );
  }
}