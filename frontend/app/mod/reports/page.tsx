import ModReportsComponent from "@/app/components/mod/reports";
import CheckLogin from "@/app/lib/auth";

export default async function ModReports() {
	await CheckLogin("mod");

	return <ModReportsComponent />;
}
