import { Search } from "lucide-react";

export type ItemCategory = {
  id: string;
  label: string;
  count: number;
};

type ItemsToolbarProps = {
  search: string;
  onSearchChange: (value: string) => void;
  categories: ItemCategory[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
};

export function ItemsToolbar({
  search,
  onSearchChange,
  categories,
  selectedCategory,
  onCategoryChange,
}: ItemsToolbarProps) {
  return (
    <section
      dir="rtl"
      className="mt-4 rounded-2xl border border-[#EEF1F7] bg-white p-3 md:p-5"
    >
      <div className="flex justify-start">
        <div className="flex h-[38px] w-full max-w-[360px] items-center gap-2 rounded-xl bg-[#F3F6FF] px-3">
          <input
            type="search"
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="بحث باسم القطعة (عربي/إنجليزي)، الكود، أو الخدمة المرتبطة..."
            aria-label="البحث عن قطعة"
            className="min-w-0 flex-1 bg-transparent text-[11px] text-[#222] outline-none placeholder:text-[#999]"
          />
          <Search size={15} className="shrink-0 text-[#737373]" />
        </div>
      </div>

      <div className="mt-2 flex flex-wrap items-center gap-2">
        {categories.map((category) => {
          const selected = selectedCategory === category.id;

          return (
            <button
              key={category.id}
              type="button"
              onClick={() => onCategoryChange(category.id)}
              aria-pressed={selected}
              className={`inline-flex min-h-[27px] items-center gap-2 rounded-full px-3 py-1 text-[10px] transition-colors ${
                selected
                  ? "bg-[#243BFF] text-white"
                  : "bg-[#F3F6FF] text-[#555] hover:bg-[#E8EDFF]"
              }`}
            >
              <span>{category.label}</span>
              <span
                className={`min-w-[18px] rounded-full px-1 text-center text-[9px] ${
                  selected
                    ? "bg-white/20 text-white"
                    : "bg-white text-[#737373]"
                }`}
              >
                {category.count}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
