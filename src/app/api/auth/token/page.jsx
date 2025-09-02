import { getToken } from '@auth/core/jwt';

export async function GET(request) {
	try {
		const token = await getToken({
			req: request,
			secret: process.env.AUTH_SECRET,
			secureCookie: process.env.AUTH_URL.startsWith('https'),
		});

		if (!token) {
			return Response.json({ error: 'Unauthorized' }, { status: 401 });
		}

		return Response.json({ token });
	} catch (error) {
		console.error('Token retrieval error:', error);
		return Response.json({ error: 'Internal server error' }, { status: 500 });
	}
}
