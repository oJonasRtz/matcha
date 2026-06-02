"use client";

import React from "react";
import Notifications from "./notifications";
import Statistics from "./statistics";
import { ThumbsUp, Heart, MessageCircle, UserRoundSearch } from "lucide-react";

export type Notification = {
	id: number;
	type: string;
	content: string;
	time: number;
	read: boolean;
};

export default function NotificationsContainer(
	{
		n,
	}:
	{
		n: Notification[],
	}
) {
	const [notifications, setNotifications] = React.useState(n.sort((a, b) => b.time - a.time)); // sort by time desc
	
	// == TYPES COLORS ==
	const typeColours: Record<string, { color: string; badge: React.ComponentType<React.SVGProps<SVGSVGElement>> }> = {
		like: {
			color: "text-blue-400",
			badge: ThumbsUp
		},
		match: {
			color: "text-pink-400",
			badge: Heart
		},
		message: {
			color: "text-green-400",
			badge: MessageCircle
		},
		visit: {
			color: "text-yellow-400",
			badge: UserRoundSearch
		}
	};
		const sectionStyle = "mx-auto flex w-full max-w-[1320px] flex-1 flex-wrap gap-6 px-4 py-6 md:px-6 md:py-8";

	// ===== LAYOUT DIVISION =====
	const focus = "xl:flex-[2]";
	const rightSide = "xl:flex-[1] flex flex-col gap-6";

	return (
		<main className={sectionStyle}>
			<section className={focus}>
				<Notifications
					notifications={notifications}
					setNotifications={setNotifications}
					typeColours={typeColours}
				/>
			</section>

			<section className={rightSide}>
				<Statistics
					notifications={notifications}
					typeColours={typeColours}
				/>
			</section>
		</main>
	)
}
