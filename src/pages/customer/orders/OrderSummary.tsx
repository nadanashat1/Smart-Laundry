import ReviewItems from "../../../components/customerOrders/ReviewItems";
import ReviewSchedule from "../../../components/customerOrders/ReviewSchedule";
import PaymentMethods from "../../../components/customerOrders/PaymentMethods";
import InvoiceSummary from "../../../components/customerOrders/InvoiceSummary";
import GuaranteeCard from "../../../components/customerOrders/GuaranteeCard";
import { OrderReviewData } from "../../../Data";

const { stepLabel, title, guarantee } = OrderReviewData;

export default function OrderSummary() {
  return (
    <div className="bg-background py-8">
      <div className="container flex flex-col gap-6">
        <section className="rounded-2xl bg-card p-6 shadow-sm">
          <p className="mb-1 text-xs font-bold text-primary">{stepLabel}</p>
          <h1 className="text-2xl font-bold text-heading">{title}</h1>
        </section>

        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[1fr_360px]">
          <div className="flex min-w-0 flex-col gap-6">
            <ReviewItems />
            <ReviewSchedule />
            <PaymentMethods />
          </div>

          <aside className="flex flex-col gap-6 lg:sticky lg:top-24">
            <InvoiceSummary />
            <GuaranteeCard
              title={guarantee.title}
              description={guarantee.description}
              badges={guarantee.badges}
            />
          </aside>
        </div>
      </div>
    </div>
  );
}
