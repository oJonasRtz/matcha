import Sidebar from "../components/users/sidebar";
import CheckLogin from "../lib/auth";

export const metadata = {
  title: "Discover",
}

export default async function Discover() {
	await CheckLogin();

	return (
		<Sidebar>
			<h1>Hello World</h1>
		</Sidebar>
	)
}