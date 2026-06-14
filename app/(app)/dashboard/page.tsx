import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { StatCard } from "@/components/StatCard";
import { OpportunitiesTable } from "@/components/OpportunitiesTable";
import { ComingSoonTable } from "@/components/ComingSoonTable";
import { DASHBOARD_STATS, opportunities, comingSoonFirms } from "@/lib/data";

export default function DashboardPage() {
  const openPreview = opportunities.slice(0, 5);
  const comingSoonPreview = comingSoonFirms.slice(0, 5);

  return (
    <>
      <PageHeader
        title="Dashboard"
        description="Your recruiting command center for summer analyst applications."
      />

      <div className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Open now" value={DASHBOARD_STATS.openNow} href="/opportunities" />
        <StatCard label="Coming soon" value={DASHBOARD_STATS.comingSoon} href="/coming-soon" />
        <StatCard label="Applied" value={DASHBOARD_STATS.applied} href="/applications" />
        <StatCard label="Interviews" value={DASHBOARD_STATS.interviews} href="/applications" />
      </div>

      <section className="mb-10">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-[#1a1a2e]">Open opportunities</h2>
          <Link href="/opportunities" className="text-sm font-medium text-[#1a1a2e] hover:underline">
            View all →
          </Link>
        </div>
        <OpportunitiesTable opportunities={openPreview} compact />
      </section>

      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-[#1a1a2e]">Coming soon</h2>
          <Link href="/coming-soon" className="text-sm font-medium text-[#1a1a2e] hover:underline">
            View all →
          </Link>
        </div>
        <ComingSoonTable firms={comingSoonPreview} />
      </section>
    </>
  );
}
