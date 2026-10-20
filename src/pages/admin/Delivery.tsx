import { useState } from 'react';
import {
  Truck, CheckCircle2, Clock, AlertTriangle,
  Search, MapPin, Phone, User, Calendar,
  ChevronLeft, ChevronRight, Star,
  ShieldCheck, Filter, Mail, Package, Zap,
  TrendingUp, Navigation,
} from 'lucide-react';


interface DeliveryTask {
  id: string;
  orderNumber: string;
  isVip: boolean;
  isUrgent?: boolean;
  timeSlot: string;
  remainingTimeMinutes: number;
  customerName: string;
  customerPhone?: string;
  customerEmail?: string;
  address: string;
  district: string;
  captainName: string;
  captainPhone?: string;
  status: 'pending' | 'in_progress' | 'collected' | 'delivered' | 'delayed';
  notes?: string;
  bagsCount: number;
  otpVerified: boolean;
  rating?: number;
  collectionStatus?: string;
}

interface TimelineEvent {
  time: string;
  description: string;
  type: 'assign' | 'move' | 'notify' | 'arrived' | 'collected';
}

interface CaptainInfo {
  name: string;
  phone: string;
  distanceMeters: number;
  vehicleType: string;
  totalOrders: number;
}

// ─── Mock Data ────────────────────────────────────────────────────────────────

const CAPTAIN_DETAILS: Record<string, CaptainInfo> = {
  'صالح الغامدي': { name: 'صالح الغامدي', phone: '0501234567', distanceMeters: 500, vehicleType: 'سيارة سيدان', totalOrders: 14 },
  'أحمد الزهراني': { name: 'أحمد الزهراني', phone: '0559876543', distanceMeters: 1200, vehicleType: 'دباب', totalOrders: 9 },
  'محمد القحطاني': { name: 'محمد القحطاني', phone: '0534455667', distanceMeters: 300, vehicleType: 'سيارة SUV', totalOrders: 22 },
  'خالد العتيبي': { name: 'خالد العتيبي', phone: '0512233445', distanceMeters: 2000, vehicleType: 'سيارة سيدان', totalOrders: 7 },
};

const TIMELINE_DATA: Record<string, TimelineEvent[]> = {
  '1': [
    { time: '10:12 ص', description: 'تم إسناد الطلب للكابتن صالح الغامدي', type: 'assign' },
    { time: '10:18 ص', description: 'بدء التحرك نحو موقع العميل', type: 'move' },
    { time: '10:24 ص', description: 'إرسال إشعار للعميل بالاقتراب المباشر', type: 'notify' },
  ],
  '2': [
    { time: '09:30 ص', description: 'تم إسناد الطلب للكابتن أحمد الزهراني', type: 'assign' },
    { time: '09:45 ص', description: 'بدء التحرك نحو موقع العميل', type: 'move' },
    { time: '10:00 ص', description: 'وصل الكابتن إلى موقع العميل', type: 'arrived' },
    { time: '10:05 ص', description: 'تم تجميع الحقائب وتأكيد OTP بنجاح', type: 'collected' },
  ],
  '3': [
    { time: '11:00 ص', description: 'تم إسناد الطلب للكابتن محمد القحطاني', type: 'assign' },
    { time: '11:10 ص', description: 'بدء التحرك نحو موقع العميل', type: 'move' },
  ],
  '4': [
    { time: '08:00 ص', description: 'تم إسناد الطلب للكابتن خالد العتيبي', type: 'assign' },
    { time: '08:15 ص', description: 'تأخير بسبب ازدحام مروري', type: 'notify' },
  ],
  '5': [
    { time: '12:00 م', description: 'تم إسناد الطلب للكابتن صالح الغامدي', type: 'assign' },
    { time: '12:15 م', description: 'بدء التحرك نحو موقع العميل', type: 'move' },
  ],
};

