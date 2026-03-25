import RegisterForm from "../components/auth/RegisterForm";

export default function Home() {
  return (
	<main className="h-dvh overscroll:none overflow-y-auto flex items-center justify-center bg-cover bg-center bg-no-repeat"
		style={{ backgroundImage: "url('/images/wonderWoman.jpg')" }}
	>
		<RegisterForm />
	</main>
  );
}
