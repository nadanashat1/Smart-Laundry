import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Bell, CirclePlus, Menu, UserRound, X } from "lucide-react";
import { HeaderData } from "../../Data";
import { useAuthStore } from "../../store/authStore";

const {
  logo,
  navLinks,
  cta,
  loginButton,
  logoutButton,
  profile,
  notificationsCount,
} = HeaderData;

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();

  const closeMenu = () => setIsMenuOpen(false);

  const logoutUser = () => {
    logout();
    closeMenu();
    navigate(logoutButton.path, { replace: true });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/90 shadow-[0_1px_8px_rgba(0,0,0,0.04)] backdrop-blur-xl">
      <div className="container flex h-20 items-center justify-between gap-4">
        <div className="flex items-center gap-10">
          <Link to={logo.path} onClick={closeMenu}>
            <img src={logo.src} alt={logo.alt} className="h-8 w-auto" />
          </Link>

          <nav className="hidden lg:block">
            <ul className="flex items-center gap-2">
              {isAuthenticated && navLinks.map((link) => (
                <li key={link.path}>
                  <NavLink
                    to={link.path}
                    end={link.path === "/"}
                    className={({ isActive }) =>
                      `rounded-lg px-3 py-2 text-sm transition ${
                        isActive
                          ? "bg-[#E6EEFF] font-bold text-primary"
                          : "text-body hover:text-primary"
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <button
              type="button"
              onClick={logoutUser}
              className="hidden cursor-pointer sm:block rounded-xl border border-accent px-5 py-2 font-bold text-[14px] text-accent duration-200 hover:bg-accent/5"
            >
              {logoutButton.label}
            </button>
          ) : (
            <Link
              to={loginButton.path}
              className="hidden sm:block rounded-xl bg-accent px-6 py-2 font-bold text-[14px] text-white duration-200 hover:bg-accent-700"
            >
              {loginButton.label}
            </Link>
          )}

          {!isAuthenticated && (
            <Link
              to="/signup"
              className="hidden sm:block rounded-xl border border-accent px-5 py-2 font-bold text-[14px] text-accent duration-200 hover:bg-accent/5"
            >
              إنشاء حساب
            </Link>
          )}

          {isAuthenticated && (
            <>
              <Link
                to={cta.path}
                className="hidden items-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-bold text-white transition hover:bg-accent-hover sm:flex"
              >
                <CirclePlus size={18} />
                {cta.label}
              </Link>

              <button
                type="button"
                aria-label="Notifications"
                className="relative cursor-pointer text-heading"
              >
                <Bell size={20} />
                {notificationsCount > 0 && (
                  <span className="absolute -top-1.5 -inset-e-1.5 flex size-4 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-white">
                    {notificationsCount}
                  </span>
                )}
              </button>

              <NavLink
                to={profile.path}
                onClick={closeMenu}
                className={({ isActive }) =>
                  `flex size-9 items-center justify-center overflow-hidden rounded-full bg-[#E6EEFF] text-primary ${
                    isActive ? "ring-2 ring-primary ring-offset-2" : ""
                  }`
                }
              >
                {profile.avatar ? (
                  <img
                    src={profile.avatar}
                    alt={profile.alt}
                    className="size-full object-cover"
                  />
                ) : (
                  <UserRound size={20} />
                )}
              </NavLink>
            </>
          )}

          <button
            type="button"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-label="Toggle navigation menu"
            aria-expanded={isMenuOpen}
            aria-controls="main-navigation"
            className="rounded-lg p-2 text-heading transition hover:bg-accent/10 lg:hidden"
          >
            {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <nav
          id="main-navigation"
          className="border-t border-gray-100 lg:hidden"
        >
          <ul className="container flex flex-col gap-1 py-4">
            {isAuthenticated && navLinks.map((link) => (
              <li key={link.path}>
                <NavLink
                  to={link.path}
                  end={link.path === "/"}
                  onClick={closeMenu}
                  className={({ isActive }) =>
                    `block rounded-lg px-3 py-2 text-sm transition ${
                      isActive
                        ? "bg-[#E6EEFF] font-bold text-primary"
                        : "text-body hover:text-primary"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}

            <li className="sm:hidden">
              {!isAuthenticated ? (
                <>
                  <Link
                    to={loginButton.path}
                    onClick={closeMenu}
                    className="mt-2 block w-full rounded-xl bg-accent px-6 py-2 text-center text-[14px] font-bold text-white duration-200 hover:bg-accent-700"
                  >
                    {loginButton.label}
                  </Link>

                  <Link
                      to="/signup"
                      onClick={closeMenu}
                      className="mt-2 block w-full rounded-xl border border-accent px-6 py-2 text-center text-[14px] font-bold text-accent"
                    >
                      إنشاء حساب
                    </Link>
                </>
              ) : (
                <button
                  type="button"
                  onClick={logoutUser}
                  className="mt-2 block w-full cursor-pointer rounded-xl border border-accent px-6 py-2 text-center text-[14px] font-bold text-accent duration-200 hover:bg-accent/5"
                >
                  {logoutButton.label}
                </button>
              )}

              {isAuthenticated && (
                <Link
                  to={cta.path}
                  onClick={closeMenu}
                  className="mt-2 flex items-center justify-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-bold text-white transition hover:bg-accent-hover"
                >
                  <CirclePlus size={18} />
                  {cta.label}
                </Link>
              )}
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;
