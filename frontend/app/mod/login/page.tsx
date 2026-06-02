import ModLoginForm from "@/app/components/mod/login"
import CheckLogin from "@/app/lib/auth"
import { redirect } from "next/navigation"

export const metadata = {
	title: "Moderator Login",
}

export default async function ModLogin() {
	const isLoggedIn = await CheckLogin("mod", false);
	if (isLoggedIn)
		redirect("/mod/dashboard");

	return (
		<main className="flex min-h-screen items-center justify-center gap-4">
			<ModLoginForm />
		</main>
	)
}
  