import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  Star,
  Truck,
  PackageCheck,
  Smartphone,
} from "lucide-react";

const features = [
  {
    title: "تكنولوجيا غسيل آمنة لطيفة",
    description:
      "نستخدم مساحيق خالية من المواد الكاوية تضمن الحفاظ على خيوط القماش الزاهية، ملمس الحرير، ومتانة الصوف.",
    type: "washer",
  },
  {
    title: "استلام وتسليم حتى غرفتك",
    description:
      "مندوبنا يصلك أينما كنت بخدمات نيفو المخصصة، دون الحاجة لفرز الملابس مسبقًا، نحن نقوم بكل الفرز والتصنيف.",
    type: "truck",
  },
  {
    title: "شماعات وأغلفة مانعة للتربة",
    description:
      "تصلك الملابس مكوية ومفروزة بأحدث مكابس البخار الإيطالية وجاهزة للتعليق الفوري في خزانتك دون تجاعيد.",
    type: "clothes",
  },
];

const steps = [
  {
    number: "1",
    title: "حدد الخدمات عبر التطبيق",
    description:
      "اختر نوع الخدمة سواء كانت غسيل، كي، تنظيف جاف للأزياء الحساسة أو تعقيم السجاد والمفروشات.",
    icon: Smartphone,
  },
  {
    number: "2",
    title: "استلام آمن من الباب",
    description:
      "يصل كابتن نيفو في الموعد المحدد ومعه حقيبة نيفو المقاومة للماء لتسليم ملابسك وتوثيق استلامها.",
    icon: PackageCheck,
  },
  {
    number: "3",
    title: "عناية وتنقية فائقة",
    description:
      "فرز آلي للمنسوجات حسب خاماتها، تنظيف مخصص ببرامج إلكترونية ذكية، وكي دقيق بالبخار تحت إشراف خبراء.",
    icon: Sparkles,
  },
  {
    number: "4",
    title: "التوصيل في أبهى حلة",
    description:
      "تصلك الملابس مغلفة بأعلى معايير الجودة 5 نجوم، مع إشعار تتبع حي لحظة بلحظة حتى عتبة منزلك.",
    icon: Truck,
  },
];

const reviews = [
  {
    name: "كريم عبد الحميد",
    role: "عميل نيفو بلاتينيوم - القاهرة الجديدة",
    text: "أفضل خدمة تنظيف جاف جربتها بالتجمع الخامس. قمصان الشغل بترجع مكوية كأنها جديدة تمامًا مع رائحة نظافة منعشة.",
    initials: "ك",
    color: "bg-indigo-100 text-indigo-600",
  },
  {
    name: "سارة المنشاوي",
    role: "الشيخ زايد",
    text: "فستان سهرتي حساس جدًا واستلمته بنفس اليوم مغلف وتحفة.",
    initials: "س",
    color: "bg-rose-100 text-rose-600",
  },
  {
    name: "م. شريف والي",
    role: "المعادي",
    text: "التتبع للسائق ريحني من الاتصالات اليومية. خدمة راقية.",
    initials: "ش",
    color: "bg-green-100 text-green-600",
  },
];

function HeroIllustration() {
  return (
    <div className="relative mx-auto flex h-44 w-full max-w-[260px] items-center justify-center sm:h-52">
      <div className="absolute h-40 w-40 rounded-full bg-white/80 shadow-[0_12px_28px_rgba(31,55,160,0.10)] sm:h-48 sm:w-48" />

      <div className="relative flex h-32 w-32 items-center justify-center rounded-full bg-[#263DFF] shadow-[0_10px_25px_rgba(38,61,255,0.18)] sm:h-40 sm:w-40">
        <svg
          viewBox="0 0 160 160"
          className="absolute inset-0 h-full w-full"
          aria-hidden="true"
        >
          <path
            d="M46 45 C30 55 23 72 23 89"
            fill="none"
            stroke="white"
            strokeWidth="12"
            strokeLinecap="round"
          />
          <path
            d="M23 101 C23 104 24 107 25 110"
            fill="none"
            stroke="white"
            strokeWidth="12"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <span className="absolute right-1 top-9 rounded-full bg-[#FFD9D7] px-3 py-1.5 text-[10px] font-bold text-[#F05B62] shadow-sm sm:right-0 sm:top-10">
        أسرع توصيل
      </span>

      <span className="absolute left-0 top-16 rounded-full bg-[#FFD9D7] px-3 py-1.5 text-[10px] font-bold text-[#F05B62] shadow-sm sm:left-1 sm:top-20">
        نظافة من غير تعب
      </span>

      <span className="absolute bottom-3 right-1 rounded-full bg-[#FFD9D7] px-3 py-1.5 text-[10px] font-bold text-[#F05B62] shadow-sm sm:bottom-2 sm:right-0">
        عناية فائقة بملابسك
      </span>
    </div>
  );
}

