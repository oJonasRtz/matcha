import ModLoginForm from "@/app/components/mod/login"

export const metadata = {
	title: "Moderator Login",
}

export default function ModLogin() {
	return (
		<main className="flex min-h-screen items-center justify-center gap-4">
			<ModLoginForm />
		</main>
	)
}
  