import {
  Bike,
  Check,
  CircleCheckBig,
  GitBranch,
  Package,
  WashingMachine,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { OrderTrackingData } from "../../Data";

const data = OrderTrackingData;

const icons: Record<string, LucideIcon> = {
  check: Check,
  washing: WashingMachine,
  package: Package,
  bike: Bike,
  done: CircleCheckBig,
};

export default function TrackingSteps() {
  return (
    <section className="rounded-2xl bg-card p-5 shadow-sm">
      <div className="mb-6 flex items-center justify-between gap-2">
        <h2 className="flex items-center gap-2 text-lg font-bold text-heading">
          <GitBranch size={20} className="text-primary" />
          {data.stepsTitle}
        </h2>
        <span className="text-xs font-bold text-accent">
          {data.stepLabel} {data.currentStep + 1} {data.ofLabel}{" "}
          {data.steps.length}
        </span>
      </div>

      <ol>
        {data.steps.map((step, index) => {
          const isDone = index < data.currentStep;
          const isCurrent = index === data.currentStep;
          const isLast = index === data.steps.length - 1;
          const Icon = icons[step.icon];

          return (
            <li key={step.title} className="relative flex gap-4 pb-5 last:pb-0">
              {!isLast && (
                <span
                  className={`absolute top-10 bottom-0 start-[19px] w-0.5 ${
                    isDone ? "bg-primary" : "bg-primary-200"
                  }`}
                />
              )}

              <span
                className={`relative flex size-10 shrink-0 items-center justify-center rounded-full ${
                  isDone
                    ? "bg-primary text-white"
                    : isCurrent
                      ? "bg-accent text-white ring-4 ring-accent-200"
                      : "bg-primary-100 text-muted"
                }`}
              >
                <Icon size={18} />
              </span>

              <div
                className={`flex flex-1 flex-wrap items-start justify-between gap-2 ${
                  isCurrent ? "rounded-xl bg-accent-200 p-3" : "pt-1"
                }`}
              >
                <div>
                  <h3
                    className={`font-bold ${
                      isCurrent
                        ? "text-accent-700"
                        : isDone
                          ? "text-heading"
                          : "text-muted"
                    }`}
                  >
                    {step.title}
                  </h3>
                  <p className="text-xs text-muted">{step.description}</p>
                </div>
                {step.time && (
                  <span className="text-xs text-muted">{step.time}</span>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
