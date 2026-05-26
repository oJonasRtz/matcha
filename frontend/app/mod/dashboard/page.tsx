import CheckLogin from "@/app/lib/auth"

import ModDashboardComponent from "@/app/components/mod/dashboard";

export default async function ModDashboard() {
	await CheckLogin(1);

	return (
		<main className="flex min-h-screen items-center justify-center gap-4">
			<ModDashboardComponent />
		</main>
	)
}