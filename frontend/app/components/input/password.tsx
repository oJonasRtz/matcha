"use client";

import { Eye, EyeOff } from "lucide-react";
import React, { useState } from "react";

type PasswordInputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> & {
	label: string;
	containerClassName?: string;
	labelClassName?: string;
	focusClassName?: string;
	labelFocusClassName?: string;
	buttonFocusClassName?: string;
};

export default function PasswordInput({
	label,
	className = "",
	containerClassName = "",
	labelClassName = "",
	focusClassName = "focus:border-blue-400 focus:ring-2 focus:ring-blue-200/40",
	labelFocusClassName = "peer-focus:text-blue-300 peer-not-placeholder-shown:text-blue-300",
	buttonFocusClassName = "focus:ring-blue-200/40",
	id,
	placeholder = " ",
	name,
	...props
}: PasswordInputProps) {
	const [isVisible, setIsVisible] = useState(false);
	const inputId = id ?? name ?? label.toLowerCase().replace(/\s+/g, "-");

	return (
		<div className={`relative ${containerClassName}`.trim()}>
			<input
				id={inputId}
				name={name}
				type={isVisible ? "text" : "password"}
				placeholder={placeholder}
				className={[
					"peer w-full rounded-xl border border-white/20 bg-white/5 px-4 pb-3 pt-6 pr-12 text-sm text-white outline-none transition",
					"placeholder:text-transparent",
					focusClassName,
					"disabled:cursor-not-allowed disabled:opacity-60",
					className,
				].join(" ")}
				{...props}
			/>
			<label
				htmlFor={inputId}
				className={[
					"pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-white/70 transition-all duration-200",
					"peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-white/50",
					"peer-focus:top-2 peer-focus:translate-y-0 peer-focus:text-sm",
					"peer-not-placeholder-shown:top-2 peer-not-placeholder-shown:translate-y-0 peer-not-placeholder-shown:text-sm",
					labelFocusClassName,
					labelClassName,
				].join(" ")}
			>
				{label}
			</label>

			<button
				type="button"
				onClick={() => setIsVisible((current) => !current)}
				onMouseDown={(event) => event.preventDefault()}
				aria-label={isVisible ? "Hide password" : "Show password"}
				aria-pressed={isVisible}
				className={`absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-2 text-white/55 transition hover:bg-white/10 hover:text-white focus:outline-none focus:ring-2 ${buttonFocusClassName}`}
			>
				{isVisible ? <EyeOff size={18} /> : <Eye size={18} />}
			</button>
		</div>
	);
}