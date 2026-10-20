import { History } from "lucide-react";
import { AdminHomeData } from "../../Data";

const { activityLog } = AdminHomeData;

const dotColors: Record<string, string> = {
  success: "bg-green-600",
  primary: "bg-primary",
  danger: "bg-accent",
  muted: "bg-primary-200",
};

export default function ActivityLog() {
  return (
    <section className="rounded-2xl bg-card p-5 shadow-sm">
      <h2 className="mb-6 flex items-center gap-2 text-lg font-bold text-heading">
        <History size={22} className="text-primary" />
        {activityLog.title}
      </h2>

      <ol className="relative">
        {activityLog.items.map((item, index) => (
          <li key={item.title} className="relative flex gap-4 pb-7 last:pb-0">
            {index < activityLog.items.length - 1 && (
              <span className="absolute top-4 bottom-0 start-[7px] w-0.5 bg-primary-200" />
            )}
            <span
              className={`relative mt-1 size-4 shrink-0 rounded-full ring-4 ring-white ${dotColors[item.tone]}`}
            />

            <div className="flex flex-1 flex-wrap justify-between gap-x-4 gap-y-1">
              <div className="max-w-md">
                <h3
                  className={`mb-1 text-sm font-bold ${
                    item.tone === "danger" ? "text-accent" : "text-heading"
                  }`}
                >
                  {item.title}
                </h3>
                <p className="text-xs leading-6 text-muted">
                  {item.before}{" "}
                  {item.orderId && (
                    <span className="font-bold text-primary" dir="ltr">
                      {item.orderId}
                    </span>
                  )}{" "}
                  {item.after}
                </p>
              </div>
              <span className="text-xs text-muted">{item.time}</span>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
