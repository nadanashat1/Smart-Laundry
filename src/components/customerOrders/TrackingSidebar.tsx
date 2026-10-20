import { Headset, MessageSquareText, Phone, ReceiptText, Star, Truck } from "lucide-react";
import { OrderTrackingData } from "../../Data";

const { driver, invoice, support } = OrderTrackingData;

export default function TrackingSidebar() {
  return (
    <aside className="flex flex-col gap-6">
      <section className="rounded-2xl bg-card p-5 shadow-sm">
        <div className="mb-3 flex items-center justify-between gap-2">
          <span className="text-xs text-muted">{driver.label}</span>
          <span className="flex items-center gap-1 rounded-full bg-primary-100 px-2 py-0.5 text-xs font-bold text-heading">
            <Star size={12} className="fill-accent text-accent" />
            {driver.rating}
          </span>
        </div>
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <img
              src={driver.avatar}
              alt={driver.name}
              className="size-14 shrink-0 rounded-full object-cover"
            />
            <p className="text-lg font-bold text-heading">{driver.name}</p>
          </div>
          <div className="flex gap-2">
            <a
              href={`tel:${driver.phone}`}
              aria-label="Call driver"
              className="flex size-10 items-center justify-center rounded-xl bg-primary-100 text-primary transition hover:bg-primary-200"
            >
              <Phone size={18} />
            </a>
            <button
              type="button"
              aria-label="Chat with driver"
              className="flex size-10 cursor-pointer items-center justify-center rounded-xl bg-accent-200 text-accent transition hover:bg-accent-300"
            >
              <MessageSquareText size={18} />
            </button>
          </div>
        </div>
      </section>

      <section className="rounded-2xl bg-card p-5 shadow-sm">
        <div className="mb-4 flex items-center justify-between gap-2">
          <h2 className="flex items-center gap-2 font-bold text-heading">
            <ReceiptText size={20} className="text-primary" />
            {invoice.title}
          </h2>
          <span className="rounded-full bg-green-50 px-2 py-0.5 text-xs font-bold text-green-700">
            {invoice.paidLabel}
          </span>
        </div>

        <ul className="mb-4 space-y-3 text-sm">
          {invoice.items.map((item) => (
            <li key={item.name} className="flex items-center justify-between gap-2">
              <span className="flex items-center gap-2 text-body">
                <span className="flex size-6 items-center justify-center rounded bg-primary-200 text-xs font-bold text-primary">
                  {item.quantity}
                </span>
                {item.name}
              </span>
              <span className="shrink-0 font-bold text-heading">{item.price}</span>
            </li>
          ))}
          <li className="flex items-center justify-between gap-2">
            <span className="flex items-center gap-2 text-body">
              <Truck size={16} className="text-muted" />
              {invoice.deliveryLabel}
            </span>
            <span className="font-bold text-green-600">{invoice.deliveryValue}</span>
          </li>
        </ul>

        <div className="flex items-center justify-between rounded-xl bg-primary-100 p-4">
          <div>
            <p className="text-xs text-muted">{invoice.totalLabel}</p>
            <p className="text-xs text-muted">{invoice.totalNote}</p>
          </div>
          <p className="text-2xl font-bold text-primary">{invoice.total}</p>
        </div>
      </section>

      <section className="flex items-center justify-between gap-3 rounded-2xl bg-card p-5 shadow-sm">
        <div className="flex items-center gap-3">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary-100 text-primary">
            <Headset size={20} />
          </span>
          <div>
            <p className="font-bold text-heading">{support.title}</p>
            <p className="text-xs text-muted">{support.description}</p>
          </div>
        </div>
        <button
          type="button"
          className="shrink-0 cursor-pointer rounded-lg bg-accent px-4 py-2 text-xs font-bold text-white transition hover:bg-accent-hover"
        >
          {support.actionLabel}
        </button>
      </section>
    </aside>
  );
}
