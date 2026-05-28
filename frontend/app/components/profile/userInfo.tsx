"use client";

import { Card } from "../public/card";

export default function UserInfo(
	{ name, age, location, tags, lastSeen, isOnline, bio }:
	{
		name: string,
		age: number,
		location: string,
		tags: string[],
		lastSeen: number,
		isOnline: boolean,
		bio: string
	}
) {
	return (
		<Card className="flex flex-col gap-4 p-4 md:p-6 text-white">
			<header>
				<h1 className="text-3xl md:text-4xl font-bold leading-tight">
					{name}, {age}
				</h1>
				<p className="text-sm text-white/70">
					{location} • {isOnline ? "Online" : `Last seen ${Math.floor((Date.now() - lastSeen) / 60000)} min ago`}
				</p>
			</header>

			{/*	== Bio ==*/}
			<section className="h-full text-base md:text-lg flex flex-col gap-4 border border-white/10 rounded-xl p-4 bg-white/6">
				<h2 className="text-xl md:text-2xl font-semibold w-full">Bio</h2>
				<p className="text-white/80 leading-relaxed">{bio}</p>
			</section>

			{/* == Tags == */}
			<section className="mt-auto flex flex-wrap gap-2 rounded-xl p-2">
				{tags.map((tag, index) => (
					<span key={index} className="rounded-full bg-white/6 border border-white/10 px-3 py-1 text-sm text-white/85">
						#{tag}
					</span>
				))}
			</section>

			{/*	== ACTIONS ==*/}
			<section className="mt-auto flex flex-col gap-2">
				<div className="flex flex-col gap-3 md:flex-row">
					<button
						type="button"
						className="flex-1 bg-gradient-to-r from-rose-500 to-red-500 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300"
					>
						Like
					</button>

					<button
						type="button"
						className="flex-1 bg-white/6 border border-white/10 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-300"
					>
						Chat
					</button>
				</div>

				<div className="flex gap-2">
					<button
						type="button"
						className="flex-1 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300"
					>
						Block
					</button>
					<button
						type="button"
						className="flex-1 bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300"
					>
						Report
					</button>
				</div>
			</section>
		</Card>
	)
}
