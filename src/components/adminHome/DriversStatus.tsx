import { Truck } from "lucide-react";
import { AdminHomeData } from "../../Data";

const { drivers } = AdminHomeData;

export default function DriversStatus() {
  return (
    <section className="rounded-2xl bg-card p-5 shadow-sm">
      <h2 className="mb-5 text-lg font-bold text-heading">{drivers.title}</h2>

      <ul className="space-y-5">
        {drivers.items.map((driver) => (
          <li key={driver.name}>
            <div className="mb-4 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <img
                  src={driver.avatar}
                  alt={driver.name}
                  className="size-11 shrink-0 rounded-full object-cover"
                />
                <div>
                  <p className="font-bold text-heading">{driver.name}</p>
                  <p className="text-xs text-muted">{driver.vehicle}</p>
                </div>
              </div>
              <span className="rounded-full bg-primary-200 px-3 py-1 text-xs font-bold text-primary">
                {driver.status}
              </span>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
              <span className="flex items-center gap-2 text-muted">
                <Truck size={16} className="text-primary" />
                {driver.remaining}
              </span>
              <span className="text-muted">
                {driver.destinationLabel}{" "}
                <span className="font-bold text-heading">
                  {driver.destination}
                </span>
              </span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
