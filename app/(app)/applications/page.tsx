'use client'

import { useEffect, useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import { createClient } from "@/lib/supabase";

export default function ApplicationsPage() {
  const { loading: authLoading, user } = useRequireAuth()
  const [applications, setApplications] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchApplications() {
      if (!user) return;
      const supabase = createClient();
      const { data } = await supabase
        .from('applications')
        .select('*')
        .eq('user_id', user.id)
        .order('date_applied', { ascending: false });
      setApplications(data || []);
      setLoading(false);
    }
    fetchApplications();
  }, [user])

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
            {loading ? (
              <tr>
                <td colSpan={5} className="px-4 py-12 text-center text-sm text-gray-400">
                  Loading...
                </td>
              </tr>
            ) : applications.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-12 text-center text-sm text-gray-500">
                  No applications yet. Mark an opportunity as applied to get started.
                </td>
              </tr>
            ) : (
              applications.map((app) => (
                <tr key={app.id} className="border-t border-gray-100 hover:bg-gray-50">
                  <td className="px-4 py-3.5 font-medium text-[#1a1a2e]">{app.firm}</td>
                  <td className="px-4 py-3.5 text-sm text-gray-600">{app.city}</td>
                  <td className="px-4 py-3.5 text-sm text-gray-600">
                    {new Date(app.date_applied).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </td>
                  <td className="px-4 py-3.5">
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-600">
                      {app.status}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-sm text-gray-600">{app.next_step}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
