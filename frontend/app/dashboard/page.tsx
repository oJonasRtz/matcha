import Sidebar from "../components/users/sidebar";
import HallOfFame from "../components/users/hallOfFame";
import ProfileStatusCard from "../components/users/profileStatusCard";
import SearchPreferencesCard from "../components/users/searchPreferencesCard";

export default function Home() {
  return (
    <main
      className="h-dvh overscroll-none overflow-y-auto min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/images/realPurple.jpg')" }}
    >
      <div className="flex min-h-screen items-stretch">
        <Sidebar />

        <section className="flex-1">
          <div className="mx-auto flex w-full max-w-[1240px] flex-col gap-6 px-6 py-4">
            <ProfileStatusCard />
            <SearchPreferencesCard />
            <HallOfFame />
          </div>
        </section>
      </div>
    </main>
  );
}
