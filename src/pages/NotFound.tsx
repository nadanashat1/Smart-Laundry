import { Link } from "react-router-dom";
import { House, Shirt } from "lucide-react";
import { NotFoundData } from "../Data";

const { code, title, description, primaryAction, secondaryAction } =
  NotFoundData;

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center bg-background py-16">
      <div className="container flex flex-col items-center text-center">
        <span className="mb-6 flex size-20 items-center justify-center rounded-full bg-[#E6EEFF] text-primary">
          <Shirt size={36} />
        </span>

        <h1 className="mb-2 text-7xl font-black text-primary sm:text-8xl">
          {code}
        </h1>
        <h2 className="mb-4 text-2xl font-bold text-heading">{title}</h2>
        <p className="mb-8 max-w-md leading-7 text-muted">{description}</p>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            to={primaryAction.path}
            className="flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-bold text-white transition hover:bg-primary-hover"
          >
            <House size={18} />
            {primaryAction.label}
          </Link>
          <Link
            to={secondaryAction.path}
            className="flex items-center justify-center rounded-lg bg-[#E6EEFF] px-6 py-3 text-sm font-bold text-primary transition hover:bg-primary/15"
          >
            {secondaryAction.label}
          </Link>
        </div>
      </div>
    </section>
  );
}
