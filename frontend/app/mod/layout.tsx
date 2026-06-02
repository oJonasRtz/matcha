import type { ReactNode } from "react";

export default function ModLayout({ children }: { children: ReactNode }) {
	return (
		<div className="relative min-h-screen overflow-hidden bg-slate-950 text-white isolate">
			<div
				aria-hidden="true"
				className="pointer-events-none absolute inset-[-50vh_-50vw] z-0 h-[200vh] w-[200vw] bg-[radial-gradient(circle_at_30%_30%,rgba(59,130,246,0.45),transparent_40%),radial-gradient(circle_at_70%_60%,rgba(29,78,216,0.38),transparent_40%),radial-gradient(circle_at_50%_80%,rgba(14,165,233,0.28),transparent_40%)] blur-[50px] animate-[gradientMove_25s_linear_infinite]"
			/>
			<div
				aria-hidden="true"
				className="pointer-events-none absolute inset-0 z-[-1] bg-slate-950"
			/>
			<div className="relative z-10">{children}</div>
		</div>
	);
}