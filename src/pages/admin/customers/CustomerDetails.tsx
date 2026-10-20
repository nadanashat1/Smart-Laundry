import React, { useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import {
  Phone,
  Mail,
  Copy,
  Calendar,
  CreditCard,
  ShoppingBag,
  Wallet,
  Tag,
  ShieldCheck,
  Check,
  CheckCircle2,
  Truck,
  Sparkles,
  MapPin,
  Search,
  ChevronRight,
  ChevronLeft,
  Ban,
  Edit3,
  LocateFixed,
  Building2,
  Home,
  Briefcase,
  Info,
  X,
  ExternalLink,
  Crown,
  CheckCheck,
} from 'lucide-react';



export type CustomerTier = 'vip' | 'regular' | 'corporate';
export type AccountStatus = 'active' | 'suspended' | 'blocked';
export type PaymentMethod = 'apple_pay' | 'wallet' | 'card' | 'cash';
export type OrderOperationalStatus = 'completed' | 'in_progress' | 'cancelled' | 'pending';

export interface OrderStep {
  id: number;
  label: string;
  sublabel: string;
  status: 'completed' | 'active' | 'pending';
  iconType: 'check' | 'wash' | 'truck';
}

export interface ActiveOrder {
  id: string;
  title: string;
  details: string;
  intakeTime: string;
  expectedDelivery: string;
  totalAmount: number;
  currency: string;
  steps: OrderStep[];
}

export interface OrderHistoryItem {
  id: string;
  code: string;
  relativeTime: string;
  date: string;
  serviceTitle: string;
  itemsDescription: string;
  totalAmount: number;
  vatNote: string;
  discountNote?: string;
  paymentMethod: string;
  paymentType: 'apple_pay' | 'wallet' | 'card' | 'cash';
  operationalStatus: string;
  isCompleted: boolean;
}

export interface SavedAddress {
  id: string;
  title: string;
  isDefault: boolean;
  type: 'home' | 'work' | 'other';
  addressLine1: string;
  addressLine2: string;
  instructionType: 'driver' | 'reception' | 'gate';
  instructionTitle: string;
  instructionText: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface MonthlySpending {
  month: string;
  monthLabel: string;
  amount: number;
  currency: string;
  isCurrent?: boolean;
}

export interface CustomerFinancials {
  totalSales: number;
  completedOrdersCount: number;
  avgBasket: number;
  avgBasketVsMarketPercent: number;
  walletBalance: number;
  loyaltyPoints: number;
  loyaltyPointsValue: number;
  cancellationRate: number;
  reliabilityBadge: string;
}

export interface CustomerContact {
  phone: string;
  whatsappPhone: string;
  email: string;
  isNafathVerified: boolean;
}

export interface CustomerProfile {
  id: string;
  code: string;
  name: string;
  tier: CustomerTier;
  tierLabel: string;
  joinedDateText: string;
  isOnline: boolean;
  accountStatus: AccountStatus;
  contact: CustomerContact;
  financials: CustomerFinancials;
  activeOrder?: ActiveOrder | null;
  orders: OrderHistoryItem[];
  addresses: SavedAddress[];
  spendingHistory: MonthlySpending[];
}



export const mockCustomerProfile: CustomerProfile = {
  id: 'cst-1092',
  code: 'CST-1092',
  name: 'د. سارة عبد الرحمن',
  tier: 'vip',
  tierLabel: 'عميل VIP',
  joinedDateText: 'عميلة منذ فبراير 2023 (14 شهراً)',
  isOnline: true,
  accountStatus: 'active',
  contact: {
    phone: '+966 50 491 9823',
    whatsappPhone: '966504919823',
    email: 'sara.rahman@domain.sa',
    isNafathVerified: true,
  },
  financials: {
    totalSales: 7850,
    completedOrdersCount: 28,
    avgBasket: 280.3,
    avgBasketVsMarketPercent: 18,
    walletBalance: 145.0,
    loyaltyPoints: 1420,
    loyaltyPointsValue: 71,
    cancellationRate: 0.0,
    reliabilityBadge: 'عميل فائق الالتزام',
  },
  activeOrder: {
    id: 'ORD-9842',
    title: 'طلب قيد المعالجة الآن #ORD-9842',
    details: 'غسيل وكي مستعجل VIP (4 قطع فساتين وحرير)',
    intakeTime: 'تم الاستلام اليوم 10:15 صباحاً',
    expectedDelivery: 'مجدول للتسليم اليوم قبل الساعة 06:00 م',
    totalAmount: 266.76,
    currency: 'ج.م',
    steps: [
      {
        id: 1,
        label: '1. الاستلام',
        sublabel: '10:15 ص',
        status: 'completed',
        iconType: 'check',
      },
      {
        id: 2,
        label: '2. الفحص الذاتي',
        sublabel: '10:40 ص',
        status: 'completed',
        iconType: 'check',
      },
      {
        id: 3,
        label: '3. الغسيل والتعقيم',
        sublabel: 'جاري العمل (المرحلة 04)',
        status: 'active',
        iconType: 'wash',
      },
      {
        id: 4,
        label: '4. التوصيل السريع',
        sublabel: 'متوقع 05:30 م',
        status: 'pending',
        iconType: 'truck',
      },
    ],
  },
  orders: [
    {
      id: 'ord-9842',
      code: 'ORD-9842',
      relativeTime: 'منذ أسبوع',
      date: 'اليوم 10:15 ص',
      serviceTitle: 'غسيل وكي مستعجل VIP',
      itemsDescription: '4 قطع (2 فستان حرير + 2 عباية مطرزة)',
      totalAmount: 266.76,
      vatNote: 'شامل الضريبة 15%',
      paymentMethod: 'مدفوع إلكترونياً (أبل باي)',
      paymentType: 'apple_pay',
      operationalStatus: 'تم اكتمال ومسلم',
      isCompleted: true,
    },
    {
      id: 'ord-9410',
      code: 'ORD-9410',
      relativeTime: 'منذ أسبوع',
      date: '18 مارس 2024',
      serviceTitle: 'تنظيف جاف فاخر (Dry Clean)',
      itemsDescription: '6 قطع (معاطف، قميص، مفارش حرير)',
      totalAmount: 340.0,
      vatNote: 'ر.س | خصم ولاء 15 ر.س',
      paymentMethod: 'تم الدفع (المحفظة)',
      paymentType: 'wallet',
      operationalStatus: 'تم اكتمال ومسلم',
      isCompleted: true,
    },
    {
      id: 'ord-9120',
      code: 'ORD-9120',
      relativeTime: 'منذ شهر',
      date: '28 فبراير 2024',
      serviceTitle: 'غسيل بالبخار وعناية دقيقة',
      itemsDescription: '3 قطع بدل رسمية ومعطف صوف',
      totalAmount: 210.0,
      vatNote: 'شامل الضريبة 15%',
      paymentMethod: 'مدفوع إلكترونياً (فيزا)',
      paymentType: 'card',
      operationalStatus: 'تم اكتمال ومسلم',
      isCompleted: true,
    },
    {
      id: 'ord-8874',
      code: 'ORD-8874',
      relativeTime: 'منذ شهرين',
      date: '10 فبراير 2024',
      serviceTitle: 'تنظيف مفروشات وستائر فاخرة',
      itemsDescription: '5 قطع ستائر حرير وشراشف مطرزة',
      totalAmount: 480.0,
      vatNote: 'شامل الضريبة 15%',
      paymentMethod: 'تم الدفع (نقداً عند الاستلام)',
      paymentType: 'cash',
      operationalStatus: 'تم اكتمال ومسلم',
      isCompleted: true,
    },
  ],
  addresses: [
    {
      id: 'addr-1',
      title: 'المنزل',
      isDefault: true,
      type: 'home',
      addressLine1: 'فيلا 14، شارع وادي حنيفة',
      addressLine2: 'حي النخيل، الرياض 13524',
      instructionType: 'driver',
      instructionTitle: 'ملاحظات المندوب:',
      instructionText:
        'بوابة جانبية جنوبية، يرجى الاتصال على الجوال مسبقاً قبل الوصول بـ 15 دقيقة.',
      coordinates: { lat: 24.7391, lng: 46.6578 },
    },
    {
      id: 'addr-2',
      title: 'العيادة / العمل',
      isDefault: false,
      type: 'work',
      addressLine1: 'برج رقال الطبي، الدور 8',
      addressLine2: 'عيادة رقم 804، حي الصحافة، الرياض',
      instructionType: 'reception',
      instructionTitle: 'تعليمات الاستقبال:',
      instructionText:
        'التسليم لمكتب الاستقبال الخاص بالدكتورة، التوصيل متاح من 9 ص حتى 5 م فقط.',
      coordinates: { lat: 24.7892, lng: 46.6431 },
    },
    {
      id: 'addr-3',
      title: 'قصر العائلة',
      isDefault: false,
      type: 'other',
      addressLine1: 'كمباوند النخيل، فيلا 02',
      addressLine2: 'حي حطين، شمال الرياض',
      instructionType: 'gate',
      instructionTitle: 'تعليمات الدخول:',
      instructionText:
        'إبراز رمز نفاذ للأمن عند البوابة الرئيسية، التسليم لمدير المنزل.',
      coordinates: { lat: 24.7645, lng: 46.6119 },
    },
  ],
  spendingHistory: [
    { month: '2023-10', monthLabel: 'أكتوبر', amount: 950, currency: 'ج.م' },
    { month: '2023-11', monthLabel: 'نوفمبر', amount: 1240, currency: 'ج.م' },
    { month: '2023-12', monthLabel: 'ديسمبر', amount: 1820, currency: 'ج.م' },
    { month: '2024-01', monthLabel: 'يناير', amount: 1100, currency: 'ج.م' },
    { month: '2024-02', monthLabel: 'فبراير', amount: 1350, currency: 'ج.م' },
    {
      month: '2024-03',
      monthLabel: 'مارس (الحالي)',
      amount: 1390,
      currency: 'ج.م',
      isCurrent: true,
    },
  ],
};


// Sub-Component 1: Header & Top Actions

interface CustomerHeaderActionsProps {
  isOnline: boolean;
  onEdit: () => void;
  onRecharge: () => void;
  onBlock: () => void;
}

export const CustomerHeaderActions: React.FC<CustomerHeaderActionsProps> = ({
  isOnline,
  onEdit,
  onRecharge,
  onBlock,
}) => {
  return (
    <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
      {/* Title & Live Status */}
      <div className="flex items-center gap-3 flex-wrap">
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          سجل وبيانات العميل الشاملة
        </h1>

        {isOnline && (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200/60 shadow-xs">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            متصلة بالتطبيق الآن
          </span>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2.5 flex-wrap">
        <button
          type="button"
          onClick={onEdit}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs sm:text-sm font-semibold transition-all shadow-xs cursor-pointer active:scale-98"
        >
          <Edit3 className="w-4 h-4 text-slate-500" />
          <span>تعديل البيانات</span>
        </button>

        <button
          type="button"
          onClick={onRecharge}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border border-indigo-200 bg-white hover:bg-indigo-50/50 text-indigo-700 text-xs sm:text-sm font-semibold transition-all shadow-xs cursor-pointer active:scale-98"
        >
          <Wallet className="w-4 h-4 text-indigo-600" />
          <span>شحن المحفظة يدوياً</span>
        </button>

        <button
          type="button"
          onClick={onBlock}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border border-rose-200 bg-white hover:bg-rose-50 text-rose-600 text-xs sm:text-sm font-semibold transition-all shadow-xs cursor-pointer active:scale-98"
        >
          <Ban className="w-4 h-4 text-rose-500" />
          <span>حظر / تعليق الحساب</span>
        </button>
      </div>
    </header>
  );
};


// Sub-Component 2: Customer Sidebar Profile & Financials


interface CustomerSidebarProfileProps {
  profile: CustomerProfile;
  onRechargeWallet: () => void;
  onCopyText: (text: string, label: string) => void;
}

export const CustomerSidebarProfile: React.FC<CustomerSidebarProfileProps> = ({
  profile,
  onRechargeWallet,
  onCopyText,
}) => {
  const { contact, financials } = profile;

  return (
    <aside className="w-full lg:w-[350px] xl:w-[370px] shrink-0 space-y-4">
      {/* 1. Identity & Contact Card */}
      <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm space-y-4">
        {/* Name & Badges */}
        <div>
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-lg font-black text-slate-900 tracking-tight">
              {profile.name}
            </h2>
          </div>

          <div className="flex items-center gap-2 mt-1.5 flex-wrap">
            <span className="text-[11px] font-bold text-slate-400 font-mono">
              #{profile.code}
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-rose-50 text-rose-600 border border-rose-200">
              <Crown className="w-3 h-3 text-rose-500 fill-rose-500/20" />
              {profile.tierLabel}
            </span>
          </div>

          <div className="flex items-center gap-1.5 mt-2.5 text-xs text-slate-500 font-medium">
            <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span>{profile.joinedDateText}</span>
          </div>
        </div>

        <div className="border-t border-slate-100 pt-3">
          {/* Direct Contacts Header */}
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-xs font-bold text-slate-600">
              معلومات التواصل المباشر
            </span>
            {contact.isNafathVerified && (
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                موثق عبر نفاذ
              </span>
            )}
          </div>

          {/* Contact Methods List */}
          <div className="space-y-2">
            {/* Phone & WhatsApp */}
            <div className="bg-slate-50/70 hover:bg-slate-50 transition-colors border border-slate-100 rounded-xl p-2.5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-slate-400" />
                <span className="text-xs font-bold text-slate-800 font-mono" dir="ltr">
                  {contact.phone}
                </span>
              </div>
              <a
                href={`https://wa.me/${contact.whatsappPhone}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 hover:text-emerald-700 bg-white hover:bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-100 shadow-2xs transition-colors"
              >
                <span>واتساب</span>
              </a>
            </div>

            {/* Email & Copy */}
            <div className="bg-slate-50/70 hover:bg-slate-50 transition-colors border border-slate-100 rounded-xl p-2.5 flex items-center justify-between">
              <div className="flex items-center gap-2 min-w-0">
                <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span className="text-xs font-medium text-slate-700 truncate max-w-[200px]" dir="ltr">
                  {contact.email}
                </span>
              </div>
              <button
                type="button"
                onClick={() => onCopyText(contact.email, 'البريد الإلكتروني')}
                title="نسخ البريد الإلكتروني"
                className="text-slate-400 hover:text-slate-700 p-1 rounded-md hover:bg-white transition-colors cursor-pointer"
              >
                <Copy className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Cumulative Financial Metrics Grid */}
      <div className="space-y-2.5">
        <p className="text-xs font-bold text-slate-400 px-1">
          القيمة التراكمية والإحصائيات
        </p>

        {/* Sales & Avg Basket Cards */}
        <div className="grid grid-cols-2 gap-2.5">
          {/* Total Sales Card */}
          <div className="bg-white rounded-2xl p-3.5 border border-slate-100 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500 font-medium">إجمالي المبيعات</span>
              <div className="w-6 h-6 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                <CreditCard className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="mt-2.5">
              <div className="flex items-baseline gap-1">
                <span className="text-xl font-black text-slate-900 tracking-tight">
                  {financials.totalSales.toLocaleString('ar-EG')}
                </span>
                <span className="text-[11px] font-medium text-slate-400">ج.م</span>
              </div>
              <span className="text-[11px] text-slate-400 font-medium mt-0.5 block">
                {financials.completedOrdersCount} طلب مكتمل
              </span>
            </div>
          </div>

          {/* Average Basket Card */}
          <div className="bg-white rounded-2xl p-3.5 border border-slate-100 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500 font-medium">متوسط السلة</span>
              <div className="w-6 h-6 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center">
                <ShoppingBag className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="mt-2.5">
              <div className="flex items-baseline gap-1">
                <span className="text-xl font-black text-slate-900 tracking-tight">
                  {financials.avgBasket}
                </span>
                <span className="text-[11px] font-medium text-slate-400">ج.م</span>
              </div>
              <span className="text-[11px] font-black text-blue-600 mt-0.5 block">
                +{financials.avgBasketVsMarketPercent}% أعلى من المتوسط
              </span>
            </div>
          </div>
        </div>

        {/* Cloud Wallet Balance Horizontal Card */}
        <div className="bg-[#ffece8] border border-rose-200/80 rounded-2xl p-3.5 flex items-center justify-between shadow-2xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-500 text-white flex items-center justify-center shadow-xs">
              <Wallet className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-rose-950">رصيد المحفظة السحابية</p>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="text-xl font-black text-rose-600 tracking-tight">
                  {financials.walletBalance.toFixed(2)}
                </span>
                <span className="text-xs font-bold text-rose-600">ج.م</span>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={onRechargeWallet}
            className="bg-white hover:bg-rose-50 text-rose-600 border border-rose-200 text-xs font-black px-3 py-1.5 rounded-lg shadow-2xs transition-all active:scale-98 cursor-pointer"
          >
            شحن / تسوية
          </button>
        </div>

        {/* Loyalty & Cancellation Metrics */}
        <div className="grid grid-cols-2 gap-2.5">
          {/* Loyalty Points */}
          <div className="bg-white rounded-2xl p-3.5 border border-slate-100 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500 font-medium">نقاط الولاء</span>
              <Tag className="w-4 h-4 text-rose-400" />
            </div>
            <div className="mt-2">
              <span className="text-lg font-black text-slate-900">
                {financials.loyaltyPoints.toLocaleString('ar-EG')}
              </span>
              <span className="text-[11px] font-bold text-rose-500 block mt-0.5">
                تعادل {financials.loyaltyPointsValue} ج.م
              </span>
            </div>
          </div>

          {/* Cancellation Rate */}
          <div className="bg-white rounded-2xl p-3.5 border border-slate-100 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500 font-medium">نسبة الإلغاء</span>
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
            </div>
            <div className="mt-2">
              <span className="text-lg font-black text-slate-900">
                {financials.cancellationRate.toFixed(1)}%
              </span>
              <span className="text-[11px] font-semibold text-slate-400 block mt-0.5">
                {financials.reliabilityBadge}
              </span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};


// Sub-Component 3: Live Active Order Tracker Banner


interface ActiveOrderTrackerProps {
  order: ActiveOrder;
}

export const ActiveOrderTracker: React.FC<ActiveOrderTrackerProps> = ({ order }) => {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 text-white p-5 sm:p-6 shadow-md shadow-blue-700/10 space-y-5">
      {/* Background ambient accents */}
      <div className="absolute -top-12 -left-12 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-16 -right-16 w-56 h-56 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

      {/* Top Banner Row */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div>
          <span className="inline-block px-3 py-1 rounded-full text-[11px] font-bold bg-white/15 border border-white/20 text-blue-100 backdrop-blur-md">
            {order.title}
          </span>
          <h3 className="text-lg sm:text-xl font-black text-white mt-2 tracking-tight">
            {order.details}
          </h3>
          <p className="text-xs text-blue-100/90 mt-1 font-medium">
            {order.intakeTime} • {order.expectedDelivery}
          </p>
        </div>

        <div className="sm:text-left text-right">
          <span className="text-xs text-blue-200 font-medium block">المبلغ الإجمالي</span>
          <div className="flex items-baseline sm:justify-start justify-end gap-1 mt-0.5">
            <span className="text-2xl font-black text-white tracking-tight">
              {order.totalAmount.toFixed(2)}
            </span>
            <span className="text-xs font-bold text-blue-100">{order.currency}</span>
          </div>
        </div>
      </div>

      {/* Multi-Step Interactive Progress Stepper */}
      <div className="relative z-10 bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-4 sm:p-5">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-2 relative">
          {order.steps.map((step, idx) => {
            const isCompleted = step.status === 'completed';
            const isActive = step.status === 'active';

            return (
              <div key={step.id} className="relative flex flex-col items-center text-center">
                {/* Horizontal Connector Line for desktop */}
                {idx < order.steps.length - 1 && (
                  <div
                    className={`hidden sm:block absolute top-4 left-0 w-full h-[3px] -translate-x-1/2 z-0 ${
                      isCompleted ? 'bg-emerald-400' : 'bg-white/20'
                    }`}
                  />
                )}

                {/* Step Circle Badge */}
                <div
                  className={`relative z-10 w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                    isCompleted
                      ? 'bg-emerald-500 text-white shadow-xs'
                      : isActive
                      ? 'bg-white text-blue-600 ring-4 ring-white/30 shadow-md animate-pulse'
                      : 'bg-white/20 text-white/70'
                  }`}
                >
                  {isCompleted ? (
                    <Check className="w-5 h-5 stroke-[2.5]" />
                  ) : isActive ? (
                    <Sparkles className="w-4 h-4 text-blue-600" />
                  ) : (
                    <Truck className="w-4 h-4 text-white/70" />
                  )}
                </div>

                {/* Step Titles */}
                <span
                  className={`text-xs font-bold mt-2 ${
                    isActive ? 'text-white' : isCompleted ? 'text-blue-100' : 'text-blue-200/70'
                  }`}
                >
                  {step.label}
                </span>
                <span
                  className={`text-[11px] font-medium mt-0.5 ${
                    isActive ? 'text-blue-200 font-bold' : 'text-blue-200/70'
                  }`}
                >
                  {step.sublabel}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};


// Sub-Component 4: Order History Table


interface OrderHistoryTableProps {
  orders: OrderHistoryItem[];
  onViewOrderDetails: (order: OrderHistoryItem) => void;
}

export const OrderHistoryTable: React.FC<OrderHistoryTableProps> = ({
  orders,
  onViewOrderDetails,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const filteredOrders = useMemo(() => {
    if (!searchTerm.trim()) return orders;
    const query = searchTerm.toLowerCase();
    return orders.filter(
      (ord) =>
        ord.code.toLowerCase().includes(query) ||
        ord.serviceTitle.toLowerCase().includes(query) ||
        ord.itemsDescription.toLowerCase().includes(query)
    );
  }, [orders, searchTerm]);

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage) || 1;
  const currentOrders = filteredOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-100 shadow-sm space-y-4">
      {/* Header and Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
            سجل الطلبات والشحنات السابقة
          </h2>
          <p className="text-xs text-slate-400 font-medium mt-0.5">
            قائمة بجميع العمليات والطلبات المنفذة عبر كافة الفروع
          </p>
        </div>

        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="بحث برقم الطلب أو الخدمة..."
            className="w-full sm:w-64 pr-9 pl-4 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all"
          />
        </div>
      </div>

      {/* Table responsive container */}
      <div className="overflow-x-auto rounded-2xl border border-slate-100">
        <table className="w-full text-right text-xs">
          <thead>
            <tr className="bg-slate-50/80 text-slate-500 font-bold border-b border-slate-100">
              <th className="px-4 py-3">رقم الطلب والتاريخ</th>
              <th className="px-4 py-3">نوع الخدمة والقطع</th>
              <th className="px-4 py-3">إجمالي الفاتورة</th>
              <th className="px-4 py-3">حالة الدفع</th>
              <th className="px-4 py-3">الحالة التشغيلية</th>
              <th className="px-4 py-3 text-center">إجراءات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {currentOrders.length > 0 ? (
              currentOrders.map((ord) => (
                <tr key={ord.id} className="hover:bg-slate-50/60 transition-colors">
                  {/* 1. Order Code & Date */}
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-2">
                      <div className="w-1 self-stretch rounded-full bg-blue-600" />
                      <div>
                        <span className="inline-block px-2 py-0.5 rounded-md text-[11px] font-black bg-blue-50 text-blue-700 font-mono">
                          #{ord.code}
                        </span>
                        <div className="flex items-center gap-1 text-[11px] text-slate-400 font-medium mt-1">
                          <span>{ord.relativeTime}</span>
                          <span>•</span>
                          <span>{ord.date}</span>
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* 2. Service Title & Items */}
                  <td className="px-4 py-3.5">
                    <p className="font-bold text-slate-800 text-xs sm:text-sm">
                      {ord.serviceTitle}
                    </p>
                    <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                      {ord.itemsDescription}
                    </p>
                  </td>

                  {/* 3. Invoice Total */}
                  <td className="px-4 py-3.5">
                    <div className="flex items-baseline gap-1">
                      <span className="font-black text-slate-900 text-sm">
                        {ord.totalAmount.toFixed(2)}
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-400 block mt-0.5">
                      {ord.vatNote}
                    </span>
                  </td>

                  {/* 4. Payment Status */}
                  <td className="px-4 py-3.5">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                      {ord.paymentType === 'wallet' ? (
                        <Wallet className="w-3.5 h-3.5" />
                      ) : (
                        <CreditCard className="w-3.5 h-3.5" />
                      )}
                      <span>{ord.paymentMethod}</span>
                    </span>
                  </td>

                  {/* 5. Operational Status */}
                  <td className="px-4 py-3.5">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{ord.operationalStatus}</span>
                    </span>
                  </td>

                  {/* 6. Action Button */}
                  <td className="px-4 py-3.5 text-center">
                    <button
                      type="button"
                      onClick={() => onViewOrderDetails(ord)}
                      className="bg-blue-50 hover:bg-blue-100 text-blue-600 text-xs font-black px-3 py-1.5 rounded-lg transition-colors cursor-pointer active:scale-98"
                    >
                      عرض التفاصيل
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center py-8 text-slate-400 text-xs font-medium">
                  لا توجد طلبات مطابقة لبحثك
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
        <span className="text-xs text-slate-400 font-medium">
          عرض {currentOrders.length} من أصل 28 طلباً مسجلة
        </span>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          {[1, 2, 3].map((pageNumber) => (
            <button
              key={pageNumber}
              type="button"
              onClick={() => setCurrentPage(pageNumber)}
              className={`w-7 h-7 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                currentPage === pageNumber
                  ? 'bg-[#fe574f] text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {pageNumber}
            </button>
          ))}

          <button
            type="button"
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};


// Sub-Component 5: Saved Delivery Addresses Section


interface SavedAddressesSectionProps {
  addresses: SavedAddress[];
  onSetDefault: (id: string) => void;
  onOpenGps: (address: SavedAddress) => void;
}

export const SavedAddressesSection: React.FC<SavedAddressesSectionProps> = ({
  addresses,
  onSetDefault,
  onOpenGps,
}) => {
  return (
    <section className="space-y-4">
      {/* Section Header */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
          <MapPin className="w-4 h-4" />
        </div>
        <div>
          <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
            العناوين ومواقع التسليم المحفوظة
          </h2>
          <p className="text-xs text-slate-400 font-medium">
            3 عناوين معتمدة ومربوطة بحساب العميل والخرائط اللوجستية
          </p>
        </div>
      </div>

      {/* Addresses Grid (3 Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {addresses.map((addr) => {
          const isDefault = addr.isDefault;

          return (
            <div
              key={addr.id}
              className={`bg-white rounded-2xl p-5 shadow-xs flex flex-col justify-between transition-all ${
                isDefault
                  ? 'border-2 border-blue-600 ring-2 ring-blue-500/10'
                  : 'border border-slate-200/90 hover:border-slate-300'
              }`}
            >
              <div>
                {/* Card Title & Icon */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                        isDefault
                          ? 'bg-blue-50 text-blue-600'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {addr.type === 'home' ? (
                        <Home className="w-4 h-4" />
                      ) : addr.type === 'work' ? (
                        <Building2 className="w-4 h-4" />
                      ) : (
                        <Briefcase className="w-4 h-4" />
                      )}
                    </div>
                    <span className="font-black text-slate-900 text-sm">{addr.title}</span>
                  </div>

                  {isDefault && (
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-600 text-white shadow-2xs">
                      العنوان الافتراضي
                    </span>
                  )}
                </div>

                {/* Address Lines */}
                <div className="mt-3.5 space-y-0.5">
                  <p className="text-sm font-bold text-slate-800">{addr.addressLine1}</p>
                  <p className="text-xs text-slate-500 font-medium">{addr.addressLine2}</p>
                </div>

                {/* Instructions Box */}
                <div
                  className={`mt-3.5 rounded-xl p-3 flex items-start gap-2.5 text-xs ${
                    isDefault
                      ? 'bg-blue-50/70 border border-blue-100 text-blue-900'
                      : 'bg-slate-50 border border-slate-100 text-slate-700'
                  }`}
                >
                  {addr.instructionType === 'driver' ? (
                    <Truck className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                  ) : addr.instructionType === 'reception' ? (
                    <Building2 className="w-4 h-4 text-slate-600 mt-0.5 shrink-0" />
                  ) : (
                    <Info className="w-4 h-4 text-slate-600 mt-0.5 shrink-0" />
                  )}
                  <div className="leading-relaxed">
                    <span className="font-bold block mb-0.5">{addr.instructionTitle}</span>
                    <span className="text-[11px] opacity-90">{addr.instructionText}</span>
                  </div>
                </div>
              </div>

              {/* Bottom Action Button */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-center">
                {isDefault ? (
                  <button
                    type="button"
                    onClick={() => onOpenGps(addr)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 hover:text-emerald-700 py-1 transition-colors cursor-pointer"
                  >
                    <LocateFixed className="w-4 h-4 text-emerald-600" />
                    <span>موقع دقيق GPS</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => onSetDefault(addr.id)}
                    className="text-xs font-bold text-blue-600 hover:text-blue-700 py-1 transition-colors cursor-pointer"
                  >
                    تعيين كافتراضي
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};


// Sub-Component 6: Annual Spending Chart


interface AnnualSpendingChartProps {
  data: MonthlySpending[];
}

export const AnnualSpendingChart: React.FC<AnnualSpendingChartProps> = ({ data }) => {
  const maxAmount = useMemo(() => {
    return Math.max(...data.map((d) => d.amount), 2000);
  }, [data]);

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-100 shadow-sm space-y-6">
      {/* Chart Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
            تحليل وتوزيع إنفاق العميل السنوي
          </h2>
          <p className="text-xs text-slate-400 font-medium mt-0.5">
            معدل تكرار الطلبات وتفضيل الخدمات خلال آخر 6 أشهر
          </p>
        </div>

        <span className="self-start sm:self-auto px-3.5 py-1 rounded-full text-xs font-bold bg-rose-50 text-[#fe574f] border border-rose-200">
          معدل طلب مرتفع (2.3 طلب / أسبوع)
        </span>
      </div>

      {/* Bar Chart Container */}
      <div className="pt-6 pb-2">
        <div className="grid grid-cols-6 gap-2 sm:gap-4 items-end h-44">
          {data.map((item) => {
            const heightPercent = Math.round((item.amount / maxAmount) * 100);
            const isCurrent = !!item.isCurrent;

            return (
              <div key={item.month} className="flex flex-col items-center h-full justify-end group">
                {/* Amount on top of bar */}
                <span
                  className={`text-[11px] sm:text-xs mb-2 transition-transform group-hover:-translate-y-0.5 ${
                    isCurrent ? 'font-bold text-[#fe574f]' : 'font-medium text-slate-500'
                  }`}
                >
                  {item.amount.toLocaleString('ar-EG')} ج.م
                </span>

                {/* Bar */}
                <div className="w-full max-w-[85px] bg-slate-100/50 rounded-2xl flex items-end overflow-hidden h-32">
                  <div
                    style={{ height: `${heightPercent}%` }}
                    className={`w-full rounded-xl transition-all duration-500 cursor-pointer ${
                      isCurrent
                        ? 'bg-[#fe574f] hover:bg-[#fe574f]/90 shadow-md shadow-rose-500/20'
                        : 'bg-[#ffece8] hover:bg-rose-200/90'
                    }`}
                  />
                </div>

                {/* Month Label */}
                <span
                  className={`text-[11px] sm:text-xs mt-3 font-semibold ${
                    isCurrent ? 'text-[#fe574f]' : 'text-slate-500'
                  }`}
                >
                  {item.monthLabel}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};


// Modals for Top Actions & Interactivity


// 1. Edit Profile Modal
interface EditCustomerModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: CustomerProfile;
  onSave: (updated: Partial<CustomerProfile>) => void;
}

const EditCustomerModal: React.FC<EditCustomerModalProps> = ({
  isOpen,
  onClose,
  profile,
  onSave,
}) => {
  const [name, setName] = useState(profile.name);
  const [phone, setPhone] = useState(profile.contact.phone);
  const [email, setEmail] = useState(profile.contact.email);

  useEffect(() => {
    setName(profile.name);
    setPhone(profile.contact.phone);
    setEmail(profile.contact.email);
  }, [profile]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
      <div className="bg-white rounded-3xl p-6 w-full max-w-md shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Edit3 className="w-5 h-5 text-blue-600" />
            <h3 className="text-base font-bold text-slate-900">تعديل بيانات العميل</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-7 h-7 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-3.5 text-right">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">اسم العميل</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">رقم الجوال</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              dir="ltr"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">البريد الإلكتروني</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              dir="ltr"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
          >
            إلغاء
          </button>
          <button
            type="button"
            onClick={() => {
              onSave({
                name,
                contact: {
                  ...profile.contact,
                  phone,
                  email,
                },
              });
              onClose();
            }}
            className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-xs"
          >
            حفظ التغييرات
          </button>
        </div>
      </div>
    </div>
  );
};

// 2. Recharge Wallet Modal
interface RechargeWalletModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentBalance: number;
  onRecharge: (amount: number, reason: string) => void;
}

const RechargeWalletModal: React.FC<RechargeWalletModalProps> = ({
  isOpen,
  onClose,
  currentBalance,
  onRecharge,
}) => {
  const [amount, setAmount] = useState<string>('50');
  const [reason, setReason] = useState('شحن يدوي - خدمة العملاء');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
      <div className="bg-white rounded-3xl p-6 w-full max-w-md shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Wallet className="w-5 h-5 text-indigo-600" />
            <h3 className="text-base font-bold text-slate-900">شحن / تسوية رصيد المحفظة</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-7 h-7 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="bg-indigo-50/60 border border-indigo-100 rounded-2xl p-3 flex items-center justify-between">
          <span className="text-xs text-indigo-900 font-semibold">الرصيد الحالي بالمحفظة:</span>
          <span className="text-sm font-black text-indigo-700">
            {currentBalance.toFixed(2)} ج.م
          </span>
        </div>

        <div className="space-y-3.5 text-right">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">المبلغ المراد شحنه (ج.م)</label>
            <div className="grid grid-cols-4 gap-2 mb-2">
              {['25', '50', '100', '200'].map((val) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => setAmount(val)}
                  className={`py-1.5 rounded-lg text-xs font-bold border transition-colors ${
                    amount === val
                      ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  +{val}
                </button>
              ))}
            </div>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">سبب أو ملاحظة العملية</label>
            <input
              type="text"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
          >
            إلغاء
          </button>
          <button
            type="button"
            onClick={() => {
              const num = parseFloat(amount);
              if (!isNaN(num) && num > 0) {
                onRecharge(num, reason);
                onClose();
              }
            }}
            className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-xs"
          >
            تأكيد الشحن
          </button>
        </div>
      </div>
    </div>
  );
};

// 3. Block / Suspend Modal
interface BlockCustomerModalProps {
  isOpen: boolean;
  onClose: () => void;
  customerName: string;
  onConfirmBlock: (reason: string) => void;
}

const BlockCustomerModal: React.FC<BlockCustomerModalProps> = ({
  isOpen,
  onClose,
  customerName,
  onConfirmBlock,
}) => {
  const [selectedReason, setSelectedReason] = useState('طلب متكرر مع عدم الاستلام');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
      <div className="bg-white rounded-3xl p-6 w-full max-w-md shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Ban className="w-5 h-5 text-rose-600" />
            <h3 className="text-base font-bold text-slate-900">تعليق / حظر حساب العميل</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-7 h-7 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed">
          هل أنت متأكد من رغبتك في تعليق حساب <strong className="text-slate-900">{customerName}</strong>؟ لن يتمكن العميل من إنشاء طلبات جديدة حتى إعادة التفعيل.
        </p>

        <div className="space-y-2 text-right">
          <label className="block text-xs font-bold text-slate-700">حدد سبب التعليق:</label>
          {[
            'طلب متكرر مع عدم الاستلام',
            'سلوك غير ملائم مع فريق التوصيل',
            'بناءً على طلب العميل المؤقت',
            'فحص أمني للحساب',
          ].map((r) => (
            <label
              key={r}
              className="flex items-center gap-2 p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer text-xs"
            >
              <input
                type="radio"
                name="block-reason"
                checked={selectedReason === r}
                onChange={() => setSelectedReason(r)}
                className="text-rose-600"
              />
              <span className="text-slate-700 font-medium">{r}</span>
            </label>
          ))}
        </div>

        <div className="flex items-center justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
          >
            تراجع
          </button>
          <button
            type="button"
            onClick={() => {
              onConfirmBlock(selectedReason);
              onClose();
            }}
            className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 shadow-xs"
          >
            تأكيد التعليق
          </button>
        </div>
      </div>
    </div>
  );
};

// 4. Order Details Modal
interface OrderDetailsModalProps {
  order: OrderHistoryItem | null;
  onClose: () => void;
}

const OrderDetailsModal: React.FC<OrderDetailsModalProps> = ({ order, onClose }) => {
  if (!order) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
      <div className="bg-white rounded-3xl p-6 w-full max-w-lg shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-md text-xs font-black bg-blue-50 text-blue-700 font-mono">
              #{order.code}
            </span>
            <h3 className="text-base font-bold text-slate-900">تفاصيل الفاتورة والشحنة</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-7 h-7 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-3 text-right">
          <div className="bg-slate-50 rounded-2xl p-3.5 space-y-2 border border-slate-100">
            <div className="flex justify-between text-xs">
              <span className="text-slate-500 font-medium">نوع الخدمة:</span>
              <span className="font-bold text-slate-800">{order.serviceTitle}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-slate-500 font-medium">القطع المسجلة:</span>
              <span className="font-bold text-slate-800">{order.itemsDescription}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-slate-500 font-medium">تاريخ المعاملة:</span>
              <span className="font-bold text-slate-800">{order.date}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-slate-500 font-medium">وسيلة الدفع:</span>
              <span className="font-bold text-emerald-700">{order.paymentMethod}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-slate-500 font-medium">الحالة التشغيلية:</span>
              <span className="font-bold text-emerald-700">{order.operationalStatus}</span>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-3 flex justify-between items-baseline">
            <span className="text-sm font-bold text-slate-700">المبلغ الإجمالي المسدد:</span>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-black text-slate-900">{order.totalAmount.toFixed(2)}</span>
              <span className="text-xs font-bold text-slate-500">ج.م</span>
            </div>
          </div>
          <p className="text-[11px] text-slate-400">{order.vatNote}</p>
        </div>

        <div className="flex items-center justify-end pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
          >
            إغلاق
          </button>
        </div>
      </div>
    </div>
  );
};

// 5. GPS Address Location Modal
interface AddressMapModalProps {
  address: SavedAddress | null;
  onClose: () => void;
}

const AddressMapModal: React.FC<AddressMapModalProps> = ({ address, onClose }) => {
  if (!address) return null;

  const mapUrl = `https://www.google.com/maps?q=${address.coordinates.lat},${address.coordinates.lng}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
      <div className="bg-white rounded-3xl p-6 w-full max-w-md shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <LocateFixed className="w-5 h-5 text-emerald-600" />
            <h3 className="text-base font-bold text-slate-900">موقع التسليم GPS</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-7 h-7 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Mock Map View */}
        <div className="h-44 rounded-2xl bg-slate-100 border border-slate-200 flex flex-col items-center justify-center relative overflow-hidden text-center p-4">
          <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-lg animate-bounce">
            <MapPin className="w-5 h-5" />
          </div>
          <p className="text-xs font-bold text-slate-700 mt-2">{address.title}</p>
          <p className="text-[11px] text-slate-500 mt-0.5">{address.addressLine1}</p>
          <span className="text-[10px] text-slate-400 font-mono mt-1">
            {address.coordinates.lat}, {address.coordinates.lng}
          </span>
        </div>

        <div className="bg-slate-50 rounded-xl p-3 text-xs text-slate-600 leading-relaxed">
          <span className="font-bold text-slate-800 block mb-0.5">{address.instructionTitle}</span>
          <span>{address.instructionText}</span>
        </div>

        <div className="flex items-center justify-between pt-2">
          <a
            href={mapUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700"
          >
            <ExternalLink className="w-4 h-4" />
            فتح في خرائط Google
          </a>

          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200"
          >
            تم
          </button>
        </div>
      </div>
    </div>
  );
};


// Main Customer Details Page Component


export default function CustomerDetails() {
  const { customerId } = useParams<{ customerId?: string }>();

  
  const [profile, setProfile] = useState<CustomerProfile>(mockCustomerProfile);
  const [, setLoading] = useState<boolean>(false);

  // Modals state
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isRechargeModalOpen, setIsRechargeModalOpen] = useState(false);
  const [isBlockModalOpen, setIsBlockModalOpen] = useState(false);
  const [selectedOrderDetails, setSelectedOrderDetails] = useState<OrderHistoryItem | null>(null);
  const [selectedGpsAddress, setSelectedGpsAddress] = useState<SavedAddress | null>(null);

  // Toast notification state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Simulated API fetch when customerId changes
  useEffect(() => {
    if (customerId && customerId !== mockCustomerProfile.id) {
      setLoading(true);
      // In production:
      // axios.get(`/api/admin/customers/${customerId}`).then(res => setProfile(res.data)).finally(() => setLoading(false))
      const timer = setTimeout(() => {
        setProfile((prev) => ({
          ...prev,
          code: customerId.toUpperCase(),
        }));
        setLoading(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [customerId]);

  // Actions handlers
  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    showToast(`تم نسخ ${label} بنجاح`);
  };

  const handleUpdateProfile = (updates: Partial<CustomerProfile>) => {
    setProfile((prev) => ({
      ...prev,
      ...updates,
      contact: {
        ...prev.contact,
        ...(updates.contact || {}),
      },
    }));
    showToast('تم تحديث بيانات العميل بنجاح');
  };

  const handleRechargeWallet = (amount: number, reason: string) => {
    setProfile((prev) => ({
      ...prev,
      financials: {
        ...prev.financials,
        walletBalance: prev.financials.walletBalance + amount,
      },
    }));
    showToast(`تم إضافة ${amount} ج.م إلى المحفظة السحابية بنجاح (${reason})`);
  };

  const handleBlockCustomer = (reason: string) => {
    setProfile((prev) => ({
      ...prev,
      accountStatus: 'suspended',
      isOnline: false,
    }));
    showToast(`تم تعليق حساب العميل بنجاح: ${reason}`);
  };

  const handleSetDefaultAddress = (addressId: string) => {
    setProfile((prev) => ({
      ...prev,
      addresses: prev.addresses.map((a) => ({
        ...a,
        isDefault: a.id === addressId,
      })),
    }));
    showToast('تم تحديث العنوان الافتراضي للتوصيل');
  };

  return (
    <div
      dir="rtl"
      className="font-tajawal min-h-screen text-slate-800 pb-16 space-y-6 pt-2"
      style={{ fontFamily: "'Tajawal', sans-serif" }}
    >
      {/* Toast Alert Feedback */}
      {toastMessage && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white text-xs font-bold px-4 py-2.5 rounded-2xl shadow-xl flex items-center gap-2 animate-in fade-in slide-in-from-top-4 duration-200">
          <CheckCheck className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 1. Top Header Actions Bar */}
      <CustomerHeaderActions
        isOnline={profile.isOnline}
        onEdit={() => setIsEditModalOpen(true)}
        onRecharge={() => setIsRechargeModalOpen(true)}
        onBlock={() => setIsBlockModalOpen(true)}
      />

      {/* 2. Top Two-Column Grid: Left Main Stack & Right Sidebar */}
      <div className="flex flex-col-reverse lg:flex-row items-start gap-6">
        {/* Left Main Content Stack */}
        <div className="flex-1 w-full min-w-0 space-y-6">
          {/* A. Live Active Order Tracker Banner */}
          {profile.activeOrder && <ActiveOrderTracker order={profile.activeOrder} />}

          {/* B. Order History & Shipments Table */}
          <OrderHistoryTable
            orders={profile.orders}
            onViewOrderDetails={(ord) => setSelectedOrderDetails(ord)}
          />
        </div>

        {/* Right Sidebar: Customer Profile & Cumulative Metrics */}
        <CustomerSidebarProfile
          profile={profile}
          onRechargeWallet={() => setIsRechargeModalOpen(true)}
          onCopyText={handleCopy}
        />
      </div>

      {/* 3. Saved Delivery Addresses Section */}
      <SavedAddressesSection
        addresses={profile.addresses}
        onSetDefault={handleSetDefaultAddress}
        onOpenGps={(addr) => setSelectedGpsAddress(addr)}
      />

      {/* 4. Annual Spending Analysis Chart */}
      <AnnualSpendingChart data={profile.spendingHistory} />

      {/* Modals */}
      <EditCustomerModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        profile={profile}
        onSave={handleUpdateProfile}
      />

      <RechargeWalletModal
        isOpen={isRechargeModalOpen}
        onClose={() => setIsRechargeModalOpen(false)}
        currentBalance={profile.financials.walletBalance}
        onRecharge={handleRechargeWallet}
      />

      <BlockCustomerModal
        isOpen={isBlockModalOpen}
        onClose={() => setIsBlockModalOpen(false)}
        customerName={profile.name}
        onConfirmBlock={handleBlockCustomer}
      />

      <OrderDetailsModal
        order={selectedOrderDetails}
        onClose={() => setSelectedOrderDetails(null)}
      />

      <AddressMapModal
        address={selectedGpsAddress}
        onClose={() => setSelectedGpsAddress(null)}
      />
    </div>
  );
}
