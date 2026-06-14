'use client'

import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { ApplicationStatusBadge } from "@/components/StatusBadge";
import { applications } from "@/lib/data";
import { useRequireAuth } from "@/hooks/useRequireAuth";

export default function ApplicationsPage() {
  const { loading: authLoading } = useRequireAuth()

  if (authLoading) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1a1a2e]" />
    </div>
  )

  return (
    <>
      <PageHeader
        title="My Applications"
        description="Track every application, interview, and next step in one place."
      />

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
                Date applied
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                Status
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                Next step
              </th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr key={app.id}>
                <td className="px-4 py-3.5">
                  <Link
                    href={`/firms/${app.slug}`}
                    className="font-medium text-[#1a1a2e] hover:underline"
                  >
                    {app.firm}
                  </Link>
                </td>
                <td className="px-4 py-3.5 text-sm text-gray-600">{app.city}</td>
                <td className="px-4 py-3.5 text-sm text-gray-600">{app.dateApplied}</td>
                <td className="px-4 py-3.5">
                  <ApplicationStatusBadge status={app.status} />
                </td>
                <td className="px-4 py-3.5 text-sm text-gray-600">{app.nextStep}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
