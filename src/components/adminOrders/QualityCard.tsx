import { Gauge, TrendingDown } from "lucide-react";
import { AdminOrdersData } from "../../Data";

const { quality } = AdminOrdersData;

export default function QualityCard() {
  return (
    <section className="rounded-2xl bg-card p-5 shadow-sm">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-2">
        <h2 className="flex items-center gap-2 text-lg font-bold text-heading">
          <Gauge size={22} className="text-primary" />
          {quality.title}
        </h2>
        <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700">
          {quality.badge}
        </span>
      </div>

      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="mb-1 text-sm text-muted">{quality.cycleLabel}</p>
          <p className="mb-2 text-2xl font-bold text-heading">
            {quality.cycleValue}
          </p>
          <p className="flex items-center gap-1 text-xs text-green-700">
            {quality.cycleNote}
            <TrendingDown size={14} />
          </p>
        </div>

        <div
          className="flex size-28 shrink-0 items-center justify-center rounded-full"
          style={{
            background: `conic-gradient(var(--color-primary) ${quality.score}%, var(--color-primary-200) 0)`,
          }}
        >
          <span className="flex size-20 items-center justify-center rounded-full bg-card font-bold text-heading">
            {quality.score}%
          </span>
        </div>
      </div>
    </section>
  );
}
