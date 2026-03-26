import Image from "next/image";
import Sidebar from "../components/users/sidebar";
import HallOfFame from "../components/users/hallOfFame";
import ProfileStatusCard from "../components/users/profileStatusCard";

export default function Home() {
  return (
	<main
	      className="relative min-h-screen bg-cover bg-center bg-no-repeat"
	      style={{ backgroundImage: "url('/images/realPurple.jpg')" }}
    	>
	<Sidebar />
	<ProfileStatusCard />
	<HallOfFame />
      	<div className="flex min-h-screen items-center justify-center">
      </div>
    </main>
  );
}
