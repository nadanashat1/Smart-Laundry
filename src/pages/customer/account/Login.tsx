import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import passwordIcon from "../../../assets/icons/admin-login-password-icon.png";
import signupIcon from "../../../assets/icons/admin-login-signup-icon.png";
import deliveryFeatureIcon from "../../../assets/icons/admin-login-delivery-feature-icon.png";
import trackingFeatureIcon from "../../../assets/icons/admin-login-tracking-feature-icon.png";
import aiFeatureIcon from "../../../assets/icons/admin-login-ai-feature-icon.png";
import validationIcon from "../../../assets/icons/validation-icon.png";
import googleIcon from "../../../assets/icons/google-icon.png";
import appleIcon from "../../../assets/icons/apple-icon.png";

import {
  customerLoginSchema,
  type CustomerLoginFormData,
} from "../../../types/customerAuthSchema";
import { useAuthStore } from "../../../store/authStore";

const features = [
  {
    icon: deliveryFeatureIcon,
    title: "استلام وتسليم من باب بيتك",
    description: "توصيل يناسبك في الوقت المحدد وبكل سهولة",
  },
  {
    icon: trackingFeatureIcon,
    title: "أسعار شفافة وتتبع دقيق",
    description: "تابع طلبات الغسيل واعرف تفاصيلها في كل خطوة",
  },
  {
    icon: aiFeatureIcon,
    title: "مساعدك نيفو الذكي",
    description: "تجربة غسيل أكثر سهولة وراحة",
  },
];

