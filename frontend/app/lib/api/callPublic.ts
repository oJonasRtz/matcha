import { ApiOptions, parseRoute } from "./callPrivate";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

/**
 * Calls a public backend endpoint without attaching an Authorization header.
 *
 * @param route Backend route to call, with or without a leading slash.
 * @param method HTTP method to use.
 * @param payload Optional request body for non-GET requests.
 * @returns Parsed JSON response from the backend.
 * @throws If the backend returns a non-2xx response.
 */
export async function callPublic({ route, method, payload = {} }: ApiOptions) {
	const path = parseRoute(route);
	const res = await fetch(`https://backend:5000${path}`, {
		method: method,
		headers: {
			"Content-Type": "application/json",
		},
		body: method !== "GET" ? JSON.stringify(payload) : undefined,
	});

	const text = await res.text();
	const data = text ? JSON.parse(text) : {};

	if (!res.ok)
		throw new Error(data.message || "An error occurred");

	return data;
}
