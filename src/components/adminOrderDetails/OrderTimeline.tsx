import { CircleCheck, Route } from "lucide-react";
import { AdminOrderDetailsData } from "../../Data";

const { timeline } = AdminOrderDetailsData;

export default function OrderTimeline() {
  return (
    <section className="rounded-2xl bg-card p-5 shadow-sm">
      <div className="mb-6 flex items-center justify-between gap-2">
        <h2 className="flex items-center gap-2 text-lg font-bold text-heading">
          <Route size={22} className="text-primary" />
          {timeline.title}
        </h2>
        <span className="shrink-0 text-xs text-muted">{timeline.liveLabel}</span>
      </div>

      <ol>
        {timeline.steps.map((step, index) => {
          const isDone = step.status === "done";
          const isCurrent = step.status === "current";
          const isLast = index === timeline.steps.length - 1;

          return (
            <li key={step.title} className="relative flex gap-3 pb-6 last:pb-0">
              {!isLast && (
                <span
                  className={`absolute top-6 bottom-0 start-[11px] w-0.5 ${
                    isDone ? "bg-green-600" : "bg-primary-200"
                  }`}
                />
              )}

              <span className="relative flex size-6 shrink-0 items-center justify-center">
                {isDone && <CircleCheck size={22} className="text-green-600" />}
                {isCurrent && (
                  <span className="size-5 rounded-full border-4 border-primary-200 bg-primary" />
                )}
                {!isDone && !isCurrent && (
                  <span className="size-4 rounded-full bg-primary-200" />
                )}
              </span>

              <div
                className={`flex-1 ${isCurrent ? "rounded-xl bg-primary-100 p-3" : ""}`}
              >
                <div className="mb-1 flex flex-wrap items-start justify-between gap-x-3 gap-y-1">
                  <h3
                    className={`text-sm font-bold ${
                      isCurrent
                        ? "text-primary"
                        : isDone
                          ? "text-heading"
                          : "text-muted"
                    }`}
                  >
                    {index + 1}. {step.title}
                  </h3>
                  <span
                    className={`text-xs ${isCurrent ? "font-bold text-primary" : "text-muted"}`}
                  >
                    {step.time}
                  </span>
                </div>

                {step.description && (
                  <p className="text-xs leading-5 text-muted">
                    {step.description}
                  </p>
                )}

                {step.actionLabel && (
                  <button
                    type="button"
                    className="mt-2 cursor-pointer rounded-lg bg-primary-100 px-3 py-1 text-xs font-bold text-primary transition hover:bg-primary-200"
                  >
                    {step.actionLabel}
                  </button>
                )}

                {isCurrent && (
                  <div className="mt-3">
                    <div className="mb-1.5 h-2 overflow-hidden rounded-full bg-white">
                      <div
                        className="h-full rounded-full bg-primary"
                        style={{ width: `${timeline.currentProgress.progress}%` }}
                      />
                    </div>
                    <div className="flex flex-wrap justify-between gap-2 text-xs text-muted">
                      <span>{timeline.currentProgress.label}</span>
                      <span>{timeline.currentProgress.remaining}</span>
                    </div>
                  </div>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
