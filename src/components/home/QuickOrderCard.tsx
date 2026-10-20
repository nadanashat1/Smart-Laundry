import { Link } from "react-router-dom";
import { ArrowLeft, BadgeCheck, Shirt, Truck } from "lucide-react";
import { HomeData } from "../../Data";

const { quickOrder } = HomeData;

const stepIcons = [Shirt, Truck, BadgeCheck];

export default function QuickOrderCard() {
  return (
    <section className="rounded-2xl bg-linear-to-br from-primary to-[#0A0083] p-5 text-white shadow-sm">
      <span className="mb-3 inline-block rounded-full bg-white/15 px-3 py-1 text-xs font-semibold">
        {quickOrder.badge}
      </span>
      <h2 className="mb-2 text-xl font-bold">{quickOrder.title}</h2>
      <p className="mb-4 text-sm leading-6 text-primary-200">
        {quickOrder.description}
      </p>

      <div className="mb-4 grid grid-cols-3 gap-2 rounded-xl bg-white/10 p-3">
        {quickOrder.steps.map((step, index) => {
          const Icon = stepIcons[index];
          return (
            <div
              key={step}
              className="flex flex-col items-center gap-1 text-center text-[11px]"
            >
              <Icon size={18} />
              <span>
                {index + 1}. {step}
              </span>
            </div>
          );
        })}
      </div>

      <Link
        to={quickOrder.path}
        className="flex items-center justify-center gap-2 rounded-lg bg-accent py-3 text-sm font-bold transition hover:bg-accent-hover"
      >
        {quickOrder.actionLabel}
        <ArrowLeft size={16} />
      </Link>
    </section>
  );
}