const MOCK_TASKS: DeliveryTask[] = [
  {
    id: '1', orderNumber: '#904', isVip: true, isUrgent: true,
    timeSlot: '10:20 ص - 11:15 ص', remainingTimeMinutes: 12,
    customerName: 'د. فهد العجيل', customerPhone: '0507654321', customerEmail: 'fahad@example.com',
    address: 'الرياض، حي العقيق، شارع وادي حنيفة، فيلا 14',
    district: 'حي العقيق', captainName: 'صالح الغامدي',
    status: 'in_progress',
    notes: 'العميل طلب وضع الملابس داخل الأكياس المخصصة والتأكد من رمز OTP قبل المغادرة.',
    bagsCount: 3, otpVerified: false, collectionStatus: 'في مرحلة التجميع (0/0)',
  },
  {
    id: '2', orderNumber: '#901', isVip: false,
    timeSlot: '09:00 ص - 10:00 ص', remainingTimeMinutes: 0,
    customerName: 'م. سارة النجاشي', customerPhone: '0509988776', customerEmail: 'sara@example.com',
    address: 'الرياض، حي النزهة، شارع الأمير محمد، شقة 5',
    district: 'حي النزهة', captainName: 'أحمد الزهراني',
    status: 'collected', bagsCount: 5, otpVerified: true, rating: 5,
    collectionStatus: 'تم التجميع (5/5)',
  },
  {
    id: '3', orderNumber: '#907', isVip: true,
    timeSlot: '11:00 ص - 12:00 م', remainingTimeMinutes: 35,
    customerName: 'أ. ليلى الدوسري', customerPhone: '0505544332', customerEmail: 'layla@example.com',
    address: 'الرياض، حي الملقا، طريق الملك سلمان، عمارة 3',
    district: 'حي الملقا', captainName: 'محمد القحطاني',
    status: 'pending', bagsCount: 2, otpVerified: false, collectionStatus: 'في متجر التجميع (الاستلام)',
  },
  {
    id: '4', orderNumber: '#899', isVip: false,
    timeSlot: '08:00 ص - 09:00 ص', remainingTimeMinutes: -20,
    customerName: 'عبدالله الشمري', customerPhone: '0543322110', customerEmail: 'abdullahsh@example.com',
    address: 'الرياض، حي الروضة، شارع التخصصي، فيلا 7',
    district: 'حي الروضة', captainName: 'خالد العتيبي',
    status: 'delayed', bagsCount: 4, otpVerified: false,
    notes: 'تأخير بسبب ازدحام مروري في طريق الملك فهد',
    collectionStatus: 'متأخر - تأخير 20 دقيقة',
  },
  {
    id: '5', orderNumber: '#910', isVip: false,
    timeSlot: '12:00 م - 01:00 م', remainingTimeMinutes: 55,
    customerName: 'ريم المطيري', customerPhone: '0551122334', customerEmail: 'reem@example.com',
    address: 'الرياض، حي السليمانية، شارع الأمير تركي، فيلا 22',
    district: 'حي السليمانية', captainName: 'صالح الغامدي',
    status: 'pending', bagsCount: 1, otpVerified: false, collectionStatus: 'في قائمة الانتظار',
  },
];

// ─── Helper Functions ─────────────────────────────────────────────────────────

