"use client";

import React, { useEffect } from "react";
import PasswordInput from "./password";

export type PasswordStrengthStatus = {
	isPasswordStrong: boolean;
	passwordsMatch: boolean;
	isValid: boolean;
};

type PasswordStrengthProps = {
	password: string;
	confirmPassword: string;
	onPasswordChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	onConfirmPasswordChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	passwordLabel?: string;
	confirmLabel?: string;
	title?: string;
	className?: string;
	onStatusChange?: (status: PasswordStrengthStatus) => void;
};

export function isStrongPassword(password: string) {
	if (!password) return false;

	const special = "!@#$%^&*()-_=+[]{}|;:'\",.<>?/";

	return (
		password.length >= 8 &&
		[...password].some((character) => character >= "A" && character <= "Z") &&
		[...password].some((character) => character >= "a" && character <= "z") &&
		[...password].some((character) => character >= "0" && character <= "9") &&
		[...password].some((character) => special.includes(character))
	);
}

export default function PasswordStrengthGroup({
	password,
	confirmPassword,
	onPasswordChange,
	onConfirmPasswordChange,
	passwordLabel = "Password",
	confirmLabel = "Confirm Password",
	title = "Password requirements",
	className = "",
	onStatusChange,
}: PasswordStrengthProps) {
	const isPasswordStrong = isStrongPassword(password);
	const passwordsMatch = password === confirmPassword;
	const isValid = isPasswordStrong && passwordsMatch;

	useEffect(() => {
		onStatusChange?.({ isPasswordStrong, passwordsMatch, isValid });
	}, [isPasswordStrong, passwordsMatch, isValid, onStatusChange]);

	return (
		<div className={`flex flex-col gap-5 ${className}`.trim()}>
			<PasswordInput
				id="password"
				name="password"
				label={passwordLabel}
				value={password}
				onChange={onPasswordChange}
				className="w-full rounded-xl font-bold text-white"
				focusClassName="focus:border-red-400 focus:ring-2 focus:ring-red-200/40"
				labelFocusClassName="peer-focus:text-red-300 peer-not-placeholder-shown:text-red-300"
				buttonFocusClassName="focus:ring-red-200/40"
				required
			/>

			<PasswordInput
				id="confirmPassword"
				name="confirmPassword"
				label={confirmLabel}
				value={confirmPassword}
				onChange={onConfirmPasswordChange}
				className="w-full rounded-xl font-bold text-white"
				focusClassName="focus:border-red-400 focus:ring-2 focus:ring-red-200/40"
				labelFocusClassName="peer-focus:text-red-300 peer-not-placeholder-shown:text-red-300"
				buttonFocusClassName="focus:ring-red-200/40"
				required
			/>

			<div className="rounded-md bg-white/5 p-3 text-sm text-white/80">
				<div className="mb-2 font-semibold">{title}</div>
				<ul className="grid grid-cols-1 gap-1">
					<li className={`${password.length >= 8 ? "text-green-400" : "text-white/60"}`}>
						{password.length >= 8 ? "✔" : "○"} At least 8 characters
					</li>
					<li className={`${/[A-Z]/.test(password) ? "text-green-400" : "text-white/60"}`}>
						{/[A-Z]/.test(password) ? "✔" : "○"} One uppercase letter
					</li>
					<li className={`${/[a-z]/.test(password) ? "text-green-400" : "text-white/60"}`}>
						{/[a-z]/.test(password) ? "✔" : "○"} One lowercase letter
					</li>
					<li className={`${/[0-9]/.test(password) ? "text-green-400" : "text-white/60"}`}>
						{/[0-9]/.test(password) ? "✔" : "○"} One digit
					</li>
					<li className={`${/[!@#$%^&*()\-_=+\[\]{}|;:'",.<>?\/]/.test(password) ? "text-green-400" : "text-white/60"}`}>
						{/[!@#$%^&*()\-_=+\[\]{}|;:'",.<>?\/]/.test(password) ? "✔" : "○"} One special character
					</li>
					<li className={`${passwordsMatch ? "text-green-400" : "text-white/60"}`}>
						{passwordsMatch ? "✔" : "○"} Passwords match
					</li>
				</ul>
			</div>
		</div>
	);
}