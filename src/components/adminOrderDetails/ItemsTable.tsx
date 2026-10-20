import { CircleCheck, Shirt, TriangleAlert } from "lucide-react";
import { AdminOrderDetailsData } from "../../Data";

const { items } = AdminOrderDetailsData;

export default function ItemsTable() {
  return (
    <section className="rounded-2xl bg-card p-5 shadow-sm">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-2">
        <h2 className="flex items-center gap-2 text-lg font-bold text-heading">
          <Shirt size={22} className="text-primary" />
          {items.title}
        </h2>
        <span className="rounded-full bg-primary-200 px-3 py-1 text-xs font-bold text-primary">
          {items.badge}
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-170 text-sm">
          <thead className="bg-primary-100 text-heading">
            <tr>
              {items.columns.map((column) => (
                <th key={column} className="px-3 py-3 text-start font-bold">
                  {column}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {items.list.map((item) => {
              const hasIssue = item.inspection.status === "issue";

              return (
                <tr key={item.barcode}>
                  <td className="px-3 py-4">
                    <div className="flex items-center gap-3">
                      <span className="flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-primary-100 text-primary/50">
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.name}
                            className="size-full object-cover"
                          />
                        ) : (
                          <Shirt size={24} />
                        )}
                      </span>
                      <div>
                        <p className="font-bold text-heading">{item.name}</p>
                        <p className="text-xs text-muted">
                          {item.barcode} • {item.details}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-3 py-4">
                    <p className="flex items-center gap-1.5 text-xs font-bold text-primary">
                      <span className="size-1.5 shrink-0 rounded-full bg-primary" />
                      {item.service}
                    </p>
                    <p className="text-xs text-muted">{item.serviceNote}</p>
                  </td>

                  <td className="px-3 py-4">
                    <div
                      className={`flex max-w-56 items-start gap-2 rounded-lg p-3 text-xs ${
                        hasIssue
                          ? "bg-accent-100 text-accent-700"
                          : "bg-green-50 text-green-700"
                      }`}
                    >
                      {hasIssue ? (
                        <TriangleAlert size={18} className="shrink-0" />
                      ) : (
                        <CircleCheck size={18} className="shrink-0" />
                      )}
                      <div>
                        <p className="font-bold">{item.inspection.title}</p>
                        <p className="text-muted">{item.inspection.note}</p>
                      </div>
                    </div>
                  </td>

                  <td className="px-3 py-4 font-bold whitespace-nowrap text-heading">
                    {item.price}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
