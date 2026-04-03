import { Card } from "../public/card";

export default function HallOfFame() {
  const topUsers = [
    { id: 1, name: "Sophia", matches: 1280 },
    { id: 2, name: "Lucas", matches: 1194 },
    { id: 3, name: "Emma", matches: 1108 },
    { id: 4, name: "Noah", matches: 1033 },
    { id: 5, name: "Olivia", matches: 980 },
    { id: 6, name: "Liam", matches: 944 },
    { id: 7, name: "Ava", matches: 901 },
    { id: 8, name: "Ethan", matches: 877 },
    { id: 9, name: "Mia", matches: 842 },
    { id: 10, name: "James", matches: 799 },
  ];

  return (
    <Card>
      <div className="mt-1">
        <h2 className="text-center text-xl font-bold text-white">Hall of Fame</h2>
      </div>

      <div className="mt-5 space-y-2">
        {topUsers.map((user, index) => (
          <div
            key={user.id}
            className="mt-1 flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-3 py-3"
          >
            <div className="flex min-w-0 items-center gap-3">
              <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-red-500 font-bold text-white">
                {index + 1}
              </div>

              <div className="min-w-0">
                <p className="truncate font-semibold text-white">{user.name}</p>
              </div>
            </div>

            <div className="ml-3 mt-0.5 shrink-0 text-right">
              <p className="font-bold text-pink-400">{user.matches}</p>
              <p className="mt-1 text-xs text-white/60">matches</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
