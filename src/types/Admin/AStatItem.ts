
export interface StatItem {
  id: number;
  title: string;
  value: string;
  subValue?: string;
  badgeText?: string;

  iconSrc: string;
  iconColor: string;
  iconBgColor: string;

  valueColor?: string;
  badgeColor?: string;
}
