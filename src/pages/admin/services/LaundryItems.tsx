import { PageHeader } from "../../../components/adminLanduaryItems/LanduaryPageHeader";
import { PlusCircle, Download } from "lucide-react";
import { itemsStats } from "../../../Data/Admin/AItemsStat";
import { ItemsStatCard } from "../../../components/adminLanduaryItems/StatCard";
import { useState } from "react";
import { ItemsToolbar, type ItemCategory } from "../../../components/adminLanduaryItems/ToolBar";
import { AItemsTable } from "../../../components/adminLanduaryItems/AItemsTable";

export default function LaundryItems() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories: ItemCategory[] = [
    { id: "all", label: "كافة القطع", count: 64 },
    { id: "mens", label: "الملابس الرجالية", count: 18 },
    { id: "womens", label: "الملابس النسائية", count: 22 },
    { id: "kids", label: "ملابس الأطفال", count: 8 },
    { id: "furnishings", label: "المفروشات والأغطية", count: 12 },
    { id: "care", label: "العناية بالأحذية والجلود", count: 4 },
  ];

  return (
    <main dir="rtl" className="min-h-screen bg-[#F7F9FC] p-3 md:p-6">
      <PageHeader
        title="إدارة قطع الغسيل وقوائم الأسعار والرسوم"
        description="إدارة قطع ملابس ومفروشات، وتعيين أسعار الخدمات المتعددة، والرسوم والضرائب التشغيلية لجميع فروع المملكة."
        actions={
          <>
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-bold text-heading"
            >
              <Download size={18} />
              تصدير اللائحة (PDF/Excel)
            </button>

            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-xl bg-[#FF554F] px-5 py-2.5 text-sm font-bold text-white"
            >
              <PlusCircle size={18} />
              إضافة قطعة جديدة
            </button>
          </>
        }
      />

      <section
        aria-label="إحصائيات الأصناف"
        className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4"
      >
        {itemsStats.map((stat) => (
          <ItemsStatCard key={stat.id} {...stat} />
        ))}
      </section>

      <ItemsToolbar
        search={search}
        onSearchChange={setSearch}
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      <AItemsTable />
    </main>
  );
}
