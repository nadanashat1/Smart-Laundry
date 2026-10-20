import { AdminHomeData } from "../../Data";

const { flowChart } = AdminHomeData;

const barColors: Record<string, string> = {
  low: "bg-primary-200",
  normal: "bg-primary",
  peak: "bg-accent",
};

export default function FlowChart() {
  return (
    <section className="rounded-2xl bg-card p-5 shadow-sm">
      <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="mb-1 text-lg font-bold text-heading">
            {flowChart.title}
          </h2>
          <p className="text-xs text-muted">{flowChart.subtitle}</p>
        </div>
        <span className="rounded-full bg-primary-200 px-3 py-1 text-xs font-bold text-primary">
          {flowChart.capacityLabel}
        </span>
      </div>

      <div className="relative mb-2 h-48">
        <div
          className="absolute inset-x-0 border-t-2 border-dashed border-accent/40"
          style={{ bottom: `${flowChart.threshold}%` }}
        >
          <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded bg-accent-300 px-2 py-0.5 text-[10px] text-accent-700">
            {flowChart.thresholdLabel}
          </span>
        </div>

        <div className="flex h-full items-end gap-2">
          {flowChart.bars.map((bar, index) => (
            <div
              key={`${bar.time}-${index}`}
              title={`${bar.value}%`}
              className={`flex-1 rounded-t-lg ${barColors[bar.status]}`}
              style={{ height: `${bar.value}%` }}
            />
          ))}
        </div>
      </div>

      <div className="mb-5 flex gap-2">
        {flowChart.bars.map((bar, index) => (
          <span
            key={`${bar.time}-${index}`}
            className={`flex-1 text-center text-xs ${
              bar.status === "peak" ? "font-bold text-accent" : "text-muted"
            }`}
          >
            {bar.time}
          </span>
        ))}
      </div>

      <p className="flex items-center gap-2 rounded-xl bg-accent-100 px-4 py-3 text-xs text-body">
        <span className="size-2.5 shrink-0 rounded-full bg-accent" />
        {flowChart.peaksNote}
      </p>
    </section>
  );
}
