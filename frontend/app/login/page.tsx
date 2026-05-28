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
		<main className="flex min-h-screen items-center justify-center gap-4 bg-[radial-gradient(circle_at_top,rgba(244,63,94,0.18),rgba(15,23,42,0.95)_40%),linear-gradient(180deg,rgba(20,6,18,0.96),rgba(10,2,10,0.98))] px-4 py-8">
			<LoginForm />
		</main>
	)
}