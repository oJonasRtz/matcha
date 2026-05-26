"use client";

import { useRef, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { FloatingLabelInput } from "../input/floatingLabel";
import PasswordStrengthGroup, { type PasswordStrengthStatus } from "../input/passwordStrength";
import { Card } from "../public/card";
import ModSidebar from "./sidebar";

type ModRegisterFormData = {
	username: string;
	email: string;
	password: string;
	confirmPassword: string;
};

export default function ModRegisterForm() {
	const router = useRouter();
	const formRef = useRef<HTMLFormElement>(null);
	const [currentStep, setCurrentStep] = useState(0);
	const [formData, setFormData] = useState<ModRegisterFormData>({
		username: "",
		email: "",
		password: "",
		confirmPassword: "",
	});
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState<string | null>(null);
	const [passwordStatus, setPasswordStatus] = useState<PasswordStrengthStatus>({
		isPasswordStrong: false,
		passwordsMatch: false,
		isValid: false,
	});

	const isFirstStep = currentStep === 0;
	const isSecondStep = currentStep === 1;
	const steps = ["User data", "Password"];

	function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setError(null);
		setSuccess(null);

		const payload = {
			username: formData.username.trim(),
			email: formData.email.trim(),
			password: formData.password,
		};

		fetch("/api/mregister", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(payload),
		})
			.then(async (res) => {
				const text = await res.text();
				let responseData: any = {};

				try {
					responseData = text ? JSON.parse(text) : {};
				} catch {
					responseData = { raw: text };
				}

				return { res, responseData };
			})
			.then(({ res, responseData }) => {
				if (res.ok) {
					setSuccess(responseData?.message || "Moderator registered successfully.");
					setError(null);
					setTimeout(() => router.push("/mod/dashboard"), 500);
					return;
				}

				setError(responseData?.error || "Registration failed. Please check your details and try again.");
				setSuccess(null);
			})
			.catch(() => {
				setError("Registration failed. Please try again later.");
				setSuccess(null);
			});
	}

	function updateField(field: keyof ModRegisterFormData, value: string) {
		setFormData((current: ModRegisterFormData) => ({
			...current,
			[field]: value,
		}));

		if (error) setError(null);
	}

	function handleNextStep() {
		if (!formRef.current?.reportValidity()) {
			return;
		}

		if (isSecondStep) {
			if (!passwordStatus.isValid) {
				setError("Please choose a stronger password and make sure both entries match.");
				return;
			}
			return;
		}

		setCurrentStep(1);
	}

	function handleBackStep() {
		setCurrentStep(0);
		if (error) setError(null);
	}

	function handleFormSubmit(event: FormEvent<HTMLFormElement>) {
		if (!isSecondStep) {
			event.preventDefault();
			return;
		}

		handleSubmit(event);
	}

	return (
		<ModSidebar>
			<Card className="max-w-md text-white">
				<h1 className="mb-4 text-2xl font-bold">Moderator Registration</h1>

				{error ? (
					<div className="mb-4 rounded-md border border-red-600 bg-red-600/20 px-4 py-2 text-sm text-red-100">
						{error}
					</div>
				) : null}

				{success ? (
					<div className="mb-4 rounded-md border border-green-500 bg-green-500/20 px-4 py-2 text-sm text-green-100">
						{success}
					</div>
				) : null}

				<div className="mb-6 flex items-center justify-center gap-2 text-xs font-semibold text-white/60">
					{steps.map((step, index) => (
						<div
							key={step}
							className={`rounded-full px-3 py-1 transition ${index === currentStep ? "bg-blue-500 text-white" : "bg-white/10 text-white/60"}`}
						>
							{index + 1}. {step}
						</div>
					))}
				</div>

				<form ref={formRef} className="flex flex-col gap-4" onSubmit={handleFormSubmit}>
					{isFirstStep ? (
						<>
							<FloatingLabelInput
								type="text"
								name="username"
								id="username"
								label="Username"
								value={formData.username}
								onChange={(event: ChangeEvent<HTMLInputElement>) => updateField("username", event.target.value)}
								className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
								required
							/>

							<FloatingLabelInput
								type="email"
								name="email"
								id="email"
								label="Email"
								value={formData.email}
								onChange={(event: ChangeEvent<HTMLInputElement>) => updateField("email", event.target.value)}
								className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
								required
							/>
						</>
					) : null}

					{isSecondStep ? (
						<PasswordStrengthGroup
							password={formData.password}
							confirmPassword={formData.confirmPassword}
							onPasswordChange={(event) => updateField("password", event.target.value)}
							onConfirmPasswordChange={(event) => updateField("confirmPassword", event.target.value)}
							onStatusChange={setPasswordStatus}
							title="Password must be at least 8 characters long and include uppercase letters, lowercase letters, numbers, and special characters."
							focusClassName="focus:border-blue-400 focus:ring-2 focus:ring-blue-200/40"
							labelFocusClassName="peer-focus:text-blue-300 peer-not-placeholder-shown:text-blue-300"
							buttonFocusClassName="focus:ring-blue-200/40"
						/>
					) : null}

					<div className="mt-2 flex gap-3">
						{!isFirstStep ? (
							<button type="button" onClick={handleBackStep} className="w-full rounded-xl border border-white/20 px-4 py-3 font-semibold text-white transition hover:bg-white/10">
								Back
							</button>
						) : null}

						{isSecondStep ? (
							<button
								type="submit"
								className={`w-full rounded-xl px-4 py-3 font-semibold text-white transition ${!passwordStatus.isValid ? "cursor-not-allowed bg-blue-300" : "bg-blue-500 hover:bg-blue-600"}`}
								disabled={!passwordStatus.isValid}
							>
								Register
							</button>
						) : (
							<button type="button" onClick={handleNextStep} className="w-full rounded-xl bg-blue-500 px-4 py-3 font-semibold text-white transition hover:bg-blue-600">
								Next
							</button>
						)}
					</div>
				</form>
			</Card>
		</ModSidebar>
	)
}
