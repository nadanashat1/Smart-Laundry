export interface Service {
  id: string;
  code: string;
  title: string;
  englishTitle: string;
  description: string;
  price: number;
  sla: string;
  capacity: string;
  itemsCount: number;
  status: "active" | "paused";
  isVip: boolean;
  category: string;
  iconSrc: string;
  iconColor: string;
  iconBgColor: string;
}