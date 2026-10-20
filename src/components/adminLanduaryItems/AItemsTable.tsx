import { useState } from "react";
import {
  Clock,
  ListChecks,
  Trash2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import thobeImage from "../../assets/images/thobe.png";
import blanketImage from "../../assets/images/blanket.png";

const items = [
  {
    id: "ITM-01",
    name: "ثوب سعودي رسمي",
    category: "فئة الملابس الرجالية",
    status: "الأكثر طلبًا",
    image: thobeImage,
    services: [
      { name: "غسيل + كي:", price: "8.00 ر.س" },
      { name: "كي بخار فقط:", price: "4.00 ر.س" },
      { name: "تنظيف جاف:", price: "12.00 ر.س" },
    ],
    rushFee: "+50%",
    rushDescription: "على السعر الأساسي",
    processing: "12 ساعة",
    available: true,
  },
  {
    id: "ITM-18",
    name: "بطانية شتوية بطبقتين",
    category: "مفروشات وأغطية",
    status: "قطعة موسمية",
    image: blanketImage,
    services: [
      {
        name: "غسيل أوزون عميق وتعطير للمنزل:",
        price: "45.00 ر.س",
      },
    ],
    rushFee: "",
    rushDescription: "غير مفعل (حجم كبير)",
    processing: "36 ساعة",
    available: false,
  },
];

const columns = [
  "معاينة القطعة والاسم",
  "الخدمات المتاحة والأسعار الأساسية",
  "رسوم الخدمة المستعجلة",
  "المعالجة التقديرية",
  "التوفر في التطبيق",
  "الإجراءات",
];

const DEMO_TOTAL_ITEMS = 64;
const DEMO_ITEMS_PER_PAGE = 6;
const DEMO_TOTAL_PAGES = Math.ceil(DEMO_TOTAL_ITEMS / DEMO_ITEMS_PER_PAGE);

function getPageNumbers(currentPage: number) {
  const pages: (number | "...")[] = [];

  if (DEMO_TOTAL_PAGES <= 7) {
    return Array.from({ length: DEMO_TOTAL_PAGES }, (_, index) => index + 1);
  }

  pages.push(1);

  const start = Math.max(2, currentPage - 1);
  const end = Math.min(DEMO_TOTAL_PAGES - 1, currentPage + 1);

  if (start > 2) {
    pages.push("...");
  }

  for (let page = start; page <= end; page++) {
    pages.push(page);
  }

  if (end < DEMO_TOTAL_PAGES - 1) {
    pages.push("...");
  }

  pages.push(DEMO_TOTAL_PAGES);

  return pages;
}

export function AItemsTable() {
  const [currentPage, setCurrentPage] = useState(1);

  const totalItems = DEMO_TOTAL_ITEMS;
  const totalPages = DEMO_TOTAL_PAGES;

  const goToPage = (page: number) => {
    setCurrentPage(Math.min(Math.max(page, 1), totalPages));
  };

  //temporary
  const currentItems = items;

  const displayedCount = Math.min(
    currentPage * DEMO_ITEMS_PER_PAGE,
    totalItems,
  );

  return (
    <section className="mt-3 overflow-hidden rounded-2xl border border-[#EEF1F7] bg-white">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1050px] table-fixed border-collapse text-right">
          <colgroup>
            <col className="w-[24%]" />
            <col className="w-[27%]" />
            <col className="w-[15%]" />
            <col className="w-[14%]" />
            <col className="w-[12%]" />
            <col className="w-[8%]" />
          </colgroup>

          <thead className="bg-[#F3F6FF]">
            <tr>
              {columns.map((column) => (
                <th
                  key={column}
                  className="h-[60px] whitespace-nowrap px-3 text-[11px] font-bold text-[#444]"
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {currentItems.map((item) => (
              <tr
                key={item.id}
                className="h-[85px] border-t border-[#F7F8FC] even:bg-[#FAFBFF]"
              >
                <td className="px-3 py-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="size-[54px] shrink-0 rounded-xl object-cover"
                    />

                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[11px] font-bold text-[#333]">
                          {item.name}
                        </span>

                        <span className="rounded-full bg-[#DCE6FF] px-2 py-1 text-[9px] font-bold text-[#53657F]">
                          {item.id}
                        </span>
                      </div>

                      <p className="mt-1 text-[10px] text-[#999]">
                        {item.category}
                      </p>

                      <p
                        className={`mt-1 text-[10px] font-bold ${
                          item.status === "الأكثر طلبًا"
                            ? "text-[#15965F]"
                            : "text-[#FF2525]"
                        }`}
                      >
                        {item.status}
                      </p>
                    </div>
                  </div>
                </td>

                <td className="px-3 py-3">
                  <div className="flex flex-wrap items-center gap-1.5">
                    {item.services.map((service) => (
                      <span
                        key={service.name}
                        className="inline-flex flex-wrap items-center gap-1 rounded-full bg-[#F3F6FF] px-2 py-1 text-[9px] text-[#777]"
                      >
                        <span>{service.name}</span>
                        <strong className="whitespace-nowrap text-[#243BFF]">
                          {service.price}
                        </strong>
                      </span>
                    ))}
                  </div>
                </td>

                <td className="px-3 py-3">
                  <div className="flex flex-wrap items-center justify-center gap-2">
                    {item.rushFee && (
                      <span className="rounded-full bg-[#FFE5E5] px-2 py-1 text-[9px] font-bold text-[#FF2525]">
                        {item.rushFee}
                      </span>
                    )}

                    <span className="text-[10px] text-[#999]">
                      {item.rushDescription}
                    </span>
                  </div>
                </td>

                <td className="px-3 py-3">
                  <div className="flex items-center justify-center gap-1 whitespace-nowrap text-[10px] font-bold text-[#444]">
                    {item.processing}
                    <Clock size={14} className="shrink-0 text-[#888]" />
                  </div>
                </td>

                <td className="px-3 py-3 text-center">
                  <div className="flex flex-col items-center gap-1">
                    <span
                      role="switch"
                      aria-checked={item.available}
                      aria-label={`التوفر في التطبيق: ${item.name}`}
                      className={`relative h-6 w-10 rounded-full ${
                        item.available ? "bg-[#199767]" : "bg-[#D5DFFF]"
                      }`}
                    >
                      <span
                        className={`absolute top-1 size-4 rounded-full bg-white ${
                          item.available ? "right-1" : "left-1"
                        }`}
                      />
                    </span>

                    {!item.available && (
                      <span className="whitespace-nowrap text-[10px] font-bold text-[#FF2525]">
                        متوقف مؤقتًا
                      </span>
                    )}
                  </div>
                </td>

                <td className="px-3 py-3">
                  <div className="flex items-center justify-center gap-3">
                    <button
                      type="button"
                      aria-label={`حذف ${item.name}`}
                      className="text-[#888] hover:text-[#FF2525]"
                    >
                      <Trash2 size={15} />
                    </button>

                    <button
                      type="button"
                      aria-label={`تعديل ${item.name}`}
                      className="text-[#243BFF] hover:opacity-70"
                    >
                      <ListChecks size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div
        dir="rtl"
        className="flex min-h-[80px] flex-wrap items-center justify-between gap-4 border-t border-[#F1F3F9] bg-white px-4 py-4 sm:px-5"
      >
        {/* عدد العناصر */}
        <div className="flex items-center gap-2 whitespace-nowrap text-[12px]">
          <span className="text-[#888888]">عرض</span>

          <span className="rounded-xl bg-[#F3F6FF] px-3 py-2 font-bold text-[#222222]">
            {displayedCount} من أصل {totalItems}
          </span>

          <span className="text-[#888888]">عنصر لكل صفحة</span>
        </div>

        {/* أرقام الصفحات والأسهم */}
        <div dir="rtl" className="flex items-center gap-2">
          {/* التالي */}
          <button
            type="button"
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            aria-label="الصفحة التالية"
            className="flex size-[46px] items-center justify-center rounded-xl bg-[#FAFBFF] text-[#C4C8D0] transition hover:bg-[#F0F3FC] disabled:cursor-not-allowed disabled:opacity-50"
          >
            <ChevronRight size={19} strokeWidth={2.5} />
          </button>

          {getPageNumbers(currentPage).map((page, index) =>
            page === "..." ? (
              <span
                key={`dots-${index}`}
                aria-hidden="true"
                className="flex size-[46px] items-center justify-center text-[13px] font-bold text-[#777777]"
              >
                ...
              </span>
            ) : (
              <button
                key={page}
                type="button"
                onClick={() => goToPage(page)}
                aria-label={`الصفحة ${page}`}
                aria-current={currentPage === page ? "page" : undefined}
                className={`flex size-[46px] items-center justify-center rounded-xl text-[12px] font-bold transition ${
                  currentPage === page
                    ? "bg-[#FF514D] text-white"
                    : "bg-[#F3F6FF] text-[#444444] hover:bg-[#E8EDFF]"
                }`}
              >
                {page}
              </button>
            ),
          )}

          {/* السابق */}
          <button
            type="button"
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            aria-label="الصفحة السابقة"
            className="flex size-[46px] items-center justify-center rounded-xl bg-[#F3F6FF] text-[#777777] transition hover:bg-[#E8EDFF] disabled:cursor-not-allowed disabled:opacity-50"
          >
            <ChevronLeft size={19} strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </section>
  );
}
