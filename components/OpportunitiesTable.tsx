import Link from "next/link";
import type { Opportunity } from "@/lib/types";
import { OpportunityStatusBadge } from "./StatusBadge";

interface OpportunitiesTableProps {
  opportunities: Opportunity[];
  showApply?: boolean;
  compact?: boolean;
}

export function OpportunitiesTable({
  opportunities,
  showApply = true,
  compact = false,
}: OpportunitiesTableProps) {
  if (opportunities.length === 0) {
    return (
      <p className="py-8 text-center text-sm text-gray-500">No opportunities match your filters.</p>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <table className="docket-table min-w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
              Firm
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
              City
            </th>
            {!compact && (
              <>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Opened
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Closes
                </th>
              </>
            )}
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
              Status
            </th>
            {showApply && (
              <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">
                Action
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {opportunities.map((opp) => (
            <tr key={opp.id}>
              <td className="px-4 py-3.5">
                <Link
                  href={`/firms/${opp.slug}`}
                  className="font-medium text-[#1a1a2e] hover:underline"
                >
                  {opp.firm}
                </Link>
              </td>
              <td className="px-4 py-3.5 text-sm text-gray-600">{opp.city}</td>
              {!compact && (
                <>
                  <td className="px-4 py-3.5 text-sm text-gray-600">{opp.openedDate}</td>
                  <td className="px-4 py-3.5 text-sm text-gray-600">{opp.closesDate}</td>
                </>
              )}
              <td className="px-4 py-3.5">
                <OpportunityStatusBadge status={opp.status} />
              </td>
              {showApply && (
                <td className="px-4 py-3.5 text-right">
                  <Link
                    href={`/firms/${opp.slug}`}
                    className="inline-flex items-center rounded-lg bg-[#1a1a2e] px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-[#2d2d4a]"
                  >
                    Apply
                  </Link>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
