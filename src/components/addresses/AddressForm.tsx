import { useState } from "react";
import type { FormEvent } from "react";
import {
  Building2,
  CircleCheck,
  House,
  Map as MapIcon,
  Navigation,
  NotebookPen,
  Phone,
  Signpost,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { AddressesData } from "../../Data";
import type { AddressInput } from "../../store/addressStore";

const data = AddressesData;
const { form: labels } = data;

const typeIcons: Record<string, LucideIcon> = {
  home: House,
  work: Building2,
  other: Navigation,
};

const emptyAddress: AddressInput = {
  type: "home",
  title: labels.defaultTitles.home,
  area: data.areas[0],
  street: "",
  phone: "",
  notes: "",
};

type AddressFormProps = {
  initialValue?: AddressInput;
  isEditing: boolean;
  onSave: (address: AddressInput) => void;
  onCancel: () => void;
};

export default function AddressForm({
  initialValue,
  isEditing,
  onSave,
  onCancel,
}: AddressFormProps) {
  const [form, setForm] = useState<AddressInput>(initialValue ?? emptyAddress);
  const [error, setError] = useState("");

  const updateField = (field: keyof AddressInput, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setError("");
  };

  const changeType = (type: string) => {
    setForm((prev) => ({ ...prev, type, title: labels.defaultTitles[type] }));
  };

  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (!form.street.trim() || !/^01\d{9}$/.test(form.phone.trim())) {
      setError(labels.requiredMessage);
      return;
    }
    onSave({ ...form, street: form.street.trim(), phone: form.phone.trim() });
    if (!isEditing) setForm(emptyAddress);
  };

  const inputBox =
    "flex items-center gap-3 rounded-xl bg-primary-100 px-4 py-3 transition focus-within:ring-2 focus-within:ring-primary/20";

  return (
    <form onSubmit={submit} className="rounded-2xl bg-card p-6 shadow-sm">
      <h2 className="mb-5 text-xl font-bold text-heading">
        {isEditing ? labels.editTitle : labels.addTitle}
      </h2>

      <p className="mb-2 text-sm font-bold text-heading">{labels.typeLabel}</p>
      <div className="mb-5 grid grid-cols-3 gap-3">
        {data.types.map((type) => {
          const Icon = typeIcons[type.icon];
          const isActive = form.type === type.id;
          return (
            <button
              key={type.id}
              type="button"
              onClick={() => changeType(type.id)}
              className={`flex cursor-pointer flex-col items-center gap-1 rounded-xl border-2 py-3 text-sm font-bold transition ${
                isActive
                  ? "border-primary bg-primary-100 text-primary"
                  : "border-transparent bg-primary-100 text-heading hover:border-primary-300"
              }`}
            >
              <Icon size={20} />
              {type.label}
            </button>
          );
        })}
      </div>

      <div className="mb-5 grid grid-cols-1 gap-5 md:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-sm font-bold text-heading">{labels.areaLabel}</span>
          <span className={inputBox}>
            <MapIcon size={18} className="shrink-0 text-muted" />
            <select
              value={form.area}
              onChange={(e) => updateField("area", e.target.value)}
              className="w-full cursor-pointer bg-transparent text-heading outline-none"
            >
              {data.areas.map((area) => (
                <option key={area}>{area}</option>
              ))}
            </select>
          </span>
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-bold text-heading">{labels.phoneLabel}</span>
          <span className={inputBox}>
            <Phone size={18} className="shrink-0 text-muted" />
            <input
              type="tel"
              dir="ltr"
              value={form.phone}
              onChange={(e) => updateField("phone", e.target.value)}
              placeholder={labels.phonePlaceholder}
              className="w-full bg-transparent text-heading outline-none rtl:text-right"
            />
          </span>
        </label>
      </div>

      <label className="mb-5 block">
        <span className="mb-2 block text-sm font-bold text-heading">{labels.streetLabel}</span>
        <span className={inputBox}>
          <Signpost size={18} className="shrink-0 text-muted" />
          <input
            value={form.street}
            onChange={(e) => updateField("street", e.target.value)}
            placeholder={labels.streetPlaceholder}
            className="w-full bg-transparent text-heading outline-none"
          />
        </span>
      </label>

      <label className="mb-6 block">
        <span className="mb-2 block text-sm font-bold text-heading">{labels.notesLabel}</span>
        <span className={`${inputBox} items-start`}>
          <NotebookPen size={18} className="mt-1 shrink-0 text-muted" />
          <textarea
            rows={3}
            value={form.notes}
            onChange={(e) => updateField("notes", e.target.value)}
            placeholder={labels.notesPlaceholder}
            className="w-full resize-none bg-transparent text-heading outline-none"
          />
        </span>
      </label>

      {error && (
        <p className="mb-4 rounded-lg bg-accent-100 px-4 py-2 text-sm font-bold text-accent-700">
          {error}
        </p>
      )}

      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          type="submit"
          className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl bg-accent py-3.5 font-bold text-white transition hover:bg-accent-hover"
        >
          <CircleCheck size={18} />
          {labels.saveLabel}
        </button>
        {isEditing && (
          <button
            type="button"
            onClick={onCancel}
            className="cursor-pointer rounded-xl bg-primary-100 px-6 py-3.5 font-bold text-muted transition hover:bg-primary-200"
          >
            {labels.cancelLabel}
          </button>
        )}
      </div>
    </form>
  );
}
