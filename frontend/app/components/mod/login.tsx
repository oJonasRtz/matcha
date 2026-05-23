"use client";

import { FloatingLabelInput } from "../input/floatingLabel";
import { Card } from "../public/card";
import { useRouter } from "next/navigation";

export default function ModLoginForm() {
	const router = useRouter();


	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		console.log("Form submitted: ");

		// router.push("/mod/dashboard");
	}
	
	return (
		<Card className="max-w-md text-white">
			<h1 className="text-2xl font-bold mb-4">Moderator Login</h1>

			<form className="flex flex-col gap-4" onSubmit={handleSubmit}>
				<FloatingLabelInput
					type="text"
					name="identity"
					id="identity"
					label="Username or Email"
					className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
					required
				/>

				<FloatingLabelInput
					type="password"
					name="password"
					id="password"
					label="Password"
					className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
					required
				/>

				<button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded shadow-lg shadow-blue-500/40 transition hover:shadow-blue-400/60">
					Login
				</button>
			</form>
		</Card>
	)
}
