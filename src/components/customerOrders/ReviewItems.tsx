import { Link } from "react-router-dom";
import { Archive, BadgeCheck, NotebookPen, Settings2, Shirt } from "lucide-react";
import { CartData, OrderReviewData } from "../../Data";
import { useCartItems, useOrderStore } from "../../store/orderStore";

const { items: data } = OrderReviewData;
const { currency, piecesLabel } = CartData;

export default function ReviewItems() {
  const { items, piecesCount } = useCartItems();
  const notes = useOrderStore((state) => state.notes);
  const itemNotes = items
    .map((item) => notes[item.id])
    .filter((note) => note && note.trim());

  return (
    <section className="overflow-hidden rounded-2xl bg-card shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3 bg-primary-100 px-5 py-4">
        <div className="flex items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded-lg bg-accent-200 text-accent">
            <Archive size={20} />
          </span>
          <div>
            <h2 className="font-bold text-heading">
              {data.title} ({piecesCount} {piecesLabel})
            </h2>
            <p className="text-xs text-muted">{data.subtitle}</p>
          </div>
        </div>
        <Link
          to={data.editPath}
          className="flex items-center gap-1 rounded-lg bg-card px-3 py-1.5 text-xs font-bold text-primary transition hover:bg-primary-200"
        >
          <Settings2 size={14} />
          {data.editLabel}
        </Link>
      </div>

      <ul className="divide-y divide-gray-200 px-5">
        {items.map((item) => (
          <li key={item.id} className="flex items-start gap-4 py-5">
            <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary-200 text-primary">
              <Shirt size={22} />
            </span>
            <div className="flex-1">
              <h3 className="mb-1 font-bold text-heading">
                <span className="me-2 rounded bg-primary-200 px-1.5 text-sm text-primary">
                  {item.quantity}×
                </span>
                {item.reviewName}
              </h3>
              <p className="mb-1 text-xs text-muted">{item.reviewService}</p>
              <p className="flex items-center gap-1 text-xs text-green-600">
                <BadgeCheck size={14} />
                {item.reviewFeature}
              </p>
            </div>
            <div className="shrink-0 text-end">
              <p className="text-lg font-bold text-heading">
                {(item.quantity * item.price).toFixed(2)}
                <span className="text-xs"> {currency}</span>
              </p>
              <p className="text-xs text-muted">
                {item.price} {currency} {data.perPieceLabel}
              </p>
            </div>
          </li>
        ))}
      </ul>

      <div className="m-5 mt-0 rounded-xl bg-primary-100 p-4">
        <p className="mb-1 flex items-center gap-2 text-sm font-bold text-heading">
          <NotebookPen size={16} className="text-primary" />
          {data.notesTitle}
        </p>
        <p className="text-xs leading-6 text-muted">
          "{itemNotes.length > 0 ? itemNotes.join(" - ") : data.notes}"
        </p>
      </div>
    </section>
  );
}