function getStatusConfig(status: DeliveryTask['status']) {
  const map = {
    pending:     { label: 'في قائمة الانتظار', bg: 'bg-amber-50',   text: 'text-amber-700',   border: 'border-amber-200',   dot: 'bg-amber-500' },
    in_progress: { label: 'في الطريق',                  bg: 'bg-blue-50',    text: 'text-blue-700',    border: 'border-blue-200',    dot: 'bg-blue-500' },
    collected:   { label: 'تم التجميع',                  bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200', dot: 'bg-emerald-500' },
    delivered:   { label: 'تم التسليم',                  bg: 'bg-purple-50',  text: 'text-purple-700',  border: 'border-purple-200',  dot: 'bg-purple-500' },
    delayed:     { label: 'متأخر',                          bg: 'bg-red-50',     text: 'text-red-700',     border: 'border-red-200',     dot: 'bg-red-500' },
  };
  return map[status];
}

function getTimelineColor(type: TimelineEvent['type']) {
  const map: Record<TimelineEvent['type'], string> = {
    assign: 'bg-blue-500', move: 'bg-purple-500', notify: 'bg-amber-500',
    arrived: 'bg-emerald-500', collected: 'bg-emerald-600',
  };
  return map[type];
}

// ─── Sub-component: Top Stat Card ────────────────────────────────────────────

interface StatCardTopProps {
  label: string; value: string; sub: React.ReactNode;
  icon: React.ReactNode;
  theme: 'blue' | 'soft-blue' | 'green' | 'red';
  actionButton?: string;
}

function StatCardTop({ label, value, sub, icon, theme, actionButton }: StatCardTopProps) {
  const themes = {
    blue: { 
      iconBg: 'bg-blue-50 text-blue-600', 
      valColor: 'text-gray-900',
      badgeBg: 'bg-blue-50 text-blue-700',
      circle: 'bg-blue-50/60'
    },
    'soft-blue': { 
      iconBg: 'bg-indigo-50 text-indigo-600', 
      valColor: 'text-blue-600',
      badgeBg: 'bg-blue-50 text-blue-600',
      circle: 'bg-indigo-50/50'
    },
    green: { 
      iconBg: 'bg-emerald-50 text-emerald-600', 
      valColor: 'text-emerald-600',
      badgeBg: 'bg-emerald-50 text-emerald-700',
      circle: 'bg-emerald-50/50'
    },
    red: { 
      iconBg: 'bg-red-50 text-red-600', 
      valColor: 'text-red-600',
      badgeBg: 'bg-red-50 text-red-700',
      circle: 'bg-red-50/50'
    },
  };
  const t = themes[theme];

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 relative overflow-hidden flex-1 min-w-[220px]">
     
      <div className={`absolute -bottom-8 -right-8 w-28 h-28 rounded-full ${t.circle} pointer-events-none blur-xl`} />
      
      <div className="relative flex flex-col justify-between h-full gap-4">
       
        <div className="flex items-start justify-between gap-3">
          <p className="text-xs font-bold text-gray-500 leading-tight pt-1">{label}</p>
          <div className={`rounded-2xl p-3 shrink-0 ${t.iconBg}`}>
            {icon}
          </div>
        </div>

        
        <div>
          <p className={`text-4xl font-black ${t.valColor} tabular-nums leading-none`}>{value}</p>
        </div>

        
        <div className="pt-1 flex items-center justify-between gap-2 flex-wrap">
          {typeof sub === 'string' ? (
            <p className="text-[11px] text-gray-500 font-medium">{sub}</p>
          ) : (
            sub
          )}

          {actionButton && (
            <button 
              type="button" 
              className="w-full mt-1 flex items-center justify-center gap-1.5 rounded-xl bg-red-500 hover:bg-red-600 transition-colors px-3 py-2 text-xs font-bold text-white shadow-sm shadow-red-200"
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              {actionButton}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Sub-component: Bottom Stat Card ─────────────────────────────────────────

interface StatCardBottomProps {
  label: string; value: string; sub: string; sub2?: string;
  icon: React.ReactNode; rating?: number;
  badgeText?: string; badgeColor?: string;
}

function StatCardBottom({ label, value, sub, sub2, icon, rating, badgeText, badgeColor = 'bg-blue-100 text-blue-700' }: StatCardBottomProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex-1 min-w-[180px] hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex-1 min-w-0">
          <p className="text-xs text-gray-500 font-medium mb-0.5 leading-tight">{label}</p>
          {badgeText && (
            <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full mb-2 ${badgeColor}`}>
              {badgeText}
            </span>
          )}
        </div>
        <div className="bg-gray-50 rounded-xl p-2 shrink-0">{icon}</div>
      </div>
      <p className="text-3xl font-black text-gray-800 tabular-nums leading-none mb-1">{value}</p>
      <p className="text-xs text-gray-500 leading-snug">{sub}</p>
      {rating !== undefined && (
        <div className="flex items-center gap-1 mt-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className={`w-3.5 h-3.5 ${i < Math.floor(rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-200'}`} />
          ))}
          <span className="text-xs font-bold text-amber-600 mr-1">{rating.toFixed(1)}</span>
        </div>
      )}
      {sub2 && <p className="text-xs text-gray-400 mt-1 leading-snug">{sub2}</p>}
    </div>
  );
}

// ─── Constants ────────────────────────────────────────────────────────────────

const TABS = [
  { id: 'active',    label: 'قائمة مهام الاستلام' },
  { id: 'delivered', label: 'تم التسليم' },
  { id: 'tomorrow',  label: 'قائمة غداً' },
  { id: 'held',      label: 'المحتجزة' },
];
const TOTAL_PAGES = 9;

// ─── Main Page Component ──────────────────────────────────────────────────────

export default function Delivery() {
  const [selectedTaskId, setSelectedTaskId] = useState<string>('1');
  const [activeTab, setActiveTab]           = useState('active');
  const [searchQuery, setSearchQuery]       = useState('');
  const [currentPage, setCurrentPage]       = useState(1);
  const [selectedCaptain, setSelectedCaptain] = useState('all');
  const [selectedZone, setSelectedZone]     = useState('all');

  const selectedTask = MOCK_TASKS.find((t) => t.id === selectedTaskId) ?? MOCK_TASKS[0];
  const captain      = CAPTAIN_DETAILS[selectedTask.captainName];
  const timeline     = TIMELINE_DATA[selectedTask.id] ?? [];

  const filteredTasks = MOCK_TASKS.filter((task) => {
    const q = searchQuery.toLowerCase();
    const matchSearch  = q === '' || task.orderNumber.includes(q) || task.customerName.includes(q) || task.district.includes(q) || (task.captainPhone ?? '').includes(q);
    const matchCaptain = selectedCaptain === 'all' || task.captainName === selectedCaptain;
    const matchZone    = selectedZone === 'all'    || task.district    === selectedZone;
    return matchSearch && matchCaptain && matchZone;
  });

  return (
    <div dir="rtl" className="font-[Tajawal,sans-serif] min-h-screen bg-[#f8f9fc] pb-10">

      {/* ══ PAGE HEADER ══════════════════════════════════════════════════════ */}
      <div className="bg-white border-b border-gray-100 shadow-sm px-6 py-4 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-xl font-black text-gray-800 leading-tight">
              مركز استلام الشحنات الميدانية
            </h1>
            <div className="flex items-center gap-2 mt-1.5">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              <span className="text-xs text-emerald-600 font-semibold">
                تحديث مباشر لسير عمل التتبع اللوجستي
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            
            <div className="flex items-center gap-2 rounded-xl bg-blue-600 text-white px-4 py-2 shadow-md">
              <Truck className="w-4 h-4" />
              <span className="text-xs font-bold">الأسطول الميداني النشط</span>
              <span className="bg-white text-blue-700 rounded-lg px-2 py-0.5 text-xs font-black">10 / 20</span>
              <span className="text-xs font-medium opacity-90">مركبة</span>
            </div>
          </div>
        </div>
      </div>

      {/* ══ BODY ═════════════════════════════════════════════════════════════ */}
      <div className="px-4 sm:px-6 space-y-5">

       {/* TOP 4 METRIC CARDS */}
<div className="flex gap-4 flex-wrap">
  

  <StatCardTop 
    label="إجمالي مهام الاستلام اليوم" 
    value="38" 
    sub={
      <div className="flex items-center gap-1.5 text-[11px]">
        <span className="text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-md">14%+ مقارنة بالأمس</span>
        <span className="text-gray-400 bg-gray-50 px-2 py-0.5 rounded-md">موزعة على 4 قطاعات</span>
      </div>
    } 
    icon={<Calendar className="w-6 h-6" />} 
    theme="blue" 
  />

  
  <StatCardTop 
    label="استلامات نشطة في الطريق" 
    value="14" 
    sub={
      <div className="flex items-center gap-1.5 text-[11px]">
        <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
        <span className="text-blue-600 font-bold bg-blue-50 px-2 py-0.5 rounded-md">14 كابتن في مسار التوجه</span>
        <span className="text-gray-400">متوسط 14 دقيقة</span>
      </div>
    } 
    icon={<Truck className="w-6 h-6" />} 
    theme="soft-blue" 
  />

  
  <StatCardTop 
    label="تم توريدها للمغسلة المركزية" 
    value="22" 
    sub={
      <div className="flex items-center gap-1.5 text-[11px]">
        <span className="text-emerald-600 font-bold flex items-center gap-1 bg-emerald-50 px-2 py-0.5 rounded-md">
          <ShieldCheck className="w-3 h-3" /> 100% موثقة برمز OTP
        </span>
        <span className="text-gray-400">جاهزة لمرحلة الفرز</span>
      </div>
    } 
    icon={<ShieldCheck className="w-6 h-6" />} 
    theme="green" 
  />

 
  <StatCardTop 
    label="استلامات متعثرة تتطلب تدخلاً" 
    value="06" 
    sub={<span className="text-red-500 font-bold text-[11px]">تجاوزت نافذة الموعد </span>} 
    icon={<AlertTriangle className="w-6 h-6" />} 
    theme="red" 
    actionButton="إجراء فوري مطلوب" 
  />

</div>

        {/* BOTTOM 3 RESULT CARDS */}
        <div className="flex gap-4 flex-wrap">
          <StatCardBottom label="إجمالي استلامات اليوم" value="38" sub="شاملة 125 مضمونة" icon={<Calendar className="w-5 h-5 text-blue-600" />} badgeText="اليوم" badgeColor="bg-blue-100 text-blue-700" />
          <StatCardBottom label="تم التسليم بنجاح" value="16" sub="تأكيد تلقائي OTP" sub2="تقييم العملاء للخدمة" icon={<CheckCircle2 className="w-5 h-5 text-emerald-600" />} rating={5.0} badgeText="OTP مؤكد" badgeColor="bg-emerald-100 text-emerald-700" />
          <StatCardBottom label="تأخيرات وإشعار صيانة" value="04" sub="جدول الطلبات ممتلئ" icon={<AlertTriangle className="w-5 h-5 text-red-500" />} badgeText="يتطلب تدخل" badgeColor="bg-red-100 text-red-700" />
        </div>

        {/* FILTER & SEARCH BAR */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 space-y-4">
          {/* Tabs */}
          <div className="flex gap-2 flex-wrap">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`rounded-xl px-4 py-2 text-sm font-bold transition-all ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-200'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          {/* Search + dropdowns */}
          <div className="flex gap-3 flex-wrap items-center">
            <div className="relative flex-1 min-w-[220px]">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="بحث سريع برقم الطلب #ORD...، اسم العميل، الحي، أو هاتف المندوب..."
                className="w-full rounded-xl border border-gray-200 bg-gray-50 pr-10 pl-4 py-2.5 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition"
              />
            </div>
            <div className="relative">
              <Filter className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
              <select
                value={selectedCaptain}
                onChange={(e) => setSelectedCaptain(e.target.value)}
                className="rounded-xl border border-gray-200 bg-gray-50 pr-9 pl-4 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300 appearance-none cursor-pointer"
              >
                <option value="all">جميع الكباتن والأسطول (18 كابتن)</option>
                <option value="صالح الغامدي">صالح الغامدي</option>
                <option value="أحمد الزهراني">أحمد الزهراني</option>
                <option value="محمد القحطاني">محمد القحطاني</option>
                <option value="خالد العتيبي">خالد العتيبي</option>
              </select>
            </div>
            <div className="relative">
              <MapPin className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
              <select
                value={selectedZone}
                onChange={(e) => setSelectedZone(e.target.value)}
                className="rounded-xl border border-gray-200 bg-gray-50 pr-9 pl-4 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300 appearance-none cursor-pointer"
              >
                <option value="all">كافة الأحياء والمناطق</option>
                <option value="حي العقيق">حي العقيق</option>
                <option value="حي النزهة">حي النزهة</option>
                <option value="حي الملقا">حي الملقا</option>
                <option value="حي الروضة">حي الروضة</option>
                <option value="حي السليمانية">حي السليمانية</option>
              </select>
            </div>
          </div>
        </div>

        {/* MAIN SPLIT CONTENT */}
        <div className="flex gap-4 items-start flex-col xl:flex-row">

          {/* ── TABLE ───────────────────────────────────────────────────────── */}
          <div className="flex-1 min-w-0 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-sm font-black text-gray-800 flex items-center gap-2">
                <Truck className="w-4 h-4 text-blue-600" />
                قائمة مهام الاستلام الميداني
              </h2>
              <span className="text-xs text-gray-400 font-medium">{filteredTasks.length} مهمة</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm min-w-[680px]">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="text-right px-4 py-3 text-xs font-bold text-gray-500 whitespace-nowrap">رقم المهمة والنوع</th>
                    <th className="text-right px-4 py-3 text-xs font-bold text-gray-500 whitespace-nowrap">توقيت التوصيل</th>
                    <th className="text-right px-4 py-3 text-xs font-bold text-gray-500 whitespace-nowrap">تفاصيل الكابتن / العميل</th>
                    <th className="text-right px-4 py-3 text-xs font-bold text-gray-500 whitespace-nowrap">المجموعة والمستلم</th>
                    <th className="text-right px-4 py-3 text-xs font-bold text-gray-500 whitespace-nowrap">الحالة والعمليات</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTasks.map((task) => {
                    const sc     = getStatusConfig(task.status);
                    const isSel  = task.id === selectedTaskId;
                    return (
                      <tr
                        key={task.id}
                        onClick={() => setSelectedTaskId(task.id)}
                        className={`border-b border-gray-50 cursor-pointer transition-colors ${isSel ? 'bg-blue-50 border-blue-100' : 'hover:bg-gray-50'}`}
                      >
                        {/* Task ID */}
                        <td className="px-4 py-3.5">
                          <div className="flex items-center gap-2">
                            <span className="font-black text-gray-800">{task.orderNumber}</span>
                            {task.isVip && (
                              <span className="inline-block bg-red-100 text-red-700 text-[10px] font-black px-2 py-0.5 rounded-full leading-tight">
                                VIP مستعجل
                              </span>
                            )}
                          </div>
                        </td>
                        {/* Time */}
                        <td className="px-4 py-3.5">
                          <div className="flex items-start gap-1.5">
                            <Clock className="w-3.5 h-3.5 text-blue-500 mt-0.5 shrink-0" />
                            <div>
                              <p className="text-xs font-semibold text-gray-700 whitespace-nowrap">{task.timeSlot}</p>
                              {task.remainingTimeMinutes > 0 ? (
                                <p className="text-[10px] text-emerald-600 font-bold mt-0.5">باقي {task.remainingTimeMinutes} دقيقة</p>
                              ) : task.remainingTimeMinutes < 0 ? (
                                <p className="text-[10px] text-red-600 font-bold mt-0.5">تأخر {Math.abs(task.remainingTimeMinutes)} دقيقة</p>
                              ) : (
                                <p className="text-[10px] text-gray-500 font-bold mt-0.5">منتهي</p>
                              )}
                            </div>
                          </div>
                        </td>
                        {/* Captain / Customer */}
                        <td className="px-4 py-3.5">
                          <div className="space-y-1">
                            <div className="flex items-center gap-1.5">
                              <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-[10px] font-black text-blue-700 shrink-0">
                                {task.captainName.charAt(0)}
                              </div>
                              <span className="text-xs font-bold text-gray-700">{task.captainName}</span>
                            </div>
                            <div className="flex items-center gap-1 text-gray-500">
                              <User className="w-3 h-3 shrink-0" />
                              <span className="text-[11px]">{task.customerName}</span>
                            </div>
                          </div>
                        </td>
                        {/* Collection */}
                        <td className="px-4 py-3.5">
                          <div className="space-y-1">
                            <p className="text-[11px] text-gray-600 font-medium leading-snug">{task.collectionStatus}</p>
                            <div className="flex items-center gap-1">
                              <Package className="w-3 h-3 text-gray-400" />
                              <span className="text-[10px] text-gray-500">{task.bagsCount} حقيبة</span>
                              {task.otpVerified && <ShieldCheck className="w-3 h-3 text-emerald-500 mr-1" />}
                            </div>
                          </div>
                        </td>
                        {/* Status */}
                        <td className="px-4 py-3.5">
                          <div className="space-y-2">
                            <span className={`inline-flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-1 rounded-full border ${sc.bg} ${sc.text} ${sc.border}`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${sc.dot}`} />
                              {sc.label}
                            </span>
                            {task.status === 'delayed' && (
                              <button type="button" className="block text-[10px] font-bold text-red-600 bg-red-50 hover:bg-red-100 transition rounded-lg px-2 py-1">
                                تدخل فوري
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                  {filteredTasks.length === 0 && (
                    <tr>
                      <td colSpan={5} className="text-center py-12 text-gray-400 text-sm">
                        <Search className="w-8 h-8 mx-auto mb-2 opacity-30" />
                        لا توجد مهام تطابق معايير البحث
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="px-5 py-4 border-t border-gray-100 flex items-center justify-between gap-4 flex-wrap">
              <p className="text-xs text-gray-500 font-medium">
                عرض <span className="font-bold text-gray-700">1 – 5</span> من{' '}
                <span className="font-bold text-gray-700">38</span> مهمة
              </p>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="p-1.5 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
                {[1, 2, 3].map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setCurrentPage(p)}
                    className={`w-8 h-8 rounded-lg text-xs font-bold transition ${
                      currentPage === p
                        ? 'bg-blue-600 text-white shadow-md shadow-blue-200'
                        : 'border border-gray-200 text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {p}
                  </button>
                ))}
                <span className="px-1 text-gray-400 text-sm">...</span>
                <button
                  type="button"
                  onClick={() => setCurrentPage(TOTAL_PAGES)}
                  className={`w-8 h-8 rounded-lg text-xs font-bold transition ${
                    currentPage === TOTAL_PAGES
                      ? 'bg-blue-600 text-white'
                      : 'border border-gray-200 text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {TOTAL_PAGES}
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentPage((p) => Math.min(TOTAL_PAGES, p + 1))}
                  disabled={currentPage === TOTAL_PAGES}
                  className="p-1.5 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* ── SIDEBAR ─────────────────────────────────────────────────────── */}
          <div className="w-full xl:w-80 shrink-0 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-l from-blue-600 to-blue-700 px-5 py-4">
              <p className="text-xs text-blue-200 font-semibold mb-0.5">تفاصيل مهمة الاستلام</p>
              <div className="flex items-center justify-between">
                <h3 className="text-white font-black text-lg">{selectedTask.orderNumber}</h3>
                <div className="flex items-center gap-2">
                  {selectedTask.isVip && (
                    <span className="bg-red-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full">
                      VIP مستعجل
                    </span>
                  )}
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/20 text-white">
                    {getStatusConfig(selectedTask.status).label}
                  </span>
                </div>
              </div>
            </div>

            <div className="p-4 space-y-4 max-h-[700px] overflow-y-auto">

              {/* Captain live location */}
              {captain && (
                <div className="flex items-center gap-2.5 bg-emerald-50 border border-emerald-200 rounded-xl p-3">
                  <div className="relative shrink-0">
                    <Navigation className="w-4 h-4 text-emerald-600" />
                    <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-emerald-700">تتبع موقع الكابتن الحالي</p>
                    <p className="text-[10px] text-emerald-600">
                      على بعد{' '}
                      {captain.distanceMeters >= 1000
                        ? `${(captain.distanceMeters / 1000).toFixed(1)} كم`
                        : `${captain.distanceMeters} متر`}
                    </p>
                  </div>
                </div>
              )}

              {/* Customer profile */}
              <div className="bg-gray-50 rounded-xl p-3.5 border border-gray-100">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-black text-sm shrink-0">
                    {selectedTask.customerName.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-black text-gray-800 leading-tight">{selectedTask.customerName}</p>
                    <p className="text-[10px] text-blue-600 font-bold">
                      عميل مميز · {captain?.totalOrders ?? 0} طلب
                    </p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-3.5 h-3.5 text-gray-400 mt-0.5 shrink-0" />
                    <p className="text-xs text-gray-600 leading-snug">{selectedTask.address}</p>
                  </div>
                  {selectedTask.customerPhone && (
                    <div className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                      <p className="text-xs text-gray-600 font-mono">{selectedTask.customerPhone}</p>
                    </div>
                  )}
                  {selectedTask.customerEmail && (
                    <div className="flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                      <p className="text-xs text-gray-600">{selectedTask.customerEmail}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Captain card */}
              {captain && (
                <div className="bg-blue-50 rounded-xl p-3.5 border border-blue-100">
                  <p className="text-[10px] font-bold text-blue-500 uppercase tracking-wide mb-2">بيانات الكابتن</p>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-blue-200 flex items-center justify-center text-blue-700 font-black text-sm shrink-0">
                      {captain.name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-gray-800">{captain.name}</p>
                      <p className="text-[10px] text-gray-500">{captain.vehicleType}</p>
                    </div>
                    <a
                      href={`tel:${captain.phone}`}
                      className="w-8 h-8 bg-blue-600 rounded-xl flex items-center justify-center hover:bg-blue-700 transition"
                    >
                      <Phone className="w-3.5 h-3.5 text-white" />
                    </a>
                  </div>
                </div>
              )}

              {/* Driver instructions */}
              {selectedTask.notes && (
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-3.5">
                  <div className="flex items-center gap-1.5 mb-2">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                    <p className="text-[10px] font-bold text-amber-700 uppercase tracking-wide">تعليمات الكابتن</p>
                  </div>
                  <p className="text-xs text-amber-800 leading-relaxed">"{selectedTask.notes}"</p>
                </div>
              )}

              {/* Communication timeline */}
              {timeline.length > 0 && (
                <div>
                  <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wide mb-3 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    سجل التواصل والمحطات
                  </p>
                  <div className="relative">
                    <div className="absolute right-[14px] top-4 bottom-4 w-px bg-gray-200" />
                    <div className="space-y-4">
                      {timeline.map((event, idx) => (
                        <div key={idx} className="flex items-start gap-3 relative">
                          <div className={`w-7 h-7 rounded-full ${getTimelineColor(event.type)} flex items-center justify-center text-white shrink-0 z-10 shadow-md`}>
                            <Clock className="w-3 h-3" />
                          </div>
                          <div className="flex-1 min-w-0 pt-0.5">
                            <p className="text-[10px] font-bold text-gray-400 mb-0.5">{event.time}</p>
                            <p className="text-xs text-gray-700 leading-snug">{event.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* OTP status */}
              <div
                className={`flex items-center gap-2.5 rounded-xl p-3 border ${
                  selectedTask.otpVerified
                    ? 'bg-emerald-50 border-emerald-200'
                    : 'bg-gray-50 border-gray-200'
                }`}
              >
                <ShieldCheck
                  className={`w-5 h-5 shrink-0 ${selectedTask.otpVerified ? 'text-emerald-600' : 'text-gray-400'}`}
                />
                <div>
                  <p className={`text-xs font-bold ${selectedTask.otpVerified ? 'text-emerald-700' : 'text-gray-600'}`}>
                    {selectedTask.otpVerified ? 'تم التحقق من OTP بنجاح ✓' : 'بانتظار تأكيد OTP'}
                  </p>
                  <p className="text-[10px] text-gray-500">
                    {selectedTask.bagsCount} حقيبة · الوقت المحدد: {selectedTask.timeSlot}
                  </p>
                </div>
              </div>
            </div>

            {/* Speed metric footer */}
            <div className="border-t border-gray-100 bg-gradient-to-l from-gray-50 to-white px-4 py-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="bg-blue-100 rounded-lg p-1.5">
                    <Zap className="w-3.5 h-3.5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-gray-600">معدل سرعة إنجاز الاستلامات</p>
                    <p className="text-xs font-black text-blue-700">18.4 دقيقة / استلام</p>
                  </div>
                </div>
                <div className="text-left">
                  <div className="flex items-center gap-1">
                    <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
                    <span className="text-xs font-black text-emerald-600">98.2%</span>
                  </div>
                  <p className="text-[9px] text-gray-400">أسرع من المتوسط</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
