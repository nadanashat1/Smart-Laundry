import { ClipboardList, MapPin, UserRound } from "lucide-react";
import { AdminOrderDetailsData } from "../../Data";

const { customer } = AdminOrderDetailsData;

export default function CustomerCard() {
  return (
    <section className="rounded-2xl bg-card p-5 shadow-sm">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-2">
        <h2 className="flex items-center gap-2 text-lg font-bold text-heading">
          <UserRound size={22} className="text-primary" />
          {customer.title}
        </h2>
        <span className="rounded-full bg-primary-200 px-3 py-1 text-xs font-bold text-primary">
          {customer.otp}
        </span>
      </div>

      <div className="mb-4 flex items-center gap-3">
        <img
          src={customer.avatar}
          alt={customer.name}
          className="size-16 shrink-0 rounded-full object-cover ring-4 ring-primary-100"
        />
        <div>
          <p className="font-bold text-heading">{customer.name}</p>
          <p className="text-xs text-muted">
            {customer.membership} • <span dir="ltr">{customer.phone}</span>
          </p>
        </div>
      </div>

      <div className="rounded-xl bg-primary-100 p-4">
        <p className="mb-1 flex items-start gap-2 text-sm font-bold text-heading">
          <MapPin size={18} className="shrink-0 text-accent" />
          {customer.address}
        </p>
        <p className="mb-3 ps-6 text-xs text-muted">{customer.addressDetails}</p>

        <div className="flex flex-wrap items-center justify-between gap-2 ps-6 text-xs">
          <span className="flex items-center gap-1 text-muted">
            <ClipboardList size={14} />
            {customer.notes}
          </span>
          <button
            type="button"
            className="cursor-pointer font-bold text-primary transition hover:text-primary-hover"
          >
            {customer.historyLabel}
          </button>
        </div>
      </div>
    </section>
  );
}
