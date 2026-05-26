import ModReportsComponent from "@/app/components/mod/reports";
import CheckLogin from "@/app/lib/auth";

export default async function ModReports() {
	await CheckLogin(1);
	
	return (
		<main className="flex min-h-screen items-center justify-center text-white">
			<ModReportsComponent />
		</main>
	);
}
