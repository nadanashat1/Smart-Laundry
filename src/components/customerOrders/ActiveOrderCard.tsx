import { Link } from "react-router-dom";
import {
  BadgeCheck,
  CalendarDays,
  CircleCheck,
  Copy,
  RefreshCw,
  Send,
  Truck,
} from "lucide-react";
import { CustomerOrdersData } from "../../Data";

type ActiveOrder = (typeof CustomerOrdersData.activeOrders)[number];

const dotColors = ["bg-primary", "bg-primary", "bg-accent"];

export default function ActiveOrderCard({ order }: { order: ActiveOrder }) {
  return (
    <article className="rounded-2xl border border-primary/30 bg-card p-5 shadow-sm">
      <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="mb-1 flex items-center gap-2 text-xl font-bold text-heading">
            <span dir="ltr">#{order.id}</span>
            <button
              type="button"
              aria-label="Copy order number"
              onClick={() => navigator.clipboard?.writeText(`#${order.id}`)}
              className="cursor-pointer text-muted transition hover:text-primary"
            >
              <Copy size={16} />
            </button>
          </p>
          <p className="flex items-center gap-1 text-xs text-muted">
            <CalendarDays size={14} />
            {order.date}
          </p>
        </div>
        <span className="flex items-center gap-1.5 rounded-full bg-primary-200 px-3 py-1 text-xs font-bold text-primary">
          <RefreshCw size={14} />
          {order.status}
        </span>
      </div>

      <div className="mb-2 flex items-center justify-between gap-2 text-sm">
        <p className="font-bold text-heading">
          {order.stageLabel} <span className="font-normal">{order.stage}</span>
        </p>
        <span className="font-bold text-primary">{order.progress}%</span>
      </div>
      <div className="mb-2 h-2 overflow-hidden rounded-full bg-primary-200">
        <div
          className="h-full rounded-full bg-primary"
          style={{ width: `${order.progress}%` }}
        />
      </div>
      <div className="mb-5 flex justify-between text-xs">
        {order.steps.map((step, index) => (
          <span
            key={step}
            className={`flex items-center gap-1 ${
              index <= order.currentStep ? "font-bold text-primary" : "text-muted"
            }`}
          >
            <CircleCheck size={14} />
            {step}
          </span>
        ))}
      </div>

      <ul className="mb-5 space-y-2 rounded-xl bg-primary-100 p-4 text-sm">
        {order.items.map((item, index) => (
          <li key={item.name} className="flex items-center justify-between gap-2">
            <span className="flex items-center gap-2 text-body">
              <span className={`size-2 shrink-0 rounded-full ${dotColors[index % dotColors.length]}`} />
              {item.name}
              <span className="rounded bg-primary-200 px-1.5 text-xs text-primary">
                ×{item.quantity}
              </span>
            </span>
            <span className="shrink-0 font-bold text-heading">{item.price}</span>
          </li>
        ))}
      </ul>

      <div className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="flex items-center gap-3 rounded-xl bg-primary-100 p-3">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary-200 text-primary">
            <Truck size={20} />
          </span>
          <div>
            <p className="text-xs text-muted">{order.deliveryLabel}</p>
            <p className="text-sm font-bold text-heading">{order.delivery}</p>
          </div>
        </div>
        <div className="flex items-center justify-between gap-3 rounded-xl bg-accent-100 p-3">
          <div className="flex items-center gap-3">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-accent-200 text-accent">
              <BadgeCheck size={20} />
            </span>
            <div>
              <p className="text-xs text-muted">{order.totalLabel}</p>
              <p className="text-sm font-bold text-heading">{order.total}</p>
            </div>
          </div>
          <span className="rounded bg-accent-200 px-2 py-0.5 text-xs font-bold text-accent-700">
            {order.paidLabel}
          </span>
        </div>
      </div>

      <Link
        to={`/orders/${order.id}/tracking`}
        className="flex items-center justify-center gap-2 rounded-xl bg-primary py-3.5 font-bold text-white transition hover:bg-primary-hover"
      >
        <Send size={18} />
        {order.trackLabel}
      </Link>
    </article>
  );
}
