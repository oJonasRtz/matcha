import CheckLogin from "@/app/lib/auth"
import ModUsersShell from "../../components/mod/users-shell"

export const metadata = {
	title: "Users"
};

export default async function ModUsers() {
	await CheckLogin("mod");

	return <ModUsersShell />
}