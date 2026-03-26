import { Camera, Heart, Trophy, Sparkles } from "lucide-react";

export default function ProfileStatusCard() {
  return (
    <section className="fixed left-20 top-0 z-20 w-[720px] border border-white/20 bg-black/35 p-5 backdrop-blur-md shadow-[0_0_30px_rgba(255,0,90,0.12)]">
      <div className="flex flex-col items-center">
        <div className="relative">
          <img
            src="https://cdn.pixabay.com/photo/2024/03/07/10/38/simba-8618301_1280.jpg"
            alt="Profile"
            className="h-50 w-50 rounded-full border-2 border-white/20 object-cover"
          />

          <button
            type="button"
            className="absolute bottom-0 right-0 rounded-full bg-red-500 p-2 text-white transition hover:bg-red-600"
          >
            <Camera className="h-4 w-4" />
          </button>
        </div>

        <h2 className="mt-4 text-xl font-bold text-white">myBeautifulCat</h2>
        <p className="font-bold text-green/30">Online</p>
      </div>

      <div className="mt-6 flex items-center justify-between gap-3">
        <div className="flex flex-1 flex-col items-center rounded-2xl border border-white/10 bg-white/5 px-3 py-4">
          <Heart className="h-5 w-5 text-pink-400" />
          <span className="mt-2 text-xl font-bold text-white">248</span>
          <span className="text-xs text-white/60">Matches</span>
        </div>

        <div className="flex flex-1 flex-col items-center rounded-2xl border border-white/10 bg-white/5 px-3 py-4">
          <Trophy className="h-5 w-5 text-yellow-300" />
          <span className="mt-2 text-xl font-bold text-white">#18</span>
          <span className="text-xs text-white/60">Rank</span>
        </div>

        <div className="flex flex-1 flex-col items-center rounded-2xl border border-white/10 bg-white/5 px-3 py-4">
          <Sparkles className="h-5 w-5 text-red-400" />
          <span className="mt-2 text-xl font-bold text-white">913</span>
          <span className="text-xs text-white/60">Likes</span>
        </div>
      </div>

    </section>
  );
}
