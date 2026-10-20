import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import {
  BedDouble,
  Mic,
  Send,
  Shirt,
  Sparkles,
  UserRound,
  WashingMachine,
  Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import DraftCard from "../../components/aiAssistant/DraftCard";
import { AiAssistantData } from "../../Data";
import { parseOrderMessage } from "../../utils/parseOrderMessage";
import type { OrderDraft } from "../../utils/parseOrderMessage";

const data = AiAssistantData;

const suggestionIcons: Record<string, LucideIcon> = {
  wash: WashingMachine,
  dry: Shirt,
  bedding: BedDouble,
  express: Zap,
};

type Message = {
  id: number;
  from: "bot" | "user";
  time: string;
  text?: string;
  draft?: OrderDraft;
};

function currentTime() {
  return new Date().toLocaleTimeString("ar-EG", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

const firstDraft = parseOrderMessage(data.exampleMessage);

const initialMessages: Message[] = [
  { id: 1, from: "user", time: "10:42 ص", text: data.exampleMessage },
  ...(firstDraft
    ? [{ id: 2, from: "bot" as const, time: data.nowLabel, draft: firstDraft }]
    : []),
];

export default function AiAssistant() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messages.length > initialMessages.length) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const sendMessage = (event: FormEvent) => {
    event.preventDefault();
    const text = input.trim();
    if (!text) return;

    const draft = parseOrderMessage(text);
    const time = currentTime();

    setMessages((prev) => [
      ...prev,
      { id: prev.length + 1, from: "user", time, text },
      draft
        ? { id: prev.length + 2, from: "bot", time, draft }
        : { id: prev.length + 2, from: "bot", time, text: data.notUnderstood },
    ]);
    setInput("");
  };

  const focusInput = () => inputRef.current?.focus();

  return (
    <div className="bg-background py-8">
      <div className="container flex max-w-4xl flex-col gap-6">
        <section className="flex items-center justify-between gap-4 rounded-2xl border-2 border-accent/60 bg-accent-200 p-6">
          <div>
            <h1 className="mb-2 text-3xl font-bold text-heading">{data.hero.title}</h1>
            <p className="text-muted">{data.hero.description}</p>
          </div>
          <span className="relative flex size-20 shrink-0 items-center justify-center rounded-2xl bg-primary text-white">
            <Sparkles size={36} />
            <span className="absolute -bottom-2 -inset-e-2 flex size-9 items-center justify-center rounded-full bg-accent">
              <Mic size={18} />
            </span>
          </span>
        </section>

        <div className="flex items-start gap-3">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary text-white">
            <Sparkles size={16} />
          </span>
          <div className="max-w-md">
            <p className="rounded-2xl rounded-ss-none border-2 border-primary/50 bg-card p-4 text-sm leading-7 text-heading">
              {data.greeting}{" "}
              <span className="text-primary">{data.greetingExample}</span>
              <br />
              <span className="font-bold">{data.greetingEnd}</span>
            </p>
            <span className="text-xs text-muted">10:41 ص</span>
          </div>
        </div>

        <section>
          <p className="mb-3 text-sm text-muted">{data.suggestionsTitle}</p>
          <div className="grid grid-cols-2 gap-3">
            {data.suggestions.map((suggestion) => {
              const Icon = suggestionIcons[suggestion.icon];
              return (
                <button
                  key={suggestion.label}
                  type="button"
                  onClick={() => {
                    setInput(suggestion.text);
                    focusInput();
                  }}
                  className="flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-primary-100 py-3 text-sm font-bold text-primary transition hover:bg-primary-200"
                >
                  <Icon size={16} />
                  {suggestion.label}
                </button>
              );
            })}
          </div>
        </section>

        {messages.map((message) =>
          message.from === "user" ? (
            <div key={message.id} className="flex flex-row-reverse items-start gap-3">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-gray-300 text-heading">
                <UserRound size={18} />
              </span>
              <div className="max-w-md text-end">
                <p className="rounded-2xl rounded-se-none bg-primary-200 p-4 text-start text-heading">
                  {message.text}
                </p>
                <span className="text-xs text-muted">{message.time}</span>
              </div>
            </div>
          ) : (
            <div key={message.id} className="flex items-start gap-3">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary text-white">
                <Sparkles size={16} />
              </span>
              <div className="min-w-0 flex-1">
                {message.draft ? (
                  <DraftCard order={message.draft} onRetry={focusInput} />
                ) : (
                  <p className="max-w-md rounded-2xl rounded-ss-none border-2 border-primary/50 bg-card p-4 text-sm leading-7 text-heading">
                    {message.text}
                  </p>
                )}
                <span className="text-xs text-muted">{message.time}</span>
              </div>
            </div>
          ),
        )}

        <div ref={bottomRef} />

        <form
          onSubmit={sendMessage}
          className="sticky bottom-4 flex items-center gap-2 rounded-2xl bg-card p-2 shadow-lg"
        >
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={data.inputPlaceholder}
            className="flex-1 bg-transparent px-3 py-3 text-heading outline-none placeholder:text-gray-500"
          />
          {input.trim() ? (
            <button
              type="submit"
              aria-label="Send message"
              className="flex size-12 shrink-0 cursor-pointer items-center justify-center rounded-xl bg-primary text-white transition hover:bg-primary-hover"
            >
              <Send size={20} className="rtl:-scale-x-100" />
            </button>
          ) : (
            <button
              type="button"
              aria-label="Voice message"
              className="flex size-12 shrink-0 cursor-pointer items-center justify-center rounded-xl bg-accent text-white transition hover:bg-accent-hover"
            >
              <Mic size={20} />
            </button>
          )}
        </form>

        <p className="-mt-3 text-center text-xs text-muted">{data.disclaimer}</p>
      </div>
    </div>
  );
}
