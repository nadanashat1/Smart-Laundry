import { Link } from "react-router-dom";
import { Footprints, Plus, Shirt } from "lucide-react";
import { HomeData } from "../../Data";

const { services } = HomeData;

export default function ServicesSection() {
  return (
    <section className="rounded-2xl bg-card p-5 shadow-sm">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="border-s-4 border-primary ps-3 text-2xl font-bold text-heading">
          {services.title}
        </h2>
        <Link
          to={services.viewAllPath}
          className="text-sm font-bold text-primary transition hover:text-primary-hover"
        >
          {services.viewAllLabel} ({services.items.length})
        </Link>
      </div>

      <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {services.items.map((service) => (
          <Link
            key={service.id}
            to={`/services/${service.id}`}
            className="group overflow-hidden rounded-xl border border-gray-100 transition hover:shadow-md"
          >
            <div className="relative h-36 bg-primary-100">
              {service.image ? (
                <img
                  src={service.image}
                  alt={service.title}
                  className="size-full object-cover"
                />
              ) : (
                <div className="flex size-full items-center justify-center text-primary/40">
                  <Shirt size={48} />
                </div>
              )}
              {service.badge && (
                <span className="absolute top-3 inset-e-3 rounded-full bg-accent px-3 py-1 text-xs font-bold text-white">
                  {service.badge}
                </span>
              )}
            </div>

            <div className="p-4">
              <h3 className="mb-1 text-lg font-bold text-heading">
                {service.title}
              </h3>
              <p className="mb-4 text-sm text-muted">{service.description}</p>

              <div className="flex items-center justify-between">
                <p className="text-sm text-muted">
                  <span className="text-lg font-bold text-primary">
                    {service.price} {services.currency}
                  </span>{" "}
                  / {service.unit}
                </p>
                <span className="flex size-8 items-center justify-center rounded-full bg-primary-200 text-primary transition group-hover:bg-primary group-hover:text-white">
                  <Plus size={16} />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <Link
        to={`/services/${services.featured.id}`}
        className="flex items-center justify-between gap-4 rounded-xl border border-gray-100 p-4 transition hover:shadow-md"
      >
        <div className="flex items-center gap-4">
          <div className="flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-primary-100 text-primary/40">
            {services.featured.image ? (
              <img
                src={services.featured.image}
                alt={services.featured.title}
                className="size-full object-cover"
              />
            ) : (
              <Footprints size={28} />
            )}
          </div>
          <div>
            <h3 className="mb-1 flex items-center gap-2 font-bold text-heading">
              {services.featured.title}
              <span className="rounded-full bg-primary-200 px-2 py-0.5 text-[11px] text-primary">
                {services.featured.badge}
              </span>
            </h3>
            <p className="mb-1 text-xs text-muted">
              {services.featured.description}
            </p>
            <p className="text-sm font-bold text-primary">
              {services.featured.startingFrom}
            </p>
          </div>
        </div>
        <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary-200 text-primary">
          <Plus size={16} />
        </span>
      </Link>
    </section>
  );
}
