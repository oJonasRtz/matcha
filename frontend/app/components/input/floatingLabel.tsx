import React from "react";

type FloatingLabelInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
	label: string;
	containerClassName?: string;
	labelClassName?: string;
	focusClassName?: string;
	labelFocusClassName?: string;
};

export function FloatingLabelInput({
	label,
	className = "",
	containerClassName = "",
	labelClassName = "",
	focusClassName = "focus:border-blue-400 focus:ring-2 focus:ring-blue-200/40",
	labelFocusClassName = "peer-focus:text-blue-300 peer-not-placeholder-shown:text-blue-300",
	id,
	type = "text",
	placeholder = " ",
	...props
}: FloatingLabelInputProps) {
	const inputId = id ?? props.name ?? label.toLowerCase().replace(/\s+/g, "-");

	return (
		<div className={`relative ${containerClassName}`.trim()}>
			<input
				id={inputId}
				type={type}
				placeholder={placeholder}
				className={[
					"peer w-full rounded-xl border border-white/20 bg-white/5 px-4 pb-3 pt-6 text-sm text-white outline-none transition",
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
		</div>
	);
}
