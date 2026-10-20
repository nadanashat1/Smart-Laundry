import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Users, Crown, RefreshCcw, AlertTriangle,
  Search, Phone, MessageCircle, MapPin,
  ChevronLeft, ChevronRight, Star,
  Download, UserPlus, CheckCircle2, TrendingUp,
  ChevronDown, Filter,
} from 'lucide-react';


export type CustomerTier = 'vip' | 'platinum' | 'regular' | 'subscription' | 'at_risk';
export type AccountStatus = 'active' | 'blocked' | 'suspended' | 'at_risk';

export interface Customer {
  id: string;
  code: string;
  name: string;
  tier: CustomerTier;
  registeredAt: string;
  phone: string;
  city: string;
  district: string;
  addressCount: number;
  totalOrders: number;
  lastOrderStatus: string;
  lastOrderTime: string;
  totalSpent: number;
  accountStatus: AccountStatus;
  rating: number;
  subscriptionActive?: boolean;
}

export interface CustomerStats {
  totalRegistered: number;
  totalGrowthPercent: number;
  vipCount: number;
  vipAvgOrderValue: number;
  activeSubscriptions: number;
  renewalRatePercent: number;
  atRiskCount: number;
  atRiskDaysSilent: number;
}

export interface NeighborhoodStats {
  rank: number;
  name: string;
  activeCustomers: number;
  ordersPerDay: number;
}

export interface CustomerSegment {
  label: string;
  percent: number;
  color: string;
}

// ─── Mock Data ──

const mockStats: CustomerStats = {
  totalRegistered: 3842,
  totalGrowthPercent: 12,
  vipCount: 418,
  vipAvgOrderValue: 10000,
  activeSubscriptions: 865,
  renewalRatePercent: 92,
  atRiskCount: 94,
  atRiskDaysSilent: 60,
};

const mockCustomers: Customer[] = [
  {
    id: '1',
    code: 'CST-1092',
    name: 'د. سارة عبد الرحمن',
    tier: 'vip',
    registeredAt: 'منذ 14 شهراً',
    phone: '050 517 1641',
    city: 'الرياض',
    district: 'حي النخيل الغربي',
    addressCount: 3,
    totalOrders: 28,
    lastOrderStatus: 'قيد الغسيل',
    lastOrderTime: 'منذ ساعتين',
    totalSpent: 7850,
    accountStatus: 'active',
    rating: 5.0,
  },
  {
    id: '2',
    code: 'CST-0874',
    name: 'م. طارق المنصور',
    tier: 'subscription',
    registeredAt: 'منذ 8 أشهر',
    phone: '054 221 9914',
    city: 'الرياض',
    district: 'حي النخيل الشرقي',
    addressCount: 1,
    totalOrders: 19,
    lastOrderStatus: 'جدول أسبوعي',
    lastOrderTime: 'منذ 3 أيام',
    totalSpent: 4920,
    accountStatus: 'active',
    rating: 4.3,
    subscriptionActive: true,
  },
  {
    id: '3',
    code: 'CST-2201',
    name: 'أ. ليلى الغامدي',
    tier: 'vip',
    registeredAt: 'منذ 22 شهراً',
    phone: '055 933 7712',
    city: 'القاهرة',
    district: 'حي الملز',
    addressCount: 4,
    totalOrders: 45,
    lastOrderStatus: 'مكتمل',
    lastOrderTime: 'منذ 5 أيام',
    totalSpent: 18500,
    accountStatus: 'active',
    rating: 4.8,
  },
  {
    id: '4',
    code: 'CST-3405',
    name: 'عبدالله الشمري',
    tier: 'at_risk',
    registeredAt: 'منذ 5 أشهر',
    phone: '056 112 4490',
    city: 'الرياض',
    district: 'حي الروضة',
    addressCount: 1,
    totalOrders: 4,
    lastOrderStatus: 'متوقف',
    lastOrderTime: 'منذ 62 يوماً',
    totalSpent: 860,
    accountStatus: 'at_risk',
    rating: 3.2,
  },
  {
    id: '5',
    code: 'CST-1540',
    name: 'ريم المطيري',
    tier: 'regular',
    registeredAt: 'منذ 3 أشهر',
    phone: '051 772 3341',
    city: 'القاهرة',
    district: 'حي حطين',
    addressCount: 2,
    totalOrders: 7,
    lastOrderStatus: 'مكتمل',
    lastOrderTime: 'منذ أسبوع',
    totalSpent: 2140,
    accountStatus: 'active',
    rating: 4.1,
  },
];

