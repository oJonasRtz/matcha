"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";


export default function UserImages(
	{ images }: { images: string[] }
) {
	// === STYLES ===
	const mainStyle = "space-y-4";
	const navButtonsStyle = "absolute top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white";
	
	// === STATES ===
	const [activeIndex, setActiveIndex] = useState(0);
	const [touchStartX, setTouchStartX] = useState<number | null>(null);

	// == HANDLERS ==
	function goPrev() {
		setActiveIndex((current) => (current - 1 + images.length) % images.length);
	}
	function goNext() {
		setActiveIndex((current) => (current + 1) % images.length);
	}

	function handleTouchStart(event: React.TouchEvent<HTMLDivElement>) {
		setTouchStartX(event.changedTouches[0].clientX);
	}
	function handleTouchEnd(event: React.TouchEvent<HTMLDivElement>) {
		if (touchStartX === null) return;

		const touchEndX = event.changedTouches[0].clientX;
		const deltaX = touchEndX - touchStartX;

		if (deltaX > 45) goPrev();
		if (deltaX < -45) goNext();

		setTouchStartX(null);
	}

	// == OTHER ==
	const navButtons = [
		{
			icon: ChevronLeft,
			onClick: goPrev,
			style: `${navButtonsStyle} left-2`
		},
		{
			icon: ChevronRight,
			onClick: goNext,
			style: `${navButtonsStyle} right-2`
		}
	];

	return (
		<main className={mainStyle}>
			{/*	===	Big Image Section === */}
			<section
				className="flex-[2] relative overflow-hidden rounded-2xl border border-white/20 bg-black/35"
				onTouchStart={handleTouchStart}
				onTouchEnd={handleTouchEnd}
			>
				<header className="absolute top-0 left-0 right-0 flex justify-between px-4 py-2">
					{images.map((image, index) => (
						<button
							key={image}
							type="button"
							onClick={() => setActiveIndex(index)}
							className={[
								"h-1.5 flex-1 rounded-full transition",
								index === activeIndex ? "bg-white" : "bg-white/35",
							].join(" ")}
							aria-label={`View profile photo ${index + 1}`}	
						/>
					))}
				</header>
				 
				<img
					src={images[activeIndex]}
					alt={`Profile photo ${activeIndex + 1}`}
					className="h-[420px] w-full object-cover md:h-[560px]"
				/>

				{/*	Nav buttons */}
				{navButtons.map(({ icon: Icon, onClick, style }, i) => (
					<button
						type="button"
						onClick={onClick}
						className={style}
					>
						<Icon className="h-6 w-6" />
					</button>
				))}
			</section>

			{/*	===	Small Images Section === */}
			<section className="flex justify-between flex-[1] grid grid-cols-5 gap-2">
				{images.map((image, index) => (
					<button
						key={`${image}-thumb`}
						type="button"
						onClick={() => setActiveIndex(index)}
						className={[
							"overflow-hidden rounded-xl border transition",
							index === activeIndex
								? "border-pink-400 ring-1 ring-pink-400"
								: "border-white/20 hover:border-white/40",
						].join(" ")}
						aria-label={`View profile photo ${index + 1}`}
					>
						<img
							key={`${image}-thumb`}
							src={image}
							alt={`Thumbnail of profile photo ${index + 1}`}
							onClick={() => setActiveIndex(index)}
							className={[
								"overflow-hidden rounded-xl border transition",
								index === activeIndex
									? "border-pink-400 ring-1 ring-pink-400"
									: "border-white/20 hover:border-white/40",
							].join(" ")}
						/>
					</button>
				))}
			</section>
		</main>
	)
}
