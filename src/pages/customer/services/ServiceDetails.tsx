import { useState } from "react";
import { useParams } from "react-router-dom";
import { Search } from "lucide-react";
import ServiceDetailsHero from "../../../components/customerServices/ServiceDetailsHero";
import ServiceItemCard from "../../../components/customerServices/ServiceItemCard";
import CartSummary from "../../../components/customerServices/CartSummary";
import AiAssistantCard from "../../../components/home/AiAssistantCard";
import { CartData, CustomerServicesData, ServiceDetailsData } from "../../../Data";
import { useOrderStore } from "../../../store/orderStore";

const { filters, searchPlaceholder, emptyMessage, nextLabel, nextPath } =
  ServiceDetailsData;

export default function ServiceDetails() {
  const { serviceId } = useParams();
  const [activeFilter, setActiveFilter] = useState("all");
  const [search, setSearch] = useState("");
  const quantities = useOrderStore((state) => state.quantities);

  const service = CustomerServicesData.services.find(
    (item) => item.id === serviceId,
  );

  const countFor = (filterId: string) =>
    CartData.items
      .filter((item) => filterId === "all" || item.category.includes(filterId))
      .reduce((sum, item) => sum + (quantities[item.id] ?? 0), 0);

  const query = search.trim();
  const filteredItems = CartData.items.filter((item) => {
    const matchesFilter =
      activeFilter === "all" || item.category.includes(activeFilter);
    const matchesSearch = !query || item.name.includes(query);
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="bg-background py-8">
      <div className="container grid grid-cols-1 gap-6 lg:grid-cols-[1fr_380px]">
        <div className="flex min-w-0 flex-col gap-6">
          <ServiceDetailsHero title={service?.title} />

          <section className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-card p-4 shadow-sm">
            <div className="flex flex-wrap gap-2">
              {filters.map((filter) => {
                const isActive = filter.id === activeFilter;
                const count = countFor(filter.id);
                return (
                  <button
                    key={filter.id}
                    type="button"
                    onClick={() => setActiveFilter(filter.id)}
                    className={`cursor-pointer rounded-full px-4 py-1.5 text-sm transition ${
                      isActive
                        ? "bg-primary font-bold text-white"
                        : "bg-primary-100 text-heading hover:bg-primary-200"
                    }`}
                  >
                    {filter.label}
                    {count > 0 && ` (${count})`}
                  </button>
                );
              })}
            </div>

            <div className="relative w-full sm:w-56">
              <Search
                size={16}
                className="pointer-events-none absolute top-1/2 inset-s-3 -translate-y-1/2 text-muted"
              />
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={searchPlaceholder}
                className="w-full rounded-lg bg-primary-100 py-2 ps-9 pe-3 text-sm text-body outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </section>

          {filteredItems.length === 0 ? (
            <p className="rounded-2xl bg-card py-12 text-center text-muted shadow-sm">
              {emptyMessage}
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {filteredItems.map((item) => (
                <ServiceItemCard key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>

        <aside className="flex flex-col gap-6">
          <AiAssistantCard />
          <CartSummary actionLabel={nextLabel} actionPath={nextPath} />
        </aside>
      </div>
    </div>
  );
}
