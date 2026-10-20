import { BadgePercent, Download, ReceiptText } from "lucide-react";
import { AdminOrderDetailsData } from "../../Data";

const { invoice } = AdminOrderDetailsData;

export default function InvoiceCard() {
  return (
    <section className="rounded-2xl bg-card p-5 shadow-sm">
      <h2 className="mb-5 flex items-center gap-2 text-lg font-bold text-heading">
        <ReceiptText size={22} className="text-primary" />
        {invoice.title}
      </h2>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="rounded-xl bg-primary-100 p-4 text-sm">
          <p className="mb-3 font-bold text-heading">{invoice.payment.title}</p>
          <dl className="mb-4 space-y-2">
            {invoice.payment.rows.map((row) => (
              <div
                key={row.label}
                className="flex flex-wrap justify-between gap-2 text-xs"
              >
                <dt className="text-muted">{row.label}</dt>
                <dd className="font-bold text-heading">{row.value}</dd>
              </div>
            ))}
          </dl>
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
            <button
              type="button"
              className="flex cursor-pointer items-center gap-1 font-bold text-primary transition hover:text-primary-hover"
            >
              <Download size={14} />
              {invoice.payment.downloadLabel}
            </button>
            <span className="text-muted" dir="ltr">
              {invoice.payment.qrLabel}
            </span>
          </div>
        </div>

        <div className="flex flex-col">
          <dl className="mb-4 space-y-3 text-sm">
            {invoice.lines.map((line) => (
              <div
                key={line.label}
                className={`flex justify-between gap-2 ${
                  line.tone === "discount"
                    ? "font-bold text-accent-700"
                    : "text-muted"
                }`}
              >
                <dt className="flex items-center gap-1">
                  {line.tone === "discount" && <BadgePercent size={16} />}
                  {line.label}
                </dt>
                <dd className={line.tone === "discount" ? "" : "text-heading"}>
                  {line.value}
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-auto flex items-end justify-between gap-2 border-t border-gray-200 pt-4">
            <div>
              <p className="text-xl font-bold text-heading">
                {invoice.totalLabel}
              </p>
              <p className="text-xs text-muted">{invoice.totalNote}</p>
            </div>
            <p className="text-2xl font-bold text-primary">{invoice.total}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
