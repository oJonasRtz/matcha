import Sidebar from "../components/users/sidebar";
import Chat from "../components/users/chat";
import CheckLogin from "../lib/auth";

export const metadata = {
  title: "Chat",
}

export default async function ChatPage() {
  await CheckLogin();

  const mainStyle = "flex min-h-screen w-full bg-[radial-gradient(circle_at_top,rgba(244,63,94,0.18),rgba(15,23,42,0.96)_40%),linear-gradient(180deg,rgba(20,6,18,0.98),rgba(10,2,10,0.98))]";
  const sectionStyle = "flex-1 min-w-0 min-h-0 w-full px-4 py-6 md:px-6 md:py-8";

  return (
    <main className={mainStyle}>
      <Sidebar>
        <section className={sectionStyle}>
          <div className="mx-auto h-[calc(100vh-8.5rem)] w-full max-w-[1320px] min-w-0 overflow-hidden">
            <Chat />
	      </div>
        </section>
      </Sidebar>
    </main>
  )
}
