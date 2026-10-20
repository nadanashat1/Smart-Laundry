import { MessageSquareText, Phone, Star, Truck } from "lucide-react";
import { AdminOrderDetailsData } from "../../Data";

const { driver } = AdminOrderDetailsData;

export default function DriverCard() {
  return (
    <section className="rounded-2xl bg-card p-5 shadow-sm">
      <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-heading">
        <Truck size={22} className="text-primary" />
        {driver.title}
      </h2>

      <div className="mb-4 flex items-start gap-3 rounded-xl bg-primary-100 p-4">
        <span className="relative size-14 shrink-0">
          <img
            src={driver.avatar}
            alt={driver.name}
            className="size-full rounded-full object-cover"
          />
          <span className="absolute -bottom-0.5 -inset-e-0.5 size-3.5 rounded-full border-2 border-white bg-green-600" />
        </span>
        <div className="min-w-0">
          <div className="mb-1 flex flex-wrap items-center gap-2">
            <p className="font-bold text-heading">{driver.name}</p>
            <span className="flex items-center gap-1 text-xs font-bold text-primary">
              <Star size={14} className="fill-current" />
              {driver.rating}
            </span>
          </div>
          <p className="text-xs text-muted">{driver.vehicle}</p>
          <p className="text-xs font-semibold text-heading">{driver.location}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <a
          href={`tel:${driver.phone}`}
          className="flex items-center justify-center gap-2 rounded-lg bg-primary-200 py-2.5 text-sm font-bold text-primary transition hover:bg-primary-300"
        >
          <Phone size={16} />
          {driver.callLabel}
        </a>
        <a
          href={`https://wa.me/${driver.phone.replace("+", "")}`}
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-center gap-2 rounded-lg bg-green-50 py-2.5 text-sm font-bold text-green-700 transition hover:bg-green-100"
        >
          <MessageSquareText size={16} />
          {driver.chatLabel}
        </a>
      </div>
    </section>
  );
}
