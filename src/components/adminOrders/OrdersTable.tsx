import { Link } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Clock,
  EllipsisVertical,
  Eye,
  MapPin,
  Phone,
  QrCode,
  RefreshCw,
  TimerOff,
} from "lucide-react";
import { AdminOrdersData } from "../../Data";

const { table } = AdminOrdersData;

type Order = (typeof table.orders)[number];

const toneStyles: Record<string, Record<string, string>> = {
  danger: { text: "text-accent-700", bar: "bg-accent", chip: "bg-accent-200 text-accent-700" },
  primary: { text: "text-primary", bar: "bg-primary", chip: "bg-primary-200 text-primary" },
  success: { text: "text-green-700", bar: "bg-green-700", chip: "bg-green-100 text-green-700" },
  muted: { text: "text-muted", bar: "bg-gray-500", chip: "bg-gray-200 text-body" },
};

type OrdersTableProps = {
  orders: Order[];
};

export default function OrdersTable({ orders }: OrdersTableProps) {
  const { pagination } = table;

  return (
    <section className="overflow-hidden rounded-2xl bg-card shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-275 text-start text-sm">
          <thead className="bg-primary-100 text-heading">
            <tr>
              {table.columns.map((column) => (
                <th key={column} className="px-4 py-4 text-start font-bold">
                  {column}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {orders.length === 0 && (
              <tr>
                <td
                  colSpan={table.columns.length}
                  className="px-4 py-10 text-center text-muted"
                >
                  لا توجد طلبات مطابقة
                </td>
              </tr>
            )}

            {orders.map((order) => {
              const sla = toneStyles[order.sla.tone];
              const stage =
                toneStyles[order.stage.tone];

              return (
                <tr key={order.id} className="align-top">
                  <td className="px-4 py-5">
                    <div className="mb-1 flex flex-wrap items-center gap-2">
                      <span className="font-bold text-heading" dir="ltr">
                        #{order.id}
                      </span>
                      <span
                        className={`rounded-md px-2 py-0.5 text-xs font-bold ${
                          order.priority === "vip"
                            ? "bg-accent text-white"
                            : "bg-primary-200 text-primary"
                        }`}
                      >
                        {order.priorityLabel}
                      </span>
                    </div>
                    <p className="text-xs text-muted">{order.service}</p>
                  </td>

                  <td className="px-4 py-5">
                    <p className="font-bold text-heading">{order.customer}</p>
                    <p className="mb-1 text-xs text-muted" dir="ltr">
                      {order.phone}
                    </p>
                    <p className="flex items-start gap-1 text-xs text-muted">
                      <MapPin size={14} className="mt-0.5 shrink-0 text-primary" />
                      {order.address}
                    </p>
                  </td>

                  <td className="max-w-56 px-4 py-5">
                    <p className="font-bold text-heading">{order.itemsTitle}</p>
                    <p className="mb-2 text-xs leading-5 text-muted">
                      {order.itemsDetails}
                    </p>
                    {order.itemsTag && (
                      <span className="rounded-md bg-primary-200 px-2 py-0.5 text-xs font-bold text-primary">
                        {order.itemsTag}
                      </span>
                    )}
                  </td>

                  <td className="min-w-52 px-4 py-5">
                    <p
                      className={`mb-2 flex items-center gap-1 text-xs font-bold ${sla.text}`}
                    >
                      {order.sla.tone === "danger" ? (
                        <TimerOff size={14} />
                      ) : (
                        <Clock size={14} />
                      )}
                      {order.sla.label}
                    </p>
                    <div className="mb-2 h-1.5 overflow-hidden rounded-full bg-primary-200">
                      <div
                        className={`h-full rounded-full ${sla.bar}`}
                        style={{ width: `${order.sla.progress}%` }}
                      />
                    </div>
                    <p className="text-xs text-muted">{order.sla.schedule}</p>
                  </td>

                  <td className="px-4 py-5">
                    <p className="font-bold text-heading">{order.amount}</p>
                    <p className="flex items-center gap-1 text-xs text-green-700">
                      <span className="size-1.5 rounded-full bg-green-700" />
                      {order.payment}
                    </p>
                    <p className="text-xs text-muted">{order.invoice}</p>
                  </td>

                  <td className="px-4 py-5">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold whitespace-nowrap ${stage.chip}`}
                    >
                      <RefreshCw size={14} />
                      {order.stage.label}
                    </span>
                  </td>

                  <td className="px-4 py-5">
                    <div className="flex items-center gap-3">
                      <Link
                        to={`/admin/orders/${order.id}`}
                        aria-label="View order"
                        className="text-primary transition hover:text-primary-hover"
                      >
                        <Eye size={18} />
                      </Link>
                      <a
                        href={`tel:${order.phone}`}
                        aria-label="Call customer"
                        className="text-green-700 transition hover:text-green-800"
                      >
                        <Phone size={18} />
                      </a>
                      <button
                        type="button"
                        aria-label="Order QR code"
                        className="cursor-pointer text-muted transition hover:text-heading"
                      >
                        <QrCode size={18} />
                      </button>
                      <button
                        type="button"
                        aria-label="More actions"
                        className="cursor-pointer text-muted transition hover:text-heading"
                      >
                        <EllipsisVertical size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-gray-200 px-4 py-4 text-sm">
        <div className="flex flex-wrap items-center gap-4 text-muted">
          <span>{pagination.summary}</span>
          <span className="flex items-center gap-2">
            {pagination.rowsLabel}
            <span className="rounded-lg bg-primary-100 px-3 py-1 font-bold text-heading">
              {pagination.rowsValue}
            </span>
          </span>
        </div>

        <nav className="flex items-center gap-1" aria-label="Pagination">
          <button type="button" disabled className="p-2 text-gray-400">
            <ChevronsRight size={18} />
          </button>
          <button type="button" disabled className="p-2 text-gray-400">
            <ChevronRight size={18} />
          </button>
          {pagination.pages.map((page) => (
            <button
              key={page}
              type="button"
              className={`size-9 cursor-pointer rounded-lg font-bold transition ${
                page === 1
                  ? "bg-accent text-white"
                  : "text-heading hover:bg-primary-100"
              }`}
            >
              {page}
            </button>
          ))}
          <span className="px-1 text-muted">...</span>
          <button
            type="button"
            className="size-9 cursor-pointer rounded-lg font-bold text-heading transition hover:bg-primary-100"
          >
            {pagination.lastPage}
          </button>
          <button
            type="button"
            className="cursor-pointer p-2 text-heading transition hover:text-primary"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            className="cursor-pointer p-2 text-heading transition hover:text-primary"
          >
            <ChevronsLeft size={18} />
          </button>
        </nav>
      </div>
    </section>
  );
}
