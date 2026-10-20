import { Link, useNavigate } from "react-router-dom";
import {
  BadgeCheck,
  Bell,
  ChevronLeft,
  CreditCard,
  Headset,
  IdCard,
  LogOut,
  MapPin,
  ShieldCheck,
  SlidersHorizontal,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { ProfileData } from "../../Data";
import { useAddressStore } from "../../store/addressStore";
import { useAuthStore } from "../../store/authStore";

const data = ProfileData;

const icons: Record<string, LucideIcon> = {
  user: IdCard,
  address: MapPin,
  payment: CreditCard,
  notifications: Bell,
  settings: SlidersHorizontal,
  help: Headset,
  warranty: ShieldCheck,
};

const iconColors: Record<string, string> = {
  user: "text-primary",
  address: "text-green-600",
  payment: "text-accent",
  notifications: "text-primary",
  settings: "text-accent",
  help: "text-green-600",
  warranty: "text-accent",
};

type ProfileSidebarProps = {
  fullName: string;
  email: string;
  phone: string;
};

export default function ProfileSidebar({ fullName, email, phone }: ProfileSidebarProps) {
  const addressesCount = useAddressStore((state) => state.addresses.length);
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const logoutUser = () => {
    logout();
    navigate(data.logoutPath, { replace: true });
  };

  return (
    <aside className="flex flex-col gap-5">
      <section className="relative overflow-hidden rounded-2xl bg-card p-6 text-center shadow-sm">
        <span className="pointer-events-none absolute -top-10 -inset-e-10 size-28 rounded-full bg-primary-200" />
        <span className="relative mx-auto mb-3 flex size-24 items-center justify-center overflow-hidden rounded-full border-4 border-primary-200 bg-primary text-2xl font-bold text-white">
          {data.user.avatar ? (
            <img src={data.user.avatar} alt={fullName} className="size-full object-cover" />
          ) : (
            data.user.initials
          )}
        </span>
        <p className="relative mb-1 flex items-center justify-center gap-1.5 text-lg font-bold text-heading">
          {fullName}
          <BadgeCheck size={18} className="fill-primary text-white" />
        </p>
        <p className="relative text-xs text-muted">{email}</p>
        <p className="relative text-xs text-muted" dir="ltr">
          {phone}
        </p>
      </section>

      {data.menuGroups.map((group) => (
        <section key={group.title}>
          <p className="mb-2 text-xs text-muted">{group.title}</p>
          <ul className="divide-y divide-gray-100 rounded-2xl bg-card shadow-sm">
            {group.items.map((item) => {
              const Icon = icons[item.icon];
              const content = (
                <>
                  <span className="flex items-center gap-3">
                    <span
                      className={`flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary-100 ${iconColors[item.icon]}`}
                    >
                      <Icon size={20} />
                    </span>
                    <span>
                      <span className="block text-sm font-bold text-heading">{item.title}</span>
                      <span className="block text-xs text-muted">{item.description}</span>
                    </span>
                  </span>
                  <span className="flex shrink-0 items-center gap-2 text-xs text-muted">
                    {item.badge === "addresses" && (
                      <span className="rounded-full bg-primary-200 px-2 py-0.5 font-bold text-primary">
                        {addressesCount} {data.addressesBadgeSuffix}
                      </span>
                    )}
                    {item.badge === "dot" && <span className="size-2 rounded-full bg-green-600" />}
                    {item.badge && item.badge !== "addresses" && item.badge !== "dot" && item.badge}
                    <ChevronLeft size={16} />
                  </span>
                </>
              );

              return (
                <li key={item.title}>
                  {item.path ? (
                    <Link
                      to={item.path}
                      className="flex items-center justify-between gap-3 p-4 transition hover:bg-primary-100"
                    >
                      {content}
                    </Link>
                  ) : (
                    <button
                      type="button"
                      className="flex w-full cursor-pointer items-center justify-between gap-3 p-4 text-start transition hover:bg-primary-100"
                    >
                      {content}
                    </button>
                  )}
                </li>
              );
            })}
          </ul>
        </section>
      ))}

      <button
        type="button"
        onClick={logoutUser}
        className="flex cursor-pointer items-center justify-center gap-2 rounded-2xl bg-accent-200 py-4 font-bold text-accent-700 transition hover:bg-accent-300"
      >
        <LogOut size={18} className="rtl:-scale-x-100" />
        {data.logoutLabel}
      </button>
      <p className="text-center text-xs text-muted">{data.version}</p>
    </aside>
  );
}
