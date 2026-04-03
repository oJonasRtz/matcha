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

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();

  // ===== ASIDE =====
  const asideStyle =
  // Mobile
  "fixed bottom-0 left-0 w-full h-20 flex flex-row items-center border-t z-50 bg-black/30 backdrop-blur-md border-white/20 " +
  // Desktop
  "md:sticky md:top-0 md:h-screen md:w-20 md:flex-col md:border-r md:py-6 md:gap-6";

  // ===== NAV =====
  const navStyle =
    // mobile
    "flex w-full h-full flex-row " +
    // desktop
    "md:flex-col md:items-center md:w-auto";

  // ===== BUTTON BASE =====
  const baseButton =
    "flex items-center justify-center rounded-2xl p-3 transition";

  // ===== VARIANTS =====
  const mobileButton = "flex-1"; // horizontal expansion
  const desktopButton = "md:mt-1";

  // ===== COLORS =====
  const pinkHover = "text-white/80 hover:bg-white/10 hover:text-pink-400";
  const redHover = "text-white/80 hover:bg-white/10 hover:text-red-400";

  // ===== ICONS =====
  const iconSize = "h-6 w-6 shrink-0";
  const icons = [
    { icon: Heart, title: "Matches", ref: "#", variant: pinkHover },
    { icon: Smile, title: "Swipe profiles", ref: "#", variant: pinkHover },
    { icon: MessageCircle, title: "Messages", ref: "#", variant: pinkHover },
    { icon: Bell, title: "Notifications", ref: "#", variant: pinkHover },
    { icon: User, title: "Dashboard", ref: "/dashboard", variant: pinkHover },
    { icon: Globe, title: "Discover", ref: "#", variant: pinkHover },
    { icon: Settings, title: "Settings", ref: "#", variant: pinkHover },
    {
      icon: LogOut,
      title: "Logout",
      ref: "/",
      variant: redHover,
      extra: "md:mt-auto", // desktop only
    },
  ];

  return (
    <aside className={asideStyle}>
      <nav className={navStyle}>
        {icons.map(({ icon: Icon, title, ref, variant, extra }, i) => {
          const isActive = pathname === ref;

          return (
            <button
              key={i}
              title={title}
              onClick={() => router.push(ref)}
              className={[
                baseButton,
                mobileButton,
                desktopButton,
                variant,
                extra,
                isActive ? pinkHover : "",
              ].join(" ")}
            >
              <Icon className={iconSize} />
            </button>
          );
      })}
      </nav>
    </aside>
  );
}
