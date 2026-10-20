import {
  BellRing,
  Building2,
  CircleCheck,
  House,
  MapPin,
  Navigation,
  Pencil,
  Phone,
  Trash2,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { AddressesData } from "../../Data";
import type { Address } from "../../store/addressStore";

const data = AddressesData;

const typeIcons: Record<string, LucideIcon> = {
  home: House,
  work: Building2,
  other: Navigation,
};

type SavedAddressCardProps = {
  address: Address;
  onEdit: () => void;
  onDelete: () => void;
  onSetDefault: () => void;
};

export default function SavedAddressCard({
  address,
  onEdit,
  onDelete,
  onSetDefault,
}: SavedAddressCardProps) {
  const Icon = typeIcons[address.type];

  return (
    <article
      className={`flex flex-col rounded-2xl bg-card p-5 shadow-sm ${
        address.isDefault ? "ring-2 ring-primary/30" : ""
      }`}
    >
      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <span
            className={`flex size-11 shrink-0 items-center justify-center rounded-xl ${
              address.isDefault ? "bg-primary-200 text-primary" : "bg-gray-200 text-heading"
            }`}
          >
            <Icon size={20} />
          </span>
          <div>
            <h2 className="font-bold text-heading">{address.title}</h2>
            <p className="text-xs text-muted">{address.area}</p>
          </div>
        </div>
        {address.isDefault && (
          <span className="flex shrink-0 items-center gap-1 rounded-full bg-primary-200 px-3 py-1 text-xs font-bold text-primary">
            <CircleCheck size={14} />
            {data.defaultLabel}
          </span>
        )}
      </div>

      <div className="mb-4 space-y-3 rounded-xl bg-primary-100 p-4 text-sm">
        <p className="flex items-start gap-2 text-heading">
          <MapPin size={16} className="mt-0.5 shrink-0 text-muted" />
          {address.street}
        </p>
        <p className="flex items-center gap-2 text-muted">
          <Phone size={16} className="shrink-0 text-green-600" />
          {data.phoneLabel}
          <span className="font-bold text-heading" dir="ltr">
            {address.phone}
          </span>
        </p>
        {address.notes && (
          <div className="flex items-start gap-2 rounded-lg bg-card p-3">
            <BellRing size={16} className="mt-0.5 shrink-0 text-accent" />
            <div>
              <p className="text-xs font-bold text-heading">{data.notesLabel}</p>
              <p className="text-xs text-muted">{address.notes}</p>
            </div>
          </div>
        )}
      </div>

      <div className="mt-auto flex items-center justify-between gap-3">
        {address.isDefault ? (
          <span />
        ) : (
          <button
            type="button"
            onClick={onSetDefault}
            className="flex cursor-pointer items-center gap-1 text-sm text-muted transition hover:text-primary"
          >
            <CircleCheck size={16} />
            {data.setDefaultLabel}
          </button>
        )}
        <div className="flex items-center gap-4 text-sm">
          <button
            type="button"
            onClick={onEdit}
            className="flex cursor-pointer items-center gap-1 text-muted transition hover:text-primary"
          >
            <Pencil size={16} />
            {data.editLabel}
          </button>
          <button
            type="button"
            onClick={onDelete}
            className="flex cursor-pointer items-center gap-1 text-accent transition hover:text-accent-700"
          >
            <Trash2 size={16} />
            {data.deleteLabel}
          </button>
        </div>
      </div>
    </article>
  );
}
