import { useState } from "react";
import { ChevronDown, Minus, NotebookPen, Plus, Shirt } from "lucide-react";
import { CartData, ServiceDetailsData } from "../../Data";
import { useOrderStore } from "../../store/orderStore";

const { currency } = CartData;
const { totalLabel, notInCartLabel, addNoteLabel, notePlaceholder } =
  ServiceDetailsData;

type Item = (typeof CartData.items)[number];

export default function ServiceItemCard({ item }: { item: Item }) {
  const quantity = useOrderStore((state) => state.quantities[item.id] ?? 0);
  const note = useOrderStore((state) => state.notes[item.id] ?? "");
  const setQuantity = useOrderStore((state) => state.setQuantity);
  const setNote = useOrderStore((state) => state.setNote);
  const [isNoteOpen, setIsNoteOpen] = useState(false);

  return (
    <article className="rounded-2xl bg-card p-4 shadow-sm">
      <div className="flex gap-4">
        <span className="flex size-20 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-primary-100 text-primary/40">
          {item.image ? (
            <img src={item.image} alt={item.name} className="size-full object-cover" />
          ) : (
            <Shirt size={32} />
          )}
        </span>

        <div className="flex-1">
          <div className="mb-1 flex items-start justify-between gap-2">
            <h3 className="font-bold text-heading">{item.name}</h3>
            <p className="shrink-0 text-lg font-bold text-primary">
              {item.price}
              <span className="text-xs"> {currency}</span>
            </p>
          </div>
          <p className="mb-3 text-xs text-muted">{item.service}</p>

          <div className="flex flex-wrap items-center justify-between gap-2">
            {quantity > 0 ? (
              <span className="rounded-md bg-green-50 px-2 py-1 text-xs font-bold text-green-700">
                {totalLabel} {quantity * item.price} {currency}
              </span>
            ) : (
              <span className="text-xs text-muted">{notInCartLabel}</span>
            )}

            <div className="flex items-center gap-2 rounded-lg bg-primary-100 p-1">
              <button
                type="button"
                aria-label="Decrease quantity"
                onClick={() => setQuantity(item.id, quantity - 1)}
                disabled={quantity === 0}
                className="flex size-7 cursor-pointer items-center justify-center rounded-md bg-card text-heading transition disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Minus size={14} />
              </button>
              <span className="w-5 text-center text-sm font-bold text-heading">
                {quantity}
              </span>
              <button
                type="button"
                aria-label="Increase quantity"
                onClick={() => setQuantity(item.id, quantity + 1)}
                className="flex size-7 cursor-pointer items-center justify-center rounded-md bg-primary text-white transition hover:bg-primary-hover"
              >
                <Plus size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {quantity > 0 && (
        <div className="mt-3 rounded-lg bg-primary-100 px-3 py-2">
          <button
            type="button"
            onClick={() => setIsNoteOpen((prev) => !prev)}
            className="flex w-full cursor-pointer items-center justify-between text-xs font-bold text-primary"
          >
            <span className="flex items-center gap-1.5">
              <NotebookPen size={14} />
              {addNoteLabel}
            </span>
            <ChevronDown
              size={14}
              className={`transition ${isNoteOpen ? "rotate-180" : ""}`}
            />
          </button>
          {isNoteOpen && (
            <textarea
              value={note}
              onChange={(e) => setNote(item.id, e.target.value)}
              placeholder={notePlaceholder}
              rows={2}
              className="mt-2 w-full resize-none rounded-md bg-card p-2 text-xs text-body outline-none focus:ring-2 focus:ring-primary/20"
            />
          )}
        </div>
      )}
    </article>
  );
}
