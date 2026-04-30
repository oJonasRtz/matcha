//https ignore file
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

export async function POST(req: Request) {
	const body = await req.json();

	const res = await fetch("https://backend:5000/public/register", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(body)
	});

	const data = await res.json();

	return new Response(JSON.stringify(data), {
		status: res.status
	});
}