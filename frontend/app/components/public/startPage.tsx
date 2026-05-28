"use client";

import React, { useEffect, useRef, useState } from "react";

type Tip = { title: string; content: string; note?: string };

const ACCENT_CLASSES = [
	"from-pink-500/20 to-fuchsia-500/10 border-pink-400/20",
	"from-cyan-500/15 to-sky-500/10 border-cyan-300/20",
	"from-amber-500/15 to-orange-500/10 border-amber-300/20",
	"from-violet-500/15 to-purple-500/10 border-violet-300/20",
];

const BADGES = [
	"Emotion",
	"Memories",
	"Attention",
	"Confidence",
	"Humor",
	"Curiosity",
	"Mystery",
	"Attraction",
	"Momentum",
	"Chemistry",
];

function TipCard({ t, i }: { t: Tip; i: number }) {
	const accent = ACCENT_CLASSES[i % ACCENT_CLASSES.length];
	const badge = BADGES[i] ?? "";

	return (
		<article
			className={`
				group relative overflow-hidden rounded-[1.9rem] border bg-gradient-to-br
				${accent}
				p-7 backdrop-blur-md
				transition-all duration-700
				hover:-translate-y-2
				hover:scale-[1.015]
				hover:shadow-[0_35px_120px_rgba(236,72,153,0.16)]
				md:p-9
			`}
		>
			<div className="absolute inset-0 opacity-0 transition duration-700 group-hover:opacity-100">
				<div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-white/10 blur-3xl" />
			</div>

			<div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_55%)] opacity-70" />

			<div className="relative">
				<div className="flex items-center justify-between gap-4">
					<span className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-white/70">
						{badge}
					</span>

					<span className="text-sm font-medium text-white/40">#{String(i + 1).padStart(2, "0")}</span>
				</div>

				<h3 className="mt-5 text-2xl font-black leading-tight md:text-[1.9rem]">{t.title}</h3>

				<p className="mt-4 text-[15px] leading-8 text-white/80 md:text-base">{t.content}</p>

				{t.note ? (
					<div className="mt-5 rounded-2xl border border-white/10 bg-black/20 p-4 text-sm leading-7 text-white/65 backdrop-blur-sm">{t.note}</div>
				) : null}

				<div className="mt-6 flex items-center gap-3 text-[11px] uppercase tracking-[0.28em] text-white/35">
					<div className="h-px w-12 bg-white/15" />
					Keep scrolling
				</div>
			</div>
		</article>
	);
}

function RevealWrapper({ children }: { children: React.ReactNode }) {
	const ref = useRef<HTMLDivElement | null>(null);
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		const el = ref.current;
		if (!el) return;

		const obs = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) setVisible(true);
					else setVisible(false);
				});
			},
			{ threshold: 0.55 }
		);

		obs.observe(el);
		return () => obs.disconnect();
	}, []);

	return (
		<div
			ref={ref}
			className={`transition-all duration-700 ${
				visible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-6 scale-95"
			}`}
		>
			{children}
		</div>
	);
}

