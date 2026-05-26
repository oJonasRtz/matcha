import ModRegisterForm from "@/app/components/mod/register"
import CheckLogin from "@/app/lib/auth"

export default async function ModRegister() {
	await CheckLogin(1);

	return (
		<main className="flex min-h-screen items-center justify-center gap-4">
			<ModRegisterForm />
		</main>
	)
}