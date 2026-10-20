import { CreditCard, Landmark, Lock, Smartphone, Wallet } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { OrderReviewData } from "../../Data";
import { useOrderStore } from "../../store/orderStore";

const { payment } = OrderReviewData;

const icons: Record<string, LucideIcon> = {
  cash: Landmark,
  card: CreditCard,
  wallet: Smartphone,
};

export default function PaymentMethods() {
  const paymentId = useOrderStore((state) => state.paymentId);
  const setPayment = useOrderStore((state) => state.setPayment);

  return (
    <section className="overflow-hidden rounded-2xl bg-card shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3 bg-primary-100 px-5 py-4">
        <div className="flex items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded-lg bg-accent-200 text-accent">
            <Wallet size={20} />
          </span>
          <div>
            <h2 className="font-bold text-heading">{payment.title}</h2>
            <p className="text-xs text-muted">{payment.subtitle}</p>
          </div>
        </div>
        <span className="flex items-center gap-1 rounded-full bg-accent-200 px-3 py-1 text-xs font-bold text-accent-700">
          <Lock size={12} />
          {payment.badge}
        </span>
      </div>

      <div className="grid grid-cols-1 gap-3 p-5 md:grid-cols-3">
        {payment.methods.map((method) => {
          const Icon = icons[method.icon];
          const isActive = method.id === paymentId;

          return (
            <button
              key={method.id}
              type="button"
              onClick={() => setPayment(method.id)}
              className={`cursor-pointer rounded-xl border-2 p-4 text-start transition ${
                isActive
                  ? "border-primary bg-primary-100"
                  : "border-gray-200 hover:border-primary-300"
              }`}
            >
              <div className="mb-3 flex items-start justify-between">
                <span
                  className={`size-4 rounded-full ${
                    isActive ? "border-[5px] border-primary" : "border-2 border-gray-300"
                  }`}
                />
                <span className="flex size-10 items-center justify-center rounded-lg bg-primary-200 text-primary">
                  <Icon size={20} />
                </span>
              </div>
              <p className="mb-1 text-sm font-bold text-heading">{method.title}</p>
              <p className="text-xs text-muted">{method.note}</p>
            </button>
          );
        })}
      </div>
    </section>
  );
}
