import {
  CalendarDays,
  Building2,
  Download,
  ChevronDown,
  Banknote,
  Package,
  ClipboardList,
  CircleCheck,
  Receipt,
} from "lucide-react";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";

export default function Analysis() {
  return (
    <div dir="rtl" className="min-h-screen bg-[#F7F9FD] px-6 py-6">
      <div className="mx-auto w-full max-w-[1600px]">
        {/* Page Header */}
        <div className="mb-6 flex flex-col gap-5">
          <div className="text-right">
            <h1 className="text-xl font-bold text-[#252525]">
              التقارير والتحليلات التشغيلية والمالية
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-[#9298A3]">
              تحليل رقمي دقيق لأداء المنشأة، حجم المعالجة اليومية، الإيرادات
              المجمعة ومعدل كفاءة اتفاقية مستوى الخدمة (SLA).
            </p>
          </div>

          {/* Toolbar */}
          <div className="flex flex-wrap items-center justify-start gap-3">
            <button
              type="button"
              className="flex h-10 items-center gap-2 rounded-xl border border-[#E9EDF5] bg-white px-4 text-sm text-[#555B66] transition hover:bg-gray-50"
            >
              <CalendarDays size={16} className="text-[#777F8D]" />
              <span>01 - 30 سبتمبر 2024</span>
              <ChevronDown size={15} />
            </button>

            <button
              type="button"
              className="flex h-10 items-center gap-2 rounded-xl border border-[#E9EDF5] bg-white px-4 text-sm text-[#555B66] transition hover:bg-gray-50"
            >
              <Building2 size={16} className="text-[#4D64FF]" />
              <span>فرع الرياض المركزي</span>
              <ChevronDown size={15} />
            </button>

            <button
              type="button"
              className="flex h-10 items-center gap-2 rounded-xl bg-white px-5 text-sm font-medium text-[#333333] shadow-sm transition hover:bg-gray-50"
            >
              <Download size={16} />
              <span>تصدير تقرير</span>
            </button>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
          {/* Revenue */}
          <div className="rounded-xl border border-[#EEF0F6] bg-white p-4">
            <div className="flex items-start justify-between gap-2">
              <p className="text-xs text-[#737987]">إجمالي الإيرادات المحققة</p>
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#EEF0FF]">
                <Banknote size={18} className="text-[#5265FF]" />
              </div>
            </div>
            <div className="mt-5">
              <p className="text-xl font-bold text-[#252525]">
                148,250
                <span className="mr-1 text-xs font-normal text-[#9298A3]">
                  ر.س
                </span>
              </p>
              <p className="mt-2 text-[11px] text-emerald-600">
                +8.4% مقارنة بالشهر السابق
              </p>
            </div>
          </div>

          {/* Operations */}
          <div className="rounded-xl border border-[#EEF0F6] bg-white p-4">
            <div className="flex items-start justify-between gap-2">
              <p className="text-xs text-[#737987]">حجم العمليات المنجزة</p>
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#EEF0FF]">
                <Package size={18} className="text-[#5265FF]" />
              </div>
            </div>
            <div className="mt-5">
              <p className="text-xl font-bold text-[#252525]">1,840</p>
              <p className="mt-2 text-[11px] text-emerald-600">
                +9.4% طلب مقارنة بالفترة السابقة
              </p>
            </div>
          </div>

          {/* Average Order */}
          <div className="rounded-xl border border-[#EEF0F6] bg-white p-4">
            <div className="flex items-start justify-between gap-2">
              <p className="text-xs text-[#737987]">متوسط قيمة الطلب</p>
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#EEF0FF]">
                <Receipt size={18} className="text-[#5265FF]" />
              </div>
            </div>
            <div className="mt-5">
              <p className="text-xl font-bold text-[#252525]">
                80.57
                <span className="mr-1 text-xs font-normal text-[#9298A3]">
                  ر.س / طلب
                </span>
              </p>
              <p className="mt-2 text-[11px] text-emerald-600">
                +3.2% عن الفترة السابقة
              </p>
            </div>
          </div>

          {/* SLA */}
          <div className="rounded-xl border border-[#EEF0F6] bg-white p-4">
            <div className="flex items-start justify-between gap-2">
              <p className="text-xs text-[#737987]">الالتزام باتفاقية الخدمة</p>
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#E8F8EF]">
                <CircleCheck size={18} className="text-[#229966]" />
              </div>
            </div>
            <div className="mt-5">
              <p className="text-xl font-bold text-[#252525]">96.2%</p>
              <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-[#E9EDF5]">
                <div className="h-full w-[96.2%] rounded-full bg-[#229966]" />
              </div>
              <p className="mt-2 text-[11px] text-[#9298A3]">
                من الطلبات في الموعد
              </p>
            </div>
          </div>

          {/* Cancellations */}
          <div className="rounded-xl border border-[#EEF0F6] bg-white p-4">
            <div className="flex items-start justify-between gap-2">
              <p className="text-xs text-[#737987]">نسبة الإلغاء / المرتجعات</p>
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#FFF0EF]">
                <ClipboardList size={18} className="text-[#FF514D]" />
              </div>
            </div>
            <div className="mt-5">
              <p className="text-xl font-bold text-[#252525]">0.8%</p>
              <p className="mt-2 text-[11px] text-[#9298A3]">
                الهدف أقل من 1.5%
              </p>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-3">
          {/* Revenue Chart */}
          <div className="rounded-2xl border border-[#EEF0F6] bg-white p-5 sm:p-6 xl:col-span-2">
            <div className="mb-6 flex flex-row flex-wrap items-center justify-between gap-4">
              <div className="text-right">
                <h2 className="text-lg font-bold text-[#252525]">
                  منحنى نمو الإيرادات وحجم الطلبات اليومية
                </h2>
                <p className="mt-1 text-xs text-[#9298A3]">
                  تتبع دورة الإيرادات التراكمية مقابل تدفق طلبات الاستلام خلال
                  الأسابيع الأربعة
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-5">
                <div className="flex items-center gap-2">
                  <span className="h-3.5 w-3.5 rounded-full bg-[#5965F2]" />
                  <span className="text-xs text-[#9298A3]">
                    الإيراد اليومي (ر.س)
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-3.5 w-3.5 rounded-full bg-[#C8D8FF]" />
                  <span className="text-xs text-[#9298A3]">عدد الطلبات</span>
                </div>
              </div>
            </div>

            {/* Revenue Line Chart */}
            <div className="h-[300px] w-full" dir="ltr">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={[
                    { month: "1 سبتمبر", revenue: 8500 },
                    { month: "5 سبتمبر", revenue: 12000 },
                    { month: "10 سبتمبر", revenue: 10500 },
                    { month: "15 سبتمبر", revenue: 19000 },
                    { month: "20 سبتمبر", revenue: 16500 },
                    { month: "25 سبتمبر", revenue: 28000 },
                    { month: "30 سبتمبر", revenue: 24000 },
                  ]}
                  margin={{ top: 10, right: 10, left: 10, bottom: 0 }}
                >
                  <defs>
                    <linearGradient
                      id="revenueGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="0%"
                        stopColor="#243CFF"
                        stopOpacity={0.18}
                      />
                      <stop
                        offset="95%"
                        stopColor="#243CFF"
                        stopOpacity={0.01}
                      />
                    </linearGradient>
                  </defs>

                  <CartesianGrid
                    stroke="#EEF0F6"
                    strokeDasharray="4 4"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="month"
                    tick={{ fill: "#9298A3", fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                    tickMargin={12}
                  />
                  <YAxis
                    yAxisId="revenue"
                    orientation="right"
                    tick={{ fill: "#9298A3", fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(value) => `${value / 1000}k`}
                    width={45}
                  />
                  <Tooltip
                    formatter={(value) => [
                      Number(value).toLocaleString("en-US"),
                      "الإيراد اليومي (ر.س)",
                    ]}
                    contentStyle={{
                      borderRadius: "12px",
                      border: "1px solid #EEF0F6",
                      fontSize: "12px",
                    }}
                  />
                  <Area
                    yAxisId="revenue"
                    type="monotone"
                    dataKey="revenue"
                    stroke="#243CFF"
                    strokeWidth={2}
                    fill="url(#revenueGradient)"
                    dot={{ r: 3, fill: "#243CFF" }}
                    activeDot={{ r: 5 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Collection Summary Bar */}
            <div className="mt-5 flex min-h-[44px] flex-wrap items-center justify-between gap-3 rounded-xl bg-[#F3F6FF] px-4 py-3">
              <p className="text-right text-[11px] leading-5 text-[#555B66]">
                أعلى نقطة تحصيل سجلت يوم 27 سبتمبر بمعدل{" "}
                <span className="font-bold text-[#30343B]">8,940 ر.س</span> و{" "}
                <span className="font-bold text-[#30343B]">112 طلبًا</span>
              </p>

              <p className="shrink-0 text-xs font-bold text-[#159B63]">
                معدل تحويل السلة: 94.6%
              </p>
            </div>
          </div>

          {/* Revenue Distribution */}
          <div className="rounded-2xl border border-[#EEF0F6] bg-white p-5 sm:p-6">
            <div className="mb-5 text-right">
              <h2 className="text-lg font-bold text-[#252525]">
                توزيع الإيرادات حسب الخدمة
              </h2>
              <p className="mt-1 text-xs text-[#9298A3]">
                مساهمة خطوط المعالجة في العائد الإجمالي
              </p>
            </div>

            <div className="relative h-[260px] w-full" dir="ltr">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={[
                      { name: "غسيل وكي معماري", value: 66712 },
                      { name: "تنظيف جاف فاخر (Dry Clean)", value: 47440 },
                      { name: "خدمة VIP فائقة السرعة", value: 22238 },
                      { name: "معالجة جلود ومفروشات", value: 11860 },
                    ]}
                    cx="50%"
                    cy="50%"
                    innerRadius={65}
                    outerRadius={100}
                    startAngle={90}
                    endAngle={-270}
                    paddingAngle={3}
                    dataKey="value"
                    stroke="none"
                    cornerRadius={10}
                  >
                    <Cell fill="#243CFF" />
                    <Cell fill="#243CFF" />
                    <Cell fill="#FF514D" />
                    <Cell fill="#D1E0FF" />
                  </Pie>
                  <Tooltip
                    formatter={(value) => [
                      `${Number(value).toLocaleString("en-US")} ر.س`,
                      "الإيرادات",
                    ]}
                    contentStyle={{
                      borderRadius: "12px",
                      border: "1px solid #EEF0F6",
                      fontSize: "12px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>

              <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold text-[#252525]">148K</span>
                <span className="mt-1 text-xs text-[#9298A3]">ريال سعودي</span>
              </div>
            </div>

            {/* Service Details */}
            <div className="mt-3 space-y-3">
              {/* Service 1 */}
              <div className="flex min-h-[56px] items-center justify-between gap-3 rounded-xl bg-[#F3F6FF] px-3 py-3">
                <div className="flex items-center gap-2 text-right">
                  <span className="h-3.5 w-3.5 shrink-0 rounded-full bg-[#243CFF]" />
                  <span className="text-xs font-semibold text-[#30343B]">
                    غسيل وكي معماري
                  </span>
                </div>
                <div className="shrink-0 text-left">
                  <p className="text-xs font-bold text-[#30343B]">66,712 ر.س</p>
                  <p className="mt-1 text-[11px] text-[#9298A3]">45%</p>
                </div>
              </div>

              {/* Service 2 */}
              <div className="flex min-h-[56px] items-center justify-between gap-3 rounded-xl bg-[#F3F6FF] px-3 py-3">
                <div className="flex items-center gap-2 text-right">
                  <span className="h-3.5 w-3.5 shrink-0 rounded-full bg-[#243CFF]" />
                  <span className="text-xs font-semibold text-[#30343B]">
                    تنظيف جاف فاخر (Dry Clean)
                  </span>
                </div>
                <div className="shrink-0 text-left">
                  <p className="text-xs font-bold text-[#30343B]">47,440 ر.س</p>
                  <p className="mt-1 text-[11px] text-[#9298A3]">32%</p>
                </div>
              </div>

              {/* Service 3 */}
              <div className="flex min-h-[56px] items-center justify-between gap-3 rounded-xl bg-[#F3F6FF] px-3 py-3">
                <div className="flex items-center gap-2 text-right">
                  <span className="h-3.5 w-3.5 shrink-0 rounded-full bg-[#FF514D]" />
                  <span className="text-xs font-semibold text-[#30343B]">
                    خدمة VIP فائقة السرعة
                  </span>
                </div>
                <div className="shrink-0 text-left">
                  <p className="text-xs font-bold text-[#30343B]">22,238 ر.س</p>
                  <p className="mt-1 text-[11px] text-[#9298A3]">15%</p>
                </div>
              </div>

              {/* Service 4 */}
              <div className="flex min-h-[56px] items-center justify-between gap-3 rounded-xl bg-[#F3F6FF] px-3 py-3">
                <div className="flex items-center gap-2 text-right">
                  <span className="h-3.5 w-3.5 shrink-0 rounded-full bg-[#D1E0FF]" />
                  <span className="text-xs font-semibold text-[#30343B]">
                    معالجة جلود ومفروشات
                  </span>
                </div>
                <div className="shrink-0 text-left">
                  <p className="text-xs font-bold text-[#30343B]">11,860 ر.س</p>
                  <p className="mt-1 text-[11px] text-[#9298A3]">8%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
