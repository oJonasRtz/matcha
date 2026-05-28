import Sidebar from "../components/users/sidebar";
import UserSettingsComponent from "../components/users/settings";
import CheckLogin from "../lib/auth";

export const metadata = {
	  title: "Settings",
}

export default async function Settings() {
	await CheckLogin();

	return (
		<Sidebar>
			<main className="flex min-h-screen w-full bg-[radial-gradient(circle_at_top,rgba(244,63,94,0.18),rgba(15,23,42,0.96)_40%),linear-gradient(180deg,rgba(20,6,18,0.98),rgba(10,2,10,0.98))] px-4 py-6 md:px-6 md:py-8">
				<div className="mx-auto w-full max-w-[1320px]">
					<UserSettingsComponent />
				</div>
			</main>
		</Sidebar>
	)
}