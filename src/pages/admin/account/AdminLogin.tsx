import emailIcon from "../../../assets/icons/admin-login-email-icon.png";
import passwordIcon from "../../../assets/icons/admin-login-password-icon.png";
import signupIcon from "../../../assets/icons/admin-login-signup-icon.png";
import deliveryFeatureIcon from "../../../assets/icons/admin-login-delivery-feature-icon.png";
import trackingFeatureIcon from "../../../assets/icons/admin-login-tracking-feature-icon.png";
import aiFeatureIcon from "../../../assets/icons/admin-login-ai-feature-icon.png";
import validationIcon from "../../../assets/icons/validation-icon.png";
import { useForm } from "react-hook-form";
import {
  adminLoginSchema,
  type AdminLoginFormData,
} from "../../../types/adminLoginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../store/authStore";

const features = [
  {
    icon: deliveryFeatureIcon,
    title: "إدارة الاستلام والتسليم",
    description: "إدارة دقيقة لعمليات الاستلام والتسليم ومتابعة كل طلب بسهولة",
  },
  {
    icon: trackingFeatureIcon,
    title: "إدارة الأسعار والتتبع اللحظي",
    description:
      "مراقبة طلبات الغسيل اليومية ومراجعة التكاليف والأسعار المثالية",
  },
  {
    icon: aiFeatureIcon,
    title: "مساعد نيفو الذكي للإدارة",
    description: "تحليل ذكي للبيانات وتوصيات تساعدك على اتخاذ القرار المناسب",
  },
];

export default function AdminLogin() {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AdminLoginFormData>({
    resolver: zodResolver(adminLoginSchema),
  });

  const onSubmit = (formData: AdminLoginFormData) => {
    login({ role: "admin", userEmail: formData.email });
    navigate("/admin", { replace: true });
  };

  return (
    <div className="flex min-h-screen flex-col bg-background font-tajawal text-heading">
      <header className="h-16 border-b border-gray-200 bg-card">
        <div className="container flex h-full items-center">
          <Link to="/landing">
            <img
              src="/logo.png"
              alt="Nivo Logo Image"
              className="h-10 w-24 object-contain"
            />
          </Link>
        </div>
      </header>

      <main className="bg-background flex flex-1 items-center justify-center px-4 py-8 sm:py-10">
        <section className="w-full max-w-5xl overflow-hidden rounded-xl bg-card ">
          <div className="grid grid-cols-1 md:grid-cols-[58%_42%]">
            <div className="order-1 px-2 py-9 sm:px-4 sm:py-10 md:order-1 md:px-6 md:py-12">
              <div className="mx-auto w-full max-w-md">
                <div className="mb-7">
                  <span className="mb-2 block text-xs text-primary">•</span>

                  <h1 className="text-xl font-bold leading-tight text-heading">
                    تسجيل دخول المشرفين وفرق التشغيل
                  </h1>

                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    أدخل بيانات الاعتماد المؤسسية الخاصة بفرع المعادي للوصول
                    للوحة التحكم ومراقبة خدمات التشغيل والتوصيل.
                  </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-1.5 block text-sm font-bold text-heading"
                    >
                      اسم المستخدم أو البريد الوظيفي
                    </label>

                    <div className="relative flex h-10 items-center gap-2 rounded-lg border border-primary-300 bg-card px-3  transition focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/10">
                      <input
                        {...register("email")}
                        id="email"
                        name="email"
                        type="text"
                        placeholder="أدخل اسم المستخدم أو البريد الوظيفي"
                        autoComplete="username"
                        className="ps-8 min-w-0 flex-1 bg-transparent text-sm text-heading outline-none placeholder:text-gray-500"
                      />

                      <img
                        src={emailIcon}
                        className="h-4 w-4 absolute right-3 top-1/2 -translate-y-1/2  object-contain"
                      />
                    </div>
                    <p className="text-red-700 mt-1">{errors.email?.message}</p>
                  </div>

                  <div>
                    <label
                      htmlFor="password"
                      className="mb-1.5 block text-sm font-bold text-heading"
                    >
                      كلمة المرور المشفرة
                    </label>

                    <div className="relative flex h-10 items-center gap-2 rounded-lg border border-gray-200 bg-card px-3 transition focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/10">
                      <input
                        {...register("password")}
                        id="password"
                        name="password"
                        type="password"
                        placeholder="أدخل كلمة المرور"
                        autoComplete="current-password"
                        className="ps-8 min-w-0 flex-1 bg-transparent text-sm text-heading outline-none placeholder:text-gray-500"
                      />

                      <img
                        src={passwordIcon}
                        alt=""
                        className="h-4 w-4 absolute right-3 top-1/2 -translate-y-1/2  object-contain"
                      />
                    </div>
                    <p className="text-red-700 mt-1">
                      {errors.password?.message}
                    </p>
                  </div>

                  <div className="flex justify-start mb-8">
                    <button
                      type="button"
                      className="text-sm ms-auto block text-primary transition-colors hover:text-primary-hover"
                    >
                      نسيت كلمة المرور؟
                    </button>
                  </div>

                  <button
                    type="submit"
                    className="flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-accent px-4 text-sm font-bold text-white shadow-sm transition-colors hover:bg-accent-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 cursor-pointer"
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
                سجل دخولك لإدارة الطلبات ومتابعة عمليات المغسلة بكل كفاءة ودقة.
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
                      <h3 className=" font-bold leading-5 text-heading">
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
                  className="h-3.5 w-3.5 shrink-0 object-contain"
                />

                <span>نظام متكامل لضمان رضا العملاء بنسبة 100%</span>
              </div>
            </aside>
          </div>
        </section>
      </main>

      <footer className="flex min-h-8 items-center justify-center px-4 py-4 text-center text-sm text-muted">
        <p>© 2025 Nivo Smart Laundry - حلول غسيل مبتكرة.</p>
      </footer>
    </div>
  );
}
