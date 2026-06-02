import CheckLogin from "@/app/lib/auth"

import ModDashboardComponent from "@/app/components/mod/dashboard";

export default async function ModDashboard() {
	await CheckLogin("mod");

	return <ModDashboardComponent />;
}