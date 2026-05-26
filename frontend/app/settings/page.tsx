import Sidebar from "../components/users/sidebar";
import CheckLogin from "../lib/auth";

export const metadata = {
	  title: "Settings",
}

export default async function Settings() {
	await CheckLogin();

	return (
		<Sidebar>
			<h1>Hello World</h1>
		</Sidebar>
	)
}