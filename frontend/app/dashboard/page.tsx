import Image from "next/image";
import Header from "./components/public/header";
import StartPage from "./components/public/startPage";

export default function Home() {
  return (
	<main
	      className="relative min-h-screen bg-cover bg-center bg-no-repeat"
	      style={{ backgroundImage: "url('/images/tree-analogic.jpg')" }}
    	>
      	<Header />

      	<div className="flex min-h-screen items-center justify-center">
       	 <StartPage />
      </div>
    </main>
  );
}
