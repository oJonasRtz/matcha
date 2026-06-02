import { callPrivate } from "../../lib/api/callPrivate";

export async function GET(req: Request) {
	try {
		const data = await callPrivate({ route: "/mod/checkToken", method: "GET" });
		return new Response(JSON.stringify(data), { status: 200 });
	} catch (error) {
		return new Response(JSON.stringify({ message: (error as Error).message }), { status: 401 });
	}
}