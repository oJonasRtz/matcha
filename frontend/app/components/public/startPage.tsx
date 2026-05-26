import Link from "next/link";

export default function StartPage() {
	const cards = [
		{
			title: "Relationship Statistics",
			description: "Explore insights about attraction, compatibility, communication, and modern dating behavior.",
			href: "#",
			cta: null,
		},
		{
			title: "How to Be Interesting?",
			description: "Learn how curiosity, confidence, communication, and lifestyle can make someone more attractive and memorable.",
			href: "#",
			cta: null,
		},
		{
			title: "Get Started",
			description: "Join the platform, create your profile, or log in to continue.",
			href: null,
			cta: [
				{ label: "Log in", href: "/login", variant: "primary" as const },
				{ label: "Create account", href: "/register", variant: "secondary" as const },
			],
		},
		{
			title: "What the women are saying about men?",
			description: "Are you interested in know more about what the women are saying about man?",
			href: "#",
			cta: null,
		},
		{
			title: "What the men are saying about women?",
			description: "Come here and we will let you know more about what the men told us about women.",
			href: "#",
			cta: null,
		},
		{
			title: "What is your favourite place to date?",
			description: "Learn how the environment can impact positivetly or negativetly your relationship.",
			href: "#",
			cta: null,
		},
	];

  return (
		<section className="min-h-screen w-full bg-black/20 px-6 py-10 pt-30 text-white">
			<section className="grid gap-6 md:grid-cols-3">
				{cards.map((card) => {
					const article = (
						<article className="flex h-60 flex-col rounded-2xl border border-white/10 bg-black/30 p-6 backdrop-blur-sm transition hover:border-white/20 hover:bg-black/35">
							<h2 className="mb-3 text-xl font-semibold">{card.title}</h2>
							<p className="font-bold text-gray-300">{card.description}</p>

							{card.cta ? (
								<div className="mt-auto flex flex-col gap-3 pt-4">
									{card.cta.map((action) => (
										<Link
											key={action.label}
											href={action.href}
											className={
												action.variant === "primary"
													? "rounded-xl bg-pink-500 px-4 py-2 text-center font-semibold transition hover:bg-pink-400"
													: "rounded-xl border border-white/20 px-4 py-2 text-center font-semibold transition hover:bg-white/10"
											}
										>
											{action.label}
										</Link>
									))}
								</div>
							) : null}
						</article>
					);

					return card.href ? (
						<Link key={card.title} href={card.href}>
							{article}
						</Link>
					) : (
						<div key={card.title}>{article}</div>
					);
				})}
			</section>
		</section>
  );
}
