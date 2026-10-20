import { CalendarDays, IdCard, RefreshCw, Search, Shirt } from "lucide-react";
import { AdminOrdersData } from "../../Data";

const { tabs, filters } = AdminOrdersData;

type OrdersFiltersProps = {
  activeTab: string;
  onTabChange: (tabId: string) => void;
  search: string;
  onSearchChange: (value: string) => void;
};

const selects = [
  { ...filters.date, icon: CalendarDays },
  { ...filters.service, icon: Shirt },
  { ...filters.driver, icon: IdCard },
];

export default function OrdersFilters({
  activeTab,
  onTabChange,
  search,
  onSearchChange,
}: OrdersFiltersProps) {
  return (
    <section className="rounded-2xl bg-card p-4 shadow-sm">
      <div className="mb-4 flex gap-2 overflow-x-auto pb-1">
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onTabChange(tab.id)}
              className={`flex shrink-0 cursor-pointer items-center gap-2 rounded-full px-4 py-2 text-sm transition ${
                isActive
                  ? "bg-accent font-bold text-white"
                  : tab.id === "urgent"
                    ? "bg-accent-100 font-bold text-accent-700 hover:bg-accent-200"
                    : "bg-primary-100 text-body hover:bg-primary-200"
              }`}
            >
              {tab.id === "urgent" && !isActive && (
                <span className="size-2 rounded-full bg-accent" />
              )}
              {tab.label}
              <span
                className={`rounded-full px-2 text-xs ${
                  isActive ? "bg-white/25" : "bg-white text-muted"
                }`}
              >
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      <div className="flex flex-wrap gap-3">
        <div className="relative min-w-60 flex-1">
          <Search
            size={18}
            className="pointer-events-none absolute top-1/2 inset-s-3 -translate-y-1/2 text-muted"
          />
          <input
            type="search"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={filters.searchPlaceholder}
            className="w-full rounded-lg bg-primary-100 py-2.5 ps-10 pe-3 text-sm text-body outline-none transition placeholder:text-gray-600 focus:ring-2 focus:ring-primary/20"
          />
        </div>

        {selects.map(({ label, options, icon: Icon }) => (
          <label
            key={label}
            className="flex items-center gap-2 rounded-lg bg-primary-100 px-3 text-sm text-muted"
          >
            <Icon size={18} className="shrink-0" />
            {label}
            <select className="cursor-pointer bg-transparent py-2.5 font-semibold text-heading outline-none">
              {options.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </label>
        ))}

        <button
          type="button"
          aria-label="Refresh orders"
          className="flex size-10.5 cursor-pointer items-center justify-center rounded-lg bg-primary-100 text-heading transition hover:bg-primary-200"
        >
          <RefreshCw size={18} />
        </button>
      </div>
    </section>
  );
}
