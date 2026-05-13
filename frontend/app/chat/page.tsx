import Sidebar from "../components/users/sidebar";
import Chat from "../components/users/chat";

export const metadata = {
  title: "Chat",
}

export default function ChatPage() {
  // ===== STYLES =====
  const mainStyle = "flex h-dvh w-full items-stretch overflow-hidden";
  const sectionStyle = "flex-1 min-w-0 min-h-0 h-full w-full flex gap-6 px-6 py-4 overflow-hidden";
  // ===== LAYOUT DIVISION =====
  const focus = "flex-[2]"; // takes up 2 parts of the available space

  return (
    <main className={mainStyle}>
      <Sidebar>
        <section className={sectionStyle}>
	<div className="flex-1 min-w-0 min-h-0 h-full overflow-hidden">
          <Chat />
	</div>
        </section>
      </Sidebar>
    </main>
  )
}
