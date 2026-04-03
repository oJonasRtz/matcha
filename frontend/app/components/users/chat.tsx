// import React, { useMemo, useState } from "react";

// import {
//   Camera,
//   Video,
//   Paperclip,
//   Search,
//   SendHorizonal,
//   Phone,
//   MoreVertical,
//   CheckCheck,
// } from "lucide-react";

// export default function Chat() {

// 	const conversationsSeed = [
//   {
//     id: "c1",
//     person: {
//       name: "Sophia Carter",
//       handle: "@sophia",
//       avatar:
//         "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop",
//       status: "Online",
//     },
//     unread: 2,
//     messages: [
//       {
//         id: "m1",
//         sender: "them",
//         text: "Hey, did you finish the prototype for the private chat?",
//         time: "09:10",
//       },
//       {
//         id: "m2",
//         sender: "me",
//         text: "Yes, I finished the first layout. I still need to polish the file upload area.",
//         time: "09:12",
//       },
//       {
//         id: "m3",
//         sender: "them",
//         text: "Nice. Can you also add camera and video icons in the header?",
//         time: "09:13",
//       },
//       {
//         id: "m4",
//         sender: "me",
//         text: "Sure. I will keep the design simple and modern.",
//         time: "09:15",
//       },
//       {
//         id: "m5",
//         sender: "them",
//         text: "Perfect. I want the user to click a conversation and load nearby messages around that point.",
//         time: "09:16",
//       },
//       {
//         id: "m6",
//         sender: "me",
//         text: "Got it. I can simulate that with a visible message window and load more buttons.",
//         time: "09:18",
//       },
//       {
//         id: "m7",
//         sender: "them",
//         text: "That sounds exactly right.",
//         time: "09:20",
//       },
//       {
//         id: "m8",
//         sender: "me",
//         text: "I’m finalizing the component now.",
//         time: "09:21",
//       },
//     ],
//   },
//   {
//     id: "c2",
//     person: {
//       name: "Daniel Reed",
//       handle: "@daniel",
//       avatar:
//         "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop",
//       status: "Away",
//     },
//     unread: 0,
//     messages: [
//       {
//         id: "m1",
//         sender: "them",
//         text: "Can you send me the updated assets?",
//         time: "11:03",
//       },
//       {
//         id: "m2",
//         sender: "me",
//         text: "Yes, I’ll attach them in a minute.",
//         time: "11:06",
//       },
//       {
//         id: "m3",
//         sender: "them",
//         text: "Thanks. Also, do you want to jump on a quick call later?",
//         time: "11:10",
//       },
//       {
//         id: "m4",
//         sender: "me",
//         text: "Sure, after lunch works for me.",
//         time: "11:12",
//       },
//       {
//         id: "m5",
//         sender: "them",
//         text: "Great. I’ll confirm the time.",
//         time: "11:15",
//       },
//     ],
//   },
//   {
//     id: "c3",
//     person: {
//       name: "Emma Lewis",
//       handle: "@emma",
//       avatar:
//         "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=400&auto=format&fit=crop",
//       status: "Busy",
//     },
//     unread: 5,
//     messages: [
//       {
//         id: "m1",
//         sender: "them",
//         text: "I loved the idea of a private message selector on the left.",
//         time: "13:02",
//       },
//       {
//         id: "m2",
//         sender: "them",
//         text: "Please keep the photos visible in both the list and the header.",
//         time: "13:03",
//       },
//       {
//         id: "m3",
//         sender: "me",
//         text: "Absolutely. It helps make the interface more human.",
//         time: "13:08",
//       },
//       {
//         id: "m4",
//         sender: "them",
//         text: "And don’t forget a file upload button near the input.",
//         time: "13:10",
//       },
//       {
//         id: "m5",
//         sender: "me",
//         text: "Already planned. I’ll place it beside the send button.",
//         time: "13:12",
//       },
//       {
//         id: "m6",
//         sender: "them",
//         text: "Amazing.",
//         time: "13:13",
//       },
//     ],
//   },
// ];

// const WINDOW_SIZE = 4;

// function cx(...classes) {
//   return classes.filter(Boolean).join(" ");
// }

// function IconButton({ children, label }) {
//   return (
//     <button
//       aria-label={label}
//       className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white/80 transition hover:bg-white/10 hover:text-white"
//     >
//       {children}
//     </button>
//   );
// }

// function Avatar({ src, alt, size = "h-12 w-12" }) {
//   return (
//     <img
//       src={src}
//       alt={alt}
//       className={`${size} rounded-2xl object-cover ring-1 ring-white/10`}
//     />
//   );
// }

