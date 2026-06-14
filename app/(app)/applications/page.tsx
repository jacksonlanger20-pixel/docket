'use client'

import { PageHeader } from "@/components/PageHeader";
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
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Firm</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">City</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Date applied</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Status</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Next step</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={5} className="px-4 py-12 text-center text-sm text-gray-500">
                No applications yet. Apply to an opportunity to get started.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
