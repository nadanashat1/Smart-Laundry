import { useState } from "react";
import { History, Loader, SlidersHorizontal } from "lucide-react";
import ActiveOrderCard from "../../../components/customerOrders/ActiveOrderCard";
import PastOrderCard from "../../../components/customerOrders/PastOrderCard";
import AiAssistantCard from "../../../components/home/AiAssistantCard";
import { CustomerOrdersData } from "../../../Data";

const { banner, tabs, filterLabel, emptyMessage, activeOrders, pastOrders } =
  CustomerOrdersData;

export default function MyOrders() {
  const [activeTab, setActiveTab] = useState("active");

  const counts: Record<string, number> = {
    active: activeOrders.length,
    past: pastOrders.length,
  };

  return (
    <div className="bg-background py-8">
      <div className="container grid grid-cols-1 items-start gap-6 lg:grid-cols-[1fr_360px]">
        <div className="flex min-w-0 flex-col gap-5">
          <div className="grid grid-cols-2 gap-2 rounded-2xl bg-primary-100 p-2">
            {tabs.map((tab) => {
              const isActive = tab.id === activeTab;
              const Icon = tab.id === "active" ? Loader : History;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex cursor-pointer items-center justify-center gap-2 rounded-xl py-3 font-bold transition ${
                    isActive
                      ? "bg-primary text-white shadow-md"
                      : "text-muted hover:bg-primary-200"
                  }`}
                >
                  <Icon size={18} />
                  {tab.label}
                  <span
                    className={`flex size-6 items-center justify-center rounded-full text-xs ${
                      isActive ? "bg-white text-primary" : "bg-gray-500 text-white"
                    }`}
                  >
                    {counts[tab.id]}
                  </span>
                </button>
              );
            })}
          </div>

          {activeTab === "past" && (
            <button
              type="button"
              className="flex w-fit cursor-pointer items-center gap-1 text-sm text-muted transition hover:text-primary"
            >
              <SlidersHorizontal size={16} />
              {filterLabel}
            </button>
          )}

          {activeTab === "active" &&
            (activeOrders.length > 0 ? (
              activeOrders.map((order) => (
                <ActiveOrderCard key={order.id} order={order} />
              ))
            ) : (
              <p className="rounded-2xl bg-card py-12 text-center text-muted shadow-sm">
                {emptyMessage}
              </p>
            ))}

          {activeTab === "past" &&
            pastOrders.map((order) => (
              <PastOrderCard key={order.id} order={order} />
            ))}
        </div>

        <aside className="flex flex-col gap-6">
          <section className="rounded-2xl bg-accent p-5 text-white shadow-sm">
            <p className="mb-1 text-xs text-accent-200">{banner.badge}</p>
            <h1 className="mb-1 text-xl font-bold">{banner.title}</h1>
            <p className="text-sm text-accent-100">{banner.description}</p>
          </section>
          <AiAssistantCard />
        </aside>
      </div>
    </div>
  );
}
