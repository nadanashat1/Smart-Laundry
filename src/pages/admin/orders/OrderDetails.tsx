import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import OrderSummary from "../../../components/adminOrderDetails/OrderSummary";
import CustomerCard from "../../../components/adminOrderDetails/CustomerCard";
import ItemsTable from "../../../components/adminOrderDetails/ItemsTable";
import InvoiceCard from "../../../components/adminOrderDetails/InvoiceCard";
import OrderTimeline from "../../../components/adminOrderDetails/OrderTimeline";
import DriverCard from "../../../components/adminOrderDetails/DriverCard";
import { AdminOrderDetailsData } from "../../../Data";

const { backLabel, backPath } = AdminOrderDetailsData;

export default function OrderDetailsPage() {
  return (
    <div className="flex flex-col gap-6 pb-8 sm:px-4">
      <Link
        to={backPath}
        className="flex w-fit items-center gap-1 text-sm font-bold text-primary transition hover:text-primary-hover"
      >
        <ArrowRight size={16} />
        {backLabel}
      </Link>

      <OrderSummary />

      <div className="grid grid-cols-1 items-start gap-6 xl:grid-cols-[1fr_380px]">
        <div className="flex min-w-0 flex-col gap-6">
          <CustomerCard />
          <ItemsTable />
          <InvoiceCard />
        </div>

        <aside className="flex flex-col gap-6">
          <OrderTimeline />
          <DriverCard />
        </aside>
      </div>
    </div>
  );
}
