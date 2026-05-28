"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronDown, ChevronUp, Flag, Heart, MapPin, MessageCircleMore } from "lucide-react";

import type { UserData } from "./page";

type SwipeSessionProps = {
	users: UserData[];
};

function shortenText(text: string, maxLength: number) {
	if (text.length <= maxLength) {
		return text;
	}

	return `${text.slice(0, maxLength).trimEnd()}...`;
}

export default function SwipeSession({ users }: SwipeSessionProps) {
	const scrollContainerRef = useRef<HTMLDivElement | null>(null);
	const cardRefs = useRef<Array<HTMLElement | null>>([]);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [likedUsers, setLikedUsers] = useState<Record<string, boolean>>({});
	const [reportedUsers, setReportedUsers] = useState<Record<string, boolean>>({});
	const [localUsers, setLocalUsers] = useState<UserData[]>(users);
	const originalUsersRef = useRef<UserData[]>(users);
	const [swipeRegionName, setSwipeRegionName] = useState<string | null>(null);

	useEffect(() => {
		const container = scrollContainerRef.current;

		if (!container) {
			return;
		}

		const observer = new IntersectionObserver(
			(entries) => {
				const visibleEntry = entries
					.filter((entry) => entry.isIntersecting)
					.sort((left, right) => right.intersectionRatio - left.intersectionRatio)[0];

				if (!visibleEntry) {
					return;
				}

				const index = Number(visibleEntry.target.getAttribute("data-index"));
				if (!Number.isNaN(index)) {
					setCurrentIndex(index);
				}
			},
			{
				root: container,
				threshold: [0.45, 0.6, 0.75],
			}
		);

		cardRefs.current.forEach((card) => {
			if (card) {
				observer.observe(card);
			}
		});

		return () => observer.disconnect();
		}, [localUsers]);

	function scrollToIndex(index: number) {
		const nextIndex = Math.min(Math.max(index, 0), users.length - 1);
		cardRefs.current[nextIndex]?.scrollIntoView({ behavior: "smooth", block: "start" });
	}

	function toggleLike(userName: string) {
		setLikedUsers((currentLikes) => ({
			...currentLikes,
			[userName]: !currentLikes[userName],
		}));
	}

	function reportUser(userName: string) {
		setReportedUsers((currentReports) => ({
			...currentReports,
			[userName]: true,
		}));
	}

	const gradients = [
		"from-rose-500/30 via-black/15 to-red-500/25",
		"from-pink-500/30 via-black/15 to-rose-400/25",
		"from-red-500/30 via-black/15 to-orange-400/25",
		"from-fuchsia-500/30 via-black/15 to-rose-500/25",
	];

	useEffect(() => {
		// simulate infinite scrolling by appending more users when near the end
		if (currentIndex >= localUsers.length - 3) {
			const more = originalUsersRef.current.map((u, i) => ({ ...u, name: `${u.name}-${Date.now()}-${i}` }));
			setLocalUsers((cur) => [...cur, ...more]);
		}
	}, [currentIndex, localUsers.length]);

	useEffect(() => {
		// read saved region from localStorage and prioritize users matching it
		try {
			const raw = localStorage.getItem('swipeRegion');
			if (raw) {
				const parsed = JSON.parse(raw);
				const name = parsed.name || parsed.display_name || null;
				if (name) {
					setSwipeRegionName(name);
					setLocalUsers((cur) => {
						// bring users whose location contains the region name to front
						const match = cur.filter((u) => u.location && u.location.toLowerCase().includes(name.toLowerCase()));
						const rest = cur.filter((u) => !u.location || !u.location.toLowerCase().includes(name.toLowerCase()));
						return [...match, ...rest];
					});
				}
			}
		} catch (e) {
			// ignore
		}
	}, []);

	return (
		<main className="relative h-[calc(100vh-5rem)] overflow-hidden px-3 py-3 md:px-6 md:py-6">
			<div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.08),_transparent_42%),linear-gradient(180deg,_rgba(8,8,12,0.82),_rgba(8,8,12,0.96))]" />

			<div className="relative z-10 mx-auto flex h-full w-full max-w-3xl flex-col gap-4">
				<header className="flex items-end justify-between gap-3 px-1 pt-1 text-white">
					<div>
						<p className="text-xs uppercase tracking-[0.35em] text-white/45">Swipe session</p>
						<h1 className="text-2xl font-semibold md:text-3xl">Featured profiles</h1>
					</div>
					<div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70 backdrop-blur">
						{currentIndex + 1} / {users.length}
					</div>
				</header>

				<div ref={scrollContainerRef} className="hide-scrollbar h-full overflow-y-auto snap-y snap-mandatory pb-8 scroll-smooth px-1 md:px-0">
					{localUsers.map((user, index) => {
						const isLiked = Boolean(likedUsers[user.name]);
						const isReported = Boolean(reportedUsers[user.name]);
						const visibleTags = user.tags.slice(0, 4);
						const remainingTags = Math.max(user.tags.length - visibleTags.length, 0);
						const gradient = gradients[index % gradients.length];

						return (
							<section
								key={`${user.name}-${index}`}
								ref={(element: HTMLElement | null) => {
									cardRefs.current[index] = element;
								}}
								data-index={index}
								className="flex min-h-full snap-start items-center justify-center py-2 md:py-4"
							>
								<article className="mx-auto w-full max-w-xl overflow-hidden rounded-[2rem] border border-rose-300/20 bg-white/8 shadow-[0_30px_80px_rgba(244,63,94,0.16)] backdrop-blur-xl md:max-w-[820px] lg:max-w-[920px]">
									<div className={`relative aspect-[4/5] md:aspect-[5/4] overflow-hidden bg-gradient-to-br ${gradient}`}>
										<img
											src={user.images[0]}
											alt={user.name}
											className="h-full w-full object-cover"
										/>
										<div className="absolute inset-0 bg-gradient-to-t from-black/92 via-black/20 to-transparent" />

										<div className="absolute left-4 top-4 rounded-full border border-white/15 bg-black/35 px-3 py-1 text-xs text-white/80 backdrop-blur">
											{user.location}
										</div>

										<div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
											<div className="flex items-start justify-between gap-4">
												<div className="min-w-0 flex-1 text-white">
													<Link
														href="/profile"
														className="block text-3xl font-semibold leading-none tracking-tight transition hover:text-rose-200 md:text-4xl"
													>
														{user.name}
													</Link>
													<p className="mt-2 text-lg font-medium text-white/85">{user.age} years old</p>
													<div className="mt-2 flex items-center gap-2 text-sm text-white/70">
														<MapPin className="h-4 w-4" />
														<span className="truncate">{user.location}</span>
													</div>
												</div>
												<div className="shrink-0 rounded-2xl border border-white/10 bg-black/35 px-3 py-2 text-right text-xs text-white/70 backdrop-blur">
													<p>{user.isOnline ? "Online now" : "Recently seen"}</p>
													<p className="mt-1">{Math.max(1, Math.round((Date.now() - user.lastSeen) / 60000))} min</p>
												</div>
											</div>
										</div>
									</div>

										<div className="space-y-4 p-4 md:p-5">
										<div className="flex flex-wrap gap-2">
											{visibleTags.map((tag) => (
												<span key={tag} className="rounded-full border border-rose-300/20 bg-rose-500/12 px-3 py-1 text-xs text-rose-100/90">
													{tag}
												</span>
											))}
											{remainingTags > 0 && (
												<span className="rounded-full border border-rose-300/20 bg-rose-500/12 px-3 py-1 text-xs text-rose-100/70">
													+{remainingTags}
												</span>
											)}
										</div>

										<p className="max-w-xl text-sm leading-6 text-white/72">
											{shortenText(user.bio, 132)}
										</p>

										<div className="flex flex-wrap items-center gap-3 pt-2">
											<button
												type="button"
												onClick={() => toggleLike(user.name)}
												className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition ${isLiked ? "bg-gradient-to-r from-rose-500 to-red-500 text-white" : "bg-white text-black hover:bg-rose-100"}`}
											>
												<Heart className={`h-4 w-4 ${isLiked ? "fill-current" : ""}`} />
													Like
											</button>

											<button
												type="button"
												onClick={() => reportUser(user.name)}
												className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition ${isReported ? "border-red-400/60 bg-red-500/15 text-red-200" : "border-rose-300/25 bg-rose-500/8 text-white/85 hover:bg-rose-500/18"}`}
											>
												<Flag className="h-4 w-4" />
												{isReported ? "Reported" : "Report"}
											</button>

											{isLiked && (
												<span className="inline-flex items-center gap-2 rounded-full border border-pink-400/30 bg-pink-500/10 px-3 py-2 text-xs text-pink-100">
													<MessageCircleMore className="h-4 w-4" />
													Match saved locally
												</span>
											)}
										</div>
									</div>
								</article>
							</section>
						);
					})}
				</div>
			</div>

			<div className="absolute right-3 top-1/2 z-20 hidden -translate-y-1/2 flex-col gap-3 md:flex">
				<button
					type="button"
					onClick={() => scrollToIndex(currentIndex - 1)}
					disabled={currentIndex === 0}
					className="rounded-full border border-white/10 bg-black/50 p-3 text-white backdrop-blur transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
					aria-label="View previous user"
				>
					<ChevronUp className="h-5 w-5" />
				</button>

				<button
					type="button"
					onClick={() => scrollToIndex(currentIndex + 1)}
					disabled={currentIndex >= users.length - 1}
					className="rounded-full border border-white/10 bg-black/50 p-3 text-white backdrop-blur transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
					aria-label="View next user"
				>
					<ChevronDown className="h-5 w-5" />
				</button>
			</div>
		</main>
	);
}