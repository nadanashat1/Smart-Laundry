import type { LucideIcon } from "lucide-react";

type ItemsStatCardProps = {
  title: string;
  value: string;
  description?: string;
  icon: LucideIcon;
  iconColor?: string;
  iconBgColor?: string;
  descriptionColor?: string;
};

export function ItemsStatCard({
  title,
  value,
  description,
  icon: Icon,
  iconColor = "#243BFF",
  iconBgColor = "#D5DFFF",
  descriptionColor,
}: ItemsStatCardProps) {
  return (
    <article className="flex min-h-[110px] items-center justify-between gap-3 rounded-2xl border border-[#EEF1F7] bg-white p-4 shadow-sm">
      <div className="min-w-0">
        <p className="text-xs text-muted">{title}</p>

        <p className="mt-2 text-lg font-bold text-heading">{value}</p>

        {description && (
          <p
            className="mt-1 text-xs"
            style={{ color: descriptionColor ?? "#737373" }}
          >
            {description}
          </p>
        )}
      </div>

      <div
        className="flex size-12 shrink-0 items-center justify-center rounded-xl"
        style={{ backgroundColor: iconBgColor, color: iconColor }}
      >
        <Icon size={22} />
      </div>
    </article>
  );
}