function FeatureIllustration({ type }: { type: string }) {
  if (type === "truck") {
    return (
      <svg viewBox="0 0 180 92" className="h-[82px] w-full" aria-hidden="true">
        <path d="M22 67 H156" stroke="#DDE5FF" strokeWidth="2" />

        <path
          d="M30 40 H91 V65 H30 Z"
          fill="#fff"
          stroke="#263DFF"
          strokeWidth="2"
        />

        <path
          d="M91 48 H119 L135 63 V65 H91 Z"
          fill="#fff"
          stroke="#263DFF"
          strokeWidth="2"
        />

        <path d="M105 50 L117 50 L128 61 H105 Z" fill="#DDE5FF" />

        <path
          d="M18 48 H27 M13 55 H27 M22 62 H29"
          stroke="#263DFF"
          strokeWidth="2"
          strokeLinecap="round"
        />

        <path d="M61 48 L54 59 H63 L57 70 L74 54 H64 L69 48 Z" fill="#FF5D61" />

        <circle cx="48" cy="68" r="10" fill="#263DFF" />
        <circle cx="48" cy="68" r="4" fill="white" />

        <circle cx="117" cy="68" r="10" fill="#263DFF" />
        <circle cx="117" cy="68" r="4" fill="white" />

        <rect x="133" y="50" width="22" height="22" rx="5" fill="#FF5D61" />

        <path
          d="M139 50 V46 A5 5 0 0 1 149 46 V50"
          fill="none"
          stroke="#FF5D61"
          strokeWidth="2"
        />

        <path
          d="M139 61 L143 65 L150 57"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <circle cx="28" cy="31" r="3" fill="#FF5D61" />

        <path
          d="M144 25 v9 M139.5 29.5 h9"
          stroke="#263DFF"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (type === "clothes") {
    return (
      <svg viewBox="0 0 180 92" className="h-[82px] w-full" aria-hidden="true">
        <path d="M24 70 H156" stroke="#DDE5FF" strokeWidth="2" />

        <path
          d="M58 20 L70 14 L81 21 L95 30 L87 43 L79 38 V69 H42 V38 L34 43 L26 30 L41 21 L52 14 Z"
          fill="#fff"
          stroke="#263DFF"
          strokeWidth="2"
          strokeLinejoin="round"
        />

        <path
          d="M70 15 C68 7 76 5 79 10 C81 13 77 16 74 17"
          fill="none"
          stroke="#263DFF"
          strokeWidth="2"
          strokeLinecap="round"
        />

        <path
          d="M112 22 L125 22 L136 32 L129 43 L123 38 V70 H102 V38 L96 43 L89 32 L100 22 Z"
          fill="#263DFF"
          stroke="#263DFF"
          strokeWidth="2"
          strokeLinejoin="round"
        />

        <path
          d="M111 23 C109 16 117 14 120 19 C122 22 118 24 115 25"
          fill="none"
          stroke="#263DFF"
          strokeWidth="2"
          strokeLinecap="round"
        />

        <path
          d="M59 34 V43 M112 35 V44"
          stroke="#DDE5FF"
          strokeWidth="2"
          strokeLinecap="round"
        />

        <circle cx="27" cy="24" r="3" fill="#FF5D61" />

        <path
          d="M145 24 v9 M140.5 28.5 h9"
          stroke="#263DFF"
          strokeWidth="2"
          strokeLinecap="round"
        />

        <circle cx="151" cy="58" r="9" fill="#E8EDFF" />

        <path
          d="M147 58 l3 3 l5 -6"
          fill="none"
          stroke="#263DFF"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 180 92" className="h-[82px] w-full" aria-hidden="true">
      <rect
        x="48"
        y="9"
        width="82"
        height="66"
        rx="7"
        fill="#fff"
        stroke="#263DFF"
        strokeWidth="2"
      />

      <path d="M49 23 H129" stroke="#263DFF" strokeWidth="2" />

      <circle cx="60" cy="16" r="2" fill="#FF5D61" />
      <circle cx="118" cy="16" r="2" fill="#FF5D61" />

      <circle
        cx="89"
        cy="48"
        r="19"
        fill="#E8EDFF"
        stroke="#263DFF"
        strokeWidth="3"
      />

      <circle
        cx="89"
        cy="48"
        r="12"
        fill="#fff"
        stroke="#263DFF"
        strokeWidth="2"
      />

      <path
        d="M79 52 C85 60 94 60 100 51"
        fill="none"
        stroke="#263DFF"
        strokeWidth="2"
        strokeLinecap="round"
      />

      <rect x="119" y="46" width="23" height="26" rx="5" fill="#FF5D61" />

      <path
        d="M125 46 V41 A5 5 0 0 1 135 41 V46"
        fill="none"
        stroke="#FF5D61"
        strokeWidth="2"
      />

      <path
        d="M124 58 L129 63 L137 54"
        fill="none"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path d="M29 37 C18 31 14 43 24 53 L32 58 L35 47 Z" fill="#263DFF" />

      <path
        d="M29 39 L34 46"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
      />

      <path
        d="M145 20 v9 M140.5 24.5 h9"
        stroke="#263DFF"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function LandingPage() {
  return (
    <main dir="rtl" className="w-full overflow-hidden bg-white text-[#171B2D]">
      {/* Hero */}
      <section className="relative bg-[#F4F6FF]">
        <div className="absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-[#FFE6E3] to-transparent" />

        <div className="absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-[#F9E7EF] to-transparent" />

        <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-4 px-4 py-7 sm:px-8 md:min-h-[180px] md:grid-cols-[0.9fr_1.1fr] md:gap-8 md:py-5">
          <div className="order-1 text-right">
            <div className="mb-2 inline-flex items-center gap-1 rounded-full bg-white px-3 py-1.5 text-xs font-bold text-[#363B4A] shadow-sm">
              <span className="size-1.5 rounded-full bg-[#FF5D61]" />
              خدمة غسيل متكاملة لراحتك
            </div>

            <h1 className="text-2xl font-extrabold leading-[1.45] tracking-tight sm:text-3xl md:text-[27px]">
              غسيل ذكي، عناية فائقة،
              <br />
              <span className="text-[#263DFF]">واستلام وتسليم بضغطة زر</span>
            </h1>

            <p className="mt-2 max-w-xl text-sm leading-6 text-[#858A9A]">
              وداعاً لرسائل الواتساب والاتصالات العشوائية. تجربة رقمية مؤتمتة
              بنسبة 100%، نضمن لك الحفاظ على جودة أقمشتك مع تعقيم دقيق وتسليم في
              الوقت المحدد حتى عتبة بابك.
            </p>

            <LinkButton />
          </div>

          <div className="order-2 md:order-1">
            <HeroIllustration />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-[#F0F1F7] bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-y-4 px-4 py-4 sm:grid-cols-4 sm:px-8">
          <Stat value="+50,000" label="عميل يثقون بنا" icon={<UserIcon />} />

          <Stat
            value="100%"
            label="رضا العملاء"
            icon={<ShieldCheck size={19} />}
          />

          <Stat
            value="UV-Clean"
            label="تقنية تعقيم متطورة"
            icon={<Sparkles size={19} />}
          />

          <Stat
            value="4.9 / 5"
            label="تقييم العملاء"
            icon={<Star size={19} />}
          />
        </div>
      </section>

      {/* Features */}
      <section className="bg-[#F5F7FF] px-4 py-5 sm:px-8">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-3 sm:grid-cols-3">
          {features.map((feature) => (
            <article
              key={feature.title}
              className="rounded-xl bg-white px-4 pb-3 pt-3 shadow-[0_2px_10px_rgba(31,55,160,0.03)]"
            >
              <div className="mb-1 flex items-center justify-between text-xs font-bold text-[#263DFF]">
                <span className="flex items-center gap-1">
                  <CheckCircle2 size={12} />
                  {feature.type === "washer"
                    ? "نظافة مضمونة"
                    : feature.type === "truck"
                      ? "استلام وتسليم سريع"
                      : "عناية بالملابس"}
                </span>

                <span className="size-1.5 rounded-full bg-[#FF5D61]" />
              </div>

              <div className="mx-auto max-w-[210px]">
                <FeatureIllustration type={feature.type} />
              </div>

              <h2 className="mt-1 text-right text-base font-extrabold">
                {feature.title}
              </h2>

              <p className="mt-1 text-right text-sm leading-6 text-[#8A8E9D]">
                {feature.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-white px-4 py-6 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-5 text-center">
            <span className="rounded-full bg-[#E8EDFF] px-3 py-1 text-xs font-bold text-[#263DFF]">
              بسيطة وسهلة
            </span>

            <h2 className="mt-2 text-xl font-extrabold sm:text-2xl">
              كيف يعمل نيفو؟
            </h2>

            <p className="mt-1 text-sm leading-6 text-[#8A8E9D]">
              من الغسيل حتى التسليم، كل حاجة بقت أسهل مع نيفو.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step) => {
              const Icon = step.icon;

              return (
                <article
                  key={step.number}
                  className="relative rounded-xl border border-[#FF686B] bg-white px-3 py-3 text-right transition hover:shadow-md"
                >
                  <span className="absolute left-3 top-3 flex size-7 items-center justify-center rounded-md bg-[#FFE7E5] text-sm font-bold text-[#FF5D61]">
                    {step.number}
                  </span>

                  <Icon size={19} className="mb-2 text-[#FF5D61]" />

                  <h3 className="text-base font-extrabold leading-6">
                    {step.title}
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-[#8A8E9D]">
                    {step.description}
                  </p>

                  <p className="mt-3 text-xs font-bold text-[#FF686B]">
                    {step.number === "1"
                      ? "أقل من 30 ثانية"
                      : step.number === "2"
                        ? "تأكيد رقمي فوري"
                        : step.number === "3"
                          ? "تعقيم بدرجة 70° مئوية"
                          : "دفع إلكتروني أو كاش"}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-[#F4F6FF] px-4 py-6 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
            <div>
              <span className="rounded-full bg-[#E8EDFF] px-3 py-1 text-xs font-bold text-[#263DFF]">
                تجارب حقيقية
              </span>

              <h2 className="mt-2 text-xl font-extrabold sm:text-2xl">
                ماذا يقول عملاء نيفو عن خدماتنا؟
              </h2>
            </div>

            <div className="flex items-center gap-1 text-sm">
              <span className="font-bold">4.9 نجوم</span>

              <span className="flex text-[#FF9D00]">
                <StarFill />
                <StarFill />
                <StarFill />
                <StarFill />
                <StarFill />
              </span>

              <span className="text-xs text-[#8A8E9D]">
                (8,000+ تقييم موثوق)
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {reviews.map((review) => (
              <article
                key={review.name}
                className="rounded-xl bg-white p-4 shadow-[0_2px_10px_rgba(31,55,160,0.03)]"
              >
                <div className="mb-2 flex justify-start gap-0.5 text-[#FF9D00]">
                  <StarFill />
                  <StarFill />
                  <StarFill />
                  <StarFill />
                  <StarFill />
                </div>

                <p className="min-h-[54px] text-base leading-6 text-[#777D8D]">
                  {review.text}
                </p>

                <div className="mt-3 flex items-center gap-2">
                  <span
                    className={`flex size-8 shrink-0 items-center justify-center rounded-full text-sm font-bold ${review.color}`}
                  >
                    {review.initials}
                  </span>

                  <div>
                    <h3 className="text-base font-extrabold">{review.name}</h3>

                    <p className="text-sm leading-5 text-[#9A9EAB]">
                      {review.role}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function Stat({
  value,
  label,
  icon,
}: {
  value: string;
  label: string;
  icon: ReactNode;
}) {
  return (
    <div className="flex items-center justify-center gap-2 text-center">
      <span className="text-[#263DFF]">{icon}</span>

      <div>
        <p className="text-base font-extrabold leading-6">{value}</p>
        <p className="text-xs leading-5 text-[#8A8E9D]">{label}</p>
      </div>
    </div>
  );
}

function UserIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-[19px] w-[19px]"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
    >
      <circle cx="12" cy="8" r="3" />
      <path d="M5 20c.7-4 3-6 7-6s6.3 2 7 6" strokeLinecap="round" />
    </svg>
  );
}

function StarFill() {
  return <Star size={12} fill="currentColor" strokeWidth={1.5} />;
}

function LinkButton() {
  return (
    <Link
      to="/services"
      className="mt-4 inline-flex min-w-[145px] items-center justify-center gap-2 rounded-lg bg-[#263DFF] px-5 py-2.5 text-xs font-bold text-white shadow-[0_4px_12px_rgba(38,61,255,0.22)] transition hover:bg-[#1D31E8]"
    >
      ابدأ طلبك الآن
      <ArrowLeft size={14} />
    </Link>
  );
}
