import { cookies } from "next/headers";

export async function POST(req: Request) {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
        return new Response(JSON.stringify({ message: "No token provided" }), {
            status: 401,
            headers: {
                "Content-Type": "application/json",
            },
        });
    }

	const body = await req.json();

	const res = await fetch("https://backend:5000/mod/register", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"Authorization": `Bearer ${token}`
		},
		body: JSON.stringify(body)
	});

	const text = await res.text();
	const data = text ? JSON.parse(text) : {};

	if (!res.ok) {
		return new Response(JSON.stringify(data), {
			status: res.status,
			headers: {
				"Content-Type": "application/json",
			},
		});
	}

	return new Response(JSON.stringify({ success: true }), {
		status: 201,
		headers: {
			"Content-Type": "application/json",
		},
	});
}