import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ChevronDown,
  CircleCheck,
  ClipboardList,
  MapPin,
  RefreshCw,
} from "lucide-react";
import { HomeData } from "../../Data";
import { useAuthStore } from "../../store/authStore";

const { user, activeOrder } = HomeData;

export default function WelcomeSection() {
  const { userName } = useAuthStore();
  const progress =
    ((activeOrder.currentStep + 1) / activeOrder.steps.length) * 100;

  return (
    <section>
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="mb-1 text-3xl font-bold text-heading">
            مرحباً {userName.trim().split(" ")[0] || user.name}
          </h1>
          <p className="text-sm text-muted">{user.subtitle}</p>
        </div>

        <button
          type="button"
          className="flex items-center gap-2 rounded-full bg-card px-4 py-2 text-sm font-semibold text-heading shadow-sm"
        >
          <MapPin size={16} className="text-primary" />
          {user.location}
          <ChevronDown size={16} className="text-muted" />
        </button>
      </div>

      <div className="rounded-2xl bg-card p-5 shadow-sm">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="flex size-10 items-center justify-center rounded-lg bg-primary-200 text-primary">
              <ClipboardList size={20} />
            </span>
            <div>
              <p className="text-xs text-muted">{activeOrder.label}</p>
              <p className="font-bold text-heading" dir="ltr">
                {activeOrder.id}
              </p>
            </div>
          </div>

          <span className="flex items-center gap-1.5 rounded-full bg-primary-200 px-3 py-1.5 text-xs font-bold text-primary">
            <RefreshCw size={14} />
            {activeOrder.status}
          </span>
        </div>

        <div className="mb-2 flex justify-between text-xs">
          {activeOrder.steps.map((step, index) => (
            <span
              key={step}
              className={`flex items-center gap-1 ${
                index < activeOrder.currentStep
                  ? "font-semibold text-accent"
                  : index === activeOrder.currentStep
                    ? "font-semibold text-primary"
                    : "text-muted"
              }`}
            >
              {index < activeOrder.currentStep && <CircleCheck size={14} />}
              {step}
            </span>
          ))}
        </div>

        <div className="mb-5 h-2 overflow-hidden rounded-full bg-gray-100">
          <div
            className="h-full rounded-full bg-primary"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-muted">
            {activeOrder.deliveryLabel}{" "}
            <span className="font-bold text-heading">
              {activeOrder.deliveryTime}
            </span>
          </p>
          <Link
            to={activeOrder.trackPath}
            className="flex items-center gap-1 text-sm font-bold text-primary transition hover:text-primary-hover"
          >
            {activeOrder.trackLabel}
            <ArrowLeft size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
