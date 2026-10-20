import { Clock, Headset, ShieldCheck, Sparkles } from "lucide-react";

const badgeIcons = [Sparkles, Clock, Headset];

type GuaranteeCardProps = {
  title: string;
  description: string;
  badges?: string[];
};

export default function GuaranteeCard({
  title,
  description,
  badges = [],
}: GuaranteeCardProps) {
  return (
    <section className="space-y-3">
      <div className="flex items-start gap-3 rounded-2xl bg-accent-200 p-4">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-accent text-white">
          <ShieldCheck size={20} />
        </span>
        <div>
          <p className="mb-1 font-bold text-accent-700">{title}</p>
          <p className="text-xs leading-5 text-body">{description}</p>
        </div>
      </div>

      {badges.length > 0 && (
        <div className="grid grid-cols-3 gap-2">
          {badges.map((badge, index) => {
            const Icon = badgeIcons[index % badgeIcons.length];
            return (
              <div
                key={badge}
                className="flex flex-col items-center gap-1 rounded-xl bg-card p-3 text-center text-[11px] text-body shadow-sm"
              >
                <Icon size={18} className="text-accent" />
                {badge}
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
