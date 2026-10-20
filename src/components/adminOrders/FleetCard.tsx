import { Bike, LocateFixed } from "lucide-react";
import { AdminOrdersData } from "../../Data";

const { fleet } = AdminOrdersData;

export default function FleetCard() {
  return (
    <section className="flex flex-col rounded-2xl bg-card p-5 shadow-sm">
      <h2 className="mb-4 flex items-center gap-2 border-b border-gray-200 pb-4 text-lg font-bold text-heading">
        <LocateFixed size={22} className="text-primary" />
        {fleet.title}
      </h2>

      <ul className="mb-4 space-y-3">
        {fleet.drivers.map((driver) => (
          <li
            key={driver.name}
            className="flex items-center justify-between gap-3 rounded-xl bg-primary-100 p-4"
          >
            <div className="flex items-center gap-3">
              <Bike size={24} className="shrink-0 text-primary" />
              <div>
                <p className="text-sm font-bold text-heading">{driver.name}</p>
                <p className="text-xs text-muted">{driver.lastUpdate}</p>
              </div>
            </div>
            <span className="shrink-0 text-xs font-bold text-primary">
              {driver.remaining}
            </span>
          </li>
        ))}
      </ul>

      <p className="mt-auto flex items-center justify-between gap-2 text-sm text-muted">
        {fleet.speedLabel}
        <span className="font-bold text-heading">{fleet.speedValue}</span>
      </p>
    </section>
  );
}
