'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase'
import { PageHeader } from '@/components/PageHeader'

export default function ComingSoonPage() {
  const [firms, setFirms] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      const supabase = createClient()
      const { data } = await supabase
        .from('opportunities')
        .select('*')
        .eq('status', 'Coming Soon')
        .order('open_date', { ascending: true })
      setFirms(data || [])
      setLoading(false)
    }
    fetchData()
  }, [])

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
          Dates shown reflect approximate openings from last year's cycle. Set reminders and prepare your materials ahead of time.
        </p>
      </div>

      {loading ? (
        <p className="text-sm text-gray-400 py-8">Loading...</p>
      ) : firms.length === 0 ? (
        <p className="py-8 text-center text-sm text-gray-500">No upcoming opportunities yet.</p>
      ) : (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Firm</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">City</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Expected Open Date</th>
                <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">Action</th>
              </tr>
            </thead>
            <tbody>
              {firms.map((firm) => (
                <tr key={firm.id} className="border-t border-gray-100 hover:bg-gray-50">
                  <td className="px-4 py-3.5 font-medium text-[#1a1a2e]">{firm.firm}</td>
                  <td className="px-4 py-3.5 text-sm text-gray-600">{firm.city}</td>
                  <td className="px-4 py-3.5 text-sm text-gray-600">{firm.open_date || '—'}</td>
                  <td className="px-4 py-3.5 text-right">
                    <a href={firm.website_url} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-[#1a1a2e] transition-colors hover:bg-gray-50">
                      View
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  )
}
