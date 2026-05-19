import { cookies } from "next/headers";

export async function POST(req: Request) {
	const body = await req.json();

	const res = await fetch("https://backend:5000/user/register", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(body)
	});

	const text = await res.text();
	const data = text ? JSON.parse(text) : {};

	if (!res.ok) {
		return new Response(JSON.stringify(data), {
			status: res.status
		});
	}
	// JWT on cookies
	const cookieStore = await cookies();

	cookieStore.set("token", data.token, {
		httpOnly: true,
		secure: true,
		sameSite: "strict",
		path: "/",
		maxAge: 60 * 60 * 24, // 1 day
	});	

	return new Response(JSON.stringify({ success: true }), {
		status: 201
	});
}