import {
  CalendarDays,
  CircleCheck,
  Eye,
  RotateCcw,
  WashingMachine,
} from "lucide-react";
import { HomeData } from "../../Data";

const { lastOrder } = HomeData;

const dotColors = ["bg-primary", "bg-primary", "bg-accent"];

export default function LastOrderCard() {
  return (
    <section className="rounded-2xl border border-primary/20 bg-card p-5 shadow-sm">
      <div className="mb-1 flex items-center justify-between gap-2">
        <p className="font-bold text-heading" dir="ltr">
          {lastOrder.id}
        </p>
        <span className="flex items-center gap-1 rounded-full bg-accent/10 px-2.5 py-1 text-[11px] font-bold text-accent">
          <CircleCheck size={12} />
          {lastOrder.status}
        </span>
      </div>
      <p className="mb-4 flex items-center gap-1 text-xs text-muted">
        <CalendarDays size={14} />
        {lastOrder.date}
      </p>

      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="flex items-start gap-2">
          <WashingMachine size={20} className="shrink-0 text-primary" />
          <div>
            <p className="text-sm font-bold text-heading">
              {lastOrder.service}
            </p>
            <p className="text-xs text-muted">{lastOrder.itemsCount}</p>
          </div>
        </div>
        <div className="text-end">
          <p className="font-bold text-heading">{lastOrder.total}</p>
          <p className="text-xs text-muted">{lastOrder.paymentMethod}</p>
        </div>
      </div>

      <ul className="mb-5 space-y-2">
        {lastOrder.items.map((item, index) => (
          <li
            key={item.name}
            className="flex items-center justify-between gap-2 text-xs"
          >
            <span className="flex items-center gap-2 text-body">
              <span
                className={`size-2 shrink-0 rounded-full ${dotColors[index % dotColors.length]}`}
              />
              {item.name}
            </span>
            <span className="flex shrink-0 items-center gap-3">
              <span className="rounded bg-primary-200 px-1.5 py-0.5 text-primary">
                x{item.quantity}
              </span>
              <span className="font-bold text-heading">{item.price}</span>
            </span>
          </li>
        ))}
      </ul>

      <div className="flex items-center gap-3">
        <button
          type="button"
          className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-primary-200 py-2.5 text-sm font-bold text-primary transition hover:bg-primary/15"
        >
          <RotateCcw size={16} />
          {lastOrder.reorderLabel}
        </button>
        <button
          type="button"
          className="flex items-center gap-1 px-2 text-sm font-semibold text-body transition hover:text-primary"
        >
          <Eye size={16} />
          {lastOrder.invoiceLabel}
        </button>
      </div>
    </section>
  );
}
