export async function POST(req: Request) {
	const body = await req.json();

	let res;

	try {
		res = await fetch("https://backend:5000/user/register", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(body)
		});
	} catch (err) {
		return new Response(JSON.stringify({
			error: "Backend unreachable"
		}), { status: 500 });
	}

	let data = null;

	try {
		data = await res.json();
	} catch {
		data = null;
	}

	return new Response(JSON.stringify(data || {
		error: "Invalid response from backend"
	}), {
		status: res.status || 500
	});
}