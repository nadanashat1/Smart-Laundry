import { useState } from "react";
import {
  BedDouble,
  Footprints,
  LayoutGrid,
  Search,
  Shirt,
  WashingMachine,
  Wind,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import ServicesHero from "../../../components/customerServices/ServicesHero";
import ServiceCard from "../../../components/customerServices/ServiceCard";
import { CustomerServicesData } from "../../../Data";

const { categories, services, searchPlaceholder, emptyMessage } =
  CustomerServicesData;

const categoryIcons: Record<string, LucideIcon> = {
  all: LayoutGrid,
  wash: WashingMachine,
  dry: Shirt,
  bedding: BedDouble,
  leather: Footprints,
  steam: Wind,
};

export default function Services() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [search, setSearch] = useState("");

  const query = search.trim();
  const filteredServices = services.filter((service) => {
    const matchesCategory =
      activeCategory === "all" || service.category === activeCategory;
    const matchesSearch =
      !query ||
      service.title.includes(query) ||
      service.description.includes(query);
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-background py-8">
      <div className="container flex flex-col gap-6">
        <ServicesHero />

        <section className="rounded-2xl bg-card p-4 shadow-sm">
          <div className="relative mb-4">
            <Search
              size={18}
              className="pointer-events-none absolute top-1/2 inset-s-3 -translate-y-1/2 text-muted"
            />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={searchPlaceholder}
              className="w-full rounded-lg bg-primary-100 py-3 ps-10 pe-3 text-sm text-body outline-none transition placeholder:text-gray-600 focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div className="flex gap-2 overflow-x-auto pb-1">
            {categories.map((category) => {
              const Icon = categoryIcons[category.icon];
              const isActive = category.id === activeCategory;
              return (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex shrink-0 cursor-pointer items-center gap-2 rounded-lg px-4 py-2 text-sm font-bold transition ${
                    isActive
                      ? "bg-primary text-white"
                      : "bg-primary-100 text-heading hover:bg-primary-200"
                  }`}
                >
                  <Icon size={16} />
                  {category.label}
                </button>
              );
            })}
          </div>
        </section>

        {filteredServices.length === 0 ? (
          <p className="rounded-2xl bg-card py-12 text-center text-muted shadow-sm">
            {emptyMessage}
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
