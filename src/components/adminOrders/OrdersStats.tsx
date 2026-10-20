import { Bike, CircleCheck, Clock, Layers, WashingMachine } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { AdminOrdersData } from "../../Data";

const { stats } = AdminOrdersData;

const icons: Record<string, LucideIcon> = {
  all: Layers,
  washing: WashingMachine,
  scheduled: Clock,
  delivery: Bike,
  completed: CircleCheck,
};

const tones: Record<string, Record<string, string>> = {
  primary: { icon: "bg-primary-200 text-primary", note: "text-primary", bar: "bg-primary" },
  muted: { icon: "bg-gray-200 text-heading", note: "text-muted", bar: "bg-gray-600" },
  success: { icon: "bg-green-100 text-green-700", note: "text-green-700", bar: "bg-green-700" },
};

export default function OrdersStats() {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-5">
      {stats.map((stat) => {
        const Icon = icons[stat.icon];
        const tone = tones[stat.tone];

        return (
          <div key={stat.title} className="rounded-2xl bg-card p-4 shadow-sm">
            <div className="mb-3 flex items-center justify-between gap-2">
              <p className="text-sm text-muted">{stat.title}</p>
              <span
                className={`flex size-9 shrink-0 items-center justify-center rounded-lg ${tone.icon}`}
              >
                <Icon size={18} />
              </span>
            </div>

            <div className="mb-3 flex items-end justify-between gap-2">
              <p className="text-2xl font-bold text-heading">{stat.value}</p>
              <p
                className={`text-xs ${stat.highlight ? `font-bold ${tone.note}` : "text-muted"}`}
              >
                {stat.note}
              </p>
            </div>

            <div className="h-1.5 overflow-hidden rounded-full bg-primary-200">
              <div
                className={`h-full rounded-full ${tone.bar}`}
                style={{ width: `${stat.progress}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
