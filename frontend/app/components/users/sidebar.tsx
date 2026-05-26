"use client";

import {
  MessageCircle,
  Heart,
  User,
  Settings,
  Bell,
  Globe,
  LogOut,
  Smile,
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
  "fixed bottom-0 left-0 z-50 flex h-20 w-full flex-row items-center border-t border-white/20 bg-black/30 backdrop-blur-md " +
  // Desktop
  "md:top-0 md:h-screen md:w-24 md:flex-col md:border-r md:border-t-0 md:px-3 md:py-6 md:gap-4";

  // ===== NAV =====
  const navStyle =
    // mobile
    "flex h-full w-full flex-row md:flex-col md:items-center md:w-full md:flex-1 md:gap-3" +
    // desktop
    "";

  // ===== BUTTON BASE =====
  const baseButton =
    "flex items-center justify-center rounded-2xl transition duration-200";

  // ===== VARIANTS =====
  const mobileButton = "flex-1 md:flex-none"; // horizontal expansion
  const desktopButton = "h-12 w-12 md:mx-auto";

  // ===== COLORS =====
  const pinkHover = "text-white/80 hover:bg-white/10 hover:text-pink-400 cursor-pointer";
  const redHover = "text-white/80 hover:bg-white/10 hover:text-red-400 cursor-pointer";

  // ===== ICONS =====
  const iconSize = "h-6 w-6 shrink-0";
  const icons = [
    { icon: Heart, title: "Swipe", ref: "/swipe", variant: pinkHover, handler: () => router.push("/swipe") },
    // { icon: Smile, title: "Swipe profiles", ref: "#", variant: pinkHover },
    { icon: MessageCircle, title: "Messages", ref: "/chat", variant: pinkHover, handler: () => router.push("/chat") },
    { icon: Bell, title: "Notifications", ref: "/notifications", variant: pinkHover, extra: "relative", handler: () => router.push("/notifications") },
    { icon: User, title: "Dashboard", ref: "/dashboard", variant: pinkHover, handler: () => router.push("/dashboard") },
    { icon: Globe, title: "Discover", ref: "/discover", variant: pinkHover, handler: () => router.push("/discover") },
    { icon: Settings, title: "Settings", ref: "/settings", variant: pinkHover, handler: () => router.push("/settings") },
  ];

  const spaceLayout = "flex flex-1 min-h-0 pb-20 md:pb-0 md:pl-24"; //

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
                  isActive ? "text-pink-400 bg-white/10 shadow-lg shadow-pink-500/20" : variant,
                  extra,
                ].join(" ")}
              >
                <Icon className={iconSize} />
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
