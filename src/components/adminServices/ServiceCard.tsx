import {
  Pencil,
  Eye,
  Droplets,
  BrushCleaning,
  Shirt,
  BedDouble,
  Footprints,
} from "lucide-react";
import type { Service } from "../../types/Admin/AService";

interface ServiceCardProps {
  service: Service;
  isActive: boolean;
  isSelected?: boolean;
  onToggle?: (id: string, active: boolean) => void;
  onEdit?: (service: Service) => void;
  onItemsClick?: (service: Service) => void;
}

export function ServiceCard({
  service,
  isActive,
  isSelected = false,
  onToggle,
  onEdit,
  onItemsClick,
}: ServiceCardProps) {
  const active = isActive;

  const handleToggle = () => {
    onToggle?.(service.id, !active);
  };

  const iconByService: Record<string, typeof Droplets> = {
    "1": Droplets, // الغسيل والكي
    "2": BrushCleaning, // التنظيف الجاف
    "3": Shirt, // الكي بالبخار
    "4": BedDouble, // المفروشات
    "5": Footprints, // الأحذية والجلود
    "6": Footprints,
  };

  const ServiceIcon = iconByService[service.id] ?? Droplets;

  const serviceIconColor = active ? "#1A37FF" : "#8A9AB8";
  const serviceIconBg = active ? "#D0DFFF" : "#DCE5F5";

  return (
    <article
      dir="rtl"
      className={`h-full min-w-0 overflow-hidden rounded-xl border bg-white transition-shadow duration-200 ${
        isSelected
          ? "border-2 border-[#FFAAA5] shadow-[0_4px_8px_rgba(255,85,79,0.16)]"
          : "border-gray-200"
      } hover:shadow-sm`}
    >
      <div className="flex h-full flex-col p-3">
        {/* Header */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex min-w-0 items-start gap-2">
            <div
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
              style={{ backgroundColor: serviceIconBg }}
            >
              <ServiceIcon
                size={23}
                strokeWidth={2.2}
                color={serviceIconColor}
              />
            </div>

            <div className="min-w-0">
              <div className="mb-1 flex flex-wrap items-center gap-1.5">
                <span
                  className={`rounded-full px-2 py-0.5 text-[13px]
                    ${
                      active
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-red-50 text-red-600"
                    }`}
                >
                  ● {active ? "نشط" : "متوقف"}
                </span>

                <span
                  className="rounded bg-gray-100 px-2 py-0.5
                  text-[10px] text-gray-500"
                >
                  {service.code}
                </span>
              </div>

              <h3 className="text-md font-extrabold leading-5 text-[#1F2937]">
               
                {service.title}
              </h3>

              <p className="mt-0.5 text-[10px] text-[#737373]">
                {service.englishTitle}
              </p>
            </div>
          </div>

          {/* Toggle */}
          <button
            type="button"
            onClick={handleToggle}
            aria-label={active ? "إيقاف الخدمة" : "تفعيل الخدمة"}
            aria-pressed={active}
            className={`relative mt-1 h-5 w-9 shrink-0 rounded-full
              transition-colors ${active ? "bg-primary" : "bg-gray-300"}`}
          >
            <span
              className={`absolute top-0.5 h-4 w-4 rounded-full
                bg-white shadow-sm transition-all ${
                  active ? "right-0.5" : "right-[18px]"
                }`}
            />
          </button>
        </div>

        {/* Description */}

        <p className="my-3 min-h-[36px] text-[13px] leading-[1.7] text-[#555555]">
          {" "}
          {service.description}
        </p>

        {/* Details */}
        <div className="mt-auto grid grid-cols-2 gap-x-3 gap-y-3 rounded-xl bg-primary-100 p-3">
          <div>
            <p className="text-[10px] text-[#737373]">السعر الأساسي</p>

            <p className="mt-1 text-xs font-bold text-heading">
              {service.price.toFixed(2)}
              <span className="mr-1 text-[9px] font-normal text-[#737373]">
                ج.م / قطعة
              </span>
            </p>
          </div>

          <div>
            <p className="text-[9px] text-[#737373]">المعالجة SLA</p>

            <p className="mt-1 text-xs font-bold text-heading">
              {service.sla}
              <span className="mr-1 text-[9px] font-normal text-[#737373]">
                ساعة
              </span>
            </p>
          </div>

          <div>
            <p className="text-[9px] text-muted">الطاقة اليومية</p>

            <p className="mt-1 text-xs font-bold text-emerald-600">
              {service.capacity}
            </p>
          </div>

          <div>
            <p className="text-[9px] text-muted">الأصناف المتدرجة</p>

            <p className="mt-1 text-xs font-bold text-heading">
              {service.itemsCount} صنف
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-3 flex items-center gap-2">
          {isSelected ? (
            <div className="flex min-h-9 flex-1 items-center justify-center gap-2 text-xs font-bold text-[#666]">
              <Eye size={16} />
              قيد التعديل باللوحة
            </div>
          ) : (
            <button
              type="button"
              onClick={() => onEdit?.(service)}
              className="flex h-9 w-8 shrink-0 items-center justify-center rounded-lg text-[#555] transition hover:bg-gray-100"
              aria-label="تعديل الخدمة"
            >
              <Pencil size={14} />
            </button>
          )}

          <button
            type="button"
            onClick={() => onItemsClick?.(service)}
            className="flex h-9 flex-1 items-center justify-center gap-2 rounded-lg bg-accent-300 px-3 text-xs font-bold text-accent-700 transition-colors hover:bg-accent-400"
          >
            الأصناف
          </button>
        </div>
      </div>
    </article>
  );
}
