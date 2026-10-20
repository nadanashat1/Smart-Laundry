import { Link } from "react-router-dom";
import { ArrowLeft, Shirt, Star } from "lucide-react";
import { CustomerServicesData } from "../../Data";

const { currency, startingFromLabel, ratingLabel, actionLabel } =
  CustomerServicesData;

type Service = (typeof CustomerServicesData.services)[number];

export default function ServiceCard({ service }: { service: Service }) {
  return (
    <article className="flex flex-col rounded-2xl bg-card p-3 shadow-sm transition hover:shadow-md">
      <div className="relative mb-4 h-48 overflow-hidden rounded-xl bg-primary-100">
        {service.image ? (
          <img
            src={service.image}
            alt={service.title}
            className="size-full object-cover"
          />
        ) : (
          <div className="flex size-full items-center justify-center text-primary/30">
            <Shirt size={64} />
          </div>
        )}
        <span className="absolute bottom-3 inset-s-3 flex items-center gap-1 rounded-full bg-heading/70 px-2.5 py-1 text-xs text-white">
          {service.rating}
          <Star size={12} className="fill-current" />
          <span dir="ltr">({service.reviews})</span>
          {ratingLabel}
        </span>
      </div>

      <div className="flex flex-1 flex-col px-2 pb-2">
        <div className="mb-2 flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-bold text-primary">{service.tag}</p>
            <h2 className="text-lg font-bold text-heading">{service.title}</h2>
          </div>
          <div className="shrink-0 rounded-lg bg-primary-100 px-3 py-1 text-center">
            <p className="text-[10px] text-muted">{startingFromLabel}</p>
            <p className="font-bold text-primary">
              {service.price}
              <span className="text-xs"> {currency}</span>
            </p>
          </div>
        </div>

        <p className="mb-5 text-sm leading-6 text-muted">
          {service.description}
        </p>

        <Link
          to={`/services/${service.id}`}
          className="mt-auto flex items-center justify-center gap-2 rounded-lg bg-accent-100 py-2.5 text-sm font-bold text-accent transition hover:bg-accent-200"
        >
          {actionLabel}
          <ArrowLeft size={16} />
        </Link>
      </div>
    </article>
  );
}