const mockNeighborhoods: NeighborhoodStats[] = [
  { rank: 1, name: 'حي الملز وحطين', activeCustomers: 1320, ordersPerDay: 84 },
  { rank: 2, name: 'حي النخيل الغربي والشرقي', activeCustomers: 980, ordersPerDay: 62 },
  { rank: 3, name: 'حي الياسمين والصحابة', activeCustomers: 740, ordersPerDay: 51 },
];

const mockSegments: CustomerSegment[] = [
  { label: 'Monthly Retained (اشتراك دوري)', percent: 54, color: 'bg-blue-600' },
  { label: 'عملاء النخبة VIP & Platinum',    percent: 22, color: 'bg-amber-400' },
  { label: 'عملاء الطلبات الفردية المنتظمة', percent: 18, color: 'bg-emerald-500' },
  { label: 'عملاء تنشيط (At Risk 60 يوم)',   percent: 6,  color: 'bg-red-400' },
];

// ─── Tab Definitions ───────────────────────────────────────────────────────────

type TabKey = 'all' | 'vip' | 'subscription' | 'blocked';

interface Tab { key: TabKey; label: string; count: number; }

const TABS: Tab[] = [
  { key: 'all',          label: 'الكل',                count: 3842 },
  { key: 'vip',          label: 'عملاء النخبة VIP',    count: 418  },
  { key: 'subscription', label: 'باقات شهرية دورية',   count: 895  },
  { key: 'blocked',      label: 'محظورين أو متعثرين',  count: 12   },
];

// ─── Helper Utilities ──────────────────────────────────────────────────────────

