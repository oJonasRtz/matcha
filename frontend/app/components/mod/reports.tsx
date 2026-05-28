"use client";

import { Ban, Clock3, MessageSquareMore, RotateCcw, Search as SearchIcon, ShieldBan, ShieldX, UserRound, X } from "lucide-react";
import { type ReactNode, useMemo, useState, useEffect } from "react";
import SearchInput from "../input/search";
import { Card } from "../public/card";
import ModSidebar from "./sidebar";

type ModUser = {
	name: string;
	username: string;
	avatarUrl: string;
};

type ChatSpeaker = "reporter" | "reported";

type ChatMessage = {
	speaker: ChatSpeaker;
	timestamp: string;
	text: string;
};

type RestrictionType = "timeout" | "temp-ban" | "perma-ban";

type PendingReport = {
	id: number;
	reason: string;
	details: string;
	chatLog: ChatMessage[];
	reportedAt: string;
	reporter: ModUser;
	reported: ModUser;
	moderatorNote?: string;
};

type HandledReport = PendingReport & {
	restriction: RestrictionType | null;
	restrictionReason: string;
	restrictionLabel: string;
	statusLabel: string;
	restrictionExpiresAt: string | null;
	restrictedBy: ModUser | null;
	resolvedAt: string;
	restrictionLifted: boolean;
};

type RestrictionDurationUnit = "minutes" | "hours" | "days";

type RestrictionDurationChoice = {
	mode: "preset" | "manual";
	amount: number | null;
	unit: RestrictionDurationUnit | null;
	label: string;
};

