import { useState } from "react";

import { services } from "../../../Data/Admin/AServices";
import type { Service } from "../../../types/Admin/AService";

import { ServiceCard } from "../../../components/adminServices/ServiceCard";
import { SlidersHorizontal } from "lucide-react";
import { servicesStats } from "../../../Data/Admin/AServicesStat";
import { StatCard } from "../../../components/adminServices/StatCard";
import { ServiceEditPanel } from "../../../components/adminServices/ServiceEditPanel";
import { useNavigate } from "react-router-dom";

type FilterType = "all" | "active" | "paused" | "vip";

const filters: { label: string; value: FilterType }[] = [
  { label: "الكل", value: "all" },
  { label: "خدمات نشطة", value: "active" },
  { label: "متوقفة مؤقتًا", value: "paused" },
  { label: "المسار السريع VIP", value: "vip" },
];

export default function AdminServices() {
  const [selectedFilter, setSelectedFilter] = useState<FilterType>("all");

  const [serviceStatuses, setServiceStatuses] = useState<
    Record<string, boolean>
  >(() =>
    Object.fromEntries(
      services.map((service) => [service.id, service.status === "active"]),
    ),
  );

  const [editedServices, setEditedServices] = useState<Service[]>(services);

  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const [isAddingService, setIsAddingService] = useState(false);

  const navigate = useNavigate();

  const handleToggle = (id: string, active: boolean) => {
    setServiceStatuses((previous) => ({
      ...previous,
      [id]: active,
    }));
  };

  const handleEdit = (service: Service) => {
    setSelectedService(service);
  };
  const handleAddService = () => {
    setSelectedService({
      id: `service-${Date.now()}`,
      code: "",
      title: "",
      englishTitle: "",
      description: "",
      price: 0,
      sla: "",
      capacity: "",
      itemsCount: 0,
      status: "active",
      isVip: false,
      category: "",
      iconSrc: "",
      iconColor: "#243BFF",
      iconBgColor: "#D5DFFF",
    });

    setIsAddingService(true);
  };

  const handleSaveService = (updatedService: Service) => {
    if (isAddingService) {
      setEditedServices((previous) => [...previous, updatedService]);

      setServiceStatuses((previous) => ({
        ...previous,
        [updatedService.id]: updatedService.status === "active",
      }));
    } else {
      setEditedServices((previous) =>
        previous.map((item) =>
          item.id === updatedService.id ? updatedService : item,
        ),
      );

      setServiceStatuses((previous) => ({
        ...previous,
        [updatedService.id]: updatedService.status === "active",
      }));
    }

    setSelectedService(null);
    setIsAddingService(false);
  };

  const handleItemsClick = (service: Service) => {
    navigate("/admin/services/items", {
      state: { serviceId: service.id },
    });
  };

  const filteredServices = editedServices.filter((service) => {
    const active = serviceStatuses[service.id];

    if (selectedFilter === "active") return active;
    if (selectedFilter === "paused") return !active;
    if (selectedFilter === "vip") return service.isVip;

    return true;
  });

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-background p-4 font-tajawal md:p-6"
    >
      {/* Page Header */}
      <header className="mb-6">
        <h1 className="text-xl font-bold text-heading">
          إدارة كتالوج الخدمات التشغيلية
        </h1>

        <p className="mt-2 text-sm leading-6 text-muted">
          التحكم في خدمات الغسيل، أوقات المعالجة، الطاقة الاستيعابية، والتفعيل
          الفوري لجميع منافذ الخدمة والتطبيق.
        </p>
      </header>

      {/* Statistics Cards */}
      <section
        aria-label="إحصائيات الخدمات"
        className="mb-6 grid grid-cols-1 gap-3
    sm:grid-cols-2 xl:grid-cols-4"
      >
        {servicesStats.map((stat) => (
          <StatCard key={stat.id} {...stat} />
        ))}
      </section>

      {/* Filters */}
      <section
        className="mb-3 flex min-h-[44px] flex-wrap
    items-center justify-between gap-2
    rounded-xl border border-gray-200
    bg-white px-3 py-2"
      >
        <div className="flex flex-wrap items-center gap-1.5">
          {filters.map((filter) => {
            const selected = selectedFilter === filter.value;

            return (
              <button
                key={filter.value}
                type="button"
                onClick={() => setSelectedFilter(filter.value)}
                aria-pressed={selected}
                className={`rounded-full px-3 py-1.5
            text-[10px] transition-colors
            ${
              selected
                ? "bg-primary text-white"
                : "bg-primary-100 text-muted hover:bg-primary-200"
            }`}
              >
                {filter.label}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <span className="whitespace-nowrap text-[10px] text-muted">
            {filteredServices.length} خدمات
          </span>

          <button
            type="button"
            className="inline-flex items-center gap-1.5
      whitespace-nowrap rounded-full bg-primary-100
      px-3 py-1.5 text-[10px] text-muted
      transition-colors hover:bg-primary-200"
          >
            <SlidersHorizontal size={12} />
            تصنيف متقدم
          </button>
        </div>
      </section>

      {/* Services Grid + Edit Panel */}
      <section className="flex items-start gap-4">
        <div className="grid min-w-0 flex-1 grid-cols-1 items-start gap-4 md:grid-cols-2">
          {filteredServices.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              isActive={serviceStatuses[service.id]}
              isSelected={selectedService?.id === service.id}
              onToggle={handleToggle}
              onEdit={handleEdit}
              onItemsClick={handleItemsClick}
            />
          ))}

          <button
            type="button"
            onClick={handleAddService}
            className="flex min-h-[270px] w-full items-center justify-center rounded-2xl border border-dashed border-[#FF554F] bg-[#FFF5F3] text-lg font-bold text-[#FF2525] transition-colors hover:bg-[#FFECE9]"
          >
            إضافة خدمة
          </button>
        </div>

        {selectedService && (
          <ServiceEditPanel
            service={selectedService}
            isNew={isAddingService}
            onClose={() => {
              setSelectedService(null);
              setIsAddingService(false);
            }}
            onSave={handleSaveService}
          />
        )}
      </section>

      {filteredServices.length === 0 && (
        <p className="py-10 text-center text-sm text-muted">
          لا توجد خدمات في هذه القائمة.
        </p>
      )}
    </main>
  );
}
