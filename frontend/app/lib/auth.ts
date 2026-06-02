import {cookies} from "next/headers"
import { redirect } from "next/navigation";

/**
 * Checks whether the current request has a valid token for the requested role.
 *
 * If the token is missing or the role check fails, the helper can redirect to
 * the matching login page automatically.
 *
 * @param role Role to validate against. Use `"user"` for regular users or `"mod"` for moderators.
 * @param autoRedirect When `true`, redirect to the appropriate login page on failure.
 * @returns `true` when the token exists and the role check succeeds; otherwise `false`.
 */
export default async function CheckLogin(role: "user" | "mod" = "user", autoRedirect = true) {
	const cookieStore = await cookies();
	const token = cookieStore.get("token")?.value;
	const redir = {
		"user": "/login",
		"mod": "/mod/login"
	}

	if (!token) {
		if (autoRedirect)
			redirect(redir[role]);
		return false;
	}

	try {
		const route = `/api/check_${role}`;
		await fetch(route, {
			method: "GET",
			headers: {
				"Authorization": `Bearer ${token}`
			}
		});
	} catch (error) {
		if (autoRedirect)
			redirect(redir[role]);
		return false;
	}

	return true;
}
