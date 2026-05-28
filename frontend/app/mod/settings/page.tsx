import ModSettingsComponent from "@/app/components/mod/settings";
import CheckLogin from "@/app/lib/auth";

export const metadata = {
	title: "Settings",
}

export default async function ModSettingsPage() {
	await CheckLogin(1);

	return <ModSettingsComponent />;
}
