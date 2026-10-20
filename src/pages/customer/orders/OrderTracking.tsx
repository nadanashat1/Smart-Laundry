import { useParams } from "react-router-dom";
import { Building2, RefreshCw, Timer } from "lucide-react";
import TrackingSteps from "../../../components/customerOrders/TrackingSteps";
import TrackingSidebar from "../../../components/customerOrders/TrackingSidebar";
import { OrderTrackingData } from "../../../Data";

const { title, status, instructions } = OrderTrackingData;

export default function OrderTracking() {
  const { orderId } = useParams();

  return (
    <div className="bg-background py-8">
      <div className="container grid grid-cols-1 items-start gap-6 lg:grid-cols-[1fr_360px]">
        <div className="flex min-w-0 flex-col gap-6">
          <h1 className="text-2xl font-bold text-heading">
            {title}{" "}
            <span className="text-primary" dir="ltr">
              #{orderId}
            </span>
          </h1>

          <section className="relative overflow-hidden rounded-2xl bg-primary p-6 text-white shadow-sm">
            <span className="pointer-events-none absolute -top-10 -inset-e-10 size-40 rounded-full bg-white/10" />
            <div className="relative flex items-start justify-between gap-4">
              <div>
                <h2 className="mb-2 flex items-center gap-2 text-xl font-bold">
                  <span className="size-3 animate-pulse rounded-full bg-white" />
                  {status.title}
                </h2>
                <p className="flex items-center gap-1.5 text-sm text-primary-200">
                  <Timer size={16} />
                  {status.deliveryLabel}
                  <span className="font-bold text-white">{status.deliveryTime}</span>
                </p>
              </div>
              <RefreshCw size={24} className="shrink-0" />
            </div>
          </section>

          <section className="flex items-start justify-between gap-4 rounded-2xl bg-primary-100 p-5">
            <div className="flex items-start gap-3">
              <Building2 size={20} className="mt-0.5 shrink-0 text-primary" />
              <div>
                <p className="mb-1 font-bold text-heading">{instructions.title}</p>
                <p className="text-sm leading-6 text-muted">{instructions.text}</p>
              </div>
            </div>
            <button
              type="button"
              className="shrink-0 cursor-pointer text-sm font-bold text-primary transition hover:text-primary-hover"
            >
              {instructions.changeLabel}
            </button>
          </section>

          <TrackingSteps />
        </div>

        <TrackingSidebar />
      </div>
    </div>
  );
}
