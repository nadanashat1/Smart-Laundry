import { useState } from "react";
import type { FormEvent } from "react";
import {
  CalendarDays,
  Check,
  Hourglass,
  Mail,
  Save,
  Shirt,
  ShoppingBag,
  Smartphone,
  UserRound,
  UserRoundCog,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import ProfileSidebar from "../../../components/profile/ProfileSidebar";
import { ProfileData } from "../../../Data";

const data = ProfileData;

const statIcons: Record<string, LucideIcon> = {
  orders: ShoppingBag,
  items: Shirt,
  time: Hourglass,
};

const statColors: Record<string, string> = {
  primary: "bg-primary-100 text-primary",
  success: "bg-green-50 text-green-600",
  danger: "bg-accent-100 text-accent",
};

const initialForm = {
  fullName: data.user.fullName,
  email: data.user.email,
  phone: data.user.phone,
  birthDate: data.user.birthDate,
};

export default function Profile() {
  const [savedForm, setSavedForm] = useState(initialForm);
  const [form, setForm] = useState(initialForm);
  const [message, setMessage] = useState({ text: "", isError: false });

  const isChanged = JSON.stringify(form) !== JSON.stringify(savedForm);

  const updateField = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setMessage({ text: "", isError: false });
  };

  const saveChanges = (event: FormEvent) => {
    event.preventDefault();
    if (!form.fullName.trim() || !form.email.includes("@") || form.phone.trim().length < 8) {
      setMessage({ text: data.form.requiredMessage, isError: true });
      return;
    }
    setSavedForm(form);
    setMessage({ text: data.form.savedMessage, isError: false });
  };

  const cancelChanges = () => {
    setForm(savedForm);
    setMessage({ text: "", isError: false });
  };

  const fields = [
    { key: "fullName" as const, label: data.form.fullNameLabel, icon: UserRound, type: "text", dir: "rtl" },
    { key: "email" as const, label: data.form.emailLabel, icon: Mail, type: "email", dir: "ltr" },
    { key: "phone" as const, label: data.form.phoneLabel, icon: Smartphone, type: "tel", dir: "ltr" },
    { key: "birthDate" as const, label: data.form.birthDateLabel, icon: CalendarDays, type: "date", dir: "ltr" },
  ];

  return (
    <div className="bg-background py-8">
      <div className="container flex flex-col gap-6">
        <div className="flex flex-wrap items-end justify-between gap-2">
          <div>
            <h1 className="mb-1 text-3xl font-bold text-heading">{data.title}</h1>
            <p className="text-sm text-muted">{data.description}</p>
          </div>
          <span className="text-xs text-muted">{data.lastUpdate}</span>
        </div>

        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[1fr_360px]">
          <div className="order-2 flex min-w-0 flex-col gap-6 lg:order-1">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {data.stats.map((stat) => {
                const Icon = statIcons[stat.icon];
                return (
                  <div key={stat.label} className="rounded-2xl bg-card p-5 text-center shadow-sm">
                    <span
                      className={`mx-auto mb-2 flex size-11 items-center justify-center rounded-full ${statColors[stat.tone]}`}
                    >
                      <Icon size={20} />
                    </span>
                    <p className="text-2xl font-bold text-heading" dir="ltr">
                      {stat.value}
                    </p>
                    <p className="text-sm text-muted">{stat.label}</p>
                  </div>
                );
              })}
            </div>

            <form onSubmit={saveChanges} className="rounded-2xl bg-card p-6 shadow-sm">
              <div className="mb-6 flex items-start justify-between gap-3">
                <div>
                  <h2 className="mb-1 text-xl font-bold text-heading">{data.form.title}</h2>
                  <p className="text-sm text-muted">{data.form.subtitle}</p>
                </div>
                <UserRoundCog size={24} className="shrink-0 text-primary" />
              </div>

              <div className="mb-6 grid grid-cols-1 gap-5 md:grid-cols-2">
                {fields.map((field) => {
                  const Icon = field.icon;
                  return (
                    <label key={field.key} className="block">
                      <span className="mb-2 flex items-center justify-between text-sm font-bold text-heading">
                        {field.label}
                        {field.key === "phone" && (
                          <span className="flex items-center gap-1 text-xs font-bold text-green-600">
                            <Check size={14} />
                            {data.form.verifiedLabel}
                          </span>
                        )}
                      </span>
                      <span className="flex items-center gap-3 rounded-xl border border-gray-200 px-4 py-3 transition focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20">
                        <Icon size={18} className="shrink-0 text-muted" />
                        <input
                          type={field.type}
                          dir={field.dir}
                          value={form[field.key]}
                          onChange={(e) => updateField(field.key, e.target.value)}
                          className="w-full bg-transparent text-heading outline-none rtl:text-right"
                        />
                      </span>
                    </label>
                  );
                })}
              </div>

              {message.text && (
                <p
                  className={`mb-4 rounded-lg px-4 py-2 text-sm font-bold ${
                    message.isError ? "bg-accent-100 text-accent-700" : "bg-green-50 text-green-700"
                  }`}
                >
                  {message.text}
                </p>
              )}

              <div className="flex flex-wrap gap-3">
                <button
                  type="submit"
                  disabled={!isChanged}
                  className="flex cursor-pointer items-center gap-2 rounded-xl bg-primary px-6 py-3 font-bold text-white transition hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <Save size={18} />
                  {data.form.saveLabel}
                </button>
                <button
                  type="button"
                  onClick={cancelChanges}
                  disabled={!isChanged}
                  className="cursor-pointer rounded-xl bg-primary-100 px-6 py-3 font-bold text-muted transition hover:bg-primary-200 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {data.form.cancelLabel}
                </button>
              </div>
            </form>
          </div>

          <div className="order-1 lg:order-2">
            <ProfileSidebar
              fullName={savedForm.fullName}
              email={savedForm.email}
              phone={savedForm.phone}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
