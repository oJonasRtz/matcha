import Sidebar from "../components/users/sidebar";
import Chat from "../components/users/chat";

export default function Dashboard() {
  // ===== STYLES =====
  const mainStyle = "flex min-h-screen items-stretch";
  const sectionStyle = "flex-1 min-w-0 w-full flex flex-wrap gap-6 px-6 py-4";
  // ===== LAYOUT DIVISION =====
  const focus = "flex-[2]"; // takes up 2 parts of the available space

  return (
    <main className={mainStyle}>
      <Sidebar />
      <section className={sectionStyle}>
	<Chat />
      </section>
    </main>
  )
}
