import { BadgeCheck, Shirt, ShieldCheck, Star, Wind } from "lucide-react";
import { ServiceDetailsData } from "../../Data";

const { hero } = ServiceDetailsData;

const featureIcons = [Wind, Shirt, ShieldCheck];

export default function ServiceDetailsHero({ title }: { title?: string }) {
  return (
    <section className="rounded-2xl bg-accent-200 p-6">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
        <span className="flex items-center gap-1.5 rounded-full bg-card px-3 py-1 text-xs font-bold text-accent-700">
          <BadgeCheck size={14} />
          {hero.badge}
        </span>
        <span className="flex items-center gap-1.5 rounded-full bg-card px-3 py-1 text-sm">
          <Star size={14} className="fill-accent text-accent" />
          <span className="font-bold text-heading">{hero.rating}</span>
          <span className="text-xs text-muted">{hero.ordersCount}</span>
        </span>
      </div>

      <h1 className="mb-2 text-3xl font-bold text-accent-700">
        {title || hero.title}
      </h1>
      <p className="mb-5 max-w-2xl text-sm leading-7 text-body">
        {hero.description}
      </p>

      <div className="flex flex-wrap gap-2">
        {hero.features.map((feature, index) => {
          const Icon = featureIcons[index];
          return (
            <span
              key={feature}
              className="flex items-center gap-1.5 rounded-lg bg-accent px-3 py-2 text-xs font-bold text-white"
            >
              <Icon size={14} />
              {feature}
            </span>
          );
        })}
      </div>
    </section>
  );
}
