import { Timer, Star, Gauge, Shirt } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  valueColor?: string;
  subValue?: string;
  badgeText?: string;
  badgeColor?: string;
  iconSrc: string;
  iconColor?: string;
  iconBgColor?: string;
}

const statIcons = {
  shirt: Shirt,
  timer: Timer,
  star: Star,
  gauge: Gauge,
};

export const StatCard = ({
  title,
  value,
  valueColor,
  subValue,
  badgeText,
  badgeColor,
  iconSrc,
  iconBgColor,
  iconColor,
}: StatCardProps) => {
  const Icon = statIcons[iconSrc as keyof typeof statIcons] ?? Star;

  return (
    <div className="flex min-w-0 min-h-[122px] items-center justify-between gap-3 rounded-xl border border-gray-200 bg-white p-4 font-tajawal">
      <div className="min-w-0 flex-1 text-right">
        <p className="mb-2 text-xs text-[#737373]">{title}</p>

        <p
          className="text-lg font-extrabold"
          style={{ color: valueColor ?? "#252525" }}
        >
          {value}
        </p>

        {subValue && <p className="mt-1 text-xs text-[#737373]">{subValue}</p>}

        {badgeText && (
          <p
            className="mt-2 text-xs"
            style={{ color: badgeColor ?? "#159767" }}
          >
            {badgeText}
          </p>
        )}
      </div>

      <div
        className="flex h-[48px] w-[48px] shrink-0 items-center justify-center rounded-xl"
        style={{ backgroundColor: iconBgColor }}
      >
        <Icon size={25} strokeWidth={2.2} color={iconColor} />
      </div>
    </div>
  );
};
