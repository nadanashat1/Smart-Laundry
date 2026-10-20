import { useEffect, useState } from "react";
import {
  X,
  Save,
  ListChecks,
  Languages,
  Globe,
  ChevronDown,
} from "lucide-react";
import type { Service } from "../../types/Admin/AService";

interface ServiceEditPanelProps {
  service: Service;
  onClose: () => void;
  onSave: (updatedService: Service) => void;
  isNew?: boolean;
}

export function ServiceEditPanel({
  service,
  onClose,
  onSave,
  isNew = false,
}: ServiceEditPanelProps) {
  const [form, setForm] = useState<Service>(service);
  const [expressEnabled, setExpressEnabled] = useState(true);
  const [dailyCapacity, setDailyCapacity] = useState(250);

  const [packingInstructions, setPackingInstructions] = useState(
    "أكياس نيفو الحيوية الشفافة المعقمة + شماعات خشبية فاخرة\n+ شريط حماية الأطراف للشمّاعات والفساتين.",
  );

  useEffect(() => {
    setForm(service);
  }, [service]);

  const updateField = <K extends keyof Service>(key: K, value: Service[K]) => {
    setForm((previous) => ({ ...previous, [key]: value }));
  };

  const inputClass =
    "h-8 w-full rounded-xl border-0 bg-[#F3F6FF] px-3 text-[11px] text-[#252525] outline-none focus:ring-1 focus:ring-[#243BFF]";

  const labelClass = "mb-1 block text-[10px] font-bold text-[#1F2937]";

  return (
    <aside
      dir="rtl"
      className="w-full shrink-0 rounded-2xl border border-[#E9EDF5] bg-white p-[15px] shadow-[0_2px_4px_rgba(0,0,0,0.10)] md:sticky md:top-4 md:w-[304px]"
    >
      <div className="mb-5 flex flex-row-reverse items-start justify-between">
        {" "}
        <button
          type="button"
          onClick={onClose}
          aria-label="إغلاق لوحة التعديل"
          className="rounded-lg p-1 text-muted hover:bg-gray-100"
        >
          <X size={18} />
        </button>
        <div className="flex flex-row-reverse items-center gap-2">
          {" "}
          <div className="text-right">
            <p className="text-[10px] font-semibold text-primary">
              لوحة التعديل السريع
            </p>
            <h2 className="mt-1 text-sm font-bold text-heading">
              {isNew
                ? "إضافة خدمة جديدة"
                : `تعديل خدمة: ${form.englishTitle}`}{" "}
            </h2>
          </div>
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-white">
            <ListChecks size={18} />
          </div>
        </div>
      </div>

      <form
        className="space-y-3"
        onSubmit={(event) => {
          event.preventDefault();
          onSave(form);
        }}
      >
        <div>
          <label className={labelClass}>
            اسم الخدمة (عربي)<span className="text-red-600">*</span>
          </label>
          <div className="relative">
            <input
              className={`${inputClass} pr-3 pl-9`}
              value={form.title}
              onChange={(event) => updateField("title", event.target.value)}
              required
            />
            <Languages
              size={15}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#858585]"
            />
          </div>
        </div>

        <div>
          <label className={labelClass}>
            اسم الخدمة (إنجليزي)<span className="text-red-600">*</span>
          </label>
          <div className="relative">
            <input
              dir="ltr"
              className={`${inputClass} pl-9`}
              value={form.englishTitle}
              onChange={(event) =>
                updateField("englishTitle", event.target.value)
              }
              required
            />
            <Globe
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#858585]"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className={labelClass}>التصنيف التشغيلي</label>
            <button
              type="button"
              className={`${inputClass} flex items-center justify-between gap-1`}
              onClick={() => updateField("category", form.category)}
            >
              <span className="truncate">{form.category}</span>
              <ChevronDown size={12} className="shrink-0 text-[#888]" />
            </button>
          </div>

          <div>
            <label className={labelClass}>وقت التنفيذ (SLA)</label>
            <input
              className={inputClass}
              value={form.sla}
              onChange={(event) => updateField("sla", event.target.value)}
            />
          </div>
        </div>

        <div>
          <div className="mb-1 flex items-center justify-between">
            <label className={labelClass}>الحد الأقصى للطاقة اليومية</label>
            <span className="text-[10px] font-bold text-[#243BFF]">
              {dailyCapacity} قطعة/يوم
            </span>
          </div>
          <input
            type="range"
            min="50"
            max="600"
            step="10"
            value={dailyCapacity}
            onChange={(event) => setDailyCapacity(Number(event.target.value))}
            className="h-1.5 w-full cursor-pointer accent-[#243BFF]"
          />
          <div className="mt-1 flex justify-between text-[9px] text-[#999]">
            <span>50 قطعة (حد أدنى)</span>
            <span>600 قطعة (طاقة قصوى)</span>
          </div>
        </div>

        <div className="rounded-xl bg-[#F3F6FF] p-3">
          <div className="flex items-center justify-between gap-2">
            <div>
              <p className="text-[11px] font-bold text-[#222]">
                قبول الطلبات السريعة (Express)
              </p>

              <p className="mt-1 text-[10px] text-[#737373]">
                إضافة رسوم مميزة تبدأ من 35.00 ر.س
              </p>
            </div>

            <button
              type="button"
              role="switch"
              aria-checked={expressEnabled}
              onClick={() => setExpressEnabled((value) => !value)}
              className={`relative h-6 w-10 shrink-0 rounded-full transition ${
                expressEnabled ? "bg-[#243BFF]" : "bg-[#D5DFFF]"
              }`}
            >
              <span
                className={`absolute top-[3px] h-[18px] w-[18px] rounded-full bg-white transition-all ${
                  expressEnabled ? "right-[3px]" : "right-[19px]"
                }`}
              />
            </button>
          </div>
        </div>

        <div>
          <label className="mb-2 block text-[10px] font-bold text-[#222]">
            تعليمات التغليف الافتراضية
          </label>

          <textarea
            rows={3}
            value={packingInstructions}
            onChange={(event) => setPackingInstructions(event.target.value)}
            className="h-[82px] w-full resize-none rounded-2xl border-0 bg-[#F3F6FF] px-3 py-2 text-right text-[12px] leading-[1.6] text-[#404040] outline-none focus:ring-1 focus:ring-[#243BFF]"
          />
        </div>

        <div className="!mt-7 space-y-1.5">
          <button
            type="submit"
            className="flex h-10 w-full items-center justify-center gap-2 rounded-xl bg-[#FF554F] text-xs font-extrabold text-white transition hover:bg-[#F0443E]"
          >
            {isNew ? "حفظ ونشر الخدمة" : "حفظ التغييرات ونشرها"}{" "}
            <Save size={15} />
          </button>

          <button
            type="button"
            onClick={onClose}
            className="h-9 w-full rounded-xl bg-[#F3F6FF] text-xs font-bold text-[#333] transition hover:bg-[#E8EDFF]"
          >
            إلغاء التعديل
          </button>
        </div>
      </form>
    </aside>
  );
}
