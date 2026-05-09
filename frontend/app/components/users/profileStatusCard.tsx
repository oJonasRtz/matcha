import Link from "next/link";
import { Camera, Heart, Trophy, Sparkles, Users } from "lucide-react";
import { Card } from "../public/card";

export default function ProfileStatusCard() {
  return (
    <Card>
      <div className="mt-1 flex flex-col items-center">
        <div className="relative mt-2">
          <img
            src="https://cdn.pixabay.com/photo/2024/03/07/10/38/simba-8618301_1280.jpg"
            alt="Profile"
            className="h-36 w-36 rounded-full border-2 border-white/20 object-cover"
          />

          <button
            type="button"
            className="absolute bottom-0 right-0 rounded-full bg-red-500 p-2 text-white transition hover:bg-red-600"
          >
            <Camera className="h-4 w-4" />
          </button>
        </div>

        <h2 className="mt-4 text-xl font-bold text-white">myBeautifulCat</h2>
        <p className="mt-1 font-semibold text-green-400">Online</p>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 xl:grid-cols-4">
        <div className="mt-1 flex flex-col items-center rounded-2xl border border-white/10 bg-white/5 px-3 py-4">
          <Link href="#">
            <Heart className="h-6 w-6 text-pink-400" />
          </Link>
          <span className="mt-2 text-xl font-bold text-white">248</span>
          <span className="mt-1 text-xs text-white/60">Matches</span>
        </div>

        <div className="mt-1 flex flex-col items-center rounded-2xl border border-white/10 bg-white/5 px-3 py-4">
          <Link href="#">
            <Trophy className="h-6 w-6 text-yellow-300" />
          </Link>
          <span className="mt-2 text-xl font-bold text-white">#18</span>
          <span className="mt-1 text-xs text-white/60">Rank</span>
        </div>

        <div className="mt-1 flex flex-col items-center rounded-2xl border border-white/10 bg-white/5 px-3 py-4">
          <Link href="#">
            <Sparkles className="h-6 w-6 text-red-400" />
          </Link>
          <span className="mt-2 text-xl font-bold text-white">913</span>
          <span className="mt-1 text-xs text-white/60">Likes</span>
        </div>

        <div className="mt-1 flex flex-col items-center rounded-2xl border border-white/10 bg-white/5 px-3 py-4">
          <Link href="#">
            <Users className="h-6 w-6 text-cyan-300" />
          </Link>
          <span className="mt-2 text-xl font-bold text-white">453</span>
          <span className="mt-1 text-xs text-white/60">Visitors</span>
        </div>
      </div>
    </Card>
  );
}

