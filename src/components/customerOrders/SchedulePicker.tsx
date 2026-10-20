import {
  Ban,
  CalendarDays,
  Check,
  Clock,
  Leaf,
  Moon,
  Sun,
  Sunrise,
  Sunset,
  Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { PickupSchedulingData } from "../../Data";
import { useOrderStore } from "../../store/orderStore";

const data = PickupSchedulingData;

const slotIcons: Record<string, LucideIcon> = {
  sunrise: Sunrise,
  sun: Sun,
  sunset: Sunset,
  moon: Moon,
};

export default function SchedulePicker() {
  const { dayId, slotId, speedId, setDay, setSlot, setSpeed } = useOrderStore();
  const selectedDay = data.days.find((day) => day.id === dayId);

  return (
    <>
      <section className="rounded-2xl bg-card p-5 shadow-sm">
        <div className="mb-4 flex items-center justify-between gap-2">
          <h2 className="flex items-center gap-2 text-lg font-bold text-heading">
            <CalendarDays size={20} className="text-primary" />
            {data.daysTitle}
          </h2>
          <span className="text-xs text-muted">{data.month}</span>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {data.days.map((day) => {
            const isActive = day.id === dayId;
            return (
              <button
                key={day.id}
                type="button"
                onClick={() => setDay(day.id)}
                className={`cursor-pointer rounded-xl p-3 text-center transition ${
                  isActive
                    ? "bg-primary text-white shadow-md"
                    : "bg-primary-100 text-heading hover:bg-primary-200"
                }`}
              >
                <p className={`text-xs ${isActive ? "text-primary-200" : "text-muted"}`}>
                  {day.label}
                </p>
                <p className="text-xl font-bold">{day.day}</p>
                <p className={`text-xs ${isActive ? "text-primary-200" : "text-muted"}`}>
                  {day.weekday}
                </p>
              </button>
            );
          })}
        </div>
      </section>

      <section className="rounded-2xl bg-card p-5 shadow-sm">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <h2 className="flex items-center gap-2 text-lg font-bold text-heading">
            <Clock size={20} className="text-primary" />
            {data.slotsTitle} {selectedDay?.weekday} {selectedDay?.day}{" "}
            {data.month.split(" ")[0]}
          </h2>
          <span className="flex items-center gap-1.5 text-xs font-bold text-green-600">
            <span className="size-2 rounded-full bg-green-600" />
            {data.slotsBadge}
          </span>
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {data.slots.map((slot) => {
            const Icon = slotIcons[slot.icon];
            const isActive = slot.id === slotId;

            return (
              <button
                key={slot.id}
                type="button"
                disabled={!slot.available}
                onClick={() => setSlot(slot.id)}
                className={`flex cursor-pointer items-start gap-3 rounded-xl border-2 p-4 text-start transition disabled:cursor-not-allowed disabled:opacity-50 ${
                  isActive
                    ? "border-primary bg-primary-200"
                    : "border-transparent bg-primary-100 hover:border-primary-300"
                }`}
              >
                <span
                  className={`mt-1 flex size-5 shrink-0 items-center justify-center rounded-full ${
                    isActive ? "bg-primary text-white" : "border-2 border-gray-300 bg-card"
                  }`}
                >
                  {isActive && <Check size={12} />}
                  {!slot.available && <Ban size={12} className="text-muted" />}
                </span>

                <div className="flex-1">
                  <div className="mb-1 flex flex-wrap items-center gap-2">
                    <span className="font-bold text-heading">{slot.title}</span>
                    {slot.recommended ? (
                      <span className="rounded bg-primary px-2 py-0.5 text-[10px] text-white">
                        {data.recommendedLabel}
                      </span>
                    ) : (
                      <span
                        className={`rounded px-2 py-0.5 text-[10px] ${
                          slot.available ? "bg-gray-200 text-body" : "bg-accent-200 text-accent-700"
                        }`}
                      >
                        {slot.available ? data.availableLabel : data.fullLabel}
                      </span>
                    )}
                  </div>
                  <p
                    className={`text-lg font-bold ${isActive ? "text-primary" : "text-heading"}`}
                    dir="ltr"
                  >
                    {slot.time}
                  </p>
                  <p className="text-xs text-muted">{slot.note}</p>
                </div>

                <Icon size={22} className="shrink-0 text-muted" />
              </button>
            );
          })}
        </div>
      </section>

      <section>
        <h2 className="mb-1 text-lg font-bold text-heading">{data.speedTitle}</h2>
        <p className="mb-3 text-xs text-muted">{data.speedSubtitle}</p>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {data.speeds.map((speed) => {
            const isActive = speed.id === speedId;
            const isUrgent = speed.fee > 0;
            const Icon = isUrgent ? Zap : Leaf;

            return (
              <button
                key={speed.id}
                type="button"
                onClick={() => setSpeed(speed.id)}
                className={`flex cursor-pointer items-start justify-between gap-3 rounded-2xl border-2 bg-card p-5 text-start shadow-sm transition ${
                  isActive ? "border-primary" : "border-transparent hover:border-primary-300"
                }`}
              >
                <div>
                  <span
                    className={`mb-3 flex size-10 items-center justify-center rounded-lg ${
                      isUrgent ? "bg-accent-200 text-accent" : "bg-primary-200 text-primary"
                    }`}
                  >
                    <Icon size={20} />
                  </span>
                  <p className="text-lg font-bold text-heading">{speed.title}</p>
                  <p className="mb-2 text-xs text-muted">{speed.note}</p>
                  <span
                    className={`text-xs font-bold ${
                      isUrgent ? "rounded-full bg-accent-200 px-2 py-0.5 text-accent-700" : "text-primary"
                    }`}
                  >
                    {speed.priceLabel}
                  </span>
                </div>
                <span
                  className={`size-5 shrink-0 rounded-full ${
                    isActive ? "border-[6px] border-primary" : "border-2 border-gray-300"
                  }`}
                />
              </button>
            );
          })}
        </div>
      </section>
    </>
  );
}