export default function StartPage() {
	const tips: Tip[] = [
{
title: "People remember emotional moments, not perfect lines",
content:
"Most conversations become forgettable because they feel too safe. The dates people remember usually have curiosity, tension, laughter or one unexpected moment that felt real.",
note:
"Interesting fact: emotional experiences are remembered far more strongly than factual conversations during first impressions.",
},
{
title: "Questions about memories create stronger chemistry",
content:
"Instead of asking what someone likes, ask about experiences tied to emotion. 'What song reminds you of someone?' works better than 'what music do you listen to?'",
note:
"People become noticeably more engaged when talking about personal memories instead of generic preferences.",
},
{
title: "Tiny details instantly make conversations feel personal",
content:
"Remembering a random thing someone mentioned earlier creates a surprisingly strong sense of attention and attraction. Small details feel intimate.",
note:
"Feeling remembered increases emotional connection and perceived interest.",
},
{
title: "The most attractive people rarely try too hard",
content:
"Relaxed confidence feels safer than performative confidence. Comfortable pauses, calm energy and natural reactions usually feel more magnetic than rehearsed charm.",
note:
"People often associate calm behavior with emotional security and confidence.",
},
{
title: "Humor works best when it feels spontaneous",
content:
"Trying to impress is risky. Shared observations, teasing and light playful energy create better chemistry than forcing jokes every few minutes.",
note:
"Shared laughter quickly increases comfort and social bonding.",
},
{
title: "Curiosity is more attractive than showing off",
content:
"People enjoy conversations where they feel explored, not evaluated. Genuine curiosity almost always creates stronger engagement than trying to look impressive.",
note:
"Active listening consistently increases trust and perceived attractiveness.",
},
{
title: "A little mystery keeps interest alive",
content:
"You don’t need to explain everything immediately. Leaving space for curiosity naturally invites the other person to keep discovering you.",
note:
"Unfinished curiosity creates stronger psychological engagement than complete information.",
},
{
title: "Most attraction decisions happen surprisingly fast",
content:
"People often decide how they feel within the first minutes. Tone, warmth, eye contact and emotional comfort matter more than finding the perfect topic.",
note:
"Studies show first impressions form extremely quickly during early interactions.",
},
{
title: "Good dates feel like momentum, not interviews",
content:
"Endless question-answer cycles create pressure. The best conversations naturally move between stories, reactions, teasing and shared observations.",
note:
"Balanced emotional participation dramatically increases conversational engagement.",
},
{
title: "People are drawn to how conversations make them feel",
content:
"Attraction is rarely just about appearance. Feeling relaxed, understood and emotionally stimulated creates the kind of connection people want to return to.",
note:
"Emotional comfort strongly influences long-term attraction and compatibility.",
},
];


return (
	<section className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-black via-slate-950 to-black px-6 pb-24 pt-24 text-white md:pt-28">
		<div className="pointer-events-none absolute inset-0 overflow-hidden">
			<div className="absolute left-[-8rem] top-[-6rem] h-72 w-72 rounded-full bg-pink-500/15 blur-3xl animate-pulse" />
			<div className="absolute right-[-7rem] top-[12rem] h-80 w-80 rounded-full bg-fuchsia-400/10 blur-3xl animate-pulse" />
			<div className="absolute bottom-[-8rem] left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-white/5 blur-3xl" />
		</div>

		<div className="relative mx-auto flex max-w-7xl flex-col gap-20">
			<section className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
				<div className="space-y-6">
					<div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-white/70 backdrop-blur-md">
						<span className="h-2 w-2 rounded-full bg-pink-500 animate-pulse" />
						Conversations that people actually remember
					</div>

					<h1 className="max-w-5xl text-5xl font-black leading-[0.92] tracking-tight md:text-6xl lg:text-7xl">
						The difference between a forgettable date and one people think about later.
					</h1>

					<p className="max-w-2xl text-lg leading-8 text-white/70 md:text-xl">
						Most attraction happens in the small moments: curiosity, timing, confidence, tension, humor and emotional attention. The details matter more than people think.
					</p>
				</div>

				<div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
					<div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-md transition duration-500 hover:-translate-y-1 hover:border-pink-500/20 hover:bg-white/[0.07]">
						<p className="text-xs uppercase tracking-[0.2em] text-white/40">
							First impressions
						</p>

						<p className="mt-3 text-3xl font-black">
							Minutes matter
						</p>

						<p className="mt-3 text-sm leading-7 text-white/65">
							People usually decide how comfortable and interested they feel surprisingly fast.
						</p>
					</div>

					<div className="rounded-3xl border border-pink-500/20 bg-pink-500/10 p-6 backdrop-blur-md transition duration-500 hover:-translate-y-1 hover:bg-pink-500/15">
						<p className="text-xs uppercase tracking-[0.2em] text-pink-100/60">
							Connection
						</p>

						<p className="mt-3 text-3xl font-black">
							Curiosity wins
						</p>

						<p className="mt-3 text-sm leading-7 text-pink-50/80">
							The most engaging conversations usually feel emotionally alive, not scripted.
						</p>
					</div>

					<div className="rounded-3xl border border-white/10 bg-black/40 p-6 backdrop-blur-md transition duration-500 hover:-translate-y-1 hover:border-fuchsia-500/20">
						<p className="text-xs uppercase tracking-[0.2em] text-white/40">
							Attraction
						</p>

						<p className="mt-3 text-3xl font-black">
							Energy matters
						</p>

						<p className="mt-3 text-sm leading-7 text-white/65">
							People rarely remember exact words. They remember tension, humor and emotional presence.
						</p>
					</div>
				</div>
			</section>

			<section className="relative">
				<div className="absolute left-5 top-0 bottom-0 w-px bg-gradient-to-b from-pink-500/0 via-pink-500/40 to-pink-500/0 md:left-1/2 md:-translate-x-1/2" />

				<div className="space-y-10 md:space-y-0">
					{tips.map((t, i) => {
						const side = i % 2 === 0 ? "left" : "right";
						const isEven = i % 2 === 0;

						return (
							<div
								key={t.title}
								className={
									"group relative min-h-[92vh] scroll-mt-28 md:min-h-[108vh] md:grid md:grid-cols-[minmax(0,1.1fr)_120px_minmax(0,1.45fr)] md:items-center"
								}
							>
								<div className={`flex transition-all duration-700 md:pr-10 ${side === "left" ? "md:justify-end" : ""}`}>
									<div className="flex w-full max-w-2xl items-start gap-4 md:hidden">
										<div className="relative flex flex-col items-center pt-2">
											<div className="z-10 flex h-10 w-10 items-center justify-center rounded-full bg-pink-500 font-bold text-white shadow-lg shadow-pink-500/30">{i + 1}</div>

											<div className="mt-2 h-full w-px bg-white/10" />
										</div>

										<div className="flex-1">
											<RevealWrapper>
												<TipCard t={t} i={i} />
											</RevealWrapper>
										</div>
									</div>

									<div className={`hidden md:block md:sticky md:top-32 transition-all duration-700 group-hover:scale-[1.02] ${side === "left" ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"}`}>
										{side === "left" ? (
											<RevealWrapper>
												<TipCard t={t} i={i} />
											</RevealWrapper>
										) : null}
									</div>
								</div>

								<div className="hidden md:flex md:flex-col md:items-center">
									<div className={`relative flex h-14 w-14 items-center justify-center rounded-full border border-white/10 text-white font-bold transition-all duration-700 ${isEven ? "bg-pink-500/90 shadow-[0_0_40px_rgba(236,72,153,0.35)]" : "bg-fuchsia-500/70 shadow-[0_0_40px_rgba(217,70,239,0.3)]"}`}>
										<div className="absolute inset-0 rounded-full animate-ping bg-pink-500/20" />
										<span className="relative z-10">{i + 1}</span>
									</div>

									<div className="mt-4 h-full w-px bg-gradient-to-b from-pink-500/60 via-white/10 to-white/0" />
								</div>

								<div className={`hidden md:flex md:pl-10 ${side === "right" ? "md:justify-start" : ""}`}>
									<div className={`w-full max-w-[52rem] md:sticky md:top-32 transition-all duration-700 group-hover:scale-[1.02] ${side === "right" ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"}`}>
										{side === "right" ? (
											<RevealWrapper>
												<TipCard t={t} i={i} />
											</RevealWrapper>
										) : null}
									</div>
								</div>
							</div>
						);
					})}
				</div>
			</section>
		</div>
	</section>
);

}
