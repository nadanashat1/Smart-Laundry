import { Link } from "react-router-dom";
import { MessageSquareText, Mic, Sparkles } from "lucide-react";
import { HomeData } from "../../Data";

const { aiAssistant } = HomeData;

export default function AiAssistantCard() {
  return (
    <section className="rounded-2xl border border-accent/40 bg-card p-5 shadow-sm">
      <div className="mb-4 flex items-center gap-3">
        <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary text-white">
          <Sparkles size={22} />
        </span>
        <div>
          <h2 className="font-bold text-heading">{aiAssistant.title}</h2>
          <p className="text-xs text-muted">{aiAssistant.subtitle}</p>
        </div>
      </div>

      <div className="mb-4 flex items-start gap-3 rounded-xl bg-primary-100 p-4">
        <MessageSquareText size={22} className="shrink-0 text-primary" />
        <p className="text-sm leading-6 text-body">"{aiAssistant.example}"</p>
      </div>

      <Link
        to={aiAssistant.path}
        className="flex items-center justify-center gap-2 rounded-lg bg-accent/10 py-3 text-sm font-bold text-accent transition hover:bg-accent/20"
      >
        <Mic size={16} />
        {aiAssistant.actionLabel}
      </Link>
    </section>
  );
}
