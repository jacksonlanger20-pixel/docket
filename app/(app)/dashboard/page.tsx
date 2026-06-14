'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { PageHeader } from '@/components/PageHeader'
import { StatCard } from '@/components/StatCard'
import { createClient } from '@/lib/supabase'

export default function DashboardPage() {
  const [opportunities, setOpportunities] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      const supabase = createClient()
      const { data } = await supabase
        .from('opportunities')
        .select('*')
        .order('created_at', { ascending: false })
      setOpportunities(data || [])
      setLoading(false)
    }
    fetchData()
  }, [])

  const openOpps = opportunities.filter(o => o.status === 'Open' || o.status === 'Closing Soon')
  const comingSoonOpps = opportunities.filter(o => o.status === 'Coming Soon')
  const openPreview = openOpps.slice(0, 5)
  const comingSoonPreview = comingSoonOpps.slice(0, 5)

  if (loading) return (
    <>
      <PageHeader title="Dashboard" description="Your recruiting command center for summer analyst applications." />
      <p className="text-sm text-gray-400">Loading...</p>
    </>
  )

  return (
    <>
      <PageHeader
        title="Dashboard"
        description="Your recruiting command center for summer analyst applications."
      />

      <div className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Open now" value={openOpps.length} href="/opportunities" />
        <StatCard label="Coming soon" value={comingSoonOpps.length} href="/coming-soon" />
        <StatCard label="Applied" value={0} href="/applications" />
        <StatCard label="Interviews" value={0} href="/applications" />
      </div>

      <section className="mb-10">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-[#1a1a2e]">Open opportunities</h2>
          <Link href="/opportunities" className="text-sm font-medium text-[#1a1a2e] hover:underline">
            View all →
          </Link>
        </div>
        {openPreview.length === 0 ? (
          <p className="text-sm text-gray-400">No open opportunities yet.</p>
        ) : (
          <table className="w-full border border-gray-100 rounded-xl overflow-hidden">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500">FIRM</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500">CITY</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500">STATUS</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {openPreview.map((opp) => (
                <tr key={opp.id} className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-[#1a1a2e]">{opp.firm}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{opp.city}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      opp.status === 'Closing Soon'
                        ? 'bg-orange-50 text-orange-600'
                        : 'bg-green-50 text-green-600'
                    }`}>
                      {opp.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <a href={opp.website_url} target="_blank" rel="noopener noreferrer"
                      className="bg-[#1a1a2e] text-white text-xs font-medium px-4 py-2 rounded-lg hover:opacity-90 transition">
                      Apply
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-[#1a1a2e]">Coming soon</h2>
          <Link href="/coming-soon" className="text-sm font-medium text-[#1a1a2e] hover:underline">
            View all →
          </Link>
        </div>
        {comingSoonPreview.length === 0 ? (
          <p className="text-sm text-gray-400">No upcoming opportunities yet.</p>
        ) : (
          <table className="w-full border border-gray-100 rounded-xl overflow-hidden">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500">FIRM</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500">CITY</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500">LAST YEAR'S OPEN DATE</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {comingSoonPreview.map((opp) => (
                <tr key={opp.id} className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-[#1a1a2e]">{opp.firm}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{opp.city}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{opp.open_date || '—'}</td>
                  <td className="px-6 py-4">
                    <a href={opp.website_url} target="_blank" rel="noopener noreferrer"
                      className="border border-gray-200 text-[#1a1a2e] text-xs font-medium px-4 py-2 rounded-lg hover:bg-gray-50 transition">
                      View
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </>
  )
}