"use client";

import Link from "next/link";

type Contact = {
  id: string;
  name: string;
  avatar: string;
  status: string;
  lastMessage: string;
};

export default function ChatContacts({ contacts, activeId }: { contacts: Contact[]; activeId: string }) {
  return (
    <aside className="h-full min-h-0 overflow-y-auto rounded-3xl border border-rose-300/20 bg-black/35 p-4">
      <div className="mb-4">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-rose-200/75">Contacts</p>
        <h2 className="mt-2 text-lg font-bold text-white">Your chats</h2>
      </div>

      <div className="flex flex-col gap-2">
        {contacts.map((contact) => {
          const isActive = contact.id === activeId;
          return (
            <Link
              key={contact.id}
              href={`/chat?with=${contact.id}`}
              className={`block w-full rounded-2xl border p-3 text-left transition ${isActive ? "border-rose-300/40 bg-rose-500/20" : "border-white/10 bg-white/5 hover:bg-white/10"}`}
            >
              <div className="flex items-center gap-3">
                <img src={contact.avatar} alt={contact.name} className="h-11 w-11 shrink-0 rounded-full object-cover" />
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-white">{contact.name}</p>
                  <p className="truncate text-xs text-white/60">{contact.lastMessage}</p>
                  <p className="text-[11px] uppercase tracking-[0.08em] text-white/40">{contact.status}</p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </aside>
  );
}
