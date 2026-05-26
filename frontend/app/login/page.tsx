import LoginForm from "../components/auth/LoginForm";
import CheckLogin from "../lib/auth";
import { redirect } from "next/navigation";

// export default function Home() {
//   return (
// 	<main className="h-dvh overscroll-none overflow-y-auto min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
// 		style={{ backgroundImage: "url('/images/leaves.jpg')" }}
// 	>
// 		<LoginForm />
// 	</main>
//   );
// }

export const metadata = {
	  title: "Login",
}

export default async function Login() {
	const isLoggedIn = await CheckLogin(0, false);
	if (isLoggedIn)
		redirect("/dashboard");


	return (
		<main className="flex min-h-screen items-center justify-center gap-4">
			<LoginForm />
		</main>
	)
}