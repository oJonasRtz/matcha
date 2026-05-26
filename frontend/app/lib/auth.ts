import {cookies} from "next/headers"
import { redirect } from "next/navigation";

/*
	Role = 0 for users,
	Role = 1 for mods
*/
export default async function CheckLogin(role: 0 | 1 = 0, autoRedirect = true) {
	const cookieStore = await cookies();
	const token = cookieStore.get("token")?.value;
	const redir = {
		0: "/login",
		1: "/mod/login"
	}

	if (!token) {
		if (autoRedirect)
			redirect(redir[role]);
		return false;
	}

	// Prepare a route to check if the token is valid

	return true;
}
