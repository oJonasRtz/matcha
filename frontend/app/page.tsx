import Image from "next/image";
import StartPage from "./components/public/startPage";

export default function Home() {
  return (
	<main className="h-dvh overscroll:none overflow-y-auto min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/images/flower.png')" }}>
		<StartPage />
	</main>
  );
}
