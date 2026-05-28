"use client";

import { Activity, BarChart3, CircleDollarSign, Globe2, Heart, LogIn, Users, VenetianMask } from "lucide-react";
import { useMemo } from "react";
import ModSidebar from "./sidebar";

type GenderSlice = {
	label: string;
	value: number;
	count: number;
	color: string;
};

type OrientationSlice = {
	label: string;
	value: number;
	count: number;
	color: string;
};

type WeeklyLoginPoint = {
	day: string;
	count: number;
};

type CountrySlice = {
	label: string;
	count: number;
	color: string;
};

const monitoringTemplate = {
	onlineUsers: 184,
	totalUsers: 1248,
	activeMatches: 632,
	activeChats: 418,
	gender: [
		{ label: "Men", value: 54, count: 673, color: "#60a5fa" },
		{ label: "Women", value: 43, count: 536, color: "#f472b6" },
		{ label: "Other", value: 3, count: 39, color: "#c084fc" },
	] satisfies GenderSlice[],
	orientation: [
		{ label: "Heterosexual", value: 48, count: 599, color: "#22c55e" },
		{ label: "Homossexual", value: 24, count: 299, color: "#38bdf8" },
		{ label: "Bisexual", value: 21, count: 262, color: "#f59e0b" },
		{ label: "Other", value: 7, count: 88, color: "#a78bfa" },
	] satisfies OrientationSlice[],
	weeklyLogins: [
		{ day: "Mon", count: 124 },
		{ day: "Tue", count: 141 },
		{ day: "Wed", count: 118 },
		{ day: "Thu", count: 167 },
		{ day: "Fri", count: 211 },
		{ day: "Sat", count: 188 },
		{ day: "Sun", count: 153 },
	] satisfies WeeklyLoginPoint[],
	countries: [
		{ label: "Brazil", count: 426, color: "#60a5fa" },
		{ label: "United States", count: 238, color: "#22c55e" },
		{ label: "Spain", count: 164, color: "#f59e0b" },
		{ label: "Mexico", count: 121, color: "#f472b6" },
		{ label: "Argentina", count: 93, color: "#a78bfa" },
	] satisfies CountrySlice[],
};

function StatCard({
	title,
	value,
	description,
	icon: Icon,
	accent,
}: {
	title: string;
	value: string;
	description: string;
	icon: typeof Activity;
	accent: string;
}) {
	return (
		<div className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-xl shadow-black/10 backdrop-blur-md">
			<div className="flex items-start justify-between gap-4">
				<div>
					<p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/45">{title}</p>
					<p className="mt-3 text-3xl font-black text-white">{value}</p>
					<p className="mt-2 text-sm leading-6 text-white/60">{description}</p>
				</div>
				<div className={`rounded-2xl border border-white/10 p-3 ${accent}`}>
					<Icon className="h-6 w-6 text-white" />
				</div>
			</div>
		</div>
	);
}

