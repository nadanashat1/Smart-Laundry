import { Link } from "react-router-dom";
import { CircleCheck, MessageSquareText, Zap } from "lucide-react";
import { CartData, OrderReviewData, PickupSchedulingData } from "../../Data";
import { useCartItems, useOrderStore } from "../../store/orderStore";

const { invoice } = OrderReviewData;
const { currency, piecesLabel } = CartData;

export default function InvoiceSummary() {
  const { piecesCount, subtotal } = useCartItems();
  const speedId = useOrderStore((state) => state.speedId);
  const speed = PickupSchedulingData.speeds.find((item) => item.id === speedId);
  const urgentFee = speed?.fee ?? 0;
  const total = subtotal + urgentFee;

  return (
    <section className="rounded-2xl bg-card p-5 shadow-sm">
      <h2 className="mb-4 text-lg font-bold text-heading">{invoice.title}</h2>

      <dl className="mb-4 space-y-3 text-sm">
        <div className="flex justify-between gap-2">
          <dt className="text-muted">
            {invoice.servicesLabel} ({piecesCount} {piecesLabel})
          </dt>
          <dd className="font-bold text-heading">
            {subtotal.toFixed(2)} {currency}
          </dd>
        </div>
        <div className="flex justify-between gap-2">
          <dt className="flex items-center gap-1 text-muted">
            <Zap size={14} className="text-accent" />
            {invoice.deliveryLabel}
          </dt>
          <dd className="font-bold text-accent">{invoice.deliveryValue}</dd>
        </div>
        {urgentFee > 0 && (
          <div className="flex justify-between gap-2">
            <dt className="text-muted">{invoice.urgentLabel}</dt>
            <dd className="font-bold text-heading">
              {urgentFee.toFixed(2)} {currency}
            </dd>
          </div>
        )}
        <div className="flex justify-between gap-2">
          <dt className="text-muted">{invoice.taxLabel}</dt>
          <dd className="text-xs text-muted">{invoice.taxValue}</dd>
        </div>
      </dl>

      <div className="mb-4 flex items-center justify-between gap-2 rounded-xl bg-primary-100 p-4">
        <div>
          <p className="text-xs text-muted">{invoice.totalLabel}</p>
          <p className="text-xs text-muted">{invoice.totalNote}</p>
        </div>
        <p className="text-3xl font-bold text-primary">
          {total.toFixed(2)}
          <span className="text-sm"> {currency}</span>
        </p>
      </div>

      <Link
        to={invoice.confirmPath}
        className="mb-3 flex items-center justify-center gap-2 rounded-lg bg-accent py-3 text-sm font-bold text-white transition hover:bg-accent-hover"
      >
        <CircleCheck size={18} />
        {invoice.confirmLabel}
      </Link>

      <p className="flex items-center justify-center gap-1 text-xs text-muted">
        <MessageSquareText size={14} className="text-primary" />
        {invoice.helpLabel}
        <button
          type="button"
          className="cursor-pointer font-bold text-heading underline-offset-2 hover:underline"
        >
          {invoice.helpAction}
        </button>
      </p>
    </section>
  );
}
