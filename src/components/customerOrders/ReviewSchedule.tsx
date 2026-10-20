import { Link } from "react-router-dom";
import { CalendarCheck, CircleCheck, Clock, MapPin, Pencil, Truck } from "lucide-react";
import { OrderReviewData } from "../../Data";

const { schedule } = OrderReviewData;

export default function ReviewSchedule() {
  return (
    <section className="overflow-hidden rounded-2xl bg-card shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3 bg-primary-100 px-5 py-4">
        <div className="flex items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded-lg bg-accent-200 text-accent">
            <Truck size={20} />
          </span>
          <div>
            <h2 className="font-bold text-heading">{schedule.title}</h2>
            <p className="text-xs text-muted">{schedule.subtitle}</p>
          </div>
        </div>
        <Link
          to={schedule.editPath}
          className="flex items-center gap-1 rounded-lg bg-card px-3 py-1.5 text-xs font-bold text-primary transition hover:bg-primary-200"
        >
          <CalendarCheck size={14} />
          {schedule.editLabel}
        </Link>
      </div>

      <div className="space-y-4 p-5">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="rounded-xl bg-primary-200 p-4">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-xs text-muted">{schedule.pickupLabel}</span>
              <span className="rounded bg-card px-2 py-0.5 text-[10px] font-bold text-primary">
                {schedule.pickupStatus}
              </span>
            </div>
            <p className="mb-1 flex items-center gap-1.5 font-bold text-heading">
              <CalendarCheck size={16} className="text-primary" />
              {schedule.pickupDate}
            </p>
            <p className="flex items-center gap-1.5 text-xs text-muted">
              <Clock size={14} />
              {schedule.pickupTime}
            </p>
          </div>

          <div className="rounded-xl bg-accent-200 p-4">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-xs text-muted">{schedule.returnLabel}</span>
              <span className="rounded bg-card px-2 py-0.5 text-[10px] font-bold text-accent-700">
                {schedule.returnStatus}
              </span>
            </div>
            <p className="mb-1 flex items-center gap-1.5 font-bold text-heading">
              <CircleCheck size={16} className="text-accent" />
              {schedule.returnDate}
            </p>
            <p className="flex items-center gap-1.5 text-xs text-muted">
              <Clock size={14} />
              {schedule.returnTime}
            </p>
          </div>
        </div>

        <div className="flex items-start justify-between gap-3 rounded-xl border border-gray-200 p-4">
          <div className="flex items-start gap-3">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-accent-200 text-accent">
              <MapPin size={18} />
            </span>
            <div>
              <p className="mb-1 font-bold text-heading">{schedule.addressLabel}</p>
              <p className="mb-1 text-sm text-body">{schedule.address}</p>
              <p className="text-xs text-muted">{schedule.addressNote}</p>
            </div>
          </div>
          <Link
            to={schedule.editPath}
            className="flex shrink-0 items-center gap-1 rounded-lg bg-primary-100 px-2 py-1 text-xs font-bold text-primary"
          >
            <Pencil size={12} />
            {schedule.editLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