function makeAvatar(name: string, fromColor: string, toColor: string) {
	const initials = name
		.split(" ")
		.filter(Boolean)
		.slice(0, 2)
		.map((part) => part[0]?.toUpperCase() ?? "")
		.join("");

	const svg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" role="img" aria-label="${name}">
  <defs>
    <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${fromColor}" />
      <stop offset="100%" stop-color="${toColor}" />
    </linearGradient>
  </defs>
  <rect width="120" height="120" rx="60" fill="url(#g)" />
  <circle cx="60" cy="48" r="22" fill="rgba(255,255,255,0.22)" />
  <path d="M28 94c6-16 20-24 32-24s26 8 32 24" fill="rgba(255,255,255,0.18)" />
  <text x="60" y="72" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="34" font-weight="700" fill="white">${initials}</text>
</svg>`;
	return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

const pendingSeed: PendingReport[] = [
	{
		id: 1,
		reason: "Aggressive spam in private chat after multiple warnings.",
		details: "Reporter attached screenshots showing repeated unsolicited messages and evasion attempts after block.",
		reportedAt: "2026-05-28 10:15",
		reporter: {
			name: "Luna Martins",
			username: "luna.m",
			avatarUrl: makeAvatar("Luna Martins", "#3b82f6", "#0ea5e9"),
		},
		reported: {
			name: "Victor Azevedo",
			username: "vic.azevedo",
			avatarUrl: makeAvatar("Victor Azevedo", "#1d4ed8", "#0f172a"),
		},
		chatLog: [
			{
				speaker: "reporter",
				timestamp: "10:07",
				text: "I asked you to stop sending these messages yesterday. This is harassment.",
			},
			{
				speaker: "reported",
				timestamp: "10:08",
				text: "Relax. I only wanted to keep talking. You're overreacting.",
			},
			{
				speaker: "reporter",
				timestamp: "10:09",
				text: "You were blocked twice and still created another account to continue.",
			},
		],
	},
	{
		id: 2,
		reason: "Offensive content and repeated abusive language in public chat.",
		details: "Two separate users flagged hate speech terms and explicit harassment in group channel #general.",
		reportedAt: "2026-05-28 09:42",
		reporter: {
			name: "Marcos Silva",
			username: "m.silva",
			avatarUrl: makeAvatar("Marcos Silva", "#2563eb", "#38bdf8"),
		},
		reported: {
			name: "Clara Ribeiro",
			username: "clara.r",
			avatarUrl: makeAvatar("Clara Ribeiro", "#334155", "#3b82f6"),
		},
		chatLog: [
			{
				speaker: "reported",
				timestamp: "09:31",
				text: "Everyone here is clueless. That's why I called them out.",
			},
			{
				speaker: "reporter",
				timestamp: "09:32",
				text: "You kept targeting users with insults after they asked you to stop.",
			},
			{
				speaker: "reported",
				timestamp: "09:33",
				text: "I said what I said. They should toughen up.",
			},
		],
	},
	{
		id: 3,
		reason: "Potential fake account and contact-trading scam attempt.",
		details: "Account requested external payment and shared suspicious links. Behavior matches previous fraud pattern.",
		reportedAt: "2026-05-27 23:10",
		reporter: {
			name: "Ana Costa",
			username: "ana.costa",
			avatarUrl: makeAvatar("Ana Costa", "#0f766e", "#22c55e"),
		},
		reported: {
			name: "Paulo Mendes",
			username: "paulo.m",
			avatarUrl: makeAvatar("Paulo Mendes", "#1e293b", "#64748b"),
		},
		chatLog: [
			{
				speaker: "reporter",
				timestamp: "23:01",
				text: "Why are you asking for payment outside the app before we even met?",
			},
			{
				speaker: "reported",
				timestamp: "23:02",
				text: "It's just a verification fee. Transfer it and I'll send the private link.",
			},
			{
				speaker: "reporter",
				timestamp: "23:03",
				text: "That link is suspicious and I'm reporting this conversation.",
			},
		],
	},
];

const currentModerator: ModUser = {
	name: "Alex Morgan",
	username: "mod.alex",
	avatarUrl: makeAvatar("Alex Morgan", "#7c3aed", "#2563eb"),
};

const handledSeed: HandledReport[] = [
	{
		...pendingSeed[0],
		restriction: "temp-ban",
		restrictionReason: pendingSeed[0].reason,
		restrictionLabel: "Temporary ban for 7 days",
		statusLabel: "Restriction active",
		restrictionExpiresAt: "2026-06-04 10:42",
		restrictedBy: {
			name: "Jordan Lee",
			username: "mod.jordan",
			avatarUrl: makeAvatar("Jordan Lee", "#1d4ed8", "#0ea5e9"),
		},
		resolvedAt: "2026-05-28 10:42",
		restrictionLifted: false,
	},
	{
		...pendingSeed[1],
		restriction: "timeout",
		restrictionReason: pendingSeed[1].reason,
		restrictionLabel: "Timeout for 30 minutes",
		statusLabel: "Restriction active",
		restrictionExpiresAt: "2026-05-28 10:33",
		restrictedBy: {
			name: "Sam Rivera",
			username: "mod.sam",
			avatarUrl: makeAvatar("Sam Rivera", "#2563eb", "#64748b"),
		},
		resolvedAt: "2026-05-28 10:03",
		restrictionLifted: false,
	},
];

const durationTemplates: Record<RestrictionType, RestrictionDurationChoice[]> = {
	timeout: [
		{ mode: "preset", amount: 30, unit: "minutes", label: "30 minutes" },
		{ mode: "preset", amount: 2, unit: "hours", label: "2 hours" },
		{ mode: "preset", amount: 24, unit: "hours", label: "24 hours" },
	],
	"temp-ban": [
		{ mode: "preset", amount: 1, unit: "days", label: "1 day" },
		{ mode: "preset", amount: 7, unit: "days", label: "7 days" },
		{ mode: "preset", amount: 30, unit: "days", label: "30 days" },
	],
	"perma-ban": [{ mode: "preset", amount: null, unit: null, label: "Permanent" }],
};

function restrictionMeta(kind: RestrictionType) {
	if (kind === "timeout") {
		return {
			label: "Timeout",
			icon: Clock3,
			className: "border-amber-400/30 bg-amber-500/10 text-amber-200",
		};
	}

	if (kind === "temp-ban") {
		return {
			label: "Temporary ban",
			icon: ShieldBan,
			className: "border-blue-400/30 bg-blue-500/10 text-blue-200",
		};
	}

	return {
		label: "Permanent ban",
		icon: Ban,
		className: "border-red-400/30 bg-red-500/10 text-red-200",
	};
}

function addDuration(baseDate: Date, amount: number, unit: RestrictionDurationUnit) {
	const msMap: Record<RestrictionDurationUnit, number> = {
		minutes: 60 * 1000,
		hours: 60 * 60 * 1000,
		days: 24 * 60 * 60 * 1000,
	};
	return new Date(baseDate.getTime() + amount * msMap[unit]);
}

function Avatar({ user }: { user: ModUser }) {
	return <img src={user.avatarUrl} alt={user.name} className="h-12 w-12 rounded-full border border-white/15 object-cover shadow-lg shadow-black/30" />;
}

function ReportCard({
	item,
	isSelected,
	onClick,
	showRestriction = false,
	children,
	footer,
}: {
	item: PendingReport | HandledReport;
	isSelected?: boolean;
	onClick?: () => void;
	showRestriction?: boolean;
	children?: ReactNode;
	footer?: ReactNode;
}) {
	const handledItem = item as HandledReport;
	const badge = showRestriction && handledItem.restriction ? restrictionMeta(handledItem.restriction) : null;

	return (
		<button
			type="button"
			onClick={onClick}
			className={[
				"w-full rounded-2xl border p-4 text-left transition duration-200",
				isSelected ? "border-blue-400/40 bg-blue-500/10 shadow-lg shadow-blue-500/10" : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/8",
			].join(" ")}
		>
			<div className="flex items-start gap-3">
				<Avatar user={item.reported} />
				<div className="min-w-0 flex-1">
					<div className="flex items-start justify-between gap-3">
						<div>
							<p className="truncate text-sm font-semibold text-white">{item.reported.name}</p>
							<p className="truncate text-xs text-white/55">@{item.reported.username}</p>
						</div>
						{badge ? (
							<span className={`inline-flex items-center gap-1 rounded-full border px-2 py-1 text-[11px] font-semibold ${badge.className}`}>
								<badge.icon className="h-3.5 w-3.5" />
								{badge.label}
							</span>
						) : null}
					</div>
					<p className="mt-3 line-clamp-3 text-sm leading-6 text-white/78">{item.reason}</p>
					{showRestriction && handledItem.moderatorNote ? (
						<p className="mt-2 text-xs italic text-white/60">Note: {handledItem.moderatorNote}</p>
					) : null}
					<div className="mt-3 flex flex-wrap items-center gap-2 text-[11px] text-white/45">
						<span>{item.reportedAt}</span>
						{showRestriction ? <span>•</span> : null}
						{showRestriction ? <span>{handledItem.restrictionLifted ? "restriction removed" : handledItem.restrictionLabel}</span> : null}
					</div>
					{showRestriction && handledItem.restrictedBy ? (
						<p className="mt-1 text-[11px] font-medium text-blue-200/80">
							Restricted by @{handledItem.restrictedBy.username}
						</p>
					) : null}
					{children}
				</div>
			</div>
			{footer ? <div className="mt-4">{footer}</div> : null}
		</button>
	);
}

export default function ModReportsComponent() {
	const [pendingReports, setPendingReports] = useState<PendingReport[]>(pendingSeed);
	const [handledReports, setHandledReports] = useState<HandledReport[]>(handledSeed);
	const [selectedReportId, setSelectedReportId] = useState<number | null>(pendingSeed[0]?.id ?? null);
	const [centerQuery, setCenterQuery] = useState("");
	const [pendingQuery, setPendingQuery] = useState("");
	const [handledQuery, setHandledQuery] = useState("");
	const [modalRestrictionType, setModalRestrictionType] = useState<RestrictionType | null>(null);
	const [selectedTemplateLabel, setSelectedTemplateLabel] = useState<string | null>(null);
	const [manualAmount, setManualAmount] = useState<number>(1);
	const [manualUnit, setManualUnit] = useState<RestrictionDurationUnit>("hours");

	const searchedReport = useMemo(() => {
		const q = centerQuery.trim();
		if (!q) return null;
		const lq = q.toLowerCase();

		const found = [...pendingReports, ...handledReports].find((item: PendingReport) =>
			[item.reported.name, item.reported.username, item.reporter.name, item.reporter.username]
				.join(" ")
				.toLowerCase()
				.includes(lq),
		);

		if (found) return found;

		// create a temporary pending report when no exact match is found
		return {
			id: -1,
			reason: `Manual restriction for ${q}`,
			details: `Manual restriction target: ${q}`,
			chatLog: [],
			reportedAt: new Date().toLocaleString(),
			reporter: currentModerator,
			reported: { name: q, username: q, avatarUrl: makeAvatar(q, "#334155", "#64748b") },
		} as PendingReport;
	}, [centerQuery, pendingReports, handledReports]);

	const selectedReport = searchedReport ?? pendingReports.find((item: PendingReport) => item.id === selectedReportId) ?? null;

	const filteredPendingReports = useMemo(
		() =>
			pendingReports.filter((item: PendingReport) => {
				const query = pendingQuery.trim().toLowerCase();
				if (!query) return true;
				return [item.reported.name, item.reported.username, item.reporter.name, item.reporter.username, item.reason]
					.join(" ")
					.toLowerCase()
					.includes(query);
			}),
		[pendingQuery, pendingReports],
	);

	const filteredHandledReports = useMemo(
		() =>
			handledReports.filter((item: HandledReport) => {
				const query = handledQuery.trim().toLowerCase();
				if (!query) return true;
				return [
					item.reported.name,
					item.reported.username,
					item.reporter.name,
					item.reporter.username,
					item.reason,
					item.restrictionLabel,
					item.restrictedBy?.name ?? "",
					item.restrictedBy?.username ?? "",
				]
					.join(" ")
					.toLowerCase()
					.includes(query);
			}),
		[handledQuery, handledReports],
	);

	function openRestrictionModal(restriction: RestrictionType) {
		setModalRestrictionType(restriction);
		setSelectedTemplateLabel(durationTemplates[restriction][0]?.label ?? null);
		setManualAmount(restriction === "temp-ban" ? 7 : 1);
		setManualUnit(restriction === "temp-ban" ? "days" : "hours");
	}

	function closeRestrictionModal() {
		setModalRestrictionType(null);
		setSelectedTemplateLabel(null);
	}

	function handleApplyRestriction(restriction: RestrictionType, durationChoice: RestrictionDurationChoice) {
		if (!selectedReport) return;

		const nextSelectedId = pendingReports.find((item: PendingReport) => item.id !== selectedReport.id)?.id ?? null;
		const now = new Date();

		let expiresAt: Date | null = null;
		let label = "Permanent ban";

		if (durationChoice.amount && durationChoice.unit) {
			expiresAt = addDuration(now, durationChoice.amount, durationChoice.unit);
			label = `${restrictionMeta(restriction).label} for ${durationChoice.label.toLowerCase()}`;
		} else if (restriction !== "perma-ban") {
			label = `${restrictionMeta(restriction).label} applied`;
		}

		if (restriction === "perma-ban") {
			label = "Permanent ban";
		}

		setPendingReports((current: PendingReport[]) => current.filter((item: PendingReport) => item.id !== selectedReport.id));
		setHandledReports((current: HandledReport[]) => [
			{
				...selectedReport,
				restriction,
				restrictionReason: selectedReport.reason,
				restrictionLabel: label,
				statusLabel: "Restriction active",
				restrictionExpiresAt: expiresAt
					? expiresAt.toLocaleString("en-US", {
						dateStyle: "medium",
						timeStyle: "short",
					})
					: null,
				restrictedBy: currentModerator,
				resolvedAt: now.toLocaleString("en-US", {
					dateStyle: "short",
					timeStyle: "short",
				}),
				restrictionLifted: false,
			},
			...current,
		]);
		setSelectedReportId(nextSelectedId);
		closeRestrictionModal();
	}

	function handleLiftRestriction(reportId: number) {
		setHandledReports((current: HandledReport[]) =>
			current.map((item: HandledReport) =>
				item.id === reportId
					? {
						...item,
						restriction: null,
						restrictionLabel: "Restriction removed",
						statusLabel: "Restriction removed",
						restrictionExpiresAt: null,
						restrictedBy: currentModerator,
						restrictionLifted: true,
					}
					: item,
			),
		);
	}

	function resolveDurationChoice(): RestrictionDurationChoice | null {
		if (!modalRestrictionType) return null;
		const restrictionType: RestrictionType = modalRestrictionType;

		if (selectedTemplateLabel) {
			const matched = durationTemplates[restrictionType].find((item: RestrictionDurationChoice) => item.label === selectedTemplateLabel);
			if (matched) return matched;
		}

		if (restrictionType === "perma-ban") {
			return { mode: "preset", amount: null, unit: null, label: "Permanent" };
		}

		if (manualAmount > 0) {
			return {
				mode: "manual",
				amount: manualAmount,
				unit: manualUnit,
				label: `${manualAmount} ${manualUnit}`,
			};
		}

		return null;
	}

	const durationChoice = resolveDurationChoice();

	const [moderatorNote, setModeratorNote] = useState("");

	useEffect(() => {
		setModeratorNote(selectedReport?.moderatorNote ?? "");
	}, [selectedReport]);

	function saveModeratorNote() {
		if (!selectedReport) return;

		// If the selected report exists in handledReports, update it there
		if (handledReports.find((r) => r.id === selectedReport.id)) {
			setHandledReports((current) => current.map((r) => (r.id === selectedReport.id ? { ...r, moderatorNote } : r)));
			return;
		}

		// Otherwise update pendingReports if present
		if (pendingReports.find((r) => r.id === selectedReport.id)) {
			setPendingReports((current) => current.map((r) => (r.id === selectedReport.id ? { ...r, moderatorNote } : r)));
			return;
		}

		// For temporary searched items (id === -1) we just update local state; nothing persisted.
	}

	return (
		<ModSidebar>
			<div className="w-full max-w-[1600px] py-8">
				<div className="mb-6 flex flex-col gap-2">
					<p className="text-sm font-semibold uppercase tracking-[0.22em] text-blue-200/70">Reports</p>
					<h1 className="text-3xl font-bold text-white md:text-4xl">Reports and restrictions center</h1>
					<p className="max-w-3xl text-sm leading-6 text-white/60">
						Open reports from the right list, verify reporter and reported users, then apply the appropriate moderation action.
					</p>
				</div>

				<div className="flex flex-wrap items-start gap-5">
					<Card className="flex min-h-0 w-full flex-col gap-4 p-5 lg:h-[72vh] lg:min-h-[620px] lg:max-h-[820px] lg:w-[340px] lg:flex-none">
						<div className="flex items-center justify-between gap-3">
							<div>
								<p className="text-sm font-semibold text-white">Restricted users</p>
								<p className="text-xs text-white/50">Handled reports</p>
							</div>
							<span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-white/60">{filteredHandledReports.length}</span>
						</div>

						<SearchInput
							label="Search restrictions"
							value={handledQuery}
							onChange={(event) => setHandledQuery(event.target.value)}
							containerClassName="w-full"
							className="text-white"
							focusClassName="focus:border-blue-400 focus:ring-2 focus:ring-blue-200/40"
							labelFocusClassName="peer-focus:text-blue-300 peer-not-placeholder-shown:text-blue-300"
						/>

						<div className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto pr-1">
							{filteredHandledReports.length ? (
								filteredHandledReports.map((item) => (
									<ReportCard
										key={item.id}
										item={item}
										showRestriction
										footer={
											<div className="flex items-center gap-3">
												<button
													type="button"
													onClick={() => handleLiftRestriction(item.id)}
													disabled={item.restrictionLifted}
													className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-white transition hover:border-blue-400/30 hover:bg-blue-500/10 disabled:cursor-not-allowed disabled:opacity-50"
												>
													<RotateCcw className="h-4 w-4" />
													{item.restrictionLifted ? "Restriction removed" : "Remove restriction"}
												</button>
												<div className="text-xs text-white/45">
													<p>Handled at {item.resolvedAt}</p>
													<p>By @{item.restrictedBy?.username ?? "unknown-mod"}</p>
												</div>
											</div>
										}
									/>
								))
							) : (
								<div className="rounded-2xl border border-dashed border-white/15 bg-white/5 p-6 text-sm text-white/55">
									No users found for this filter.
								</div>
							)}
						</div>
					</Card>

					<Card className="flex min-h-0 w-full flex-col gap-5 p-5 lg:h-[72vh] lg:min-h-[620px] lg:max-h-[820px] lg:min-w-[420px] lg:flex-1">
						<div className="flex items-center justify-between gap-3">
							<div>
								<p className="text-sm font-semibold text-white">Center panel</p>
								<p className="text-xs text-white/50">Selected report details</p>
							</div>
							<span className="rounded-full border border-blue-400/20 bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-100">{pendingReports.length} pending</span>
						</div>

							<SearchInput
								label="Search any user"
								value={centerQuery}
								onChange={(event) => setCenterQuery(event.target.value)}
								containerClassName="w-full mb-3"
								className="text-white"
								focusClassName="focus:border-blue-400 focus:ring-2 focus:ring-blue-200/40"
								labelFocusClassName="peer-focus:text-blue-300 peer-not-placeholder-shown:text-blue-300"
							/>

						{selectedReport ? (
							<div className="flex min-h-0 flex-1 flex-col gap-5 overflow-y-auto rounded-3xl border border-white/10 bg-slate-950/35 p-5">
								<div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
									<div className="flex items-center gap-4">
										<Avatar user={selectedReport.reported} />
										<div>
											<p className="text-xs uppercase tracking-[0.18em] text-white/45">Reported user</p>
											<h2 className="text-2xl font-bold text-white">{selectedReport.reported.name}</h2>
											<p className="text-sm text-white/60">@{selectedReport.reported.username}</p>
										</div>
									</div>
									<div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-right">
										<p className="text-xs uppercase tracking-[0.18em] text-white/45">Reported at</p>
										<p className="text-sm font-semibold text-white">{selectedReport.reportedAt}</p>
									</div>
								</div>

								<div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
									<div className="rounded-2xl border border-white/10 bg-white/5 p-4">
										<p className="text-xs uppercase tracking-[0.18em] text-white/45">Who reported</p>
										<div className="mt-3 flex items-center gap-3">
											<Avatar user={selectedReport.reporter} />
											<div>
												<p className="font-semibold text-white">{selectedReport.reporter.name}</p>
												<p className="text-sm text-white/55">@{selectedReport.reporter.username}</p>
											</div>
										</div>
									</div>

									<div className="rounded-2xl border border-white/10 bg-white/5 p-4">
										<p className="text-xs uppercase tracking-[0.18em] text-white/45">Reported user</p>
										<div className="mt-3 flex items-center gap-3">
											<Avatar user={selectedReport.reported} />
											<div>
												<p className="font-semibold text-white">{selectedReport.reported.name}</p>
												<p className="text-sm text-white/55">@{selectedReport.reported.username}</p>
											</div>
										</div>
									</div>

									<div className="rounded-2xl border border-white/10 bg-white/5 p-4">
										<p className="text-xs uppercase tracking-[0.18em] text-white/45">Reason (reports.reason)</p>
										<p className="mt-3 text-sm leading-6 text-white/80">{selectedReport.reason}</p>
									</div>
								</div>

								<div className="rounded-2xl border border-white/10 bg-white/5 p-4">
									<p className="text-xs uppercase tracking-[0.18em] text-white/45">Details (reports.details)</p>
									<p className="mt-3 text-sm leading-6 text-white/80">{selectedReport.details}</p>
								</div>

								<div className="rounded-2xl border border-white/10 bg-white/5 p-4">
									<div className="flex items-center gap-2 text-sm font-semibold text-white">
										<MessageSquareMore className="h-4 w-4 text-blue-200" />
										Chat log as proof
									</div>
									<p className="mt-2 text-sm leading-6 text-white/60">
										Fictitious conversation snapshot between the reporter and the reported user for moderation review.
									</p>
									<div className="mt-4 space-y-3">
										{selectedReport.chatLog.map((message, index) => {
											const fromReporter = message.speaker === "reporter";
											const speaker = fromReporter ? selectedReport.reporter : selectedReport.reported;

											return (
												<div key={`${message.timestamp}-${index}`} className={`flex ${fromReporter ? "justify-start" : "justify-end"}`}>
													<div className={`max-w-[82%] rounded-2xl border px-4 py-3 ${fromReporter ? "border-blue-400/20 bg-blue-500/10" : "border-white/10 bg-white/5"}`}>
														<div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/45">
															<span>{fromReporter ? "Reporter" : "Reported"}</span>
															<span>•</span>
															<span>@{speaker.username}</span>
															<span>•</span>
															<span>{message.timestamp}</span>
														</div>
														<p className="mt-2 text-sm leading-6 text-white/85">{message.text}</p>
													</div>
												</div>
											);
										})}
									</div>
								</div>

								<div className="rounded-2xl border border-white/10 bg-white/5 p-4">
									<div className="flex items-start gap-2">
										<div className="flex-1">
											<p className="text-xs uppercase tracking-[0.18em] text-white/45">Moderator note</p>
											<textarea
												value={moderatorNote}
												onChange={(e) => setModeratorNote(e.target.value)}
												rows={4}
												className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-blue-400/40 focus:ring-2 focus:ring-blue-200/20"
											/>
										</div>
										<div className="ml-4 flex flex-col items-end">
											<button
												type="button"
												onClick={() => saveModeratorNote()}
												className="rounded-xl border border-white/10 bg-blue-500 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-600"
											>
												Save note
											</button>
										</div>
									</div>
								</div>

								<div className="mt-auto">
									<p className="mb-3 text-sm font-semibold text-white">Actions</p>
									<div className="grid gap-3 md:grid-cols-3">
										<button
											type="button"
											onClick={() => openRestrictionModal("timeout")}
											className="inline-flex items-center justify-center gap-2 rounded-2xl border border-amber-400/30 bg-amber-500/10 px-4 py-3 text-sm font-semibold text-amber-100 transition hover:bg-amber-500/20"
										>
											<Clock3 className="h-4 w-4" />
											Timeout
										</button>
										<button
											type="button"
											onClick={() => openRestrictionModal("temp-ban")}
											className="inline-flex items-center justify-center gap-2 rounded-2xl border border-blue-400/30 bg-blue-500/10 px-4 py-3 text-sm font-semibold text-blue-100 transition hover:bg-blue-500/20"
										>
											<ShieldBan className="h-4 w-4" />
											Temporary ban
										</button>
										<button
											type="button"
											onClick={() => openRestrictionModal("perma-ban")}
											className="inline-flex items-center justify-center gap-2 rounded-2xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm font-semibold text-red-100 transition hover:bg-red-500/20"
										>
											<ShieldX className="h-4 w-4" />
											Permanent ban
										</button>
									</div>
								</div>
							</div>
						) : (
							<div className="flex min-h-[380px] items-center justify-center rounded-3xl border border-dashed border-white/15 bg-white/5 p-10 text-center lg:h-full lg:min-h-0">
								<div className="max-w-md">
									<div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/60">
										<UserRound className="h-7 w-7" />
									</div>
									<h2 className="mt-4 text-xl font-bold text-white">No report selected</h2>
									<p className="mt-2 text-sm leading-6 text-white/60">Select an item from the right list to review reason, details and participants before taking moderation action.</p>
								</div>
							</div>
						)}
					</Card>

					<Card className="flex min-h-0 w-full flex-col gap-4 p-5 lg:h-[72vh] lg:min-h-[620px] lg:max-h-[820px] lg:w-[400px] lg:flex-none">
						<div className="flex items-center justify-between gap-3">
							<div>
								<p className="text-sm font-semibold text-white">Reports queue</p>
								<p className="text-xs text-white/50">Pending review</p>
							</div>
							<span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-white/60">{filteredPendingReports.length}</span>
						</div>

						<SearchInput
							label="Search reports"
							value={pendingQuery}
							onChange={(event) => setPendingQuery(event.target.value)}
							containerClassName="w-full"
							className="text-white"
							focusClassName="focus:border-blue-400 focus:ring-2 focus:ring-blue-200/40"
							labelFocusClassName="peer-focus:text-blue-300 peer-not-placeholder-shown:text-blue-300"
						/>

						<div className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto pr-1">
							{filteredPendingReports.length ? (
								filteredPendingReports.map((item) => (
									<ReportCard key={item.id} item={item} isSelected={item.id === selectedReportId} onClick={() => setSelectedReportId(item.id)}>
										<div className="mt-3 flex items-center gap-2 text-[11px] text-white/45">
											<span>Reported by @{item.reporter.username}</span>
										</div>
									</ReportCard>
								))
							) : (
								<div className="rounded-2xl border border-dashed border-white/15 bg-white/5 p-6 text-sm text-white/55">
									No reports found for this filter.
								</div>
							)}
						</div>
					</Card>
				</div>
			</div>

			{modalRestrictionType ? (
				<div className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/75 px-4 backdrop-blur-sm">
					<div className="w-full max-w-xl rounded-3xl border border-white/15 bg-slate-950/95 p-6 shadow-2xl shadow-black/40">
						<div className="mb-4 flex items-start justify-between gap-4">
							<div>
								<p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-200/70">Restriction duration</p>
								<h2 className="mt-1 text-2xl font-bold text-white">{restrictionMeta(modalRestrictionType).label}</h2>
								<p className="mt-2 text-sm leading-6 text-white/60">Choose a template duration or set a custom amount manually.</p>
							</div>
							<button
								type="button"
								onClick={closeRestrictionModal}
								className="rounded-xl border border-white/10 bg-white/5 p-2 text-white/70 transition hover:bg-white/10 hover:text-white"
							>
								<X className="h-5 w-5" />
							</button>
						</div>

						<div className="mb-5 grid gap-2 sm:grid-cols-3">
							{durationTemplates[modalRestrictionType].map((template) => (
								<button
									key={template.label}
									type="button"
									onClick={() => setSelectedTemplateLabel(template.label)}
									className={[
										"rounded-xl border px-3 py-2 text-sm font-semibold transition",
										selectedTemplateLabel === template.label
											? "border-blue-400/40 bg-blue-500/15 text-blue-100"
											: "border-white/10 bg-white/5 text-white/75 hover:border-white/20 hover:bg-white/10",
									].join(" ")}
								>
									{template.label}
								</button>
							))}
						</div>

						{modalRestrictionType !== "perma-ban" ? (
							<div className="rounded-2xl border border-white/10 bg-white/5 p-4">
								<p className="text-xs uppercase tracking-[0.16em] text-white/50">Custom duration</p>
								<div className="mt-3 grid gap-3 sm:grid-cols-[1fr_1fr]">
									<input
										type="number"
										min={1}
										value={manualAmount}
										onChange={(event) => {
											setSelectedTemplateLabel(null);
											setManualAmount(Number(event.target.value) || 1);
										}}
										className="w-full rounded-xl border border-white/15 bg-slate-950/70 px-3 py-2 text-sm text-white outline-none transition focus:border-blue-400"
									/>
									<select
										value={manualUnit}
										onChange={(event) => {
											setSelectedTemplateLabel(null);
											setManualUnit(event.target.value as RestrictionDurationUnit);
										}}
										className="w-full rounded-xl border border-white/15 bg-slate-950/70 px-3 py-2 text-sm text-white outline-none transition focus:border-blue-400"
									>
										<option value="minutes">Minutes</option>
										<option value="hours">Hours</option>
										<option value="days">Days</option>
									</select>
								</div>
							</div>
						) : (
							<div className="rounded-2xl border border-white/10 bg-red-500/10 p-4 text-sm text-red-100">
								Permanent restriction has no expiration date and sets users.restriction_expires to null.
							</div>
						)}

						<div className="mt-6 flex items-center justify-end gap-3">
							<button
								type="button"
								onClick={closeRestrictionModal}
								className="rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white/85 transition hover:bg-white/10"
							>
								Cancel
							</button>
							<button
								type="button"
								onClick={() => {
									if (!durationChoice) return;
									handleApplyRestriction(modalRestrictionType, durationChoice);
								}}
								disabled={!durationChoice}
								className="rounded-xl border border-blue-400/30 bg-blue-500/15 px-4 py-2 text-sm font-semibold text-blue-100 transition hover:bg-blue-500/25 disabled:cursor-not-allowed disabled:opacity-50"
							>
								Apply restriction
							</button>
						</div>
					</div>
				</div>
			) : null}
		</ModSidebar>
	);
}