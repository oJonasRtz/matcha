"use client";

import {
  MessageCircle,
  Heart,
  User,
  Settings,
  Bell,
  Globe,
  LogOut,
} from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { ReactNode } from "react";

export default function Sidebar({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  function handleLogout() {
    fetch("/api/logout", {
      method: "POST",
    });
    router.push("/");
  }

  // ===== ASIDE =====
  const asideStyle =
  // Mobile
  "fixed bottom-0 left-0 z-50 flex h-20 w-full flex-row items-center border-t border-rose-300/25 bg-[linear-gradient(90deg,rgba(15,8,18,0.9),rgba(39,8,25,0.9))] backdrop-blur-xl " +
  // Desktop
  "md:top-0 md:h-screen md:w-24 md:flex-col md:border-r md:border-t-0 md:px-3 md:py-5 md:gap-3 md:bg-[linear-gradient(180deg,rgba(15,8,18,0.95),rgba(28,8,20,0.92))]";

  // ===== NAV =====
  const navStyle =
    // mobile
    "flex h-full w-full flex-row md:flex-col md:items-center md:w-full md:flex-1 md:gap-3" +
    // desktop
    "";

  // ===== BUTTON BASE =====
  const baseButton =
    "group relative flex items-center justify-center rounded-2xl transition duration-200";

  // ===== VARIANTS =====
  const mobileButton = "flex-1 md:flex-none"; // horizontal expansion
  const desktopButton = "h-12 w-12 md:mx-auto";

  // ===== COLORS =====
  const pinkHover = "text-white/75 hover:bg-rose-500/20 hover:text-rose-100 cursor-pointer";
  const redHover = "text-white/75 hover:bg-red-500/20 hover:text-red-100 cursor-pointer";

  // ===== ICONS =====
  const iconSize = "h-6 w-6 shrink-0";
  const icons = [
    { icon: Heart, title: "Swipe", ref: "/swipe", variant: pinkHover, handler: () => router.push("/swipe") },
    { icon: MessageCircle, title: "Messages", ref: "/chat", variant: pinkHover, handler: () => router.push("/chat") },
    { icon: Bell, title: "Notifications", ref: "/notifications", variant: pinkHover, extra: "relative", handler: () => router.push("/notifications") },
    { icon: User, title: "Dashboard", ref: "/dashboard", variant: pinkHover, handler: () => router.push("/dashboard") },
    { icon: Globe, title: "Discover", ref: "/discover", variant: pinkHover, handler: () => router.push("/discover") },
    { icon: Settings, title: "Settings", ref: "/settings", variant: pinkHover, handler: () => router.push("/settings") },
  ];

  const spaceLayout = "flex flex-1 min-h-0 pb-20 md:pb-0 md:pl-24";

  return (
    <div className="relative flex min-h-screen w-full text-white">
      <aside className={asideStyle}>
        <nav className={navStyle}>
          {icons.map(({ icon: Icon, title, ref, variant, extra, handler }, i) => {
            const isActive = pathname === ref;

            return (
              <button
                key={i}
                title={title}
                onClick={handler}
                className={[
                  baseButton,
                  mobileButton,
                  desktopButton,
                  isActive ? "text-rose-100 bg-rose-500/25 shadow-lg shadow-rose-600/25 ring-1 ring-rose-300/30" : variant,
                  extra,
                ].join(" ")}
              >
                <Icon className={iconSize} />
                <span className="pointer-events-none absolute -bottom-6 hidden rounded-full bg-black/60 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-white/80 md:group-hover:block">
                  {title}
                </span>
                {title === 'Notifications' && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    3 {/* Example count, replace with actual count */}
                  </span>
                )}
              </button>
            );
        })}

          <button
            type="button"
            title="Logout"
            onClick={handleLogout}
            className={[
              baseButton,
              mobileButton,
              desktopButton,
              "md:mt-auto",
              redHover,
            ].join(" ")}
          >
            <LogOut className={iconSize} />
            <span className="sr-only">Logout</span>
          </button>
        </nav>
      </aside>
      {/* CONTENT*/}
      <main className={spaceLayout}>
        {children}
      </main>
    </div>
  );
}
