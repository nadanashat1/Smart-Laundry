import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Minus,
  Plus,
  ReceiptText,
  Shirt,
  ShoppingBag,
  Trash2,
} from "lucide-react";
import { CartData } from "../../Data";
import { useCartItems, useOrderStore } from "../../store/orderStore";

const cart = CartData;

type CartSummaryProps = {
  actionLabel: string;
  actionPath: string;
  showTotals?: boolean;
};

export default function CartSummary({
  actionLabel,
  actionPath,
  showTotals = false,
}: CartSummaryProps) {
  const { items, piecesCount, subtotal } = useCartItems();
  const setQuantity = useOrderStore((state) => state.setQuantity);

  return (
    <section className="overflow-hidden rounded-2xl bg-card shadow-sm">
      <h2 className="flex items-center gap-2 bg-primary-100 px-5 py-4 text-lg font-bold text-heading">
        <span className="flex size-9 items-center justify-center rounded-lg bg-primary text-white">
          <ReceiptText size={18} />
        </span>
        {cart.title} ({piecesCount} {cart.piecesLabel})
      </h2>

      <div className="p-5">
        {items.length === 0 ? (
          <p className="py-6 text-center text-sm text-muted">
            {cart.emptyMessage}
          </p>
        ) : (
          <ul className="mb-4 space-y-4 border-b border-gray-200 pb-4">
            {items.map((item) => (
              <li key={item.id} className="flex items-center gap-3">
                <span className="flex size-11 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-primary-100 text-primary/40">
                  {item.image ? (
                    <img src={item.image} alt={item.name} className="size-full object-cover" />
                  ) : (
                    <Shirt size={20} />
                  )}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-bold text-heading">
                    {item.name}
                  </p>
                  <p className="text-xs text-muted">
                    {item.quantity} × {item.price} {cart.currency}
                  </p>
                </div>
                <p className="shrink-0 text-sm font-bold text-heading">
                  {item.quantity * item.price} {cart.currency}
                </p>
                <div className="flex shrink-0 items-center gap-1">
                  <button
                    type="button"
                    aria-label="Decrease quantity"
                    onClick={() => setQuantity(item.id, item.quantity - 1)}
                    className="cursor-pointer p-1 text-muted transition hover:text-heading"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="w-4 text-center text-sm font-bold">
                    {item.quantity}
                  </span>
                  <button
                    type="button"
                    aria-label="Increase quantity"
                    onClick={() => setQuantity(item.id, item.quantity + 1)}
                    className="cursor-pointer p-1 text-muted transition hover:text-heading"
                  >
                    <Plus size={14} />
                  </button>
                  <button
                    type="button"
                    aria-label="Remove item"
                    onClick={() => setQuantity(item.id, 0)}
                    className="cursor-pointer p-1 text-accent transition hover:text-accent-700"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}

        {showTotals && items.length > 0 && (
          <dl className="mb-4 space-y-2 rounded-xl bg-primary-100 p-4 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted">{cart.subtotalLabel}</dt>
              <dd className="font-bold text-heading">
                {subtotal.toFixed(2)} {cart.currency}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted">{cart.deliveryLabel}</dt>
              <dd className="font-bold text-green-600">{cart.deliveryValue}</dd>
            </div>
          </dl>
        )}

        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex size-9 items-center justify-center rounded-lg bg-primary-200 text-primary">
              <ShoppingBag size={18} />
            </span>
            <div>
              <p className="text-xs text-muted">{cart.selectedLabel}</p>
              <p className="text-sm font-bold text-heading">
                {piecesCount} {cart.selectedSuffix}
              </p>
            </div>
          </div>
          <div className="text-end">
            <p className="text-xs text-muted">{cart.estimatedLabel}</p>
            <p className="text-xl font-bold text-primary">
              {subtotal}
              <span className="text-xs"> {cart.currency}</span>
            </p>
          </div>
        </div>

        {items.length > 0 ? (
          <Link
            to={actionPath}
            className="flex items-center justify-center gap-2 rounded-lg bg-accent py-3 text-sm font-bold text-white transition hover:bg-accent-hover"
          >
            {actionLabel}
            <ArrowLeft size={16} />
          </Link>
        ) : (
          <span className="flex cursor-not-allowed items-center justify-center gap-2 rounded-lg bg-gray-300 py-3 text-sm font-bold text-white">
            {actionLabel}
            <ArrowLeft size={16} />
          </span>
        )}
      </div>
    </section>
  );
}
