"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import ModRegisterForm from "./register";
import ModSidebar from "./sidebar";
import ModUsersPanel from "./users-panel";

const HARD_CODED_PASSWORD = "123456";

export default function ModUsersShell() {
	const [password, setPassword] = useState("");
	const [isUnlocked, setIsUnlocked] = useState(false);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);

	function handlePasswordSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();

		if (password === HARD_CODED_PASSWORD) {
			setIsUnlocked(true);
			setErrorMessage(null);
			return;
		}

		setErrorMessage("Senha incorreta. Tente novamente.");
	}

	if (!isUnlocked) {
		return (
			<ModSidebar>
				<div className="flex w-full max-w-7xl items-center justify-center py-10">
					<div className="w-full max-w-md space-y-6 rounded-3xl border border-white/10 bg-slate-950/40 p-6 text-white shadow-[0_30px_90px_rgba(2,6,23,0.45)] backdrop-blur-xl">
						<div className="space-y-2">
							<p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-200/70">Protected area</p>
							<h1 className="text-3xl font-semibold tracking-tight">Mod Users</h1>
							<p className="text-sm leading-6 text-white/65">Enter the moderator access password to open the users management page.</p>
						</div>

						{errorMessage ? (
							<div className="rounded-2xl border border-rose-400/25 bg-rose-500/10 px-4 py-3 text-sm text-rose-100">
								{errorMessage}
							</div>
						) : null}

						<form className="space-y-4" onSubmit={handlePasswordSubmit}>
							<label className="block space-y-2">
								<span className="text-sm font-medium text-white/70">Password</span>
								<input
									type="password"
									value={password}
									onChange={(event) => setPassword(event.target.value)}
									placeholder="Enter access password"
									className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white outline-none transition placeholder:text-white/35 focus:border-cyan-400/40 focus:bg-slate-950/80 focus:ring-2 focus:ring-cyan-400/20"
								/>
							</label>

							<p className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-xs leading-5 text-white/55">
								Hardcoded password for now: 123456. Nobody can open this page without it.
							</p>

							<button type="submit" className="w-full rounded-2xl bg-cyan-500 px-4 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400">
								Unlock users panel
							</button>
						</form>
					</div>
				</div>
			</ModSidebar>
		);
	}

	return (
		<ModSidebar>
			<div className="w-full max-w-7xl py-8">
				<div className="mb-6 space-y-2">
					<p className="text-sm font-semibold uppercase tracking-[0.22em] text-blue-200/70">Moderators</p>
					<h1 className="text-3xl font-bold text-white md:text-4xl">Users management</h1>
					<p className="max-w-3xl text-sm leading-6 text-white/60">Use the registration module to add new moderators, including their role, while keeping the current moderator list visible beside it.</p>
				</div>

				<div className="grid gap-6 xl:grid-cols-[420px_minmax(0,1fr)]">
					<ModRegisterForm />
					<ModUsersPanel />
				</div>
			</div>
		</ModSidebar>
	);
}