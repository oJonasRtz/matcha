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
				<h1 className="text-4xl font-bold">
					{name}, {age}
				</h1>
				<p className="text-sm text-gray-400">
					{location} • {isOnline ? "Online" : `Last seen ${Math.floor((Date.now() - lastSeen) / 60000)} min ago`}
				</p>
			</header>

			{/*	== Bio ==*/}
			<section className="h-full text-lg flex flex-col gap-4 border border-white/20 rounded-xl p-4 bg-white/10">
				<h2 className="text-2xl font-semibold w-full">Bio:</h2>
				{bio}
			</section>

			{/* == Tags == */}
			<section className="mt-auto flex flex-wrap gap-2 border border-white/20 rounded-xl p-4">
				{tags.map((tag, index) => (
					<span key={index} className="rounded-full bg-white/20 px-3 py-1 text-sm">
						#{tag}
					</span>
				))}
			</section>

			{/*	== ACTIONS ==*/}
			<section className="mt-auto flex flex-col gap-2">
				<button
					type="button"
					className="flex-1 bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300"
				>
					Like
				</button>

				<div className="flex flex-1 gap-2">
					<button
						type="button"
						className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300"
					>
						Chat
					</button>
					<button
						type="button"
						className="flex-1 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300"
					>
						Block
					</button>
					<button
						type="button"
						className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300"
					>
						Report
					</button>
				</div>
			</section>
		</Card>
	)
}
