import Link from "next/link";
import { Camera, Heart, Trophy, Sparkles, Users } from "lucide-react";
import { Card } from "../public/card";

export default function ProfileStatusCard() {
  return (
    <Card className="border-rose-300/20 bg-black/35">
      <div className="mt-1 flex flex-col items-center">
        <div className="relative mt-2">
          <img
            src="https://cdn.pixabay.com/photo/2024/03/07/10/38/simba-8618301_1280.jpg"
            alt="Profile"
            className="h-36 w-36 rounded-full border-2 border-rose-300/30 object-cover shadow-[0_10px_28px_rgba(244,63,94,0.28)]"
          />

          <button
            type="button"
            className="absolute bottom-0 right-0 rounded-full bg-gradient-to-r from-rose-500 to-red-500 p-2 text-white transition hover:from-rose-400 hover:to-red-400"
          >
            <Camera className="h-4 w-4" />
          </button>
        </div>

        <h2 className="mt-4 text-xl font-bold text-white">myBeautifulCat</h2>
        <p className="mt-1 rounded-full border border-emerald-300/30 bg-emerald-500/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-emerald-200">Online</p>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 xl:grid-cols-4">
        <div className="mt-1 flex flex-col items-center rounded-2xl border border-rose-300/20 bg-rose-500/10 px-3 py-4">
          <Link href="#">
            <Heart className="h-6 w-6 text-rose-300" />
          </Link>
          <span className="mt-2 text-xl font-bold text-white">248</span>
          <span className="mt-1 text-xs text-white/60">Matches</span>
        </div>

        <div className="mt-1 flex flex-col items-center rounded-2xl border border-rose-300/20 bg-rose-500/10 px-3 py-4">
          <Link href="#">
            <Trophy className="h-6 w-6 text-amber-300" />
          </Link>
          <span className="mt-2 text-xl font-bold text-white">#18</span>
          <span className="mt-1 text-xs text-white/60">Rank</span>
        </div>

        <div className="mt-1 flex flex-col items-center rounded-2xl border border-rose-300/20 bg-rose-500/10 px-3 py-4">
          <Link href="#">
            <Sparkles className="h-6 w-6 text-red-300" />
          </Link>
          <span className="mt-2 text-xl font-bold text-white">913</span>
          <span className="mt-1 text-xs text-white/60">Likes</span>
        </div>

        <div className="mt-1 flex flex-col items-center rounded-2xl border border-rose-300/20 bg-rose-500/10 px-3 py-4">
          <Link href="#">
            <Users className="h-6 w-6 text-rose-200" />
          </Link>
          <span className="mt-2 text-xl font-bold text-white">453</span>
          <span className="mt-1 text-xs text-white/60">Visitors</span>
        </div>
      </div>
    </Card>
  );
}

