import { MapPin, User, Globe, Users, UserRound, FileText } from "lucide-react";

export default function SearchPreferencesCard() {
  return (
    <section className="w-full rounded-3xl border border-white/20 bg-black/35 p-6 backdrop-blur-md shadow-[0_0_30px_rgba(255,0,90,0.12)]">
      <div className="mb-5 mt-1">
        <h2 className="text-center text-xl font-bold text-white">
          Search Preferences
        </h2>
      </div>

      <div className="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <button
          type="button"
          className="mt-1 flex min-w-0 items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 text-left transition hover:bg-white/10"
        >
          <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-pink-400" />
          <div className="min-w-0">
            <p className="text-sm text-white/60">Location</p>
            <p className="mt-1 truncate text-base font-semibold text-white">
              Brazil, São Paulo
            </p>
          </div>
        </button>

        <button
          type="button"
          className="mt-1 flex min-w-0 items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 text-left transition hover:bg-white/10"
        >
          <Users className="mt-0.5 h-5 w-5 shrink-0 text-violet-300" />
          <div className="min-w-0">
            <p className="text-sm text-white/60">Looking for</p>
            <p className="mt-1 truncate text-base font-semibold text-white">
              Women
            </p>
          </div>
        </button>

        <button
          type="button"
          className="mt-1 flex min-w-0 items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 text-left transition hover:bg-white/10"
        >
          <UserRound className="mt-0.5 h-5 w-5 shrink-0 text-sky-300" />
          <div className="min-w-0">
            <p className="text-sm text-white/60">Your identity</p>
            <p className="mt-1 truncate text-base font-semibold text-white">
              Man
            </p>
          </div>
        </button>

        <button
          type="button"
          className="mt-1 flex min-w-0 items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 text-left transition hover:bg-white/10"
        >
          <FileText className="mt-0.5 h-5 w-5 shrink-0 text-yellow-300" />
          <div className="min-w-0">
            <p className="text-sm text-white/60">Profile description</p>
            <p className="mt-1 truncate text-base font-semibold text-white">
              View or edit
            </p>
          </div>
        </button>

        <button
          type="button"
          className="mt-1 flex min-w-0 items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 text-left transition hover:bg-white/10"
        >
          <Globe className="mt-0.5 h-5 w-5 shrink-0 text-cyan-300" />
          <div className="min-w-0">
            <p className="text-sm text-white/60">Distance range</p>
            <p className="mt-1 truncate text-base font-semibold text-white">
              0 km to 20 km
            </p>
          </div>
        </button>

        <button
          type="button"
          className="mt-1 flex min-w-0 items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 text-left transition hover:bg-white/10"
        >
          <User className="mt-0.5 h-5 w-5 shrink-0 text-orange-300" />
          <div className="min-w-0">
            <p className="text-sm text-white/60">Age range</p>
            <p className="mt-1 truncate text-base font-semibold text-white">
              18–30
            </p>
          </div>
        </button>
      </div>

      <button
        type="button"
        className="mt-6 flex w-full items-center justify-center rounded-2xl bg-red-500 px-5 py-4 text-base font-bold text-white transition hover:bg-red-600"
      >
        Let&apos;s go search
      </button>
    </section>
  );
}
