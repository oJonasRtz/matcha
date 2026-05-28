import Sidebar from "../components/users/sidebar";
import ProfileStatusCard from "../components/users/profileStatusCard";
import SearchPreferencesCard from "../components/users/searchPreferencesCard";
import UserProfileEditor from "../components/users/profileEditor";
import CheckLogin from "../lib/auth";

// export default function Home() {
//   return (
//     <main
//       className="h-dvh overscroll-none overflow-y-auto min-h-screen bg-cover bg-center bg-no-repeat"
//       style={{ backgroundImage: "url('/images/realPurple.jpg')" }}
//     >
//       <div className="flex min-h-screen">
//         <Sidebar />

//         <main className="flex-1">
//           <div className="mx-auto flex w-full max-w-[1240px] flex-col gap-6 px-6 py-4">
//             <ProfileStatusCard />
//             <SearchPreferencesCard />
//             <HallOfFame />
//           </div>
//         </main>
//       </div>
//     </main>
//   );
// }

export const metadata = {
  title: "Dashboard",
}

export default async function Dashboard() {
  await CheckLogin();

  const mainStyle = "flex min-h-screen items-stretch bg-[radial-gradient(circle_at_top,rgba(244,63,94,0.18),rgba(15,23,42,0.95)_40%),linear-gradient(180deg,rgba(20,6,18,0.96),rgba(10,2,10,0.98))]";
  const sectionStyle = "flex-1 px-4 py-6 md:px-6 md:py-8";
  const focus = "xl:col-span-8";
  const rightSide = "xl:col-span-4";

  return (
    <main className={mainStyle}>
      <Sidebar>
        <section className={sectionStyle}>
          <div className="mx-auto w-full max-w-[1320px]">
            <div className="mb-6 rounded-3xl border border-rose-300/20 bg-gradient-to-r from-rose-500/20 via-red-500/10 to-transparent p-5 backdrop-blur-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-rose-200/80">Client area</p>
              <h1 className="mt-2 text-3xl font-bold text-white md:text-4xl">My Dashboard</h1>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-rose-100/70">
                Manage your profile, photos and search preferences with a cleaner layout inspired by the moderation pages and adapted to the client palette.
              </p>
            </div>

            <div className="grid gap-6 xl:grid-cols-12">
              <div className={focus}>
                <UserProfileEditor />
              </div>

              <div className={rightSide}>
                <ProfileStatusCard />
                <SearchPreferencesCard />
              </div>
            </div>
          </div>
        </section>
      </Sidebar>
    </main>
  );
}
