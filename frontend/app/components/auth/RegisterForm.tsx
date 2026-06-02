"use client";

import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import { FloatingLabelInput } from "../input/floatingLabel";
import PasswordStrengthGroup, { type PasswordStrengthStatus } from "../input/passwordStrength";
import RadioGroup from "../input/radioGroup";
import { Card } from "../public/card";

type RegisterFormData = {
	email: string;
	username: string;
	firstname: string;
	lastname: string;
	birthday: string;
	password: string;
	confirmPassword: string;
	gender: string;
	sexualOrientation: string;
};

export default function RegisterForm() {
	const router = useRouter();
	const formRef = useRef<HTMLFormElement>(null);
	const [currentStep, setCurrentStep] = useState(0);
	const [formData, setFormData] = useState<RegisterFormData>({
		email: "",
		username: "",
		firstname: "",
		lastname: "",
		birthday: "",
		password: "",
		confirmPassword: "",
		gender: "",
		sexualOrientation: "",
	});
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState<string | null>(null);
	const [acceptedTerms, setAcceptedTerms] = useState(false);
	const [passwordStatus, setPasswordStatus] = useState<PasswordStrengthStatus>({
		isPasswordStrong: false,
		passwordsMatch: false,
		isValid: false,
	});
	const sexualOrientations = [
		{ value: "heterosexual", label: "Heterosexual" },
		{ value: "bisexual", label: "Bisexual" },
		{ value: "homosexual", label: "Homosexual" },
	];
	const steps = ["Profile", "Security", "Details"];

	const postFormLinks = [
		{ label: "Login", action: () => router.push("/login"), className: "font-semibold text-white" },
	];

	const footerLinks = [
		{ label: "Terms of Service", action: () => router.push("/terms") },
		{ label: "Privacy Policy", action: () => router.push("/policy") },
	];

	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

		// Build standardized payload for backend route /user/register
		const payload = {
			username: formData.username,
			password: formData.password,
			email: formData.email,
			firstname: formData.firstname,
			lastname: formData.lastname,
			birthday: formData.birthday,
			gender: formData.gender,
			// optional with default
			sexual_orientation: formData.sexualOrientation || "bisexual",
		};

		// Ensure required fields
		const missing = ["username", "password", "email", "firstname", "lastname", "gender", "birthday"].filter((k) => !payload[k as keyof typeof payload]);
		if (missing.length) {
			setError(`Missing required fields: ${missing.join(", ")}`);
			return;
		}

		// validate birthday >= 18 years
		try {
			const b = new Date(payload.birthday as string);
			const now = new Date();
			const age = now.getFullYear() - b.getFullYear() - (now.getMonth() < b.getMonth() || (now.getMonth() === b.getMonth() && now.getDate() < b.getDate()) ? 1 : 0);
			if (isNaN(age) || age < 18) {
				setError("You must be at least 18 years old to register.");
				return;
			}
		} catch (e) {
			setError("Invalid birthday.");
			return;
		}

		// Use the backend route proxied by Next.js
		fetch(`/api/register`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(payload),
		})
			.then(async (res) => {
				await res.text();

				if (res.ok) {
					setSuccess("Registration successful!");
					setError(null);
					setTimeout(() => router.push("/dashboard"), 500);
				} else {
					setError("Registration failed. Please check your details and try again.");
				}
			})
			.catch((err) => {
				setError("Registration failed. Please try again later.");
			});
	}

	function handleBackStep() {
		setCurrentStep((step: number) => Math.max(step - 1, 0));
	}

	function handleNextStep() {
		if (!formRef.current?.reportValidity()) {
			return;
		}

		// If we're on the security step, enforce strong password before advancing
		if (currentStep === 1) {
			if (!passwordStatus.isPasswordStrong) {
				setError("Please choose a stronger password meeting all requirements.");
				return;
			}
			if (!passwordStatus.passwordsMatch) {
				setError("Passwords do not match!");
				return;
			}
		}

		setCurrentStep((step: number) => Math.min(step + 1, 2));
	}

	function updateField(field: keyof RegisterFormData, value: string) {
		setFormData((current: RegisterFormData) => ({
			...current,
			[field]: value,
		}));
		// clear visual errors while user types
		if (error) setError(null);
		if (success) setSuccess(null);
	}

	function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
		if (!isThirdStep) {
			e.preventDefault();
			return;
		}

		if (!acceptedTerms) {
			e.preventDefault();
			setError("You must accept the Terms of Service and Privacy Policy to register.");
			return;
		}

		handleSubmit(e);
	}

	const isFirstStep = currentStep === 0;
	const isSecondStep = currentStep === 1;
	const isThirdStep = currentStep === 2;

	return (
		<Card className="max-w-md">
			<h1 className="mb-6 text-center text-white text-3xl font-bold">Register</h1>

			{error ? (
				<div className="mb-4 rounded-md bg-red-600/20 border border-red-600 px-4 py-2 text-sm text-red-100">
					{error}
				</div>
			) : null}

			{success ? (
				<div className="mb-4 rounded-md bg-green-600/20 border border-green-600 px-4 py-2 text-sm text-green-100">
					{success}
				</div>
			) : null}

				<div className="mb-6 flex items-center justify-center gap-2 text-xs font-semibold text-white/60">
					{steps.map((step, index) => (
						<div
							key={step}
							className={`rounded-full px-3 py-1 transition ${
								index === currentStep ? "bg-red-500 text-white" : "bg-white/10 text-white/60"
							}`}
						>
							{index + 1}. {step}
						</div>
					))}
				</div>

				<form ref={formRef} onSubmit={handleFormSubmit} className="flex flex-col gap-1.75">
					{isFirstStep ? (
						<>
							<FloatingLabelInput id="email" name="email" type="email" label="Email" value={formData.email} onChange={(event: React.ChangeEvent<HTMLInputElement>) => updateField("email", event.target.value)} className="w-full text-white font-bold" focusClassName="focus:border-red-400 focus:ring-2 focus:ring-red-200/40" labelFocusClassName="peer-focus:text-red-300 peer-not-placeholder-shown:text-red-300" required />
							<FloatingLabelInput id="username" name="username" type="text" label="Username" value={formData.username} onChange={(event: React.ChangeEvent<HTMLInputElement>) => updateField("username", event.target.value)} className="w-full text-gray font-bold" focusClassName="focus:border-red-400 focus:ring-2 focus:ring-red-200/40" labelFocusClassName="peer-focus:text-red-300 peer-not-placeholder-shown:text-red-300" required />
							<FloatingLabelInput id="firstname" name="firstname" type="text" label="Firstname" value={formData.firstname} onChange={(event: React.ChangeEvent<HTMLInputElement>) => updateField("firstname", event.target.value)} className="w-full rounded-xl text-gray font-bold" focusClassName="focus:border-red-400 focus:ring-2 focus:ring-red-200/40" labelFocusClassName="peer-focus:text-red-300 peer-not-placeholder-shown:text-red-300" required />
							<FloatingLabelInput id="lastname" name="lastname" type="text" label="Lastname" value={formData.lastname} onChange={(event: React.ChangeEvent<HTMLInputElement>) => updateField("lastname", event.target.value)} className="w-full rounded-xl font-bold text-gray" focusClassName="focus:border-red-400 focus:ring-2 focus:ring-red-200/40" labelFocusClassName="peer-focus:text-red-300 peer-not-placeholder-shown:text-red-300" required />
							<FloatingLabelInput id="birthday" name="birthday" type="date" label="Birthday" value={formData.birthday} onChange={(event: React.ChangeEvent<HTMLInputElement>) => updateField("birthday", event.target.value)} className="w-full rounded-xl font-bold text-gray" focusClassName="focus:border-red-400 focus:ring-2 focus:ring-red-200/40" labelFocusClassName="peer-focus:text-red-300 peer-not-placeholder-shown:text-red-300" required />
						</>
					) : null}

					{isSecondStep ? (
						<>
							<PasswordStrengthGroup
								password={formData.password}
								confirmPassword={formData.confirmPassword}
								onPasswordChange={(event) => updateField("password", event.target.value)}
								onConfirmPasswordChange={(event) => updateField("confirmPassword", event.target.value)}
								onStatusChange={setPasswordStatus}
							/>
						</>
					) : null}

					{isThirdStep ? (
						<>
							<RadioGroup
								name="gender"
								title="Gender"
								options={[
									{ value: "male", label: "Male" },
									{ value: "female", label: "Female" },
									{ value: "other", label: "Other" },
								]}
								value={formData.gender}
								onChange={(v) => updateField("gender", v)}
								required
								activeClassName={"bg-red-500 text-white"}
								focusRingClassName={"focus-within:ring-2 focus-within:ring-red-200/40"}
								ringClassName={"ring-red-400/60"}
							/>

							<div className="mt-4" />

							<RadioGroup
								name="sexualOrientation"
								title="Sexual Orientation"
								options={sexualOrientations}
								value={formData.sexualOrientation}
								onChange={(v) => updateField("sexualOrientation", v)}
								required
								activeClassName={"bg-red-500 text-white"}
								focusRingClassName={"focus-within:ring-2 focus-within:ring-red-200/40"}
								ringClassName={"ring-red-400/60"}
							/>
						</>
					) : null}

						{isThirdStep && (
							<div className="mt-3 mb-2 flex items-start gap-3">
								<input id="accept" type="checkbox" checked={acceptedTerms} onChange={() => setAcceptedTerms((v) => !v)} className="mt-1 h-4 w-4 rounded" />
								<label htmlFor="accept" className="text-sm text-white/80">
									I accept the <button type="button" onClick={() => router.push('/terms')} className="underline">Terms of Service</button> and <button type="button" onClick={() => router.push('/policy')} className="underline">Privacy Policy</button>.
								</label>
							</div>
						)}

					<div className="mt-2 flex gap-3">
						{!isFirstStep ? (
							<button type="button" onClick={handleBackStep} className="w-full rounded-xl border border-white/20 px-4 py-3 font-semibold text-white transition hover:bg-white/10">
								Back
							</button>
						) : null}

						{isThirdStep ? (
							<button
								type="submit"
								className={`w-full rounded-xl px-4 py-3 font-semibold text-white transition ${
									!formRef.current?.reportValidity() ? "bg-red-300 cursor-not-allowed" : "bg-red-500 hover:bg-red-600"
								}`}
								disabled={!formRef.current?.reportValidity()}
							>
								Submit
							</button>
						) : (
							<button
								type="button"
								onClick={handleNextStep}
								className={`w-full rounded-xl px-4 py-3 font-semibold text-white transition ${
									currentStep === 1 && !passwordStatus.isValid ? "bg-red-300 cursor-not-allowed" : "bg-red-500 hover:bg-red-600"
								}`}
								disabled={currentStep === 1 && !passwordStatus.isValid}
							>
								Next
							</button>
						)}
					</div>
				</form>

			<div className="mt-5 flex flex-col items-center gap-4 text-sm">
				{postFormLinks.map((link) => (
					<button key={link.label} onClick={link.action} className={`${link.className} transition hover:text-red-300 hover:underline`}>
						<strong>{link.label}</strong>
					</button>
				))}
			</div>

			<footer className="mt-4 border-t border-white/20 pt-4">
				<div className="flex justify-center gap-4 text-xs text-white/70">
					{footerLinks.map((link) => (
						<button key={link.label} onClick={link.action} className="transition hover:text-red-300 hover:underline">
							<strong>{link.label}</strong>
						</button>
					))}
				</div>
			</footer>
		</Card>
	);
}
