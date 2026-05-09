"use client"

import { Card } from "../public/card"
import React from "react";
import { Notification } from "./notificationsContainer";

export default function Statistics(
	{
		notifications,
		typeColours
	}: {
		notifications: Notification[],
		typeColours: Record<string, { color: string; badge: React.ComponentType<React.SVGProps<SVGSVGElement>> }>
	}
) {

	// ===== STYLES =====
	const title = "text-xl font-bold ";

	return (
		<Card className="text-white flex flex-col gap-4">
			<header>
				<h1 className={title}>Overview</h1>
			</header>

			<main>
				{(() => {
					const total = notifications.length;
					const unread = notifications.filter(n => !n.read).length;
					const typesCount = notifications.reduce((acc, notif) => {
						acc[notif.type] = (acc[notif.type] || 0) + 1;
						return acc;
					}, {} as Record<string, number>);

					return (
						<section className="flex flex-col gap-4">

							<section className="flex gap-4">
								<Card className="flex flex-col gap-4 justify-center items-center flex-1">
									<h3 className="text-lg font-semibold">Total</h3>
									<strong className="text-2xl font-bold">{total}</strong>
								</Card>
								<Card className="flex flex-col gap-4 justify-center items-center flex-1">
									<h3 className="text-lg font-semibold">Unread</h3>
									<strong className="text-2xl font-bold">{unread}</strong>
								</Card>
							</section>
							<div className="flex flex-col gap-2">
								<strong>By Type:</strong>
								<ul className="list-disc list-inside">
									{Object.entries(typesCount).map(([type, count]) => {
										const Badge = typeColours[type].badge;
										const colour = typeColours[type].color;

										return (
											<li key={type} className={`flex items-center gap-2`}>
												<Badge className={`h-4 w-4 ${colour}`} />
												{type.charAt(0).toUpperCase() + type.slice(1)}: {count}
											</li>
										)
									})}
								</ul>
							</div>
						</section>
					);
				})()}
			</main>
		</Card>
	)
}
