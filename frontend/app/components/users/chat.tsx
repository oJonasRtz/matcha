"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { Image, Paperclip, Send, Video } from "lucide-react";

export default function SimpleChatComponent() {
// define the currentUser before the useState

type ChatMessage = {
  id: number;
  sender: string;
  letter: string;
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

type TargetUser = {
  name: string;
  status: string;
  avatar: string;
};

const currentUser = {
  name: "Haseo",
  letter: "H",
  status: "online",
  avatar:
    "https://i.pinimg.com/originals/b1/39/f9/b139f929824da7a718c6c58b6e588980.jpg",
};

const [targetUser, setTargetUser] = useState<TargetUser>({
  name: "Nami",
  status: "online",
  avatar: "https://i.redd.it/kij6hdu9sb8b1.png"
});

  const [text, setText] = useState("");
const [activeConversationId, setActiveConversationId] = useState("nami");

function handleSelectConversation(conversation: Conversation) {
  setActiveConversationId(conversation.id);

  setTargetUser({
    name: conversation.name,
    status: conversation.status,
    avatar: conversation.avatar
  });

  setText("");
}

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
        letter: "N",
        avatar: "https://i.redd.it/kij6hdu9sb8b1.png",
        content: "Hello! What do you think about to go to the beach tomorrow?",
        time: "09:12",
      },
      {
        id: 2,
        sender: "Haseo",
        letter: "H",
        avatar: currentUser.avatar,
        content: "Yes, I would also like to go to the beach with you.",
        time: "09:13",
      },
      {
        id: 3,
        sender: "Nami",
        letter: "N",
        avatar: "https://i.redd.it/kij6hdu9sb8b1.png",
        content: "That's perfect. See you tomorrow =D",
        time: "09:14",
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
        letter: "A",
        avatar: "https://s1.zerochan.net/Atoli.600.766556.jpg",
        content: "Haseo, are you there?",
        time: "10:20",
      },
    ],
  },
  {
    id: "ino",
    name: "Ino",
    avatar:
     "https://i.redd.it/i9kw0g493lgb1.jpg",
    status: "typing...",
    messages: [
      {
        id: 1,
        sender: "Ino",
        letter: "I",
        avatar: "https://i.redd.it/i9kw0g493lgb1.jpg", 
        content: "Let's talk later, Haseeeeeoooooo! =D",
        time: "11:03",
      },
    ],
  },
]);

const activeConversation =
  conversations.find((conversation) => conversation.id === activeConversationId) ||
  conversations[0];
  const people = useMemo(
    () => [
      {
        name: targetUser.name,
        avatar: targetUser.avatar,
        status: targetUser.status,
      },
      {
        name: "Haseo",
        avatar: "https://i.pinimg.com/originals/b1/39/f9/b139f929824da7a718c6c58b6e588980.jpg",
        status: "typing...",
      },
    ],
    [targetUser]
  );

function handleSend() {
  const value = text.trim();
  if (!value) return;

  const newMessage = {
    id: Date.now(),
    sender: currentUser.name,
    letter: currentUser.letter,
    avatar: currentUser.avatar,
    content: value,
    time: new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
  };

  setConversations((current) =>
    current.map((conversation) => {
      if (conversation.id !== activeConversationId) {
        return conversation;
      }

      return {
        ...conversation,
        messages: [...conversation.messages, newMessage],
      };
    })
  );

  setText("");
}

  function handleKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  }

  return (
	<div className="w-full h-full min-h-0 min-w-0 bg-slate-100 overflow-hidden">
	<div className="w-full h-full min-w-0 min-h-0 bg-white shadow-xl border border-slate-200 overflow-hidden grid grid-cols-[300px_minmax(0,1fr)_120px]">
<aside className="h-full min-h-0 overflow-y-auto bg-white border-l border-slate-200 p-4">
  <div className="mb-4">
    <h2 className="text-sm font-semibold text-slate-900">
      Conversations
    </h2>
    <p className="text-xs text-slate-500">
      Select a chat
    </p>
  </div>

  <div className="flex flex-col gap-3">
    {conversations.map((conversation) => {
      const isActive = conversation.id === activeConversationId;
      const lastMessage =
        conversation.messages[conversation.messages.length - 1];

      return (
        <button
          key={conversation.id}
          type="button"
          onClick={() => handleSelectConversation(conversation)}
          className={`w-full min-w-0 rounded-2xl border p-3 text-left transition ${
            isActive
              ? "border-slate-900 bg-slate-900 text-white"
              : "border-slate-200 bg-slate-50 text-slate-800 hover:bg-slate-100"
          }`}
        >
          <div className="flex items-center gap-3 min-w-0">
            <img
              src={conversation.avatar}
              alt={conversation.name}
              className="h-12 w-12 rounded-full object-cover shrink-0"
            />

            <div className="min-w-0">
              <div className="text-sm font-semibold truncate">
                {conversation.name}
              </div>

              <div
                className={`text-xs truncate ${
                  isActive ? "text-slate-300" : "text-slate-500"
                }`}
              >
                {lastMessage?.content}
              </div>
            </div>
          </div>
        </button>
      );
    })}
  </div>
</aside>
	<section className="min-h-0 min-w-0 overflow-hidden grid grid-rows-[auto_minmax(0,1fr)_auto]">
          <header className="border-b border-slate-200 px-6 py-4 flex items-center justify-between bg-white">
            <div>
              <h1 className="text-lg font-semibold text-slate-900"><strong>Seductor Chat</strong></h1>
              <p className="text-sm text-slate-500">Private chat</p>
            </div>
            <div className="text-sm text-slate-400">Only you and me =D</div>
          </header>
<div className="min-h-0 min-w-0 overflow-y-auto overflow-x-hidden bg-slate-50 p-6 flex flex-col gap-4">
	{activeConversation.messages.map((message) => {
  		const isRight = message.sender === currentUser.name;

              return (
                <div
                  key={message.id}
                  className={`min-w-0 flex items-end gap-3 ${
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
                    className={`max-w-[75%] min-w-0 break-words [overflow-wrap:anywhere] rounded-2xl px-4 py-3 shadow-sm ... ${
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
            <div className="flex items-end gap-3 min-w-0 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3 shadow-sm">
              <div className="flex shrink-0 items-center gap-2 pb-1">
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
                className="flex-1 min-w-0 resize-none bg-transparent outline-none text-sm text-slate-800 placeholder:text-slate-400 py-2 max-h-28"
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
	<aside className="h-full min-h-0 shrink-0 overflow-hidden bg-slate-900 text-white flex flex-col items-center py-6 gap-5">
<div className="text-xs uppercase tracking-[0.3em] text-slate-400">
    Chat
  </div>

<div className="flex-1 min-h-0 flex flex-col items-center gap-4 mt-4">
    {people.map((person) => (
      <div
        key={person.name}
        className="flex flex-col items-center gap-2"
        title={person.name}
      >
        <div className="h-16 w-16 rounded-full bg-slate-700 flex items-center justify-center text-lg font-semibold border border-slate-500 shrink-0">
          <Link href="#" className="block h-full w-full">
            <img
              src={person.avatar}
              alt={person.name}
              className="h-full w-full rounded-full object-cover"
            />
          </Link>
        </div>

        <div className="text-[14px] text-center leading-tight text-slate-300 max-w-[60px]">
          <div className="font-medium text-white">
            <strong>{person.name}</strong>
          </div>
          <div>
            <strong>{person.status}</strong>
          </div>
        </div>
      </div>
    ))}
  </div>
</aside>
      </div>
    </div>
  );
}

