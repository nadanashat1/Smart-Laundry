import { Link, useNavigate } from "react-router-dom";
import {
  CalendarDays,
  Check,
  Eye,
  RotateCcw,
  WashingMachine,
} from "lucide-react";
import { CustomerOrdersData } from "../../Data";
import { useOrderStore } from "../../store/orderStore";

type PastOrder = (typeof CustomerOrdersData.pastOrders)[number];

const { reorderLabel, invoiceLabel } = CustomerOrdersData;
const dotColors = ["bg-primary", "bg-primary", "bg-accent"];

export default function PastOrderCard({ order }: { order: PastOrder }) {
  const setCart = useOrderStore((state) => state.setCart);
  const navigate = useNavigate();

  const reorder = () => {
    setCart(order.cartItems);
    navigate("/orders/scheduling");
  };

  return (
    <article className="rounded-2xl border border-primary/30 bg-card p-5 shadow-sm">
      <div className="mb-1 flex flex-wrap items-center justify-between gap-2">
        <p className="text-xl font-bold text-heading" dir="ltr">
          #{order.id}
        </p>
        <span className="flex items-center gap-1 rounded-full bg-accent-200 px-3 py-1 text-xs font-bold text-accent-700">
          <Check size={14} />
          {order.status}
        </span>
      </div>
      <p className="mb-5 flex items-center gap-1 text-xs text-muted">
        <CalendarDays size={14} />
        {order.date}
      </p>

      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="flex items-start gap-2">
          <WashingMachine size={22} className="shrink-0 text-primary" />
          <div>
            <p className="font-bold text-heading">{order.service}</p>
            <p className="text-sm text-muted">{order.itemsCount}</p>
          </div>
        </div>
        <div className="text-end">
          <p className="text-2xl font-bold text-heading">{order.total}</p>
          <p className="text-xs text-muted">{order.paymentMethod}</p>
        </div>
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

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={reorder}
          className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl bg-primary-200 py-3 text-sm font-bold text-primary transition hover:bg-primary-300"
        >
          <RotateCcw size={16} />
          {reorderLabel}
        </button>
        <Link
          to={`/orders/${order.id}`}
          className="flex items-center gap-1 px-2 text-sm font-bold text-body transition hover:text-primary"
        >
          <Eye size={16} />
          {invoiceLabel}
        </Link>
      </div>
    </article>
  );
}
