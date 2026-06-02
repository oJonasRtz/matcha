// import { cookies } from "next/headers";

// process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

// export async function POST() {
// 	const cookieStore = await cookies();
// 	const token = cookieStore.get("token")?.value;

// 	if (!token)
// 		return new Response(JSON.stringify({ message: "No token provided" }), {
// 			status: 401
// 		});

// 	const res = await fetch("https://backend:5000/mod/logout", {
// 		method: "POST",
// 		headers: {
// 			"Content-Type": "application/json",
// 			"Authorization": `Bearer ${token}`
// 		},
// 	});

// 	cookieStore.delete("token");

// 	if (!res.ok) {
// 		const data = await res.json();
// 		return new Response(JSON.stringify(data), {
// 			status: res.status
// 		});
// 	}

// 	return new Response(JSON.stringify({ success: true }), {
// 		status: 200
// 	});
// }
import { callPrivate } from "../../lib/api/callPrivate";
import { cookies } from "next/headers";

export async function POST() {
	const cookieStore = await cookies();

	try {
		await callPrivate({ route: "mod/logout", method: "POST" });
		cookieStore.delete("token");
		
		return new Response(JSON.stringify({ success: true }), {
			status: 200
		});
	} catch (error: any) {
		return new Response(JSON.stringify({ message: error.message }), {
			status: 500
		});
	}
}