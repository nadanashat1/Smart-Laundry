import { Menu } from "lucide-react";
import notificationIcon from "../../assets/icons/admin-notification-icon.png";
import searchIcon from "../../assets/icons/input-search-icon.png";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";

type DashboardHeaderProps = {
  onMenuClick: () => void;
};

export default function DashboardHeader({ onMenuClick }: DashboardHeaderProps) {
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const logoutAdmin = () => {
    logout();
    navigate("/", { replace: true });
  };

  return (
    <header className="flex items-center justify-between gap-2 px-4 py-4 sm:px-8">
      <button
        type="button"
        onClick={onMenuClick}
        aria-label="Open navigation menu"
        aria-controls="admin-navigation"
        className="shrink-0 rounded-lg p-2 text-heading transition hover:bg-accent/10 lg:hidden"
      >
        <Menu size={22} />
      </button>
      <div className="relative w-full max-w-76">
        <img
          src={searchIcon}
          alt="Search Icon"
          className="absolute top-1/2 -translate-y-1/2 inset-s-3 w-4 h-4 pointer-events-none"
        />
        <input
          type="search"
          placeholder="ابحث عن طلب، عميل، أو رقم شحنة..."
          className="w-full ps-10 pe-3 py-2 text-sm rounded-lg bg-primary-100 text-body placeholder:text-gray-600 outline-none transition focus:ring-2 focus:ring-primary/20"
        />
      </div>

      <div className="flex items-center gap-1 sm:gap-6">
        <button
          type="button"
          onClick={logoutAdmin}
          className="cursor-pointer bg-accent text-white text-xs rounded-xl py-1 sm:py-2 px-3 sm:px-6 sm:font-bold sm:text-[14px] hover:bg-accent-700 duration-200"
        >
          تسجيل خروج
        </button>

        <button className="relative cursor-pointer">
          <img src={notificationIcon} alt="Notification Icon" className="w-4" />
          <span className="absolute -top-1.5 -inset-e-1.5 flex w-4 h-4 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-white">
            0
          </span>
        </button>
      </div>
    </header>
  );
}
