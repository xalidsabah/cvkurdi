import sql from "@/app/api/utils/sql";

// Loader function for GET requests
export async function loader({ params }) {
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

		return Response.json({ cv: cv[0] });
	} catch (error) {
		console.error("Error fetching CV:", error);
		return Response.json({ error: 'Failed to fetch CV' }, { status: 500 });
	}
}

// React Router action function for POST/PUT/DELETE
export async function action({ request, params }) {
	try {
		const method = request.method;
		const { id } = params;

		if (!id) {
			return Response.json({ error: 'CV ID is required' }, { status: 400 });
		}

		if (method === "PUT") {
			const body = await request.json();
			const { personal_info, experience, education, skills, languages, template_id } = body;

			const result = await sql`
				UPDATE cvs
				SET
					personal_info = ${JSON.stringify(personal_info)},
					experience = ${JSON.stringify(experience || [])},
					education = ${JSON.stringify(education || [])},
					skills = ${JSON.stringify(skills || [])},
					languages = ${JSON.stringify(languages || [])},
					template_id = ${template_id},
					updated_at = NOW()
				WHERE id = ${id}
				RETURNING *
			`;

			if (result.length === 0) {
				return Response.json({ error: 'CV not found' }, { status: 404 });
			}

			return Response.json({ cv: result[0] });
		}

		if (method === "DELETE") {
			const result = await sql`
				DELETE FROM cvs WHERE id = ${id}
				RETURNING id
			`;

			if (result.length === 0) {
				return Response.json({ error: 'CV not found' }, { status: 404 });
			}

			return Response.json({ message: 'CV deleted successfully' });
		}

		return Response.json({ error: "Method not allowed" }, { status: 405 });
	} catch (error) {
		console.error("Error in CV API:", error);
		return Response.json(
			{ error: "Internal server error" },
			{ status: 500 }
		);
	}
}
