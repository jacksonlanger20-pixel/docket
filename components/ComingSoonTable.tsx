import Link from "next/link";
import type { ComingSoonFirm } from "@/lib/types";

interface ComingSoonTableProps {
  firms: ComingSoonFirm[];
}

export function ComingSoonTable({ firms }: ComingSoonTableProps) {
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
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
              Last year&apos;s open date
            </th>
            <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {firms.map((firm) => (
            <tr key={firm.id}>
              <td className="px-4 py-3.5">
                <Link
                  href={`/firms/${firm.slug}`}
                  className="font-medium text-[#1a1a2e] hover:underline"
                >
                  {firm.firm}
                </Link>
              </td>
              <td className="px-4 py-3.5 text-sm text-gray-600">{firm.city}</td>
              <td className="px-4 py-3.5 text-sm text-gray-600">{firm.lastYearOpenDate}</td>
              <td className="px-4 py-3.5 text-right">
                <Link
                  href={`/firms/${firm.slug}`}
                  className="inline-flex items-center rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-[#1a1a2e] transition-colors hover:bg-gray-50"
                >
                  View
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
