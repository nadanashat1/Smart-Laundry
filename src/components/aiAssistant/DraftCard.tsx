import { useNavigate } from "react-router-dom";
import { BedDouble, Clock, NotebookPen, ReceiptText, Shirt, Sparkles } from "lucide-react";
import { AiAssistantData, CartData } from "../../Data";
import { useOrderStore } from "../../store/orderStore";
import type { OrderDraft } from "../../utils/parseOrderMessage";

const { draft } = AiAssistantData;

type DraftCardProps = {
  order: OrderDraft;
  onRetry: () => void;
};

export default function DraftCard({ order, onRetry }: DraftCardProps) {
  const navigate = useNavigate();
  const setCart = useOrderStore((state) => state.setCart);

  const review = () => {
    setCart(order.items);
    navigate(draft.reviewPath);
  };

  return (
    <div className="rounded-2xl border border-primary/40 bg-card p-5 shadow-sm">
      <h3 className="mb-1 flex items-center gap-2 text-lg font-bold text-heading">
        <Sparkles size={18} className="text-accent" />
        {draft.title}
      </h3>
      <p className="mb-4 text-sm text-muted">{draft.subtitle}</p>

      <div className="mb-4 rounded-xl bg-primary-100 p-4">
        <p className="mb-3 flex items-center gap-1.5 text-sm font-bold text-primary">
          <ReceiptText size={16} />
          {draft.listTitle}
        </p>

        <ul className="mb-3 space-y-2">
          {order.items.map((item) => {
            const Icon = item.id === "winter-blanket" ? BedDouble : Shirt;
            return (
              <li
                key={item.id}
                className="flex items-center justify-between gap-3 rounded-lg bg-card p-3"
              >
                <span className="flex items-center gap-3 text-sm font-bold text-heading">
                  <span className="flex size-9 items-center justify-center rounded-full bg-primary-200 text-primary">
                    <Icon size={16} />
                  </span>
                  {item.name}
                  <span className="text-xs font-normal text-muted">({item.service})</span>
                </span>
                <span className="font-bold text-heading">{item.quantity}x</span>
              </li>
            );
          })}
        </ul>

        <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
          <span className="flex items-center gap-1 text-muted">
            <Clock size={14} />
            {draft.scheduleLabel} {order.schedule}
          </span>
          <span className="text-base font-bold text-primary">
            {order.estimate} {CartData.currency} {draft.estimateSuffix}
          </span>
        </div>
      </div>

      <button
        type="button"
        onClick={onRetry}
        className="mb-4 flex w-full cursor-pointer items-center gap-3 rounded-xl p-2 text-start transition hover:bg-primary-100"
      >
        <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-gray-200 text-body">
          <NotebookPen size={18} />
        </span>
        <span>
          <span className="block font-bold text-heading">{draft.retryTitle}</span>
          <span className="block text-xs text-muted">{draft.retryDescription}</span>
        </span>
      </button>

      <button
        type="button"
        onClick={review}
        className="w-full cursor-pointer rounded-xl bg-accent py-3 font-bold text-white transition hover:bg-accent-hover"
      >
        {draft.reviewLabel}
      </button>
    </div>
  );
}
