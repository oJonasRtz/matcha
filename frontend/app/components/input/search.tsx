import { Search } from "lucide-react";
import React from "react";

type SearchInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
	label: string;
	containerClassName?: string;
	labelClassName?: string;
	focusClassName?: string;
	labelFocusClassName?: string;
};

export default function SearchInput({
	label,
	className = "",
	containerClassName = "",
	labelClassName = "",
	focusClassName = "focus:border-blue-400 focus:ring-2 focus:ring-blue-200/40",
	labelFocusClassName = "peer-focus:text-blue-300 peer-not-placeholder-shown:text-blue-300",
	id,
	placeholder = " ",
	name,
	...props
}: SearchInputProps) {
	const inputId = id ?? name ?? label.toLowerCase().replace(/\s+/g, "-");

	return (
		<div className={`relative ${containerClassName}`.trim()}>
			<input
				id={inputId}
				name={name}
				type="search"
				placeholder={placeholder}
				className={[
					"peer w-full rounded-xl border border-r border-white/20 bg-white/5 px-4 pb-3 pt-6 pr-12 text-sm text-white outline-none transition",
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

			<div className="pointer-events-none absolute right-3 top-1/2 flex -translate-y-1/2 items-center justify-center border-l border-white/15 pl-3 text-white/55">
				<Search size={18} />
			</div>
		</div>
	);
}
