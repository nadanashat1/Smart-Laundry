import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import emailIcon from "../../../assets/icons/admin-login-email-icon.png";
import deliveryFeatureIcon from "../../../assets/icons/admin-login-delivery-feature-icon.png";
import trackingFeatureIcon from "../../../assets/icons/admin-login-tracking-feature-icon.png";
import aiFeatureIcon from "../../../assets/icons/admin-login-ai-feature-icon.png";
import validationIcon from "../../../assets/icons/validation-icon.png";
import {
  forgetPasswordSchema,
  type ForgetPasswordFormData,
} from "../../../types/customerAuthSchema";

const features = [
  { icon: deliveryFeatureIcon, title: "استلام وتسليم من باب بيتك", description: "توصيل يناسبك في الوقت المحدد وبكل سهولة" },
  { icon: trackingFeatureIcon, title: "أسعار شفافة وتتبع دقيق", description: "تابع طلبات الغسيل واعرف تفاصيلها في كل خطوة" },
  { icon: aiFeatureIcon, title: "مساعدك نيفو الذكي", description: "تجربة غسيل أكثر سهولة وراحة" },
];

export default function ForgetPassword() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgetPasswordFormData>({
    resolver: zodResolver(forgetPasswordSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = (formData: ForgetPasswordFormData) => {
    console.log(formData);
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
            <div className="px-3 py-8 sm:px-6 sm:py-10 md:px-6 md:py-8">
              <div className="mx-auto w-full max-w-md">
                <div className="mb-6 text-right">
                  <span className="mb-2 inline-flex items-center gap-1 rounded-full bg-primary-100 px-2 py-1 text-[10px] text-primary">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    استعادة الحساب
                  </span>
                  <h1 className="text-xl font-bold leading-tight text-heading">
                    نسيت كلمة المرور؟
                  </h1>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    أدخل بريدك الإلكتروني وسنرسل إليك رمز التحقق لإعادة تعيين
                    كلمة المرور.
                  </p>
                </div>

                <form
                  onSubmit={handleSubmit(onSubmit)}
                  noValidate
                  className="space-y-4"
                >
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-1 block text-sm font-bold text-heading"
                    >
                      البريد الإلكتروني
                    </label>
                    <div className="relative flex h-10 items-center rounded-lg border border-gray-200 bg-card px-3 transition focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/10">
                      <input
                        {...register("email")}
                        id="email"
                        type="email"
                        autoComplete="email"
                        placeholder="name@example.com"
                        dir="ltr"
                        className="min-w-0 flex-1 bg-transparent pe-7 text-sm text-heading outline-none placeholder:text-gray-400"
                      />
                      <img
                        src={emailIcon}
                        alt=""
                        className="absolute right-3 h-4 w-4 object-contain"
                      />
                    </div>
                    {errors.email?.message && (
                      <p className="mt-1 text-xs text-red-700" role="alert">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="flex h-11 w-full cursor-pointer items-center justify-center rounded-lg bg-accent px-4 text-sm font-bold text-white shadow-sm transition-colors hover:bg-accent-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                  >
                    إرسال رمز التحقق
                  </button>

                  <p className="text-center text-xs text-muted">
                    تحتاج إلى مساعدة؟
                  </p>

                  <p className="pt-2 text-center text-sm text-muted">
                    تذكرت كلمة المرور؟{" "}
                    <button
                      type="button"
                      onClick={() => navigate("/login")}
                      className="cursor-pointer font-bold text-primary transition-colors hover:text-primary-hover"
                    >
                      تسجيل الدخول
                    </button>
                  </p>
                </form>
              </div>
            </div>
            <aside className="flex flex-col items-center bg-linear-to-br from-primary-300/80 via-primary-200 to-[#e8d9e9] px-5 py-8 sm:px-8 md:px-7 md:py-10">
              <img src="/logo.png" alt="Nivo" className="mb-3 h-auto w-36.25 object-contain" />
              <h2 className="text-xl font-bold text-heading">مرحباً بك في نيفو</h2>
              <p className="mt-1 max-w-62.5 text-center text-sm leading-relaxed text-muted">
                استمتع بخدمات نيفو بكل راحة وسهولة، وتابع طلبات الغسيل من مكان واحد.
              </p>
              <div className="mt-6 flex w-full flex-col gap-2">
                {features.map((feature) => (
                  <div key={feature.title} className="flex min-h-14 items-center gap-3 rounded-xl bg-card px-3 py-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-100">
                      <img src={feature.icon} alt="" className="h-4 w-4 object-contain" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-bold leading-5 text-heading">{feature.title}</h3>
                      <p className="mt-0.5 text-xs leading-relaxed text-muted">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-7 flex items-center justify-center gap-2 text-center text-xs font-medium text-heading">
                <img src={validationIcon} alt="" className="h-3.5 w-3.5 shrink-0 object-contain" />
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
