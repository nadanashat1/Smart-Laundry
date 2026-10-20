import StatsCards from "../../../components/adminHome/StatsCards";
import FlowChart from "../../../components/adminHome/FlowChart";
import ActivityLog from "../../../components/adminHome/ActivityLog";
import DriversStatus from "../../../components/adminHome/DriversStatus";
import { AdminHomeData } from "../../../Data";

const { intro } = AdminHomeData;

export default function AdminHome() {
  return (
    <div className="flex flex-col gap-6 pb-8 sm:px-4">
      <section>
        <p className="mb-2 flex flex-wrap items-center gap-2 text-xs text-muted">
          <span className="flex items-center gap-1.5 rounded-full bg-primary-200 px-3 py-1 font-bold text-primary">
            <span className="size-2 animate-pulse rounded-full bg-primary" />
            {intro.liveLabel}
          </span>
          | {intro.branch}
        </p>
        <h1 className="mb-1 text-2xl font-bold text-heading">{intro.title}</h1>
        <p className="text-sm text-muted">{intro.description}</p>
      </section>

      <StatsCards />

      <div className="grid grid-cols-1 items-start gap-6 xl:grid-cols-[1.4fr_1fr]">
        <ActivityLog />

        <div className="flex flex-col gap-6">
          <FlowChart />
          <DriversStatus />
        </div>
      </div>
    </div>
  );
}
