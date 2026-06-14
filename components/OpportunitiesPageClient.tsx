"use client";

import { useEffect, useMemo, useState } from "react";
import { createClient } from "@/lib/supabase";
import { CityFilter } from "./CityFilter";
import { PageHeader } from "./PageHeader";
import { useRequireAuth } from "@/hooks/useRequireAuth";

const CITIES = ["All", "New York", "Chicago", "San Francisco", "Charlotte", "Miami", "Boston", "Los Angeles", "Houston", "Atlanta"];

export function OpportunitiesPageClient() {
  const { loading: authLoading } = useRequireAuth();
  const [opportunities, setOpportunities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [city, setCity] = useState("All");

  useEffect(() => {
    async function fetchData() {
      const supabase = createClient();
      const { data } = await supabase
        .from('opportunities')
        .select('*')
        .in('status', ['Open', 'Closing Soon'])
        .order('created_at', { ascending: false });
      setOpportunities(data || []);
      setLoading(false);
    }
    fetchData();
  }, []);

  const filtered = useMemo(() => {
    if (city === "All") return opportunities;
    return opportunities.filter((o) => o.city === city);
  }, [city, opportunities]);

  if (authLoading) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1a1a2e]" />
    </div>
  );

  return (
    <>
      <PageHeader
        title="Opportunities"
        description="Investment banking summer analyst positions currently accepting applications."
      />
      <CityFilter selected={city as any} onChange={(c) => setCity(c)} />

      {loading ? (
        <p className="text-sm text-gray-400 py-8">Loading...</p>
      ) : filtered.length === 0 ? (
        <p className="py-8 text-center text-sm text-gray-500">No opportunities match your filters.</p>
      ) : (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Firm</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">City</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Opens</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Closes</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Status</th>
                <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((opp) => (
                <tr key={opp.id} className="border-t border-gray-100 hover:bg-gray-50">
                  <td className="px-4 py-3.5 font-medium text-[#1a1a2e]">{opp.firm}</td>
                  <td className="px-4 py-3.5 text-sm text-gray-600">{opp.city}</td>
                  <td className="px-4 py-3.5 text-sm text-gray-600">{opp.open_date || '—'}</td>
                  <td className="px-4 py-3.5 text-sm text-gray-600">{opp.close_date || '—'}</td>
                  <td className="px-4 py-3.5">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      opp.status === 'Closing Soon' ? 'bg-orange-50 text-orange-600' : 'bg-green-50 text-green-600'
                    }`}>
                      {opp.status}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-right">
                    <a href={opp.website_url} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center rounded-lg bg-[#1a1a2e] px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-[#2d2d4a]">
                      Apply
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
