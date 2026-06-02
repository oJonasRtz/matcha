"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FloatingLabelInput } from "../input/floatingLabel";
import PasswordInput from "../input/password";
import { Card } from "../public/card";

export default function ModLoginForm() {
	const router = useRouter();
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const [passwordErrorMessage, setPasswordErrorMessage] = useState<string | null>(null);

	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setErrorMessage(null);
		setPasswordErrorMessage(null);

		const formData = new FormData(e.currentTarget);
		const data = Object.fromEntries(formData.entries()) as Record<string, string>;
		const identity = data.identity.trim();
		const payload = {
			password: data.password,
			...(identity.includes("@") ? { email: identity } : { username: identity }),
		};

		fetch("/api/mlogin", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(payload),
		})
			.then(async (res) => {
				const text = await res.text();
				let responseData: any = {};

				try {
					responseData = text ? JSON.parse(text) : {};
				} catch {
					responseData = { raw: text };
				}

				return { res, responseData };
			})
			.then(({ res, responseData }) => {
				if (res.ok) {
					router.push("/mod/dashboard");
					return;
				}

				if (res.status === 401) {
					setPasswordErrorMessage("Invalid username or password.");
					setErrorMessage(null);
					return;
				}

				setErrorMessage(responseData?.error || "Login failed. Please check your credentials and try again.");
				setPasswordErrorMessage(null);
			})
			.catch(() => {
				setErrorMessage("Login failed. Please try again later.");
				setPasswordErrorMessage(null);
			});
	}
	
	return (
		<Card className="max-w-md text-white">
			<h1 className="text-2xl font-bold mb-4">Moderator Login</h1>

			{errorMessage ? (
				<div className="mb-4 rounded-md border border-blue-500/60 bg-blue-500/10 px-4 py-3 text-sm text-blue-100">
					{errorMessage}
				</div>
			) : null}

			<form className="flex flex-col gap-4" onSubmit={handleSubmit}>
				<FloatingLabelInput
					type="text"
					name="identity"
					id="identity"
					label="Username or Email"
					className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
					required
				/>

				<PasswordInput
					name="password"
					id="password"
					label="Password"
					className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
					required
				/>

				{passwordErrorMessage ? (
					<p className="-mt-2 text-sm font-medium text-red-300">
						{passwordErrorMessage}
					</p>
				) : null}

				<button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded shadow-lg shadow-blue-500/40 transition hover:shadow-blue-400/60">
					Login
				</button>
			</form>

			<footer className="border-t border-gray-600 mt-6 text-sm text-gray-400">
				<p>Only authorized moderators can access this page.</p>
			</footer>
		</Card>
	)
}