function DonutChart({
	title,
	subtitle,
	data,
}: {
	title: string;
	subtitle: string;
	data: Array<GenderSlice | OrientationSlice>;
}) {
	const gradient = data
		.map((item, index) => {
			const start = data.slice(0, index).reduce((sum, current) => sum + current.value, 0);
			const end = start + item.value;
			return `${item.color} ${start}% ${end}%`;
		})
		.join(", ");

	return (
		<div className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-xl shadow-black/10 backdrop-blur-md">
			<div className="flex items-start justify-between gap-4">
				<div>
					<p className="text-sm font-semibold text-white">{title}</p>
					<p className="mt-1 text-xs text-white/50">{subtitle}</p>
				</div>
				<CircleDollarSign className="h-5 w-5 text-white/35" />
			</div>

			<div className="mt-5 flex flex-col items-center gap-5 lg:flex-row lg:items-center lg:justify-between">
				<div
					className="relative flex h-48 w-48 items-center justify-center rounded-full"
					style={{ background: `conic-gradient(${gradient})` }}
				>
					<div className="flex h-28 w-28 flex-col items-center justify-center rounded-full border border-white/10 bg-slate-950/95 text-center">
						<p className="text-xs uppercase tracking-[0.2em] text-white/45">Total</p>
						<p className="mt-2 text-2xl font-black text-white">{data.reduce((sum, item) => sum + item.count, 0)}</p>
					</div>
				</div>

				<div className="flex w-full flex-1 flex-col gap-3">
					{data.map((item) => (
						<div key={item.label} className="rounded-2xl border border-white/10 bg-slate-950/30 p-3">
							<div className="flex items-center justify-between gap-3">
								<div className="flex items-center gap-3">
									<span className="h-3.5 w-3.5 rounded-full" style={{ backgroundColor: item.color }} />
									<div>
										<p className="text-sm font-semibold text-white">{item.label}</p>
										<p className="text-xs text-white/45">{item.count} users</p>
									</div>
								</div>
								<p className="text-sm font-semibold text-white">{item.value}%</p>
							</div>
							<div className="mt-3 h-2 rounded-full bg-white/8">
								<div className="h-2 rounded-full" style={{ width: `${item.value}%`, backgroundColor: item.color }} />
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

function WeeklyBarChart({ data }: { data: WeeklyLoginPoint[] }) {
	const max = Math.max(...data.map((item) => item.count));

	return (
		<div className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-xl shadow-black/10 backdrop-blur-md">
			<div className="flex items-start justify-between gap-4">
				<div>
					<p className="text-sm font-semibold text-white">Weekly logins</p>
					<p className="mt-1 text-xs text-white/50">Vertical chart showing how many users logged in each day</p>
				</div>
				<BarChart3 className="h-5 w-5 text-white/35" />
			</div>

			<div className="mt-6 flex h-72 items-end gap-3">
				{data.map((item) => {
					const height = Math.max(12, (item.count / max) * 100);

					return (
						<div key={item.day} className="flex flex-1 flex-col items-center gap-3">
							<div className="flex h-56 w-full items-end justify-center rounded-2xl border border-white/8 bg-slate-950/25 p-3">
								<div className="w-full rounded-t-2xl bg-[linear-gradient(180deg,rgba(96,165,250,0.95),rgba(59,130,246,0.25))] shadow-lg shadow-blue-500/25" style={{ height: `${height}%` }} />
							</div>
							<div className="text-center">
								<p className="text-sm font-semibold text-white">{item.count}</p>
								<p className="text-xs uppercase tracking-[0.18em] text-white/45">{item.day}</p>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}

function CountryBarChart({ data }: { data: CountrySlice[] }) {
	const max = Math.max(...data.map((item) => item.count));

	return (
		<div className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-xl shadow-black/10 backdrop-blur-md">
			<div className="flex items-start justify-between gap-4">
				<div>
					<p className="text-sm font-semibold text-white">Users by country</p>
					<p className="mt-1 text-xs text-white/50">Where the current user base is coming from, using mocked distribution data.</p>
				</div>
				<Globe2 className="h-5 w-5 text-white/35" />
			</div>

			<div className="mt-5 space-y-3">
				{data.map((item) => {
					const width = Math.max(12, (item.count / max) * 100);

					return (
						<div key={item.label} className="rounded-2xl border border-white/10 bg-slate-950/30 p-3">
							<div className="flex items-center justify-between gap-3 text-sm">
								<div>
									<p className="font-semibold text-white">{item.label}</p>
									<p className="text-xs text-white/45">{item.count} users</p>
								</div>
								<p className="font-semibold text-white">{Math.round((item.count / data.reduce((sum, current) => sum + current.count, 0)) * 100)}%</p>
							</div>
							<div className="mt-3 h-2 rounded-full bg-white/8">
								<div className="h-2 rounded-full" style={{ width: `${width}%`, backgroundColor: item.color }} />
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default function ModDashboardComponent() {
	const data = useMemo(() => monitoringTemplate, []);
	const onlineRate = Math.round((data.onlineUsers / data.totalUsers) * 100);
	const maleCount = data.gender.find((item) => item.label === "Men")?.count ?? 0;
	const femaleCount = data.gender.find((item) => item.label === "Women")?.count ?? 0;
	const heterosexualCount = data.orientation.find((item) => item.label === "Heterosexual")?.count ?? 0;
	const queerCount = data.orientation
		.filter((item) => item.label !== "Heterosexual")
		.reduce((sum, item) => sum + item.count, 0);

	return (
		<ModSidebar>
			<div className="w-full max-w-[1600px] py-8">
				<div className="mb-6 flex flex-col gap-2">
					<p className="text-sm font-semibold uppercase tracking-[0.22em] text-blue-200/70">Monitoring</p>
					<h1 className="text-3xl font-bold text-white md:text-4xl">Moderator dashboard</h1>
					<p className="max-w-3xl text-sm leading-6 text-white/60">
						Live program status, audience distribution, and weekly login activity in one monitoring center.
					</p>
				</div>

				<div className="grid gap-5 xl:grid-cols-12">
					<div className="grid gap-5 sm:grid-cols-2 xl:col-span-8 xl:grid-cols-2">
						<StatCard
							title="Users online"
							value={`${data.onlineUsers}`}
							description={`${onlineRate}% of the user base is online right now.`}
							icon={Activity}
							accent="bg-blue-500/10"
						/>
						<StatCard
							title="Total matches"
							value={`${data.activeMatches}`}
							description="Current match volume stored in the monitoring template until the matches table is wired to the backend."
							icon={Heart}
							accent="bg-pink-500/10"
						/>
						<StatCard
							title="Chat activity"
							value={`${data.activeChats}`}
							description="Active chats are used as the main signal for real-time engagement monitoring."
							icon={LogIn}
							accent="bg-emerald-500/10"
						/>
						<StatCard
							title="Total users"
							value={`${data.totalUsers}`}
							description="Base population available for profile, orientation, and restriction analytics."
							icon={Users}
							accent="bg-violet-500/10"
						/>
					</div>

					<div className="xl:col-span-4">
						<div className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-xl shadow-black/10 backdrop-blur-md">
							<p className="text-sm font-semibold text-white">Program overview</p>
							<p className="mt-1 text-xs text-white/50">A compact pulse of the current moderation environment.</p>

							<div className="mt-5 grid gap-3">
								<div className="rounded-2xl border border-white/10 bg-slate-950/30 p-4">
									<p className="text-xs uppercase tracking-[0.18em] text-white/45">Online rate</p>
									<div className="mt-3 flex items-end justify-between gap-4">
										<div>
											<p className="text-2xl font-black text-white">{onlineRate}%</p>
											<p className="text-sm text-white/60">Current online share</p>
										</div>
										<div className="h-16 w-16 rounded-full border border-white/10 bg-[conic-gradient(#60a5fa_0deg,#60a5fa_260deg,rgba(255,255,255,0.08)_260deg_360deg)] p-2">
											<div className="flex h-full w-full items-center justify-center rounded-full bg-slate-950/95 text-xs font-semibold text-white/75">
												Live
											</div>
										</div>
									</div>
								</div>

								<div className="rounded-2xl border border-white/10 bg-slate-950/30 p-4">
									<p className="text-xs uppercase tracking-[0.18em] text-white/45">Gender split</p>
									<div className="mt-3 flex items-center justify-between text-sm text-white/70">
										<span>Men: {maleCount}</span>
										<span>Women: {femaleCount}</span>
									</div>
								</div>

								<div className="rounded-2xl border border-white/10 bg-slate-950/30 p-4">
									<p className="text-xs uppercase tracking-[0.18em] text-white/45">Orientation split</p>
									<div className="mt-3 flex items-center justify-between text-sm text-white/70">
										<span>Heterosexual: {heterosexualCount}</span>
										<span>Other: {queerCount}</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="mt-5 grid gap-5 xl:grid-cols-2">
					<DonutChart title="Gender distribution" subtitle="Template-based distribution using users.gender as the source of truth." data={data.gender} />
					<DonutChart title="Orientation distribution" subtitle="Template-based split using users.sexual_orientation and existing profile categories." data={data.orientation} />
				</div>

				<div className="mt-5">
					<CountryBarChart data={data.countries} />
				</div>

				<div className="mt-5">
					<WeeklyBarChart data={data.weeklyLogins} />
				</div>
			</div>
		</ModSidebar>
	);
}