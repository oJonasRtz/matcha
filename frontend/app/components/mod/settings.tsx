"use client";

import { CheckCircle2, Mail, ShieldCheck, ShieldX } from "lucide-react";
import { useState } from "react";
import { FloatingLabelInput } from "../input/floatingLabel";
import PasswordInput from "../input/password";
import PasswordStrengthGroup from "../input/passwordStrength";
import { Card } from "../public/card";
import ModSidebar from "./sidebar";

type SettingsTab = "name" | "password";

type TabItem = {
	id: SettingsTab;
	label: string;
};

const mockProfile = {
	username: "mod.alex",
};

const tabItems: TabItem[] = [
	{ id: "name", label: "Change name" },
	{ id: "password", label: "Change password" },
];

export default function ModSettingsComponent() {
	const [activeTab, setActiveTab] = useState<SettingsTab>("name");
	const [verificationStep, setVerificationStep] = useState<"idle" | "code" | "verified">("idle");
	const [emailCode, setEmailCode] = useState("123456");
	const [emailCodeInput, setEmailCodeInput] = useState("");
	const [generatedMessage, setGeneratedMessage] = useState<string | null>(null);
	const [nameForm, setNameForm] = useState({ firstName: "Alex" });
	const [passwordForm, setPasswordForm] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });

	const isVerified = verificationStep === "verified";

	function startVerification() {
		const nextCode = "123456";
		setEmailCode(nextCode);
		setVerificationStep("code");
		setEmailCodeInput("");
		setGeneratedMessage(`A verification code was sent for ${mockProfile.username}. Template code: ${nextCode}`);
	}

	function confirmCode() {
		if (emailCodeInput.trim() === emailCode) {
			setVerificationStep("verified");
			setGeneratedMessage("Account confirmed. Settings are now unlocked.");
			return;
		}

		setGeneratedMessage("Invalid code. Please check the email template code and try again.");
	}

	function resetVerification() {
		setVerificationStep("idle");
		setEmailCodeInput("");
		setGeneratedMessage(null);
	}

	return (
		<ModSidebar>
			<div className="w-full max-w-6xl py-8">
				<div className="mb-6 flex flex-col gap-2">
					<p className="text-sm font-semibold uppercase tracking-[0.22em] text-blue-200/70">Settings</p>
					<h1 className="text-3xl font-bold text-white md:text-4xl">Moderator settings</h1>
					<p className="max-w-3xl text-sm leading-6 text-white/60">
						Manage your moderator account with a confirmation step before changing sensitive data.
					</p>
				</div>

				<div className="grid gap-5 lg:grid-cols-[340px_minmax(0,1fr)]">
					<Card className="flex flex-col gap-4 p-5">
						<div className="rounded-2xl border border-white/10 bg-white/5 p-4">
							<p className="text-xs uppercase tracking-[0.18em] text-white/45">Moderator profile</p>
							<h2 className="mt-2 text-2xl font-bold text-white">@{mockProfile.username}</h2>
							<p className="mt-3 text-sm text-white/55">Moderator account</p>
						</div>

						<div className="rounded-2xl border border-white/10 bg-white/5 p-4">
							<div className="flex items-center gap-2 text-sm font-semibold text-white">
								<ShieldCheck className="h-4 w-4 text-blue-200" />
								Security gate
							</div>
							<p className="mt-2 text-sm leading-6 text-white/60">
								Sensitive settings stay locked until you confirm a code for the moderator account.
							</p>
							<div className="mt-4 flex flex-wrap gap-3">
								<button
									type="button"
									onClick={startVerification}
									className="inline-flex items-center gap-2 rounded-xl border border-blue-400/30 bg-blue-500/15 px-4 py-2 text-sm font-semibold text-blue-100 transition hover:bg-blue-500/25"
								>
									<Mail className="h-4 w-4" />
									Verify account
								</button>
								<button
									type="button"
									onClick={resetVerification}
									className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
								>
									<ShieldX className="h-4 w-4" />
									Lock again
								</button>
							</div>
						</div>
					</Card>

					<Card className="flex min-h-[620px] flex-col gap-5 p-5">
						<div className="flex flex-wrap items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-2">
							{tabItems.map((item) => {
								const isActive = activeTab === item.id;
								const isDisabled = !isVerified;

								return (
									<button
										key={item.id}
										type="button"
										disabled={isDisabled}
										onClick={() => setActiveTab(item.id)}
										className={[
											"rounded-xl px-4 py-2 text-sm font-semibold transition",
											isActive ? "bg-blue-500/20 text-blue-100" : "text-white/65 hover:bg-white/10 hover:text-white",
											isDisabled ? "cursor-not-allowed opacity-50" : "",
										].join(" ")}
									>
										{item.label}
									</button>
								);
							})}
						</div>

						{!isVerified ? (
							<div className="flex flex-1 items-center justify-center rounded-3xl border border-dashed border-white/15 bg-white/5 p-10 text-center">
								<div className="max-w-md">
									<div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/60">
										<Mail className="h-7 w-7" />
									</div>
									<h2 className="mt-4 text-xl font-bold text-white">Account confirmation required</h2>
									<p className="mt-2 text-sm leading-6 text-white/60">
										Click the verification button to receive a code for the moderator account, then enter it here to unlock settings.
									</p>
									{verificationStep === "code" ? (
										<div className="mt-5 rounded-2xl border border-white/10 bg-white/5 p-4 text-left">
											<p className="text-xs uppercase tracking-[0.18em] text-white/45">Verification code</p>
											<p className="mt-2 text-sm text-white/60">Enter the code sent for @{mockProfile.username}.</p>
											<FloatingLabelInput
												label="Email code"
												value={emailCodeInput}
												onChange={(event) => setEmailCodeInput(event.target.value)}
												containerClassName="mt-4"
												className="w-full"
												inputMode="numeric"
											/>
											<button
												type="button"
												onClick={confirmCode}
												className="mt-4 w-full rounded-xl bg-blue-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-600"
											>
												Confirm code
											</button>
										</div>
									) : null}
								</div>
							</div>
						) : activeTab === "name" ? (
							<div className="grid flex-1 gap-5 lg:grid-cols-[1fr_320px]">
								<div className="rounded-3xl border border-white/10 bg-white/5 p-5">
									<h2 className="text-2xl font-bold text-white">Change name</h2>
									<p className="mt-2 text-sm leading-6 text-white/60">
										This section is using templates for now. When the API is ready, connect the form submit to the name update route.
									</p>

									<div className="mt-6 grid gap-4 sm:grid-cols-2">
										<FloatingLabelInput
											label="Username"
											value={nameForm.firstName}
											onChange={(event) => setNameForm((current) => ({ ...current, firstName: event.target.value }))}
											className="w-full"
										/>
											
									</div>

									<div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 bg-slate-950/35 p-4">
										<div>
											<p className="text-sm font-semibold text-white">Preview</p>
											<p className="text-sm text-white/60">@mod.{nameForm.firstName}</p>
										</div>
										<button type="button" className="rounded-xl border border-blue-400/30 bg-blue-500/15 px-4 py-2 text-sm font-semibold text-blue-100 transition hover:bg-blue-500/25">
											Save name template
										</button>
									</div>
								</div>

								<div className="rounded-3xl border border-blue-400/20 bg-blue-500/10 p-5">
									<div className="flex items-center gap-2 text-sm font-semibold text-blue-100">
										<CheckCircle2 className="h-4 w-4" />
										Unblocked
									</div>
									<p className="mt-2 text-sm leading-6 text-blue-50/80">
										The account confirmation is completed, so name and password forms are available.
									</p>
								</div>
							</div>
						) : (
							<div className="grid flex-1 gap-5 lg:grid-cols-[1fr_320px]">
								<div className="rounded-3xl border border-white/10 bg-white/5 p-5">
									<h2 className="text-2xl font-bold text-white">Change password</h2>
									<p className="mt-2 text-sm leading-6 text-white/60">
										This is a template flow until the password update endpoint exists.
									</p>

									<div className="mt-6 grid gap-4">
										<PasswordInput
											label="Current password"
											value={passwordForm.currentPassword}
											onChange={(event) => setPasswordForm((current) => ({ ...current, currentPassword: event.target.value }))}
											className="w-full"
										/>
										<PasswordStrengthGroup
											password={passwordForm.newPassword}
											confirmPassword={passwordForm.confirmPassword}
											onPasswordChange={(event) => setPasswordForm((current) => ({ ...current, newPassword: event.target.value }))}
											onConfirmPasswordChange={(event) => setPasswordForm((current) => ({ ...current, confirmPassword: event.target.value }))}
											passwordLabel="New password"
											confirmLabel="Confirm new password"
										/>
									</div>

									<div className="mt-5 flex justify-end">
										<button type="button" className="rounded-xl border border-blue-400/30 bg-blue-500/15 px-4 py-2 text-sm font-semibold text-blue-100 transition hover:bg-blue-500/25">
											Save password template
										</button>
									</div>
								</div>

								<div className="rounded-3xl border border-white/10 bg-white/5 p-5">
									<div className="flex items-center gap-2 text-sm font-semibold text-white">
										<ShieldCheck className="h-4 w-4 text-blue-200" />
										Protected session
									</div>
									<p className="mt-2 text-sm leading-6 text-white/60">
										Since the account confirmation was completed, password changes are unlocked here.
									</p>
									{generatedMessage ? <p className="mt-4 rounded-2xl border border-white/10 bg-slate-950/35 p-4 text-sm text-white/70">{generatedMessage}</p> : null}
								</div>
							</div>
						)}
					</Card>
				</div>

				{generatedMessage && verificationStep !== "verified" ? (
					<div className="mt-5 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/70">
						{generatedMessage}
					</div>
				) : null}
			</div>
		</ModSidebar>
	);
}