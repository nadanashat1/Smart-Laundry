import { useState } from "react";
import { CirclePlus, Download } from "lucide-react";
import OrdersStats from "../../../components/adminOrders/OrdersStats";
import OrdersFilters from "../../../components/adminOrders/OrdersFilters";
import OrdersTable from "../../../components/adminOrders/OrdersTable";
import QualityCard from "../../../components/adminOrders/QualityCard";
import StationsCard from "../../../components/adminOrders/StationsCard";
import FleetCard from "../../../components/adminOrders/FleetCard";
import { AdminOrdersData } from "../../../Data";

const { intro, table } = AdminOrdersData;

export default function Orders() {
  const [activeTab, setActiveTab] = useState("all");
  const [search, setSearch] = useState("");

  const query = search.trim().toLowerCase();
  const filteredOrders = table.orders.filter((order) => {
    const matchesTab = activeTab === "all" || order.category === activeTab;
    const matchesSearch =
      !query ||
      [order.id, order.customer, order.phone].some((value) =>
        value.toLowerCase().includes(query),
      );
    return matchesTab && matchesSearch;
  });

  return (
    <div className="flex flex-col gap-6 pb-8 sm:px-4">
      <section className="flex flex-wrap items-start justify-between gap-4 rounded-2xl bg-card p-5 shadow-sm">
        <div>
          <h1 className="mb-1 flex flex-wrap items-center gap-3 text-2xl font-bold text-heading">
            {intro.title}
            <span className="rounded-full bg-primary-200 px-3 py-1 text-xs text-primary">
              {intro.liveLabel}
            </span>
          </h1>
          <p className="text-sm text-muted">{intro.description}</p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            className="flex cursor-pointer items-center gap-2 rounded-full bg-primary-100 px-5 py-2.5 text-sm font-semibold text-heading transition hover:bg-primary-200"
          >
            <Download size={18} className="text-accent" />
            {intro.exportLabel}
          </button>
          <button
            type="button"
            className="flex cursor-pointer items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-bold text-white transition hover:bg-accent-hover"
          >
            <CirclePlus size={18} />
            {intro.createLabel}
          </button>
        </div>
      </section>

      <OrdersStats />

      <OrdersFilters
        activeTab={activeTab}
        onTabChange={setActiveTab}
        search={search}
        onSearchChange={setSearch}
      />

      <OrdersTable orders={filteredOrders} />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
        <QualityCard />
        <StationsCard />
        <FleetCard />
      </div>
    </div>
  );
}
