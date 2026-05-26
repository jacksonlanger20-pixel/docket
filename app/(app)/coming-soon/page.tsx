import { PageHeader } from "@/components/PageHeader";
import { ComingSoonTable } from "@/components/ComingSoonTable";
import { comingSoonFirms } from "@/lib/data";

export default function ComingSoonPage() {
  return (
    <>
      <PageHeader
        title="Coming Soon"
        description="Firms that typically open later in the recruiting cycle. Check back regularly."
      />

      <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 px-5 py-4">
        <p className="text-sm font-medium text-amber-900">
          These positions are not open yet
        </p>
        <p className="mt-1 text-sm text-amber-800/80">
          Dates shown reflect approximate openings from last year&apos;s cycle. Set reminders
          and prepare your materials ahead of time.
        </p>
      </div>

      <ComingSoonTable firms={comingSoonFirms} />
    </>
  );
}
