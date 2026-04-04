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

	// ===== STYLES =====
	const headerStyle = "w-full h-16 flex items-center";
	const title = "mt-3 text-3xl font-semibold md:text-4xl";


	// == Buttons ==
	const buttonStyle = "px-4 py-4 rounded-lg transition flex items-center gap-2 hover:cursor-pointer";
	const primaryButton = "bg-pink-500 hover:bg-pink-600 text-white";
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
		<Card className="flex flex-col text-white gap-6 max-h-screen">
			<header className={headerStyle}>
				<div className="flex flex-col gap-1">
					<h1 className={title}>Notifications Center</h1>
					<p className="text-sm text-slate-400">
						See everything that's happened with your account.
					</p>
				</div>

				<div className="ml-auto flex gap-4">
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
			<div className="flex gap-4">
				{filters.map((filter) => (
					<button
						key={filter}
						className={`px-3 py-1 rounded-full text-sm transition hover:cursor-pointer ${
							activeFilter === filter
								? "bg-pink-500 text-white"
								: "bg-white/10 text-white/80 hover:bg-white/20"
						}`}
						onClick={() => setActiveFilter(filter)}
					>
						{filter}
					</button>
				))}
			</div>

			{/*	SHOW NOTIFICATIONS */}
			<main className="flex flex-col gap-4 overflow-y-auto">
				{notifications.map(({id, type, content, time, read}) => (
					<Card className="flex gap-2 items-start relative p-4 hover:border hover:border-white" key={id}>
						{(() => {
							const { badge: Badge, color } = typeColours[type];
							return <Badge className={`${badgeStyle} ${color}`} />;
						})()}

						{/* === CONTENT === */}
						<section className="flex flex-col flex-1 min-w-0">
							<h2 className="text-lg font-semibold">{content}</h2>

							<p className="text-sm text-slate-400 mt-1">
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
							className="text-sm bg-slate-600 hover:bg-slate-500 text-white py-2 px-4 rounded-lg transition hover:shadow-md hover:cursor-pointer"
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
						{!read && <span className="absolute top-2 right-2 h-3 w-3 rounded-full bg-pink-400" />}
					</Card>
				))}
			</main>
		</Card>
	)
}
