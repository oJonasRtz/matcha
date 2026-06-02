"use client";

import { MapPin, User, Globe, Users, UserRound, FileText, ChevronDown } from "lucide-react";
import { Card } from "../public/card";
import { useState, useRef, useEffect } from "react";

export default function SearchPreferencesCard() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!ref.current) return;
      if (!ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  return (
    <div ref={ref} className="mt-4">
      <button type="button" onClick={() => setOpen((v) => !v)} className="w-full">
        <Card className="border-rose-300/20 bg-black/35 transition hover:border-rose-300/35">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-rose-200/75">Matching</p>
              <h2 className="mt-1 text-lg font-bold text-white">Search Preferences</h2>
              <p className="text-sm text-white/60">Click to {open ? "collapse" : "expand"}</p>
            </div>
            <ChevronDown className={`h-6 w-6 text-rose-200 transition-transform ${open ? "rotate-180" : ""}`} />
          </div>
        </Card>
      </button>

      {open ? (
        <Card className="mt-3 border-rose-300/20 bg-black/35">
          <div className="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <button type="button" className="mt-1 flex min-w-0 items-start gap-3 rounded-2xl border border-rose-300/20 bg-rose-500/10 p-4 text-left transition hover:bg-rose-500/20">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-rose-300" />
              <div className="min-w-0">
                <p className="text-sm text-white/60">Location</p>
                <p className="mt-1 truncate text-base font-semibold text-white">Brazil, São Paulo</p>
              </div>
            </button>

            <button type="button" className="mt-1 flex min-w-0 items-start gap-3 rounded-2xl border border-rose-300/20 bg-rose-500/10 p-4 text-left transition hover:bg-rose-500/20">
              <Users className="mt-0.5 h-5 w-5 shrink-0 text-red-300" />
              <div className="min-w-0">
                <p className="text-sm text-white/60">Looking for</p>
                <p className="mt-1 truncate text-base font-semibold text-white">Women</p>
              </div>
            </button>

            <button type="button" className="mt-1 flex min-w-0 items-start gap-3 rounded-2xl border border-rose-300/20 bg-rose-500/10 p-4 text-left transition hover:bg-rose-500/20">
              <UserRound className="mt-0.5 h-5 w-5 shrink-0 text-rose-200" />
              <div className="min-w-0">
                <p className="text-sm text-white/60">Your identity</p>
                <p className="mt-1 truncate text-base font-semibold text-white">Man</p>
              </div>
            </button>

            <button type="button" className="mt-1 flex min-w-0 items-start gap-3 rounded-2xl border border-rose-300/20 bg-rose-500/10 p-4 text-left transition hover:bg-rose-500/20">
              <FileText className="mt-0.5 h-5 w-5 shrink-0 text-red-200" />
              <div className="min-w-0">
                <p className="text-sm text-white/60">Profile description</p>
                <p className="mt-1 truncate text-base font-semibold text-white">View or edit</p>
              </div>
            </button>

            <button type="button" className="mt-1 flex min-w-0 items-start gap-3 rounded-2xl border border-rose-300/20 bg-rose-500/10 p-4 text-left transition hover:bg-rose-500/20">
              <Globe className="mt-0.5 h-5 w-5 shrink-0 text-rose-300" />
              <div className="min-w-0">
                <p className="text-sm text-white/60">Distance range</p>
                <p className="mt-1 truncate text-base font-semibold text-white">0 km to 20 km</p>
              </div>
            </button>

            <button type="button" className="mt-1 flex min-w-0 items-start gap-3 rounded-2xl border border-rose-300/20 bg-rose-500/10 p-4 text-left transition hover:bg-rose-500/20">
              <User className="mt-0.5 h-5 w-5 shrink-0 text-red-300" />
              <div className="min-w-0">
                <p className="text-sm text-white/60">Age range</p>
                <p className="mt-1 truncate text-base font-semibold text-white">18–30</p>
              </div>
            </button>
          </div>

          <button type="button" className="mt-6 flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-rose-500 to-red-500 px-5 py-4 text-base font-bold text-white transition hover:from-rose-400 hover:to-red-400">Let&apos;s go search</button>
        </Card>
      ) : null}
    </div>
  );
}
