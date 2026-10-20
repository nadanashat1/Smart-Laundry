import { CirclePlus, MapPin, NotebookPen } from "lucide-react";
import { PickupSchedulingData } from "../../Data";

const { address } = PickupSchedulingData;

export default function AddressCard() {
  return (
    <section className="rounded-2xl bg-card p-5 shadow-sm">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <h2 className="flex items-center gap-2 text-lg font-bold text-heading">
          <MapPin size={20} className="text-primary" />
          {address.title}
        </h2>
        <button
          type="button"
          className="flex cursor-pointer items-center gap-1 text-sm font-bold text-primary transition hover:text-primary-hover"
        >
          <CirclePlus size={16} />
          {address.addLabel}
        </button>
      </div>

      <div className="rounded-xl bg-primary-100 p-4">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-card text-primary">
              <MapPin size={20} />
            </span>
            <div>
              <p className="mb-1 flex items-center gap-2 font-bold text-heading">
                {address.name}
                <span className="rounded bg-primary-200 px-2 py-0.5 text-[10px] text-primary">
                  {address.defaultLabel}
                </span>
              </p>
              <p className="text-sm text-body">{address.line}</p>
              <p className="text-xs text-muted">{address.city}</p>
            </div>
          </div>
          <button
            type="button"
            className="cursor-pointer rounded-lg bg-card px-3 py-2 text-xs font-bold text-heading transition hover:bg-primary-200"
          >
            {address.changeLabel}
          </button>
        </div>

        <label className="block rounded-lg bg-card p-3">
          <span className="mb-2 block text-xs font-bold text-heading">
            {address.notesLabel}
          </span>
          <span className="flex items-start gap-2 rounded-md bg-primary-100 p-2">
            <NotebookPen size={16} className="mt-0.5 shrink-0 text-muted" />
            <textarea
              rows={2}
              placeholder={address.notesPlaceholder}
              className="w-full resize-none bg-transparent text-sm text-body outline-none"
            />
          </span>
        </label>
      </div>
    </section>
  );
}
