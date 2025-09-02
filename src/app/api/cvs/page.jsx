import sql from "@/app/api/utils/sql";

// React Router action function
export async function action({ request }) {
	try {
		const method = request.method;

		if (method === "GET") {
			const cvs = await sql`
				SELECT * FROM cvs
				ORDER BY created_at DESC
			`;
			return Response.json({ cvs });
		}

		if (method === "POST") {
			const body = await request.json();
			const { personal_info, experience, education, skills, languages, template_id } = body;

			if (!personal_info) {
				return Response.json(
					{ error: "Personal info is required" },
					{ status: 400 }
				);
			}

			const result = await sql`
				INSERT INTO cvs (personal_info, experience, education, skills, languages, template_id)
				VALUES (
					${JSON.stringify(personal_info)},
					${JSON.stringify(experience || [])},
					${JSON.stringify(education || [])},
					${JSON.stringify(skills || [])},
					${JSON.stringify(languages || [])},
					${template_id}
				)
				RETURNING *
			`;

			return Response.json({ cv: result[0] }, { status: 201 });
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

// Loader function for GET requests
export async function loader({ request }) {
	try {
		const cvs = await sql`
			SELECT * FROM cvs
			ORDER BY created_at DESC
		`;
		return Response.json({ cvs });
	} catch (error) {
		console.error("Error fetching CVs:", error);
		return Response.json(
			{ error: "Failed to fetch CVs" },
			{ status: 500 }
		);
	}
}
