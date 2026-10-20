import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ArrowRight,
  BadgeCheck,
  BedDouble,
  Check,
  Clock,
  Copy,
  Headset,
  NotebookPen,
  ReceiptText,
  RotateCcw,
  Shirt,
  Star,
  Wallet,
  WashingMachine,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { CustomerOrderDetailsData } from "../../../Data";
import { useOrderStore } from "../../../store/orderStore";

const data = CustomerOrderDetailsData;

const itemIcons: Record<string, LucideIcon> = {
  shirt: Shirt,
  blanket: BedDouble,
  pants: Shirt,
};

export default function CustomerOrderDetails() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const setCart = useOrderStore((state) => state.setCart);

  const piecesCount = data.items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = data.items.reduce((sum, item) => sum + item.price, 0);
  const discount = subtotal * data.invoice.discountRate;
  const total = subtotal - discount;

  const reorder = () => {
    setCart(data.cartItems);
    navigate("/orders/scheduling");
  };

  return (
    <div className="bg-background py-8">
      <div className="container flex flex-col gap-6">
        <div>
          <Link
            to="/orders"
            className="mb-2 flex w-fit items-center gap-1 text-sm font-bold text-primary transition hover:text-primary-hover"
          >
            <ArrowRight size={16} />
            {data.backLabel}
          </Link>
          <h1 className="text-2xl font-bold text-heading">{data.title}</h1>
        </div>

        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[1fr_360px]">
          <div className="flex min-w-0 flex-col gap-6">
            <section className="rounded-2xl bg-accent-200 p-5">
              <div className="mb-4 flex items-start justify-between gap-4">
                <div>
                  <span className="mb-2 inline-flex items-center gap-1 rounded-full bg-green-50 px-3 py-1 text-xs font-bold text-green-700">
                    <Check size={14} />
                    {data.status}
                  </span>
                  <h2 className="mb-1 flex items-center gap-2 text-xl font-bold text-heading">
                    {data.orderLabel} <span dir="ltr">#{orderId}</span>
                    <button
                      type="button"
                      aria-label="Copy order number"
                      onClick={() => navigator.clipboard?.writeText(`#${orderId}`)}
                      className="cursor-pointer text-muted transition hover:text-primary"
                    >
                      <Copy size={16} />
                    </button>
                  </h2>
                  <p className="text-xs font-bold text-accent-700">{data.date}</p>
                  <p className="text-sm text-body">{data.address}</p>
                  <p className="text-xs text-muted">{data.addressDetails}</p>
                </div>
                <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-accent text-white">
                  <WashingMachine size={26} />
                </span>
              </div>

              <div className="flex items-center gap-3 rounded-xl bg-card/70 p-3">
                <img
                  src={data.captain.avatar}
                  alt={data.captain.name}
                  className="size-11 shrink-0 rounded-full object-cover"
                />
                <div>
                  <p className="text-sm font-bold text-heading">
                    {data.captain.label} {data.captain.name}
                  </p>
                  <p className="flex items-center gap-1 text-xs text-green-600">
                    <Star size={12} className="fill-current" />
                    {data.captain.rating}
                  </p>
                </div>
              </div>
            </section>

            <section className="rounded-2xl bg-card p-5 shadow-sm">
              <div className="mb-4 flex items-center justify-between gap-2">
                <h2 className="flex items-center gap-2 text-lg font-bold text-heading">
                  <Shirt size={20} className="text-primary" />
                  {data.itemsTitle}
                </h2>
                <span className="rounded-full bg-accent-200 px-3 py-1 text-xs font-bold text-accent-700">
                  {piecesCount} {data.piecesLabel}
                </span>
              </div>

              <ul className="mb-4 space-y-3">
                {data.items.map((item) => {
                  const Icon = itemIcons[item.icon];
                  return (
                    <li
                      key={item.name}
                      className="flex items-center justify-between gap-3 rounded-xl bg-primary-100 p-4"
                    >
                      <div className="flex items-center gap-3">
                        <span className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-primary-200 text-primary">
                          <Icon size={20} />
                        </span>
                        <div>
                          <p className="font-bold text-heading">
                            {item.name}{" "}
                            <span className="text-accent">×{item.quantity}</span>
                          </p>
                          <p className="text-xs text-muted">{item.service}</p>
                        </div>
                      </div>
                      <p className="shrink-0 text-lg font-bold text-heading">
                        {item.price.toFixed(2)}
                        <span className="text-xs"> {data.currency}</span>
                      </p>
                    </li>
                  );
                })}
              </ul>

              <div className="rounded-xl bg-accent-100 p-4">
                <p className="mb-1 flex items-center gap-2 text-sm font-bold text-accent-700">
                  <NotebookPen size={16} />
                  {data.notesTitle}
                </p>
                <p className="text-sm text-body">"{data.notes}"</p>
              </div>
            </section>

            <section className="flex items-center gap-3 rounded-2xl border border-primary/40 bg-primary-100 p-4">
              <BadgeCheck size={22} className="shrink-0 text-primary" />
              <div>
                <p className="font-bold text-primary">{data.quality.title}</p>
                <p className="text-sm text-muted">{data.quality.description}</p>
              </div>
            </section>
          </div>

          <aside className="flex flex-col gap-6">
            <section className="rounded-2xl bg-card p-5 shadow-sm">
              <h2 className="mb-4 flex items-center gap-2 font-bold text-accent">
                <Clock size={18} />
                {data.schedule.title}
              </h2>
              <ol className="space-y-4">
                {data.schedule.steps.map((step, index) => (
                  <li key={step.label} className="relative flex gap-3">
                    {index < data.schedule.steps.length - 1 && (
                      <span className="absolute top-6 -bottom-4 start-[9px] w-0.5 bg-green-200" />
                    )}
                    <span className="relative flex size-5 shrink-0 items-center justify-center rounded-full bg-green-600 text-white">
                      <Check size={12} />
                    </span>
                    <div>
                      <p className="text-sm font-bold text-heading">{step.label}</p>
                      <p className="text-xs text-muted">{step.date}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>

            <section className="rounded-2xl bg-card p-5 shadow-sm">
              <h2 className="mb-4 flex items-center gap-2 font-bold text-heading">
                <ReceiptText size={18} className="text-primary" />
                {data.invoice.title}
              </h2>
              <dl className="mb-4 space-y-3 border-b border-gray-200 pb-4 text-sm">
                <div className="flex justify-between">
                  <dt className="text-muted">{data.invoice.subtotalLabel}</dt>
                  <dd className="font-bold text-heading">
                    {subtotal.toFixed(2)} {data.currency}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted">{data.invoice.discountLabel}</dt>
                  <dd className="font-bold text-accent">
                    -{discount.toFixed(2)} {data.currency}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted">{data.invoice.deliveryLabel}</dt>
                  <dd className="font-bold text-green-600">
                    {data.invoice.deliveryValue}
                  </dd>
                </div>
              </dl>
              <div className="flex items-end justify-between gap-2">
                <div>
                  <p className="font-bold text-heading">{data.invoice.totalLabel}</p>
                  <p className="flex items-center gap-1 text-xs text-green-600">
                    <Wallet size={14} />
                    {data.invoice.paymentMethod}
                  </p>
                </div>
                <p className="text-xl font-bold text-primary">
                  {total.toFixed(2)}
                  <span className="text-xs"> {data.currency}</span>
                </p>
              </div>
            </section>

            <button
              type="button"
              onClick={reorder}
              className="flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-primary py-3.5 font-bold text-white transition hover:bg-primary-hover"
            >
              <RotateCcw size={18} />
              {data.reorderLabel}
            </button>

            <button
              type="button"
              className="flex cursor-pointer items-center justify-center gap-1 text-sm text-muted transition hover:text-primary"
            >
              <Headset size={16} />
              {data.supportLabel}
            </button>
          </aside>
        </div>
      </div>
    </div>
  );
}
