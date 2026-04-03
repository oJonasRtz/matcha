import Sidebar from "../components/users/sidebar";
import HallOfFame from "../components/users/hallOfFame";
import ProfileStatusCard from "../components/users/profileStatusCard";
import SearchPreferencesCard from "../components/users/searchPreferencesCard";

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

export default function Dashboard() {
  // ===== STYLES =====
  const mainStyle = "flex min-h-screen items-stretch";
  const sectionStyle = "flex-1 flex flex-wrap gap-6 px-6 py-4";

  // ===== LAYOUT DIVISION =====
  const focus = "flex-[2]"; // takes up 2 parts of the available space
  const rightSide = "flex-[1] flex flex-col gap-6"; // fixed width for desktop, full width for mobile

  return (
    <main className={mainStyle}>
      <Sidebar />
      <section className={sectionStyle}>
        <div className={focus}>
          <SearchPreferencesCard />
        </div>

        <div className={rightSide}>
          <ProfileStatusCard />
          <HallOfFame />
        </div>

      </section>
    </main>
  )
}
