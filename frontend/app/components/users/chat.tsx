"use client";

import Link from "next/link";
import { Image, Paperclip, Send, Video } from "lucide-react";
import { useMemo, useState, useRef, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import ChatContacts from "./chatContacts";

type ChatMessage = {
  id: number;
  sender: string;
  avatar: string;
  content: string;
  time: string;
};

type Conversation = {
  id: string;
  name: string;
  avatar: string;
  status: string;
  messages: ChatMessage[];
};

const currentUser = {
  name: "Haseo",
  avatar: "https://i.pinimg.com/originals/b1/39/f9/b139f929824da7a718c6c58b6e588980.jpg",
};

export default function SimpleChatComponent() {
  const searchParams = useSearchParams();
  const [text, setText] = useState("");
  const messagesContainerRef = useRef<HTMLDivElement | null>(null);

  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: "nami",
      name: "Nami",
      avatar: "https://i.redd.it/kij6hdu9sb8b1.png",
      status: "online",
      messages: [
        {
          id: 1,
          sender: "Nami",
          avatar: "https://i.redd.it/kij6hdu9sb8b1.png",
          content: "Hello! What do you think about going to the beach tomorrow?",
          time: "09:12",
        },
        {
          id: 2,
          sender: "Haseo",
          avatar: currentUser.avatar,
          content: "Yes, I would like that.",
          time: "09:13",
        },
      ],
    },
    {
      id: "atoli",
      name: "Atoli",
      avatar: "https://s1.zerochan.net/Atoli.600.766556.jpg",
      status: "offline",
      messages: [
        {
          id: 1,
          sender: "Atoli",
          avatar: "https://s1.zerochan.net/Atoli.600.766556.jpg",
          content: "Haseo, are you there?",
          time: "10:20",
        },
      ],
    },
    {
      id: "ino",
      name: "Ino",
      avatar: "https://i.redd.it/i9kw0g493lgb1.jpg",
      status: "typing...",
      messages: [
        {
          id: 1,
          sender: "Ino",
          avatar: "https://i.redd.it/i9kw0g493lgb1.jpg",
          content: "Let's talk later!",
          time: "11:03",
        },
      ],
    },
  ]);

  const activeConversationId = searchParams.get("with") ?? conversations[0]?.id ?? "";
  const activeConversation =
    conversations.find((conversation) => conversation.id === activeConversationId) ?? conversations[0];

  useEffect(() => {
    const container = messagesContainerRef.current;
    if (!container || !activeConversation) return;
    // scroll to bottom whenever active conversation messages change
    container.scrollTo({ top: container.scrollHeight, behavior: "smooth" });
  }, [conversations, activeConversationId]);

  const contacts = useMemo(
    () =>
      conversations.map((conversation) => ({
        id: conversation.id,
        name: conversation.name,
        avatar: conversation.avatar,
        status: conversation.status,
        lastMessage: conversation.messages[conversation.messages.length - 1]?.content ?? "",
      })),
    [conversations]
  );

  function handleSend() {
    const value = text.trim();
    if (!value || !activeConversation) return;

    const newMessage: ChatMessage = {
      id: Date.now(),
      sender: currentUser.name,
      avatar: currentUser.avatar,
      content: value,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setConversations((current) =>
      current.map((conversation) =>
        conversation.id === activeConversation.id
          ? { ...conversation, messages: [...conversation.messages, newMessage] }
          : conversation
      )
    );

    setText("");
    // after sending, scroll to bottom
    setTimeout(() => {
      const container = messagesContainerRef.current;
      if (container) {
        container.scrollTo({ top: container.scrollHeight, behavior: "smooth" });
      }
    }, 60);
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  }

  if (!activeConversation) {
    return (
      <div className="grid h-full place-items-center rounded-3xl border border-white/10 bg-black/35 text-white/70">
        No conversations available.
      </div>
    );
  }

  return (
    <div className="grid h-full min-h-0 min-w-0 gap-4 xl:grid-cols-[320px_minmax(0,1fr)_120px]">
      <ChatContacts contacts={contacts} activeId={activeConversation.id} />

      <section className="grid min-h-0 min-w-0 grid-rows-[auto_minmax(0,1fr)_auto] overflow-hidden rounded-3xl border border-rose-300/20 bg-black/35">
        <header className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <div>
            <h1 className="text-lg font-bold text-white">Chat with {activeConversation.name}</h1>
            <p className="text-sm text-white/60">Private conversation</p>
          </div>
          <span className="rounded-full border border-rose-300/20 bg-rose-500/10 px-3 py-1 text-xs text-rose-100/80">
            {activeConversation.status}
          </span>
        </header>

        <div ref={messagesContainerRef} className="min-h-0 overflow-y-auto px-5 py-4">
          <div className="flex flex-col gap-3">
            {activeConversation.messages.map((message) => {
              const isRight = message.sender === currentUser.name;
              return (
                <div key={message.id} className={`flex items-end gap-3 ${isRight ? "justify-end" : "justify-start"}`}>
                  {!isRight ? <img src={message.avatar} alt={message.sender} className="h-10 w-10 rounded-full object-cover" /> : null}

                  <div
                    className={`max-w-[75%] rounded-2xl px-4 py-3 text-sm ${
                      isRight
                        ? "rounded-br-md bg-gradient-to-r from-rose-500 to-red-500 text-white"
                        : "rounded-bl-md border border-white/10 bg-white/8 text-white"
                    }`}
                  >
                    <p className="mb-1 text-[11px] opacity-75">{message.sender} • {message.time}</p>
                    <p>{message.content}</p>
                  </div>

                  {isRight ? <img src={message.avatar} alt={message.sender} className="h-10 w-10 rounded-full object-cover" /> : null}
                </div>
              );
            })}
          </div>
        </div>

        <div className="border-t border-white/10 p-4">
          <div className="flex items-end gap-3 rounded-2xl border border-white/15 bg-white/5 px-3 py-3">
            <div className="flex items-center gap-2 pb-1">
              <button type="button" className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-white/8 text-white/75 transition hover:bg-white/15">
                <Image size={18} />
              </button>
              <button type="button" className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-white/8 text-white/75 transition hover:bg-white/15">
                <Video size={18} />
              </button>
              <button type="button" className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-white/8 text-white/75 transition hover:bg-white/15">
                <Paperclip size={18} />
              </button>
            </div>

            <textarea
              value={text}
              onChange={(event) => setText(event.target.value)}
              onKeyDown={handleKeyDown}
              rows={1}
              placeholder="Type a message..."
              className="max-h-24 min-w-0 flex-1 resize-none bg-transparent py-2 text-sm text-white outline-none placeholder:text-white/45"
            />

            <button
              type="button"
              onClick={handleSend}
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-rose-500 to-red-500 text-white transition hover:from-rose-400 hover:to-red-400"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </section>

      <aside className="hidden flex-col items-center gap-4 overflow-hidden rounded-3xl border border-rose-300/20 bg-black/35 py-5 text-white xl:flex">
        <p className="text-xs uppercase tracking-[0.22em] text-white/45">People</p>
        {[activeConversation, { name: currentUser.name, avatar: currentUser.avatar, status: "online", id: "you", messages: [] }].map((person) => (
          <div key={person.id} className="flex flex-col items-center gap-2 px-2 text-center">
            <Link href="#" className="block">
              <img src={person.avatar} alt={person.name} className="h-14 w-14 rounded-full border border-white/15 object-cover" />
            </Link>
            <p className="text-xs font-semibold text-white">{person.name}</p>
            <p className="text-[11px] uppercase tracking-[0.08em] text-white/50">{person.status}</p>
          </div>
        ))}
      </aside>
    </div>
  );
}