export default function CustomerLogin() {
  const navigate = useNavigate();
  const location = useLocation();
  const login = useAuthStore((state) => state.login);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CustomerLoginFormData>({
    resolver: zodResolver(customerLoginSchema),
    defaultValues: {
      phone: "",
      password: "",
    },
  });

  const onSubmit = (formData: CustomerLoginFormData) => {
    if (formData.phone === "01123456789") {
      login({ role: "admin", userPhone: formData.phone });
      navigate("/admin", { replace: true });
      return;
    }

    login({ role: "customer", userPhone: formData.phone });
    const from = (location.state as { from?: string } | null)?.from;
    navigate(from ?? "/", { replace: true });
  };

  return (
    <div className="flex min-h-screen flex-col bg-background font-tajawal text-heading">
      <header className="h-16 shrink-0 border-b border-gray-200 bg-card">
        <div className="container flex h-full items-center">
          <Link to="/landing">
            <img
              src="/logo.png"
              alt="Nivo Logo"
              className="h-10 w-24 object-contain"
            />
          </Link>
        </div>
      </header>

      <main className="flex flex-1 items-center justify-center bg-background px-4 py-8 sm:py-10">
        <section className="w-full max-w-5xl overflow-hidden rounded-xl bg-card shadow-[0_12px_22px_rgba(0,0,0,0.10)]">
          <div className="grid grid-cols-1 md:grid-cols-[58%_42%]">
            <div className="order-1 px-3 py-8 sm:px-6 sm:py-10 md:order-1 md:px-6 md:py-6">
              <div className="mx-auto w-full max-w-md">
                <div className="mb-5 flex rounded-lg bg-primary-200 p-1 text-center text-sm">
                  <button
                    type="button"
                    onClick={() => navigate("/signup")}
                    className="flex-1 cursor-pointer rounded-md px-2 py-2 text-muted transition-colors hover:text-primary"
                  >
                    إنشاء حساب جديد
                  </button>

                  <button
                    type="button"
                    aria-current="page"
                    className="flex-1 cursor-pointer rounded-md bg-card px-2 py-2 font-bold text-primary shadow-sm"
                  >
                    تسجيل الدخول
                  </button>
                </div>

                <div className="mb-4 text-right">
                  <span className="mb-2 inline-flex items-center gap-1 rounded-full bg-primary-100 px-2 py-1 text-[10px] text-primary">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    منظومة الغسيل الذكية
                  </span>

                  <h1 className="text-xl font-bold leading-tight text-heading">
                    أهلاً بك مجدداً في نيفو
                  </h1>

                  <p className="mt-2 text-xs leading-relaxed text-muted">
                    سجل دخولك لمتابعة طلبات الغسيل وإدارة حسابك والاستمتاع
                    بتجربة غسيل أكثر سهولة.
                  </p>
                </div>

                <div className="mb-4 grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    className="flex h-9 cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary-100 px-3 text-xs text-heading transition-colors hover:bg-primary-200"
                  >
                    <span>Apple ID</span>
                    <img
                      src={appleIcon}
                      alt=""
                      className="h-4 w-4 object-contain"
                    />
                  </button>

                  <button
                    type="button"
                    className="flex h-9 cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary-100 px-3 text-xs text-heading transition-colors hover:bg-primary-200"
                  >
                    <span>Google</span>
                    <img
                      src={googleIcon}
                      alt=""
                      className="h-4 w-4 object-contain"
                    />
                  </button>
                </div>

                <div className="mb-4 flex items-center gap-2">
                  <span className="h-px flex-1 bg-gray-200" />
                  <span className="text-[10px] text-muted">
                    أو استخدام هاتفك المسجل
                  </span>
                  <span className="h-px flex-1 bg-gray-200" />
                </div>

                <form
                  onSubmit={handleSubmit(onSubmit)}
                  noValidate
                  className="space-y-3"
                >
                  <div>
                    <label
                      htmlFor="phone"
                      className="mb-1 block text-sm font-bold text-heading"
                    >
                      رقم الهاتف المحمول
                    </label>

                    <div className="flex h-9 items-center overflow-hidden rounded-lg border border-gray-200 bg-card transition focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/10">
                      <div
                        dir="ltr"
                        className="flex h-full shrink-0 items-center gap-1 border-r border-gray-200 px-2 text-xs text-heading"
                      >
                        <span>+20</span>
                      </div>

                      <input
                        {...register("phone")}
                        id="phone"
                        type="tel"
                        autoComplete="tel-national"
                        inputMode="numeric"
                        maxLength={11}
                        placeholder="01X XXXX XXXX"
                        dir="ltr"
                        className="ps-6 min-w-0 flex-1 bg-transparent px-3 text-sm text-heading outline-none placeholder:text-gray-400"
                      />
                    </div>

                    {errors.phone?.message && (
                      <p className="mt-1 text-xs text-red-700">
                        {errors.phone.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="password"
                      className="mb-1 block text-sm font-bold text-heading"
                    >
                      كلمة المرور
                    </label>

                    <div className="relative flex h-9 items-center rounded-lg border border-gray-200 bg-card px-3 transition focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/10">
                      <input
                        {...register("password")}
                        id="password"
                        type="password"
                        autoComplete="current-password"
                        placeholder="••••••••"
                        className="ps-6 min-w-0 flex-1 bg-transparent pe-7 text-sm text-heading outline-none placeholder:text-gray-400"
                      />

                      <img
                        src={passwordIcon}
                        alt=""
                        className="absolute right-3 h-4 w-4 object-contain"
                      />
                    </div>

                    {errors.password?.message && (
                      <p className="mt-1 text-xs text-red-700">
                        {errors.password.message}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => navigate("/forget-password")}
                      className="text-xs text-primary transition-colors hover:text-primary-hover"
                    >
                      نسيت كلمة المرور؟
                    </button>

                    <label className="flex cursor-pointer items-center gap-2 text-xs text-muted">
                      <span>تذكر تسجيل دخولك على هذا المتصفح</span>
                      <input
                        type="checkbox"
                        className="h-3.5 w-3.5 cursor-pointer accent-primary"
                      />
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-accent px-4 text-sm font-bold text-white shadow-sm transition-colors hover:bg-accent-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                  >
                    <span>تسجيل الدخول</span>
                    <img
                      src={signupIcon}
                      alt=""
                      className="h-4 w-4 object-contain"
                    />
                  </button>
                </form>
              </div>
            </div>

            <aside className="order-2 flex flex-col items-center bg-linear-to-br from-primary-300/80 via-primary-200 to-[#e8d9e9] px-5 py-8 sm:px-8 md:order-2 md:px-7 md:py-10">
              <img
                src="/logo.png"
                alt="Nivo"
                className="mb-3 h-auto w-36.25 object-contain"
              />

              <h2 className="text-xl font-bold text-heading">مرحباً بعودتك!</h2>

              <p className="mt-1 max-w-62.5 text-center text-sm leading-relaxed text-muted">
                سجل دخولك لمتابعة طلبات الغسيل والاستمتاع بخدمات نيفو بكل راحة
                وسهولة.
              </p>

              <div className="mt-6 flex w-full flex-col gap-2">
                {features.map((feature) => (
                  <div
                    key={feature.title}
                    className="flex min-h-14 items-center gap-3 rounded-xl bg-card px-3 py-3"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-100">
                      <img
                        src={feature.icon}
                        alt=""
                        className="h-4 w-4 object-contain"
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3 className="font-bold leading-5 text-heading">
                        {feature.title}
                      </h3>

                      <p className="mt-0.5 text-xs leading-relaxed text-muted">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-7 flex items-center justify-center gap-2 text-center text-xs font-medium text-heading">
                <img
                  src={validationIcon}
                  alt=""
                  className="h-3.5 w-3.5 shrink-0 object-contain"
                />

                <span>خدمات العناية بالملابس بجودة وراحة تستحقها</span>
              </div>
            </aside>
          </div>
        </section>
      </main>

      <footer className="flex min-h-8 shrink-0 items-center justify-center px-4 py-4 text-center text-sm text-muted">
        <p>© 2025 Nivo Smart Laundry - حلول غسيل مبتكرة.</p>
      </footer>
    </div>
  );
}
