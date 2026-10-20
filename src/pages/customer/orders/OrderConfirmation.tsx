import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, CalendarClock, Check, ClipboardCheck, Copy } from "lucide-react";
import { OrderConfirmationData } from "../../../Data";

const data = OrderConfirmationData;

export default function OrderConfirmation() {
  const [isCopied, setIsCopied] = useState(false);

  const copyOrderId = async () => {
    try {
      await navigator.clipboard.writeText(`#${data.orderId}`);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch {
      setIsCopied(false);
    }
  };

  return (
    <div className="relative overflow-hidden bg-background py-16">
      <span className="pointer-events-none absolute -bottom-24 -inset-s-24 size-96 rounded-full bg-accent/15 blur-3xl" />

      <div className="container relative">
        <section className="mx-auto max-w-3xl rounded-3xl bg-card px-6 py-10 text-center shadow-sm">
          <div className="relative mx-auto mb-5 flex size-24 items-center justify-center rounded-full bg-primary-200">
            <span className="flex size-16 items-center justify-center rounded-full bg-card text-primary">
              <Check size={34} strokeWidth={3} />
            </span>
            <span className="absolute -top-1 -inset-e-1 flex size-8 items-center justify-center rounded-full bg-primary text-white">
              <ClipboardCheck size={16} />
            </span>
          </div>

          <span className="mb-3 inline-block rounded-full bg-primary-100 px-3 py-1 text-xs font-bold text-primary">
            {data.badge}
          </span>
          <h1 className="mb-3 text-3xl font-bold text-heading">{data.title}</h1>
          <p className="mx-auto mb-8 max-w-xl text-sm leading-7 text-muted">
            {data.description}
          </p>

          <div className="mx-auto mb-6 flex max-w-md flex-wrap justify-center gap-3">
            <div className="flex flex-1 items-center justify-between gap-3 rounded-xl bg-primary-100 px-4 py-3">
              <div className="text-start">
                <p className="text-xs text-muted">{data.orderLabel}</p>
                <p className="text-xl font-bold text-primary" dir="ltr">
                  #{data.orderId}
                </p>
              </div>
              <button
                type="button"
                onClick={copyOrderId}
                className="flex cursor-pointer items-center gap-1 rounded-lg bg-card px-2 py-1 text-xs font-bold text-heading transition hover:bg-primary-200"
              >
                {isCopied ? <Check size={14} /> : <Copy size={14} />}
                {isCopied ? data.copiedLabel : data.copyLabel}
              </button>
            </div>

            <div className="flex items-center gap-3 rounded-xl bg-primary-100 px-4 py-3">
              <div className="text-start">
                <p className="text-xs text-muted">{data.dateLabel}</p>
                <p className="text-sm font-bold text-heading">{data.date}</p>
              </div>
              <CalendarClock size={20} className="text-muted" />
            </div>
          </div>

          <Link
            to={`/orders/${data.orderId}/tracking`}
            className="mx-auto flex max-w-md items-center justify-center gap-2 rounded-lg bg-accent py-3 text-sm font-bold text-white transition hover:bg-accent-hover"
          >
            {data.trackLabel}
            <ArrowLeft size={16} />
          </Link>
        </section>
      </div>
    </div>
  );
}
