"use client";

import { useMemo, useState } from "react";
import { Card } from "../public/card";

type MockMod = {
	id: number;
	name: string;
	email: string;
	role: string;
	status: "online" | "offline";
	createdAt: string;
};

const INITIAL_MODS: MockMod[] = [
	{
		id: 1,
		name: "Marina Costa",
		email: "marina@matcha.dev",
		role: "Senior Moderator",
		status: "online",
		createdAt: "Joined 2 days ago",
	},
	{
		id: 2,
		name: "Lucas Ribeiro",
		email: "lucas@matcha.dev",
		role: "Content Moderator",
		status: "online",
		createdAt: "Joined 1 week ago",
	},
	{
		id: 3,
		name: "Sofia Martins",
		email: "sofia@matcha.dev",
		role: "Community Moderator",
		status: "offline",
		createdAt: "Invited yesterday",
	},
];

export default function ModUsersPanel() {
	const [mods, setMods] = useState<MockMod[]>(INITIAL_MODS);

	const onlineCount = useMemo(() => mods.filter((mod: MockMod) => mod.status === "online").length, [mods]);
	const offlineCount = mods.length - onlineCount;

	function handleRemoveMod(id: number) {
		setMods((current: MockMod[]) => current.filter((mod: MockMod) => mod.id !== id));
	}

	return (
		<div className="flex w-full flex-col gap-6 text-white">
			<section className="grid gap-4 md:grid-cols-3">
				<Card className="border-white/15 bg-slate-950/50 md:col-span-2">
					<div className="flex flex-col gap-4">
						<div>
							<p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-200/70">Moderator tools</p>
							<h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Users management</h1>
							<p className="mt-3 max-w-2xl text-sm leading-6 text-white/65">Create a new mod with the register module and manage the active list beside it. This layout stays local and easy to preview before wiring the API.</p>
						</div>
						<div className="grid gap-4 sm:grid-cols-3">
							<div className="min-h-[120px] rounded-3xl border border-white/10 bg-white/5 p-5 shadow-lg shadow-black/10">
								<p className="text-white/50">Total</p>
								<p className="mt-3 text-4xl font-black leading-none">{mods.length}</p>
								<p className="mt-3 text-sm leading-6 text-white/55">Moderators currently listed in the system.</p>
							</div>
							<div className="min-h-[120px] rounded-3xl border border-white/10 bg-white/5 p-5 shadow-lg shadow-black/10">
								<p className="text-white/50">Online</p>
								<p className="mt-3 text-4xl font-black leading-none">{onlineCount}</p>
								<p className="mt-3 text-sm leading-6 text-white/55">Mods available right now.</p>
							</div>
							<div className="min-h-[120px] rounded-3xl border border-white/10 bg-white/5 p-5 shadow-lg shadow-black/10">
								<p className="text-white/50">Offline</p>
								<p className="mt-3 text-4xl font-black leading-none">{offlineCount}</p>
								<p className="mt-3 text-sm leading-6 text-white/55">Mods not currently active.</p>
							</div>
						</div>
					</div>
				</Card>

				<Card className="border-cyan-400/20 bg-cyan-500/10">
					<p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-100/70">Access</p>
					<p className="mt-3 text-2xl font-semibold tracking-tight">Protected by page auth</p>
					<p className="mt-2 text-sm leading-6 text-cyan-50/70">The sidebar and login guard are handled by the page, so the list panel stays focused on moderation data only.</p>
				</Card>
			</section>

			<Card className="border-white/15 bg-slate-950/50">
				<div className="mb-6 flex items-center justify-between gap-3">
					<div>
						<p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-200/70">Remove mods</p>
						<h2 className="mt-2 text-2xl font-semibold">Existing moderators</h2>
					</div>
					<span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-white/60">{mods.length} entries</span>
				</div>

				<div className="space-y-3">
					{mods.map((mod) => (
						<article key={mod.id} className="rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:border-white/20 hover:bg-white/8">
							<div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
								<div>
									<div className="flex flex-wrap items-center gap-2">
										<h3 className="text-lg font-semibold">{mod.name}</h3>
										<span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] ${mod.status === "online" ? "bg-emerald-500/15 text-emerald-200" : "bg-slate-500/15 text-slate-200"}`}>
											{mod.status}
										</span>
									</div>
									<p className="mt-1 text-sm text-white/60">{mod.email}</p>
									<p className="mt-2 text-xs uppercase tracking-[0.22em] text-white/45">{mod.role} · {mod.createdAt}</p>
								</div>

								<button type="button" onClick={() => handleRemoveMod(mod.id)} className="rounded-2xl border border-rose-400/25 bg-rose-500/10 px-4 py-2 text-sm font-semibold text-rose-100 transition hover:bg-rose-500/20">
									Delete
								</button>
							</div>
						</article>
					))}

					{mods.length === 0 ? (
						<div className="rounded-2xl border border-dashed border-white/15 bg-white/5 p-6 text-sm text-white/55">
							No moderators left in the mock list.
						</div>
					) : null}
				</div>
			</Card>
		</div>
	);
}