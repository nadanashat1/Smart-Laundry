import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import emailIcon from "../../../assets/icons/admin-login-email-icon.png";
import passwordIcon from "../../../assets/icons/admin-login-password-icon.png";
import signupIcon from "../../../assets/icons/admin-login-signup-icon.png";
import deliveryFeatureIcon from "../../../assets/icons/admin-login-delivery-feature-icon.png";
import trackingFeatureIcon from "../../../assets/icons/admin-login-tracking-feature-icon.png";
import aiFeatureIcon from "../../../assets/icons/admin-login-ai-feature-icon.png";
import validationIcon from "../../../assets/icons/validation-icon.png";

import {
  registerSchema,
  type RegisterFormData,
} from "../../../types/customerAuthSchema";
import { useAuthStore } from "../../../store/authStore";

const features = [
  {
    icon: deliveryFeatureIcon,
    title: "استلام وتسليم من باب بيتك",
    description: "توصيل يناسب وقتك ويوفر عليك عناء التنقل",
  },
  {
    icon: trackingFeatureIcon,
    title: "أسعار شفافة وتتبع دقيق",
    description: "تابع حالة طلبك واعرف تفاصيله في كل خطوة",
  },
  {
    icon: aiFeatureIcon,
    title: "مساعدك نيفو الذكي",
    description: "تجربة غسيل أكثر سهولة وراحة",
  },
];

