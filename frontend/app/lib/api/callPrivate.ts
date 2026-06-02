import { cookies } from "next/headers";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

export interface ApiOptions {
	route: string;
	method: "POST" | "GET" | "PUT" | "DELETE";
	payload?: Record<string, any>;
}

/**
 * Normalizes an API route so it always starts with a leading slash.
 *
 * @param route Route to normalize, with or without `/`.
 * @returns The normalized route string.
 */
export function parseRoute(route: string) {
	return route.trim().startsWith("/") ? route : `/${route}`;
}

/**
 * Calls a protected backend endpoint using the token stored in cookies.
 *
 * @param route Backend route to call, with or without a leading slash.
 * @param method HTTP method to use.
 * @param payload Optional request body for non-GET requests.
 * @returns Parsed JSON response from the backend.
 * @throws If no token exists or the backend returns a non-2xx response.
 */
export async function callPrivate({ route, method, payload = {} }: ApiOptions) {
	const path = parseRoute(route);
	const cookieStore = await cookies();
	const token = cookieStore.get("token")?.value;

	if (!token)
		throw new Error("No token provided");

	const res = await fetch(`https://backend:5000${path}`, {
		method: method,
		headers: {
			"Content-Type": "application/json",
			"Authorization": `Bearer ${token}`
		},
		body: method !== "GET" ? JSON.stringify(payload) : undefined,
	});

	const text = await res.text();
	const data = text ? JSON.parse(text) : {};

	if (!res.ok)
		throw new Error(data.message || "An error occurred");

	return data;
}
