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
		<main className="flex min-h-screen items-center justify-center">
			<RegisterForm />
		</main>
	)
}