// export default function PrivateChatUI() {
//   const [conversations, setConversations] = useState(conversationsSeed);
//   const [activeConversationId, setActiveConversationId] = useState(conversationsSeed[0].id);
//   const [draft, setDraft] = useState("");
//   const [search, setSearch] = useState("");
//   const [windowStart, setWindowStart] = useState(2);

//   const filteredConversations = useMemo(() => {
//     return conversations.filter((conversation) =>
//       conversation.person.name.toLowerCase().includes(search.toLowerCase())
//     );
//   }, [conversations, search]);

//   const activeConversation =
//     conversations.find((conversation) => conversation.id === activeConversationId) || conversations[0];

//   const visibleMessages = activeConversation.messages.slice(windowStart, windowStart + WINDOW_SIZE);
//   const hasOlder = windowStart > 0;
//   const hasNewer = windowStart + WINDOW_SIZE < activeConversation.messages.length;

//   function openConversation(conversationId) {
//     setActiveConversationId(conversationId);
//     const target = conversations.find((conversation) => conversation.id === conversationId);
//     if (!target) return;

//     const middleStart = Math.max(0, target.messages.length - WINDOW_SIZE);
//     setWindowStart(middleStart > 1 ? middleStart - 1 : 0);
//   }

//   function loadOlder() {
//     setWindowStart((current) => Math.max(0, current - WINDOW_SIZE));
//   }

//   function loadNewer() {
//     setWindowStart((current) =>
//       Math.min(activeConversation.messages.length - WINDOW_SIZE, current + WINDOW_SIZE)
//     );
//   }

//   function sendMessage() {
//     if (!draft.trim()) return;

//     const updatedConversations = conversations.map((conversation) => {
//       if (conversation.id !== activeConversation.id) return conversation;

//       return {
//         ...conversation,
//         messages: [
//           ...conversation.messages,
//           {
//             id: `m${conversation.messages.length + 1}`,
//             sender: "me",
//             text: draft.trim(),
//             time: new Date().toLocaleTimeString([], {
//               hour: "2-digit",
//               minute: "2-digit",
//             }),
//           },
//         ],
//       };
//     });

//     setConversations(updatedConversations);
//     setDraft("");

//     const nextConversation = updatedConversations.find(
//       (conversation) => conversation.id === activeConversation.id
//     );

//     if (nextConversation) {
//       setWindowStart(Math.max(0, nextConversation.messages.length - WINDOW_SIZE));
//     }
//   }

//   return (
//     <main className="min-h-screen bg-[#0a0d18] text-white">
//       <div className="mx-auto grid min-h-screen max-w-[1600px] grid-cols-1 gap-4 p-4 lg:grid-cols-[360px_minmax(0,1fr)]">
//         <aside className="rounded-[28px] border border-white/10 bg-white/5 p-4 shadow-2xl backdrop-blur-xl">
//           <div className="mb-5 flex items-center justify-between">
//             <div>
//               <p className="text-sm uppercase tracking-[0.28em] text-white/40">Private Chat</p>
//               <h1 className="mt-1 text-2xl font-semibold">Conversations</h1>
//             </div>
//             <button className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white/80 transition hover:bg-white/10 hover:text-white">
//               New chat
//             </button>
//           </div>

//           <div className="relative mb-4">
//             <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/35" />
//             <input
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               placeholder="Search people"
//               className="h-12 w-full rounded-2xl border border-white/10 bg-black/20 pl-11 pr-4 text-sm text-white outline-none placeholder:text-white/30 focus:border-white/20"
//             />
//           </div>

//           <div className="space-y-3 overflow-hidden">
//             {filteredConversations.map((conversation) => {
//               const lastMessage = conversation.messages[conversation.messages.length - 1];
//               const isActive = conversation.id === activeConversationId;

//               return (
//                 <button
//                   key={conversation.id}
//                   onClick={() => openConversation(conversation.id)}
//                   className={cx(
//                     "w-full rounded-[24px] border p-3 text-left transition",
//                     isActive
//                       ? "border-white/20 bg-white/10 shadow-lg"
//                       : "border-white/8 bg-white/[0.03] hover:bg-white/[0.06]"
//                   )}
//                 >
//                   <div className="flex items-center gap-3">
//                     <Avatar src={conversation.person.avatar} alt={conversation.person.name} />

//                     <div className="min-w-0 flex-1">
//                       <div className="flex items-center justify-between gap-3">
//                         <h2 className="truncate text-base font-semibold">{conversation.person.name}</h2>
//                         <span className="text-xs text-white/45">{lastMessage.time}</span>
//                       </div>

//                       <p className="truncate text-sm text-white/55">{lastMessage.text}</p>
//                     </div>

