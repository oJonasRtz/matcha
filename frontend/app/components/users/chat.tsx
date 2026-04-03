"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { Image, Paperclip, Send, Video } from "lucide-react";

export default function SimpleChatComponent() {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "Nami",
      letter: "N",
      avatar: "https://i.redd.it/kij6hdu9sb8b1.png",
      content: "Hello! What do you think about to go to the beach tomorrow?",
      side: "left",
      time: "09:12",
    },
    {
      id: 2,
      sender: "Haseo",
      letter: "H",
      avatar: "https://i.pinimg.com/originals/b1/39/f9/b139f929824da7a718c6c58b6e588980.jpg",
      content: "Yes, I would also like to go to the beach with you.",
      side: "right",
      time: "09:13",
    },
    {
      id: 3,
      sender: "Nami",
      letter: "N",
      avatar: "https://i.redd.it/kij6hdu9sb8b1.png",
      content: "That's perfect. See you tomorrow =D",
      side: "left",
      time: "09:14",
    },
  ]);

  const people = useMemo(
    () => [
      {
        name: "Nami",
        avatar: "https://i.redd.it/kij6hdu9sb8b1.png",
        status: "online",
      },
      {
        name: "Haseo",
        avatar: "https://i.pinimg.com/originals/b1/39/f9/b139f929824da7a718c6c58b6e588980.jpg",
        status: "typing...",
      },
    ],
    []
  );

  function handleSend() {
    const value = text.trim();
    if (!value) return;

    setMessages((current) => [
      ...current,
      {
        id: Date.now(),
        sender: "Bruno",
        avatar: "https://i.pinimg.com/originals/b1/39/f9/b139f929824da7a718c6c58b6e588980.jpg",
        content: value,
        side: "right",
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    ]);
    setText("");
  }

  function handleKeyDown(event) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  }

  return (
    <div className="w-full h-full min-w-0 bg-slate-100">
      <div className="w-full h-full bg-white shadow-xl border border-slate-200 overflow-hidden grid grid-cols-[1fr_96px]">
        <section className="flex flex-col">
          <header className="border-b border-slate-200 px-6 py-4 flex items-center justify-between bg-white">
            <div>
              <h1 className="text-lg font-semibold text-slate-900"><strong>Seductor Chat</strong></h1>
              <p className="text-sm text-slate-500">Private chat</p>
            </div>
            <div className="text-sm text-slate-400">Only you and me =D</div>
          </header>

          <div className="flex-1 bg-slate-50 px-6 py-5 overflow-y-auto space-y-4">
            {messages.map((message) => {
              const isRight = message.side === "right";

              return (
                <div
                  key={message.id}
                  className={`flex items-end gap-3 ${
                    isRight ? "justify-end" : "justify-start"
                  }`}
                >
                  {!isRight && (
                    <div className="h-14 w-14 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center text-sm font-semibold shrink-0">
		    <Link href="#" className="block h-full w-full">
                      <img src={message.avatar} alt={message.letter} className="h-full w-full rounded-full object-cover"/>
		   </Link>
                    </div>
                  )}

                  <div
                    className={`max-w-[75%] rounded-2xl px-4 py-3 shadow-sm ${
                      isRight
                        ? "bg-slate-900 text-white rounded-br-md"
                        : "bg-white text-slate-800 rounded-bl-md border border-slate-200"
                    }`}
                  >
                    <div className="text-xs opacity-70 mb-1">
                      <strong>{message.sender} • {message.time}</strong>
                    </div>
                    <p className="text-sm leading-relaxed"><strong>{message.content}</strong></p>
                  </div>

                  {isRight && (
                    <div className="h-14 w-14 rounded-full bg-slate-900 text-white flex items-center justify-center text-sm font-semibold shrink-0">
                      <Link href="#" className="block h-full w-full">
                      <img src={message.avatar} alt={message.letter} className="h-full w-full rounded-full object-cover"/>
		     </Link>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="border-t border-slate-200 bg-white p-4">
            <div className="flex items-end gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3 shadow-sm">
              <div className="flex items-center gap-2 pb-1">
                <button
                  type="button"
                  className="h-12 w-12 rounded-xl border border-slate-200 bg-white flex items-center justify-center text-slate-600 hover:bg-slate-100 transition"
                  aria-label="Enviar foto"
                >
                  <Image size={22} />
                </button>
                <button
                  type="button"
                  className="h-12 w-12 rounded-xl border border-slate-200 bg-white flex items-center justify-center text-slate-600 hover:bg-slate-100 transition"
                  aria-label="Send video"
                >
                  <Video size={22} />
                </button>
                <button
                  type="button"
                  className="h-12 w-12 rounded-xl border border-slate-200 bg-white flex items-center justify-center text-slate-600 hover:bg-slate-100 transition"
                  aria-label="Anexar arquivo"
                >
                  <Paperclip size={22} />
                </button>
              </div>

              <textarea
                value={text}
                onChange={(event) => setText(event.target.value)}
                onKeyDown={handleKeyDown}
                rows={1}
                placeholder="Type a message..."
                className="flex-1 resize-none bg-transparent outline-none text-sm text-slate-800 placeholder:text-slate-400 py-2 max-h-28"
              />

              <button
                type="button"
                onClick={handleSend}
                className="h-12 w-12 rounded-xl bg-slate-900 text-white flex items-center justify-center hover:opacity-90 transition shrink-0"
                aria-label="Enviar mensagem"
              >
                <Send size={22} />
              </button>
            </div>
          </div>
        </section>
	<aside className="bg-slate-900 text-white flex flex-col items-center py-6 gap-5">
          <div className="text-xs uppercase tracking-[0.3em] text-slate-400">Chat</div>

          <div className="flex flex-col items-center gap-4 mt-4">
            {people.map((person) => (
              <div   
                key={person.name}
                className="flex flex-col items-center gap-2"
                title={person.name}
              >
                <div className="h-16 w-16 rounded-full bg-slate-700 flex items-center justify-center text-lg font-semibold border border-slate-500">
                  <Link href="#" className="block h-full w-full">
                  <img src={person.avatar} alt={person.avatar} className="h-full w-full rounded-full object-cover"/>
		</Link>
                </div>
                <div className="text-[14px] text-center leading-tight text-slate-300 max-w-[60px]">
                  <div className="font-medium text-white"><strong>{person.name}</strong></div>
                  <div><strong>{person.status}</strong></div>
                </div>
              </div>
            ))}
          </div>
        </aside>

      </div>
    </div>
  );
}