export default function SignUp() {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      email: "",
      password: "",
      confirmPassword: "",
      acceptTerms: false,
    },
  });

  const onSubmit = (formData: RegisterFormData) => {
    login({
      role: "customer",
      userName: formData.fullName,
      userPhone: `0${formData.phone}`,
      userEmail: formData.email,
    });
    navigate("/", { replace: true });
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
            <div className="order-1 px-3 py-7 sm:px-6 sm:py-8 md:order-1 md:px-6 md:py-6">
              <div className="mx-auto w-full max-w-md">
                <div className="mb-5 flex rounded-lg bg-primary-200 p-1 text-center text-sm">
                  <button
                    type="button"
                    className="flex-1 cursor-pointer rounded-md bg-card px-2 py-2 font-bold text-primary shadow-sm"
                    aria-current="page"
                  >
                    إنشاء حساب جديد
                  </button>

                  <button
                    type="button"
                    onClick={() => navigate("/login")}
                    className="flex-1 cursor-pointer rounded-md px-2 py-2 text-muted transition-colors hover:text-primary"
                  >
                    تسجيل الدخول
                  </button>
                </div>

                <form
                  onSubmit={handleSubmit(onSubmit)}
                  noValidate
                  className="space-y-3"
                >
                  <div>
                    <label
                      htmlFor="fullName"
                      className="mb-1 block text-sm font-bold text-heading"
                    >
                      الاسم بالكامل
                    </label>

                    <div className="relative flex h-9 items-center rounded-lg border border-gray-200 bg-card px-3 transition focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/10">
                      <input
                        {...register("fullName")}
                        id="fullName"
                        type="text"
                        autoComplete="name"
                        placeholder="مثال: أحمد محمد عبد الله"
                        className="ps-6 min-w-0 flex-1 bg-transparent pe-7 text-sm text-heading outline-none placeholder:text-gray-400"
                      />

                      <img
                        src={signupIcon}
                        alt=""
                        className="absolute right-3 h-4 w-4 object-contain"
                      />
                    </div>

                    {errors.fullName?.message && (
                      <p className="mt-1 text-xs text-red-700">
                        {errors.fullName.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="mb-1 block text-sm font-bold text-heading"
                    >
                      رقم الهاتف
                    </label>

                    <div className="flex h-9 items-center overflow-hidden rounded-lg border border-gray-200 bg-card transition focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/10">
                      <div
                        dir="ltr"
                        className="flex h-full shrink-0 items-center gap-1 border-r border-gray-200 px-2 text-sm"
                      >
                        <span className="font-bold text-heading">+20</span>
                        <span aria-label="علم مصر">🇪🇬</span>
                      </div>

                      <input
                        {...register("phone")}
                        id="phone"
                        type="tel"
                        autoComplete="tel-national"
                        inputMode="numeric"
                        maxLength={10}
                        placeholder="10 1234 5678"
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
                      htmlFor="email"
                      className="mb-1 block text-sm font-bold text-heading"
                    >
                      البريد الإلكتروني
                    </label>

                    <div className="relative flex h-9 items-center rounded-lg border border-gray-200 bg-card px-3 transition focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/10">
                      <input
                        {...register("email")}
                        id="email"
                        type="email"
                        autoComplete="email"
                        placeholder="name@example.com"
                        dir="ltr"
                        className="ps-6 min-w-0 flex-1 bg-transparent pe-7 text-sm text-heading outline-none placeholder:text-gray-400"
                      />

                      <img
                        src={emailIcon}
                        alt=""
                        className="absolute right-3 h-4 w-4 object-contain"
                      />
                    </div>

                    {errors.email?.message && (
                      <p className="mt-1 text-xs text-red-700">
                        {errors.email.message}
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
                        autoComplete="new-password"
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

                  <div>
                    <label
                      htmlFor="confirmPassword"
                      className="mb-1 block text-sm font-bold text-heading"
                    >
                      تأكيد كلمة المرور
                    </label>

                    <div className="relative flex h-9 items-center rounded-lg border border-gray-200 bg-card px-3 transition focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/10">
                      <input
                        {...register("confirmPassword")}
                        id="confirmPassword"
                        type="password"
                        autoComplete="new-password"
                        placeholder="••••••••"
                        className="min-w-0 ps-6 flex-1 bg-transparent pe-7 text-sm text-heading outline-none placeholder:text-gray-400"
                      />

                      <img
                        src={passwordIcon}
                        alt=""
                        className="absolute right-3 h-4 w-4 object-contain"
                      />
                    </div>

                    {errors.confirmPassword?.message && (
                      <p className="mt-1 text-xs text-red-700">
                        {errors.confirmPassword.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="flex cursor-pointer items-start gap-2 text-xs leading-relaxed text-muted">
                      <input
                        {...register("acceptTerms")}
                        type="checkbox"
                        className="mt-0.5 h-3.5 w-3.5 shrink-0 cursor-pointer accent-primary"
                      />

                      <span>
                        أوافق على{" "}
                        <a
                          href="#terms"
                          onClick={(event) => event.preventDefault()}
                          className="text-primary hover:text-primary-hover"
                        >
                          الشروط والأحكام وسياسة الخصوصية
                        </a>
                      </span>
                    </label>

                    {errors.acceptTerms?.message && (
                      <p className="mt-1 text-xs text-red-700">
                        {errors.acceptTerms.message}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-accent px-4 text-sm font-bold text-white shadow-sm transition-colors hover:bg-accent-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                  >
                    <span>إنشاء الحساب والمتابعة</span>

                    <img
                      src={signupIcon}
                      alt=""
                      className="h-4 w-4 object-contain"
                    />
                  </button>

                  <p className="flex flex-wrap items-center justify-center gap-1 text-center text-[10px] text-muted">
                    <span>بياناتك محفوظة ومحمية</span>
                    <span className="text-primary">•</span>
                    <span>تجربة تسجيل آمنة</span>
                    <span>🛡️</span>
                  </p>
                </form>
              </div>
            </div>

            <aside className="order-2 flex flex-col items-center bg-linear-to-br from-primary-300/80 via-primary-200 to-[#e8d9e9] px-5 py-8 sm:px-8 md:order-2 md:px-7 md:py-10">
              <img
                src="/logo.png"
                alt="Nivo"
                className="mb-1 h-auto w-36.25 object-contain"
              />

              <h2 className=" font-bold text-primary">
                غسيل أذكى، وقت أكثر لما تحب
              </h2>

              <p className="mt-2 max-w-62.5 text-center text-sm leading-relaxed text-muted">
                تجربة غسيل متطورة تناسبك وتساعدك تتابع طلباتك بأفضل الطرق وبكل
                سهولة.
              </p>

              <div className="mt-5 flex w-full flex-col gap-2">
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
                      <h3 className=" font-bold leading-5 text-heading">
                        {feature.title}
                      </h3>

                      <p className="mt-0.5 text-sm leading-relaxed text-muted">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex items-center justify-center gap-2 text-center text-xs font-medium text-heading">
                <img
                  src={validationIcon}
                  alt=""
                  className="h-3.5 w-3.5 shrink-0 object-contain"
                />

                <span>تجربة غسيل أكثر سهولة وراحة</span>
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
