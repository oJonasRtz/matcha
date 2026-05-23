"use client";

import { FileText, Home, LogOut, UserPlus } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode } from "react";

export default function ModSidebar({ children }: { children?: ReactNode }) {
	const router = useRouter();
	const pathname = usePathname();

	function handleLogout() {
		fetch("/api/logout", {
			method: "POST",
		});
		router.push("/mod/login");
	}

	const asideStyle =
		"fixed bottom-0 left-0 z-50 flex h-20 w-full flex-row items-center border-t border-blue-400/20 bg-slate-950/70 backdrop-blur-md " +
		"md:top-0 md:h-screen md:w-24 md:flex-col md:border-r md:border-t-0 md:px-3 md:py-6 md:gap-4";

	const navStyle = "flex h-full w-full flex-row md:flex-col md:items-center md:w-full md:flex-1 md:gap-3";
	const baseButton = "flex items-center justify-center rounded-2xl transition duration-200";
	const mobileButton = "flex-1 md:flex-none";
	const desktopButton = "h-12 w-12 md:mx-auto";
	const blueHover = "text-white/80 hover:bg-blue-500/10 hover:text-blue-300 cursor-pointer";
	const blueActive = "text-blue-200 bg-blue-500/15 shadow-lg shadow-blue-500/20";
	const iconSize = "h-6 w-6 shrink-0";
	const logoutButton = "hidden md:flex mt-auto";
	const logoutBase = "flex h-12 w-12 items-center justify-center rounded-2xl transition duration-200";
	const logoutHover = "text-white/80 hover:bg-blue-500/10 hover:text-red-300 cursor-pointer";

	const icons = [
		{ icon: Home, title: "Home", ref: "/mod/dashboard", handler: () => router.push("/mod/dashboard") },
		{ icon: UserPlus, title: "Register", ref: "/mod/register", handler: () => router.push("/mod/register") },
		{ icon: FileText, title: "Reports", ref: "/mod/reports", handler: () => router.push("/mod/reports") },
	];

	const spaceLayout = "flex min-h-0 flex-1 pb-20 md:pb-0 md:pl-24";

	return (
		<div className="relative flex min-h-screen w-full text-white">
			<aside className={asideStyle}>
				<nav className={navStyle}>
					{icons.map(({ icon: Icon, title, ref, handler }) => {
						const isActive = pathname === ref;

						return (
							<button
								key={title}
								title={title}
								onClick={handler}
								className={[
									baseButton,
									mobileButton,
									desktopButton,
									isActive ? blueActive : blueHover,
								].join(" ")}
							>
								<Icon className={iconSize} />
								<span className="sr-only">{title}</span>
							</button>
						);
					})}
				</nav>
				<button
					type="button"
					title="Logout"
					onClick={handleLogout}
					className={[logoutButton, logoutBase, logoutHover].join(" ")}
				>
					<LogOut className={iconSize} />
					<span className="sr-only">Logout</span>
				</button>
			</aside>
			{children ? <main className={spaceLayout}>{children}</main> : null}
		</div>
	);
}
