import React from "react";

export function Card({ children, className }: { children: React.ReactNode; className?: string }) {
	const style = 
		"w-full rounded-2xl bg-black/30 backdrop-blur-md border border-white/20 p-6 " +
		(className ?? "")
	
	return (
		<section className={style}>
			{children}
		</section>
	)
}
