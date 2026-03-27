import LoginForm from "../components/auth/LoginForm";

export default function Home() {
  return (
	<main className="h-dvh overscroll-none overflow-y-auto min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
		style={{ backgroundImage: "url('/images/leaves.jpg')" }}
	>
		<LoginForm />
	</main>
  );
}
