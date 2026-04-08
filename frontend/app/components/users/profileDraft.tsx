"use client";

import { useMemo, useState, type TouchEvent } from "react";
import { ChevronLeft, ChevronRight, Heart, MessageCircle, ShieldBan, X } from "lucide-react";
import { Card } from "../public/card";

export default function ProfileDraft() {
  const images = useMemo(
    () => [
      "/images/First.jpg",
      "/images/wonderWoman.jpg",
      "/images/veneza.jpg",
      "/images/candle.jpg",
      "/images/tree-analogic.jpg",
    ],
    []
  );

  const [activeIndex, setActiveIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  function goPrev() {
    setActiveIndex((current: number) => (current - 1 + images.length) % images.length);
  }

  function goNext() {
    setActiveIndex((current: number) => (current + 1) % images.length);
  }

  function handleTouchStart(event: TouchEvent<HTMLDivElement>) {
    setTouchStartX(event.changedTouches[0].clientX);
  }

  function handleTouchEnd(event: TouchEvent<HTMLDivElement>) {
    if (touchStartX === null) return;

    const touchEndX = event.changedTouches[0].clientX;
    const deltaX = touchEndX - touchStartX;

    if (deltaX > 45) goPrev();
    if (deltaX < -45) goNext();

    setTouchStartX(null);
  }

  return (
    <div className="w-full min-h-screen p-4 md:p-8">
      <div className="mx-auto max-w-6xl">
        <Card className="p-4 md:p-6">
          <div className="grid gap-6 lg:grid-cols-[1.15fr_1fr]">
            <section className="space-y-4">
              <div
                className="relative overflow-hidden rounded-2xl border border-white/20 bg-black/35"
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
              >
                <img
                  src={images[activeIndex]}
                  alt={`Profile photo ${activeIndex + 1}`}
                  className="h-[420px] w-full object-cover md:h-[560px]"
                />

                <div className="absolute inset-x-0 top-0 flex gap-2 p-3">
                  {images.map((image: string, index: number) => (
                    <button
                      key={image}
                      type="button"
                      onClick={() => setActiveIndex(index)}
                      className={[
                        "h-1.5 flex-1 rounded-full transition",
                        index === activeIndex ? "bg-white" : "bg-white/35",
                      ].join(" ")}
                      aria-label={`Go to photo ${index + 1}`}
                    />
                  ))}
                </div>

                <button
                  type="button"
                  onClick={goPrev}
                  className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full border border-white/35 bg-black/50 p-2 text-white hover:bg-black/70"
                  aria-label="Previous photo"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>

                <button
                  type="button"
                  onClick={goNext}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-white/35 bg-black/50 p-2 text-white hover:bg-black/70"
                  aria-label="Next photo"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </div>

              <div className="grid grid-cols-5 gap-2">
                {images.map((image: string, index: number) => (
                  <button
                    key={`${image}-thumb`}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    className={[
                      "overflow-hidden rounded-xl border transition",
                      index === activeIndex
                        ? "border-pink-400 ring-1 ring-pink-400"
                        : "border-white/20 hover:border-white/40",
                    ].join(" ")}
                  >
                    <img
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      className="h-20 w-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </section>

            <section className="flex flex-col gap-4 rounded-2xl border border-white/20 bg-black/25 p-5 text-white md:p-6">
              <div>
                <h1 className="text-3xl font-bold md:text-4xl">Luna, 27</h1>
                <p className="mt-2 text-sm text-white/70">Recife, Brazil | online now</p>
              </div>

              <p className="text-sm leading-relaxed text-white/90 md:text-base">
                UI designer by day, sunset hunter by weekend. I like museums, street food, and
                people that can make me laugh in three messages or less. Looking for a good
                conversation and maybe something real.
              </p>

              <div className="rounded-xl border border-white/15 bg-white/5 p-4">
                <h2 className="text-sm font-semibold text-white/90">Draft ideas for this section</h2>
                <ul className="mt-2 space-y-1 text-sm text-white/70">
                  <li>- Add interests chips (travel, games, beach, books).</li>
                  <li>- Show compatibility score with current user.</li>
                  <li>- Add mini timeline with recent moments/photos.</li>
                </ul>
              </div>

              <div className="mt-auto grid gap-3 pt-2">
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 rounded-xl bg-pink-500 px-4 py-3 font-semibold text-white transition hover:bg-pink-600"
                >
                  <Heart className="h-5 w-5" />
                  Like
                </button>

                <button
                  type="button"
                  className="flex items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/5 px-4 py-3 font-semibold text-white transition hover:bg-white/10"
                >
                  <X className="h-5 w-5" />
                  Unlike
                </button>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <button
                    type="button"
                    className="flex items-center justify-center gap-2 rounded-xl bg-cyan-500 px-4 py-3 font-semibold text-slate-900 transition hover:bg-cyan-400"
                  >
                    <MessageCircle className="h-5 w-5" />
                    Chat
                  </button>

                  <button
                    type="button"
                    className="flex items-center justify-center gap-2 rounded-xl bg-red-500 px-4 py-3 font-semibold text-white transition hover:bg-red-600"
                  >
                    <ShieldBan className="h-5 w-5" />
                    Block
                  </button>
                </div>
              </div>
            </section>
          </div>
        </Card>
      </div>
    </div>
  );
}
