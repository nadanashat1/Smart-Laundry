import { Factory } from "lucide-react";
import { AdminOrdersData } from "../../Data";

const { stations } = AdminOrdersData;

const tones: Record<string, Record<string, string>> = {
  primary: { text: "text-primary", bar: "bg-primary" },
  success: { text: "text-green-700", bar: "bg-green-700" },
};

export default function StationsCard() {
  return (
    <section className="rounded-2xl bg-card p-5 shadow-sm">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-2">
        <h2 className="flex items-center gap-2 text-lg font-bold text-heading">
          <Factory size={22} className="text-primary" />
          {stations.title}
        </h2>
        <span className="rounded-full bg-primary-200 px-3 py-1 text-xs font-bold text-primary">
          {stations.badge}
        </span>
      </div>

      <ul className="space-y-4">
        {stations.items.map((station) => {
          const tone = tones[station.tone];
          return (
            <li key={station.name}>
              <div className="mb-1.5 flex items-center justify-between gap-2 text-sm">
                <span className="font-semibold text-heading">
                  {station.name}
                </span>
                <span className={`text-xs font-bold ${tone.text}`}>
                  {station.used} / {station.total} {stations.unit}
                </span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-primary-200">
                <div
                  className={`h-full rounded-full ${tone.bar}`}
                  style={{ width: `${(station.used / station.total) * 100}%` }}
                />
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
