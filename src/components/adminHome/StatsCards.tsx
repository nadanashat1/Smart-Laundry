import {
  ArrowUp,
  Banknote,
  CircleCheck,
  Shirt,
  TrendingUp,
  TriangleAlert,
  Truck,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { AdminHomeData } from "../../Data";

const { stats } = AdminHomeData;

const icons: Record<string, LucideIcon> = {
  orders: Shirt,
  alert: TriangleAlert,
  fleet: Truck,
  revenue: Banknote,
};

const badgeIcons: Record<string, LucideIcon> = {
  trend: TrendingUp,
  check: CircleCheck,
  up: ArrowUp,
};

const tones: Record<string, Record<string, string>> = {
  primary: {
    icon: "bg-primary-200 text-primary",
    value: "text-heading",
    badge: "bg-green-50 text-green-700",
  },
  danger: {
    icon: "bg-accent-300 text-accent-700",
    value: "text-accent",
    badge: "bg-accent-300 text-accent-700",
  },
  success: {
    icon: "bg-green-100 text-green-700",
    value: "text-heading",
    badge: "bg-green-50 text-green-700",
  },
};

export default function StatsCards() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => {
        const Icon = icons[stat.icon];
        const BadgeIcon = badgeIcons[stat.badgeIcon];
        const tone = tones[stat.tone];

        return (
          <div
            key={stat.title}
            className="flex flex-col rounded-2xl bg-card p-5 shadow-sm"
          >
            <div className="mb-6 flex items-start justify-between gap-3">
              <span
                className={`flex size-12 shrink-0 items-center justify-center rounded-xl ${tone.icon}`}
              >
                <Icon size={24} />
              </span>
              <div className="text-end">
                <p className="mb-2 text-sm text-muted">{stat.title}</p>
                <p className={`text-3xl font-bold ${tone.value}`}>
                  {stat.value}
                </p>
                {stat.unit && (
                  <p className="text-sm text-muted">{stat.unit}</p>
                )}
              </div>
            </div>

            <div className="mt-auto">
              <span
                className={`mb-2 inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold ${tone.badge}`}
              >
                {BadgeIcon && <BadgeIcon size={14} />}
                {stat.badge}
              </span>
              <p className="text-xs text-muted">{stat.note}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
