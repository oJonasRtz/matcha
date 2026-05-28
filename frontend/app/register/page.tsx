import RegisterForm from "../components/auth/RegisterForm";

// export default function Home() {
//   return (
// 	<main className="h-dvh overscroll-none overflow-y-auto flex items-center justify-center bg-cover bg-center bg-no-repeat"
// 		style={{ backgroundImage: "url('/images/wonderWoman.jpg')" }}
// 	>
// 		<RegisterForm />
// 	</main>
//   );
// }

export const metadata = {
	  title: "Register",
}

export default function Register() {
	return (
		<main className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,rgba(244,63,94,0.18),rgba(15,23,42,0.95)_40%),linear-gradient(180deg,rgba(20,6,18,0.96),rgba(10,2,10,0.98))] px-4 py-8">
			<RegisterForm />
		</main>
	)
}