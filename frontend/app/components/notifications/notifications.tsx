"use client"

import { useRouter } from "next/navigation";
import { Card } from "../public/card";
import {
	CheckCheck,
	Eraser
}
from "lucide-react";
import React from "react";
import { Notification } from "./notificationsContainer";

export default function Notifications(
	{
		notifications,
		setNotifications,
		typeColours
	}:
	{
		notifications: Notification[],
		setNotifications: React.Dispatch<React.SetStateAction<Notification[]>>,
		typeColours: Record<string, { color: string; badge: React.ComponentType<React.SVGProps<SVGSVGElement>> }>
	}
) {

	const router = useRouter();

	const headerStyle = "w-full min-h-16 flex flex-wrap items-start gap-3 md:items-center";
	const title = "mt-3 text-3xl font-semibold md:text-4xl";


	// == Buttons ==
	const buttonStyle = "px-4 py-4 rounded-lg transition flex items-center gap-2 hover:cursor-pointer";
	const primaryButton = "bg-gradient-to-r from-rose-500 to-red-500 hover:from-rose-400 hover:to-red-400 text-white";
	const outlineButton = "border border-white/20 hover:bg-white/10 text-white";

	const badgeStyle = "h-12 w-12 shrink-0";

	const actions = [
		{ label: "Mark all as read", variant: "primary", badge: CheckCheck, click: markAllAsRead },
		{ label: "Clear all", variant: "outline", badge: Eraser, click: clearNotifications },
	];

	// == Filters (not implemented yet) ==
	const filters = ["All", "Unread", "Likes", "Matches", "Messages", "Visits"];
	const [activeFilter, setActiveFilter] = React.useState("All");

	// ===== HANDLERS =====
	function markAllAsRead() {
		setNotifications((prev) =>
			prev.map((notif) => ({ ...notif, read: true }))
		);
	}

	function clearNotifications() {
		setNotifications([]);
	}

	return (
		<Card className="flex max-h-screen flex-col gap-6 border-rose-300/20 bg-black/35 text-white">
			<header className={headerStyle}>
				<div className="flex flex-col gap-1">
					<p className="text-xs font-semibold uppercase tracking-[0.2em] text-rose-200/75">Notifications</p>
					<h1 className={title}>Notifications Center</h1>
					<p className="text-sm text-white/60">
						See everything that's happened with your account.
					</p>
				</div>

				<div className="ml-auto flex flex-wrap gap-3">
					{actions.map(({ label, variant, badge: Badge, click }) => (
						<button
							key={label}
							className={`${buttonStyle} ${
								variant === "primary"
									? primaryButton
									: outlineButton
							}`}
							onClick={click}
						>
							<Badge className="w-6 h-6 shrink-0" />
							{label}
						</button>
					))}
				</div>
			</header>

			{/*	FILTERS */}
			<div className="flex flex-wrap gap-2">
				{filters.map((filter) => (
					<button
						key={filter}
						className={`px-3 py-1 rounded-full text-sm transition hover:cursor-pointer ${
							activeFilter === filter
								? "bg-gradient-to-r from-rose-500 to-red-500 text-white"
								: "bg-white/10 text-white/80 hover:bg-white/20"
						}`}
						onClick={() => setActiveFilter(filter)}
					>
						{filter}
					</button>
				))}
			</div>

			{/*	SHOW NOTIFICATIONS */}
			<main className="flex flex-col gap-4 overflow-y-auto pr-1">
				{notifications.map(({id, type, content, time, read}) => (
					<Card className="relative flex items-start gap-2 border-white/10 bg-white/5 p-4 transition hover:border-rose-300/35" key={id}>
						{(() => {
							const { badge: Badge, color } = typeColours[type];
							return <Badge className={`${badgeStyle} ${color}`} />;
						})()}

						{/* === CONTENT === */}
						<section className="flex flex-col flex-1 min-w-0">
							<h2 className="text-lg font-semibold">{content}</h2>

							<p className="mt-1 text-sm text-white/50">
								{(() => {
									const diff = Date.now() - time;
									if (diff < 60 * 1000) return "Just now";
									if (diff < 3600 * 1000) return `${Math.floor(diff / (60 * 1000))} minutes ago`;
									if (diff < 24 * 3600 * 1000) return `${Math.floor(diff / (3600 * 1000))} hours ago`;
									return `${Math.floor(diff / (24 * 3600 * 1000))} days ago`;
								})()}
							</p>
						</section>

						{/*	=== ACTIONS === */}
						<button
							className="rounded-lg bg-gradient-to-r from-rose-500 to-red-500 px-4 py-2 text-sm text-white transition hover:from-rose-400 hover:to-red-400 hover:shadow-md"
							onClick={() => {
								const urlMap: Record<string, string> = {
									like: "/profile", // this could be a specific page showing who liked you
									match: "/chat",
									message: "/chat",
									visit: "/profile" // this could be a specific page showing who visited you
								};
								setNotifications((prev) =>
									prev.map((notif) =>
										notif.id === id ? { ...notif, read: true } : notif
									)
								);
								router.push(urlMap[type] || "#");
							}}
						>	
							Open
						</button>

						{/*	=== UNREAD DOT === */}
						{!read && <span className="absolute right-2 top-2 h-3 w-3 rounded-full bg-rose-400" />}
					</Card>
				))}
			</main>
		</Card>
	)
}
