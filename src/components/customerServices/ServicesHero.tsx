import { BadgeCheck } from "lucide-react";
import { CustomerServicesData } from "../../Data";

const { hero } = CustomerServicesData;

const statColors: Record<string, string> = {
  primary: "text-primary",
  success: "text-green-600",
  danger: "text-accent",
};

export default function ServicesHero() {
  return (
    <section className="flex flex-col gap-6 rounded-2xl bg-linear-to-l from-primary-100 to-card p-6 shadow-sm lg:flex-row lg:items-center lg:justify-between">
      <div className="max-w-2xl">
        <span className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-primary-200 px-3 py-1 text-xs font-bold text-primary">
          <BadgeCheck size={14} />
          {hero.badge}
        </span>
        <h1 className="mb-3 text-3xl font-bold text-heading">{hero.title}</h1>
        <p className="text-sm leading-7 text-muted">{hero.description}</p>
      </div>

      <div className="flex shrink-0 divide-x divide-gray-200 rounded-xl bg-primary-100 py-3 rtl:divide-x-reverse">
        {hero.stats.map((stat) => (
          <div key={stat.label} className="px-5 text-center">
            <p className={`text-xl font-bold ${statColors[stat.tone]}`}>
              {stat.value}
            </p>
            <p className="text-xs text-muted">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
