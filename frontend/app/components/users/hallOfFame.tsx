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
    <section className="fixed bottom-0 top-0 right-0 z-40 w-[300px] border border-white/20 bg-black/35 p-4 backdrop-blur-md shadow-[0_0_30px_rgba(255,0,90,0.12)]">
      <div className="mb-1">
        <h2 className="text-2xl text-center font-bold text-white">Hall of Fame</h2>
      </div>

      <div className="space-y-2">
        {topUsers.map((user, index) => (
          <div
            key={user.id}
            className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-red-500 font-bold text-white">
                {index + 1}
              </div>

              <div>
                <p className="font-semibold text-white">{user.name}</p>
              </div>
            </div>

            <div className="text-right">
              <p className="font-bold text-pink-400">{user.matches}</p>
              <p className="text-xs text-white/60">matches</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