//                     {conversation.unread > 0 && (
//                       <div className="flex h-7 min-w-7 items-center justify-center rounded-full bg-white px-2 text-xs font-bold text-black">
//                         {conversation.unread}
//                       </div>
//                     )}
//                   </div>
//                 </button>
//               );
//             })}
//           </div>
//         </aside>

//         <section className="flex min-h-[85vh] flex-col rounded-[28px] border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.03] shadow-2xl backdrop-blur-xl">
//           <header className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 px-5 py-4">
//             <div className="flex items-center gap-4">
//               <Avatar
//                 src={activeConversation.person.avatar}
//                 alt={activeConversation.person.name}
//                 size="h-14 w-14"
//               />

//               <div>
//                 <h2 className="text-xl font-semibold">{activeConversation.person.name}</h2>
//                 <div className="flex items-center gap-2 text-sm text-white/55">
//                   <span className="h-2 w-2 rounded-full bg-emerald-400" />
//                   <span>{activeConversation.person.status}</span>
//                   <span className="text-white/25">•</span>
//                   <span>{activeConversation.person.handle}</span>
//                 </div>
//               </div>
//             </div>

//             <div className="flex items-center gap-2">
//               <IconButton label="Open camera">
//                 <Camera className="h-5 w-5" />
//               </IconButton>
//               <IconButton label="Start video call">
//                 <Video className="h-5 w-5" />
//               </IconButton>
//               <IconButton label="Voice call">
//                 <Phone className="h-5 w-5" />
//               </IconButton>
//               <IconButton label="More options">
//                 <MoreVertical className="h-5 w-5" />
//               </IconButton>
//             </div>
//           </header>

//           <div className="flex-1 px-5 py-5">
//             <div className="mb-4 flex flex-wrap items-center gap-3">
//               <button
//                 onClick={loadOlder}
//                 disabled={!hasOlder}
//                 className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 transition enabled:hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-35"
//               >
//                 Load older messages
//               </button>
//               <button
//                 onClick={loadNewer}
//                 disabled={!hasNewer}
//                 className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 transition enabled:hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-35"
//               >
//                 Load newer messages
//               </button>
//               <span className="text-sm text-white/40">
//                 Showing messages {windowStart + 1}–
//                 {Math.min(windowStart + WINDOW_SIZE, activeConversation.messages.length)} of {" "}
//                 {activeConversation.messages.length}
//               </span>
//             </div>

//             <div className="space-y-4">
//               {visibleMessages.map((message) => {
//                 const isMe = message.sender === "me";

//                 return (
//                   <div
//                     key={message.id}
//                     className={cx("flex items-end gap-3", isMe ? "justify-end" : "justify-start")}
//                   >
//                     {!isMe && (
//                       <Avatar
//                         src={activeConversation.person.avatar}
//                         alt={activeConversation.person.name}
//                         size="h-10 w-10"
//                       />
//                     )}

//                     <div
//                       className={cx(
//                         "max-w-[78%] rounded-[24px] px-4 py-3 shadow-lg",
//                         isMe
//                           ? "rounded-br-md bg-white text-black"
//                           : "rounded-bl-md border border-white/10 bg-white/8 text-white"
//                       )}
//                     >
//                       <p className="text-[15px] leading-relaxed">{message.text}</p>
//                       <div
//                         className={cx(
//                           "mt-2 flex items-center gap-1 text-xs",
//                           isMe ? "justify-end text-black/60" : "justify-end text-white/45"
//                         )}
//                       >
//                         <span>{message.time}</span>
//                         {isMe && <CheckCheck className="h-3.5 w-3.5" />}
//                       </div>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>

//           <footer className="border-t border-white/10 p-4">
//             <div className="flex items-center gap-3 rounded-[28px] border border-white/10 bg-black/20 p-3">
//               <button
//                 className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white/80 transition hover:bg-white/10 hover:text-white"
//                 aria-label="Send files"
//               >
//                 <Paperclip className="h-5 w-5" />
//               </button>

//               <input
//                 value={draft}
//                 onChange={(e) => setDraft(e.target.value)}
//                 onKeyDown={(e) => {
//                   if (e.key === "Enter") sendMessage();
//                 }}
//                 placeholder="Type a private message..."
//                 className="h-12 flex-1 bg-transparent px-2 text-sm text-white outline-none placeholder:text-white/35"
//               />

//               <button
//                 onClick={sendMessage}
//                 className="inline-flex h-12 items-center gap-2 rounded-2xl bg-white px-5 text-sm font-semibold text-black transition hover:scale-[1.02]"
//               >
//                 <SendHorizonal className="h-4 w-4" />
//                 Send
//               </button>
//             </div>
//           </footer>
//         </section>
//       </div>
//     </main>
//   );
// }

//   );
// }
