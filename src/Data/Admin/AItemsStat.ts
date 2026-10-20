import { Banknote, CirclePause, Shirt, Sparkles } from "lucide-react";

export const itemsStats = [
  {
    id: "total",
    title: "إجمالي القطع النشطة",
    value: "64",
    description: "↗ 100% مفعل",
    icon: Shirt,
    descriptionColor: "#16A34A",
  },
  {
    id: "price",
    title: "متوسط سعر القطعة الأساسي",
    value: "14.20",
    description: "ر.س / خدمة",
    icon: Banknote,
  },
  {
    id: "popular",
    title: "القطع الأكثر طلبًا هذا الأسبوع",
    value: "ثوب سعودي",
    description: "48% من الطلبات",
    icon: Sparkles,
    descriptionColor: "#16A34A",
  },
  {
    id: "paused",
    title: "عناصر متوقفة مؤقتًا",
    value: "1",
    description: "موسمية (أغطية شتوية)",
    icon: CirclePause,
    iconColor: "#FF2525",
    iconBgColor: "#FFE5E5",
    descriptionColor: "#FF2525",
  },
];