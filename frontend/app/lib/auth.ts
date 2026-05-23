import {cookies} from "next/headers"
import { redirect } from "next/navigation";

export default async function CheckLogin(role: 0 | 1 = 0) {
	const cookieStore = await cookies();
	const token = cookieStore.get("token")?.value;
	const redir = {
		0: "/login",
		1: "/mod/login"
	}

	if (!token)
		redirect(redir[role]);

}
