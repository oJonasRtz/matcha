"use client";

const hearts = [
  { left: "8%", size: "18px", delay: "0s", duration: "7s" },
  { left: "18%", size: "24px", delay: "2s", duration: "9s" },
  { left: "30%", size: "16px", delay: "4s", duration: "8s" },
  { left: "42%", size: "22px", delay: "1s", duration: "10s" },
  { left: "55%", size: "20px", delay: "3s", duration: "7.5s" },
  { left: "67%", size: "26px", delay: "5s", duration: "11s" },
  { left: "78%", size: "17px", delay: "2.5s", duration: "8.5s" },
  { left: "88%", size: "23px", delay: "6s", duration: "9.5s" },
];

export default function FloatingHearts() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {hearts.map((heart, index) => (
        <span
          key={index}
          className="absolute animate-float-heart text-pink-300/80"
          style={{
            left: heart.left,
            bottom: "-40px",
            fontSize: heart.size,
            animationDelay: heart.delay,
            animationDuration: heart.duration,
            textShadow: "0 0 8px rgba(255, 105, 180, 0.8)",
          }}
        >
          ❤
        </span>
      ))}
    </div>
  );
}
