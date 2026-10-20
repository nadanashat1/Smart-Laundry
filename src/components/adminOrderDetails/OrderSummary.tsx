import {
  CalendarDays,
  CreditCard,
  Gauge,
  Package,
  ScanLine,
  TimerOff,
  Workflow,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { AdminOrderDetailsData } from "../../Data";

const { summary, stats } = AdminOrderDetailsData;

const icons: Record<string, LucideIcon> = {
  items: Package,
  scan: ScanLine,
  payment: CreditCard,
  time: Gauge,
};

const tones: Record<string, Record<string, string>> = {
  primary: { icon: "bg-primary-200 text-primary", value: "text-heading", tag: "bg-primary-200 text-primary" },
  success: { icon: "bg-green-100 text-green-700", value: "text-green-700", tag: "bg-green-100 text-green-700" },
  danger: { icon: "bg-accent-200 text-accent-700", value: "text-accent-700", tag: "bg-accent-200 text-accent-700" },
};

export default function OrderSummary() {
  return (
    <>
      <section className="flex flex-wrap items-start justify-between gap-4 rounded-2xl bg-card p-5 shadow-sm">
        <div>
          <h1 className="mb-3 text-2xl font-bold text-heading">
            {summary.title} <span dir="ltr">{summary.id}</span>
          </h1>
          <div className="flex flex-wrap gap-2">
            {summary.tags.map((tag) => (
              <span
                key={tag.label}
                className={`rounded-full px-3 py-1 text-xs font-bold ${tones[tag.tone].tag}`}
              >
                {tag.label}
              </span>
            ))}
          </div>
        </div>

        <div className="space-y-2 text-xs text-muted">
          <p className="flex items-center gap-1.5">
            <CalendarDays size={16} />
            {summary.createdAt}
          </p>
          <p className="flex items-center gap-1.5">
            <Workflow size={16} />
            {summary.statusLabel}
            <span className="font-bold text-primary">{summary.status}</span>
          </p>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-200 px-3 py-1 font-bold text-accent-700">
            <TimerOff size={14} />
            {summary.sla}
          </span>
        </div>
      </section>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = icons[stat.icon];
          const tone = tones[stat.tone];
          return (
            <div
              key={stat.label}
              className="flex items-center gap-3 rounded-2xl bg-card p-4 shadow-sm"
            >
              <span
                className={`flex size-11 shrink-0 items-center justify-center rounded-xl ${tone.icon}`}
              >
                <Icon size={22} />
              </span>
              <div>
                <p className="text-xs text-muted">{stat.label}</p>
                <p className={`font-bold ${tone.value}`}>{stat.value}</p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