function getTierConfig(tier: CustomerTier) {
  const map: Record<CustomerTier, { label: string; bg: string; text: string; border: string }> = {
    vip:          { label: 'VIP نخبة',   bg: 'bg-amber-50',  text: 'text-amber-700', border: 'border-amber-200' },
    platinum:     { label: 'بلاتيني',    bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200' },
    regular:      { label: 'عادي',       bg: 'bg-slate-50',  text: 'text-slate-600', border: 'border-slate-200' },
    subscription: { label: 'باقة دورية', bg: 'bg-blue-50',   text: 'text-blue-700',  border: 'border-blue-200' },
    at_risk:      { label: 'متراجع',     bg: 'bg-red-50',    text: 'text-red-600',   border: 'border-red-200' },
  };
  return map[tier];
}

function getStatusConfig(status: AccountStatus) {
  const map: Record<AccountStatus, { label: string; bg: string; text: string; dot: string }> = {
    active:    { label: 'حساب نشط',    bg: 'bg-emerald-50', text: 'text-emerald-700', dot: 'bg-emerald-500' },
    blocked:   { label: 'محظور',        bg: 'bg-red-50',     text: 'text-red-700',     dot: 'bg-red-500'     },
    suspended: { label: 'موقوف',        bg: 'bg-orange-50',  text: 'text-orange-700',  dot: 'bg-orange-500'  },
    at_risk:   { label: 'يحتاج تنشيط', bg: 'bg-red-50',     text: 'text-red-600',     dot: 'bg-red-400'     },
  };
  return map[status];
}

function formatEGP(n: number): string {
  return n.toLocaleString('ar-EG');
}

function StarRating({ rating }: { rating: number }) {
  const full = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-3.5 h-3.5 ${
            i < full
              ? 'text-amber-400 fill-amber-400'
              : i === full && hasHalf
              ? 'text-amber-300 fill-amber-200'
              : 'text-slate-200 fill-slate-100'
          }`}
        />
      ))}
      <span className="text-xs font-bold text-slate-700 mr-0.5">{rating.toFixed(1)}</span>
    </div>
  );
}

// ─── Trend Sparkline SVG ───────────────────────────────────────────────────────

function TrendSparkline() {
  const points = [20, 35, 28, 42, 38, 50, 45, 58, 54, 65];
  const w = 100, h = 40;
  const max = Math.max(...points);
  const min = Math.min(...points);
  const coords = points.map((p, i) => ({
    x: (i / (points.length - 1)) * w,
    y: h - ((p - min) / (max - min)) * h,
  }));
  const pathD  = coords.map((c, i) => `${i === 0 ? 'M' : 'L'}${c.x},${c.y}`).join(' ');
  const areaD  = `${pathD} L${w},${h} L0,${h} Z`;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-24 h-10" preserveAspectRatio="none">
      <defs>
        <linearGradient id="sparkGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#3b82f6" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#3b82f6" stopOpacity="0"    />
        </linearGradient>
      </defs>
      <path d={areaD} fill="url(#sparkGrad)" />
      <path d={pathD} fill="none" stroke="#3b82f6" strokeWidth="2"
            strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ─── Sub-Component: Header ─────────────────────────────────────────────────────

function CustomersHeader() {
  return (
    <div className="flex items-start justify-between gap-4 flex-wrap">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700
                          text-xs font-bold px-3 py-1 rounded-full border border-blue-100">
            <TrendingUp className="w-3.5 h-3.5" />
            Live Hub
          </span>
        </div>
        <h1 className="text-xl font-black text-slate-800 leading-tight">
          سجل العملاء وإدارة الحسابات
        </h1>
        <p className="text-xs text-slate-500 mt-1 leading-relaxed">
          إجمالي{' '}
          <span className="font-bold text-slate-700">3,842</span> عميل مسجل —{' '}
          <span className="font-bold text-emerald-600">3,748</span> حساب نشط —
          متوسط القيمة العمرية{' '}
          <span className="font-bold text-blue-600">6,470 ج.م</span> — وسجل اشتراكات متعددة.
        </p>
      </div>
      <div className="flex items-center gap-2 flex-shrink-0">
        <button
          type="button"
          className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-slate-600
                     bg-white border border-slate-200 rounded-xl hover:bg-slate-50
                     hover:border-slate-300 transition-all shadow-sm"
        >
          <Download className="w-4 h-4" />
          تصدير السجل (Excel/CSV)
        </button>
        <button
          type="button"
          className="flex items-center gap-2 px-4 py-2.5 text-sm font-bold text-white
                     bg-accent rounded-xl hover:bg-accent-hover transition-all
                     shadow-md shadow-accent/25"
        >
          <UserPlus className="w-4 h-4" />
          + إضافة عميل جديد
        </button>
      </div>
    </div>
  );
}

// ─── Sub-Component: Stats Cards ────────────────────────────────────────────────

function CustomersStatsCards({ stats }: { stats: CustomerStats }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">

      {/* Card 1 – Total */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 relative overflow-hidden">
        <div className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full bg-blue-50/60
                        blur-xl pointer-events-none" />
        <div className="flex items-start justify-between gap-3 mb-4">
          <p className="text-xs font-bold text-slate-500 leading-snug">
            إجمالي العملاء المسجلين
          </p>
          <div className="rounded-2xl p-2.5 bg-blue-50 text-blue-600 shrink-0">
            <Users className="w-5 h-5" />
          </div>
        </div>
        <p className="text-4xl font-black text-slate-800 tabular-nums leading-none">
          {stats.totalRegistered.toLocaleString('ar-EG')}
        </p>
        <p className="text-xs text-slate-400 mt-1">عميل</p>
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-50">
          <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700
                          text-[11px] font-bold px-2.5 py-1 rounded-full">
            <TrendingUp className="w-3 h-3" />
            +{stats.totalGrowthPercent}% هذا الشهر
          </span>
          <TrendSparkline />
        </div>
      </div>

      {/* Card 2 – VIP */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 relative overflow-hidden">
        <div className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full bg-amber-50/60
                        blur-xl pointer-events-none" />
        <div className="flex items-start justify-between gap-3 mb-4">
          <p className="text-xs font-bold text-slate-500 leading-snug">عملاء النخبة VIP</p>
          <div className="rounded-2xl p-2.5 bg-amber-50 text-amber-500 shrink-0">
            <Crown className="w-5 h-5" />
          </div>
        </div>
        <p className="text-4xl font-black text-amber-500 tabular-nums leading-none">
          {stats.vipCount.toLocaleString('ar-EG')}
        </p>
        <p className="text-xs text-slate-400 mt-1">عضو ذهبي/بلاتيني</p>
        <div className="mt-4 pt-3 border-t border-slate-50">
          <span className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-700
                          text-[11px] font-semibold px-2.5 py-1 rounded-full border border-amber-100">
            متوسط طلب {stats.vipAvgOrderValue.toLocaleString('ar-EG')} ج.م.
          </span>
        </div>
      </div>

      {/* Card 3 – Subscriptions */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 relative overflow-hidden">
        <div className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full bg-blue-50/60
                        blur-xl pointer-events-none" />
        <div className="flex items-start justify-between gap-3 mb-4">
          <p className="text-xs font-bold text-slate-500 leading-snug">
            اشتراكات الغسيل الدورية النشطة
          </p>
          <div className="rounded-2xl p-2.5 bg-blue-50 text-blue-600 shrink-0">
            <RefreshCcw className="w-5 h-5" />
          </div>
        </div>
        <p className="text-4xl font-black text-blue-600 tabular-nums leading-none">
          {stats.activeSubscriptions.toLocaleString('ar-EG')}
        </p>
        <p className="text-xs text-slate-400 mt-1">اشتراك شهري</p>
        <div className="mt-4 pt-3 border-t border-slate-50">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[11px] font-semibold text-slate-500">نسبة التجديد</span>
            <span className="text-[11px] font-black text-blue-600">
              {stats.renewalRatePercent}%
            </span>
          </div>
          <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full bg-blue-500 transition-all duration-700"
              style={{ width: `${stats.renewalRatePercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Card 4 – At Risk */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 relative overflow-hidden">
        <div className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full bg-red-50/60
                        blur-xl pointer-events-none" />
        <div className="flex items-start justify-between gap-3 mb-4">
          <p className="text-xs font-bold text-slate-500 leading-snug">
            عملاء يحتاجون تنشيط (At Risk)
          </p>
          <div className="rounded-2xl p-2.5 bg-red-50 text-red-500 shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
        </div>
        <p className="text-4xl font-black text-red-500 tabular-nums leading-none">
          {stats.atRiskCount}
        </p>
        <p className="text-xs text-slate-400 mt-1">عميل متراجع</p>
        <div className="mt-4 pt-3 border-t border-slate-50">
          <span className="inline-flex items-center gap-1 bg-red-50 text-red-600
                          text-[11px] font-bold px-2.5 py-1 rounded-full border border-red-100">
            <AlertTriangle className="w-3 h-3" />
            بدون طلب لـ {stats.atRiskDaysSilent} يوم
          </span>
        </div>
      </div>

    </div>
  );
}

// ─── Sub-Component: Filters ────────────────────────────────────────────────────

interface FiltersProps {
  activeTab: TabKey;
  onTabChange: (t: TabKey) => void;
  search: string;
  onSearchChange: (v: string) => void;
}

function CustomersFilters({ activeTab, onTabChange, search, onSearchChange }: FiltersProps) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
      {/* Tabs */}
      <div className="flex items-center gap-1 px-5 pt-4 border-b border-slate-100 overflow-x-auto">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => onTabChange(tab.key)}
            className={`flex items-center gap-1.5 px-4 py-2.5 text-sm font-bold
                        rounded-t-xl whitespace-nowrap transition-all border-b-2 -mb-px ${
              activeTab === tab.key
                ? 'text-accent border-accent bg-accent/5'
                : 'text-slate-500 border-transparent hover:text-slate-700 hover:bg-slate-50'
            }`}
          >
            {tab.label}
            <span
              className={`text-[11px] font-black px-1.5 py-0.5 rounded-full ${
                activeTab === tab.key
                  ? 'bg-accent text-white'
                  : 'bg-slate-100 text-slate-500'
              }`}
            >
              {tab.count.toLocaleString('ar-EG')}
            </span>
          </button>
        ))}
      </div>

      {/* Filter Bar */}
      <div className="flex items-center gap-3 px-5 py-3 flex-wrap">
        <div className="relative flex-1 min-w-[220px]">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="بحث سريع بالاسم، رقم الجوال، كود العميل..."
            className="w-full pr-9 pl-4 py-2 text-sm bg-slate-50 border border-slate-200
                       rounded-xl text-slate-700 placeholder:text-slate-400 focus:outline-none
                       focus:ring-2 focus:ring-accent/30 focus:border-accent/50 transition-all"
          />
        </div>

        {[
          { placeholder: 'تصنيف العملاء (الكل)',   opts: ['VIP نخبة','باقة دورية','عادي','متراجع'] },
          { placeholder: 'المدينة والحي (القاهرة)', opts: ['الرياض','جدة','الدمام'] },
          { placeholder: 'حالة الحساب (نشط)',       opts: ['كل الحالات','محظور','موقوف'] },
        ].map(({ placeholder, opts }) => (
          <div key={placeholder} className="relative">
            <select
              className="appearance-none pr-4 pl-8 py-2 text-sm bg-slate-50 border border-slate-200
                         rounded-xl text-slate-600 font-medium focus:outline-none focus:ring-2
                         focus:ring-accent/30 focus:border-accent/50 transition-all cursor-pointer"
            >
              <option>{placeholder}</option>
              {opts.map((o) => <option key={o}>{o}</option>)}
            </select>
            <ChevronDown className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5
                                   text-slate-400 pointer-events-none" />
          </div>
        ))}

        <button
          type="button"
          className="flex items-center gap-1.5 px-3 py-2 text-sm font-semibold text-slate-500
                     bg-slate-50 border border-slate-200 rounded-xl hover:bg-slate-100 transition-all"
        >
          <Filter className="w-4 h-4" />
          فلترة
        </button>
      </div>
    </div>
  );
}

