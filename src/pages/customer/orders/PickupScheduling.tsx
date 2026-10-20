import { Clock, Shirt } from "lucide-react";
import SchedulePicker from "../../../components/customerOrders/SchedulePicker";
import AddressCard from "../../../components/customerOrders/AddressCard";
import GuaranteeCard from "../../../components/customerOrders/GuaranteeCard";
import CartSummary from "../../../components/customerServices/CartSummary";
import { PickupSchedulingData } from "../../../Data";

const { hero, guarantee, nextLabel, nextPath } = PickupSchedulingData;

export default function PickupScheduling() {
  return (
    <div className="bg-background py-8">
      <div className="container grid grid-cols-1 gap-6 lg:grid-cols-[1fr_380px]">
        <div className="flex min-w-0 flex-col gap-6">
          <section className="flex items-center justify-between gap-4 rounded-2xl bg-linear-to-l from-primary-100 to-card p-6 shadow-sm">
            <div>
              <span className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-primary-200 px-3 py-1 text-xs font-bold text-primary">
                <Clock size={14} />
                {hero.badge}
              </span>
              <h1 className="mb-2 text-2xl font-bold text-heading">{hero.title}</h1>
              <p className="text-sm leading-6 text-muted">{hero.description}</p>
            </div>
            <span className="hidden size-16 shrink-0 items-center justify-center rounded-2xl bg-primary-200 text-primary sm:flex">
              <Shirt size={30} />
            </span>
          </section>

          <SchedulePicker />
          <AddressCard />
        </div>

        <aside className="flex flex-col gap-6">
          <CartSummary actionLabel={nextLabel} actionPath={nextPath} showTotals />
          <GuaranteeCard title={guarantee.title} description={guarantee.description} />
        </aside>
      </div>
    </div>
  );
}
