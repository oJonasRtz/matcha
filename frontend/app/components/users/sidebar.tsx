import {
  MessageCircle,
  Heart,
  User,
  Settings,
  Bell,
  Globe,
  LogOut
} from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-20 flex-col items-center gap-6 border-r border-white/20 bg-black/30 py-6 backdrop-blur-md">
      <div className="mb-4 text-white text-xl font-bold">
        S
      </div>

	<button className="rounded-2xl p-3 text-white/80 transition hover:bg-white/10 hover:text-pink-400">
		<Heart className="h-6 w-6" />
	</button>

	<button className="rounded-2xl p-3 text-white/80 transition hover:bg-white/10 hover:text-pink-400">
		<MessageCircle className="h-6 w-6" />
	</button>

	<button className="rounded-2xl p-3 text-white/80 transition hover:bg-white/10 hover:text-pink-400">
		<Bell className="h-6 w-6" />
	</button>

	<button className="rounded-2xl p-3 text-white/80 transition hover:bg-white/10 hover:text-pink-400">
		<User className="h-6 w-6" />
	</button>

	<button className="rounded-2xl p-3 text-white/80 transition hover:bg-white/10 hover:text-pink-400">
		<Globe className="h-6 w-6" />
	</button>

	<button className="rounded-2xl p-3 text-white/80 transition hover:bg-white/10 hover:text-pink-400">
        	<Settings className="h-6 w-6" />
      	</button>

      	<button className="mt-auto rounded-2xl p-3 text-white/80 transition hover:bg-white/10 hover:text-pink-400">
        	<LogOut className="h-6 w-6" />
        </button>
    </aside>
  );
}