// ─── Sub-Component: Table ──────────────────────────────────────────────────────

interface TableProps {
  customers: Customer[];
  currentPage: number;
  totalCount: number;
  onPageChange: (p: number) => void;
}

const PAGE_SIZE = 5;

function CustomersTable({ customers, currentPage, totalCount, onPageChange }: TableProps) {
  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));
  const start      = (currentPage - 1) * PAGE_SIZE + 1;
  const end        = Math.min(currentPage * PAGE_SIZE, totalCount);

  function paginationPages(): (number | '...')[] {
    const pages: (number | '...')[] = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push('...');
      const lo = Math.max(2, currentPage - 1);
      const hi = Math.min(totalPages - 1, currentPage + 1);
      for (let i = lo; i <= hi; i++) pages.push(i);
      if (currentPage < totalPages - 2) pages.push('...');
      pages.push(totalPages);
    }
    return pages;
  }

  const COLS = [
    'كود العميل والاسم',
    'معلومات الاتصال والموقع',
    'النشاط وحالة آخر طلب',
    'إجمالي الإنفاق',
    'حالة الحساب والتقييم',
    'إجراءات سريعة',
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
      {/* Table header bar */}
      <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
        <h2 className="text-sm font-black text-slate-700">جدول العملاء الرئيسي</h2>
        <span className="text-xs text-slate-400 font-medium">
          عرض {start} إلى {end} من أصل{' '}
          <span className="font-bold text-slate-600">{totalCount.toLocaleString('ar-EG')}</span>{' '}
          عميل مسجل
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px]">
          <thead>
            <tr className="bg-slate-50/70 border-b border-slate-100">
              {COLS.map((col) => (
                <th
                  key={col}
                  className="text-right text-xs font-semibold text-slate-500
                             px-4 py-3 whitespace-nowrap"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {customers.map((c) => {
              const tier   = getTierConfig(c.tier);
              const status = getStatusConfig(c.accountStatus);
              return (
                <tr key={c.id} className="hover:bg-slate-50/60 transition-colors group">

                  {/* 1 – Code & Name */}
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600
                                      flex items-center justify-center text-white text-xs font-black
                                      shrink-0 shadow-sm">
                        {c.name.slice(0, 1)}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <Link
                            to={`/admin/customers/${c.code}`}
                            className="text-sm font-bold text-slate-800 hover:text-blue-600 transition-colors leading-tight"
                          >
                            {c.name}
                          </Link>
                          {(c.tier === 'vip' || c.tier === 'subscription' || c.tier === 'at_risk') && (
                            <span className={`text-[10px] font-black px-1.5 py-0.5 rounded-full
                                            border ${tier.bg} ${tier.text} ${tier.border}`}>
                              {c.tier === 'at_risk' ? `⚠ ${tier.label}` : tier.label}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <span className="text-[11px] text-slate-400 font-medium">
                            {c.registeredAt}
                          </span>
                          <Link
                            to={`/admin/customers/${c.code}`}
                            className="text-[10px] bg-slate-100 hover:bg-blue-50 hover:text-blue-600 text-slate-500 font-bold px-1.5 py-0.5 rounded-md transition-colors"
                          >
                            #{c.code}
                          </Link>
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* 2 – Contact & Location */}
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-1.5 mb-1">
                      <Phone className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                      <span className="text-sm font-semibold text-slate-700 font-mono" dir="ltr">
                        {c.phone}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 mb-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="text-xs text-slate-500 font-medium">
                        {c.city}، {c.district}
                      </span>
                    </div>
                    <span className="text-[10px] bg-blue-50 text-blue-600 font-bold
                                    px-2 py-0.5 rounded-full">
                      {c.addressCount} عناوين
                    </span>
                  </td>

                  {/* 3 – Activity */}
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-1.5 mb-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span className="text-sm font-bold text-slate-700">
                        {c.totalOrders} طلب مكتمل
                      </span>
                    </div>
                    <div className={`inline-flex items-center gap-1 text-[11px] font-bold
                                    px-2 py-0.5 rounded-full border ${
                      c.accountStatus === 'at_risk'
                        ? 'bg-red-50 text-red-600 border-red-100'
                        : c.subscriptionActive
                        ? 'bg-blue-50 text-blue-600 border-blue-100'
                        : 'bg-slate-50 text-slate-600 border-slate-100'
                    }`}>
                      {c.lastOrderTime} ({c.lastOrderStatus})
                    </div>
                  </td>

                  {/* 4 – Spending */}
                  <td className="px-4 py-3.5">
                    <p className="text-base font-black text-slate-800">
                      {formatEGP(c.totalSpent)}
                    </p>
                    <p className="text-[11px] text-slate-400 font-medium">ج.م</p>
                  </td>

                  {/* 5 – Status & Rating */}
                  <td className="px-4 py-3.5">
                    <div className={`inline-flex items-center gap-1.5 text-[11px] font-bold
                                    px-2.5 py-1 rounded-full mb-1.5 ${status.bg} ${status.text}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
                      {status.label}
                    </div>
                    <StarRating rating={c.rating} />
                  </td>

                  {/* 6 – Quick Actions */}
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        title="اتصال"
                        className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600
                                   hover:bg-emerald-100 flex items-center justify-center
                                   transition-colors"
                      >
                        <Phone className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        title="مراسلة"
                        className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600
                                   hover:bg-blue-100 flex items-center justify-center
                                   transition-colors"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="px-5 py-3.5 border-t border-slate-100 flex items-center
                      justify-between gap-4 flex-wrap bg-slate-50/40">
        <p className="text-xs text-slate-500 font-medium">
          عرض{' '}
          <span className="font-bold text-slate-700">{start}</span> إلى{' '}
          <span className="font-bold text-slate-700">{end}</span> من أصل{' '}
          <span className="font-bold text-slate-700">
            {totalCount.toLocaleString('ar-EG')}
          </span>{' '}
          عميل مسجل
        </p>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="w-8 h-8 rounded-xl flex items-center justify-center text-slate-500
                       hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed
                       transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          {paginationPages().map((page, idx) =>
            page === '...' ? (
              <span key={`ell-${idx}`}
                    className="w-8 h-8 flex items-center justify-center text-slate-400 text-sm">
                ...
              </span>
            ) : (
              <button
                key={page}
                type="button"
                onClick={() => onPageChange(page as number)}
                className={`w-8 h-8 rounded-xl text-sm font-bold transition-all ${
                  currentPage === page
                    ? 'bg-accent text-white shadow-sm shadow-accent/30'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                {page}
              </button>
            )
          )}

          <button
            type="button"
            onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="w-8 h-8 rounded-xl flex items-center justify-center text-slate-500
                       hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed
                       transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Sub-Component: Analytics Footer 

interface AnalyticsFooterProps {
  neighborhoods: NeighborhoodStats[];
  segments: CustomerSegment[];
}

function CustomersAnalyticsFooter({ neighborhoods, segments }: AnalyticsFooterProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

      {/* Neighborhood density */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-black text-slate-700">
              كثافة الأحياء النشطة (القاهرة)
            </h3>
            <p className="text-xs text-slate-400 font-medium mt-0.5">Q3-2024</p>
          </div>
          <div className="flex items-center gap-1.5 bg-emerald-50 text-emerald-700
                          text-[11px] font-bold px-2.5 py-1 rounded-full border border-emerald-100">
            <MapPin className="w-3 h-3" />
            خريطة الأحياء
          </div>
        </div>

        <div className="space-y-3">
          {neighborhoods.map((hood) => (
            <div
              key={hood.rank}
              className="flex items-center gap-3 p-3 rounded-xl bg-slate-50/70
                         hover:bg-slate-100/60 transition-colors"
            >
              <div className="w-7 h-7 rounded-xl bg-blue-600 text-white text-xs font-black
                              flex items-center justify-center shrink-0">
                {hood.rank}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-slate-700 truncate">{hood.name}</p>
                <p className="text-xs text-slate-500 font-medium">
                  {hood.activeCustomers.toLocaleString('ar-EG')} عميل نشط
                </p>
              </div>
              <span className="text-[11px] font-black text-blue-600 bg-blue-50
                               px-2 py-0.5 rounded-full shrink-0">
                {hood.ordersPerDay} طلب/يوم
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Customer segments */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-black text-slate-700">توزيع شرائح العملاء</h3>
            <p className="text-xs text-slate-400 font-medium mt-0.5">تحليل ديموغرافي للقاعدة</p>
          </div>
          <div className="flex items-center gap-1.5 bg-blue-50 text-blue-700
                          text-[11px] font-bold px-2.5 py-1 rounded-full border border-blue-100">
            <TrendingUp className="w-3 h-3" />
            تحليل الشرائح
          </div>
        </div>

        <div className="space-y-4">
          {segments.map((seg) => (
            <div key={seg.label}>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-semibold text-slate-600 leading-snug">
                  {seg.label}
                </span>
                <span className="text-sm font-black text-slate-800">{seg.percent}%</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-700 ${seg.color}`}
                  style={{ width: `${seg.percent}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ─

export default function Customers() {
  // State — swap mockCustomers for an API call via useEffect / Axios in production
  const [customers, setCustomers]     = useState<Customer[]>(mockCustomers);
  const [stats]                       = useState<CustomerStats>(mockStats);
  const [neighborhoods]               = useState<NeighborhoodStats[]>(mockNeighborhoods);
  const [segments]                    = useState<CustomerSegment[]>(mockSegments);
  const [activeTab, setActiveTab]     = useState<TabKey>('all');
  const [search, setSearch]           = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // Client-side filter — replace body with API params in production
  const filteredCustomers = customers.filter((c) => {
    const q           = search.toLowerCase();
    const matchSearch = !q || c.name.includes(q) || c.phone.includes(q) || c.code.toLowerCase().includes(q);
    const matchTab    =
      activeTab === 'all'          ||
      (activeTab === 'vip'          && (c.tier === 'vip' || c.tier === 'platinum')) ||
      (activeTab === 'subscription' && c.tier === 'subscription')                   ||
      (activeTab === 'blocked'      && c.accountStatus === 'blocked');
    return matchSearch && matchTab;
  });

  // Expose setter — used for future API integration: useEffect(() => { fetchCustomers().then(setCustomers) }, [])
  void setCustomers;

  return (
    <div dir="rtl" className="font-tajawal min-h-screen bg-background p-4 sm:p-6">
      <div className="max-w-[1400px] mx-auto space-y-5">

        <CustomersHeader />

        <CustomersStatsCards stats={stats} />

        <CustomersFilters
          activeTab={activeTab}
          onTabChange={(tab) => { setActiveTab(tab); setCurrentPage(1); }}
          search={search}
          onSearchChange={(v) => { setSearch(v); setCurrentPage(1); }}
        />

        <CustomersTable
          customers={filteredCustomers}
          currentPage={currentPage}
          totalCount={stats.totalRegistered}
          onPageChange={setCurrentPage}
        />

        <CustomersAnalyticsFooter
          neighborhoods={neighborhoods}
          segments={segments}
        />

      </div>
    </div>
  );
}
