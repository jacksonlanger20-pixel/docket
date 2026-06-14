'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'

const ADMIN_EMAIL = 'jacksonlanger20@gmail.com'

type Opportunity = {
  id: string
  firm: string
  city: string
  status: string
  open_date: string
  close_date: string
  website_url: string
  position_type: string
}

export default function AdminPage() {
  const router = useRouter()
  const supabase = createClient()

  const [authorized, setAuthorized] = useState(false)
  const [loading, setLoading] = useState(true)
  const [opportunities, setOpportunities] = useState<Opportunity[]>([])
  const [form, setForm] = useState({
    firm: '', city: '', status: 'Open', open_date: '', close_date: '', website_url: '', position_type: 'Summer Analyst'
  })
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [editingId, setEditingId] = useState<string | null>(null)

  useEffect(() => {
    checkAuth()
  }, [])

  async function checkAuth() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user || user.email !== ADMIN_EMAIL) {
      router.push('/')
      return
    }
    setAuthorized(true)
    fetchOpportunities()
    setLoading(false)
  }

  async function fetchOpportunities() {
    const { data } = await supabase.from('opportunities').select('*').order('created_at', { ascending: false })
    if (data) setOpportunities(data)
  }

  async function handleSave() {
    setSaving(true)
    setMessage('')
    if (editingId) {
      const { error } = await supabase.from('opportunities').update(form).eq('id', editingId)
      if (error) setMessage('Error: ' + error.message)
      else { setMessage('Updated successfully'); setEditingId(null) }
    } else {
      const { error } = await supabase.from('opportunities').insert([form])
      if (error) setMessage('Error: ' + error.message)
      else setMessage('Added successfully')
    }
    setForm({ firm: '', city: '', status: 'Open', open_date: '', close_date: '', website_url: '', position_type: 'Summer Analyst' })
    fetchOpportunities()
    setSaving(false)
  }

  async function handleDelete(id: string) {
    await supabase.from('opportunities').delete().eq('id', id)
    fetchOpportunities()
  }

  function handleEdit(opp: Opportunity) {
    setEditingId(opp.id)
    setForm({
      firm: opp.firm, city: opp.city, status: opp.status,
      open_date: opp.open_date, close_date: opp.close_date,
      website_url: opp.website_url, position_type: opp.position_type
    })
  }

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  if (!authorized) return null

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-[#1a1a2e] mb-8">Admin — Manage Opportunities</h1>

        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8 shadow-sm">
          <h2 className="text-lg font-semibold text-[#1a1a2e] mb-4">{editingId ? 'Edit Opportunity' : 'Add Opportunity'}</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Firm name</label>
              <input value={form.firm} onChange={e => setForm({...form, firm: e.target.value})}
                placeholder="e.g. Goldman Sachs"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#1a1a2e]" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">City</label>
              <input value={form.city} onChange={e => setForm({...form, city: e.target.value})}
                placeholder="e.g. New York"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#1a1a2e]" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Status</label>
              <select value={form.status} onChange={e => setForm({...form, status: e.target.value})}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#1a1a2e]">
                <option>Open</option>
                <option>Coming Soon</option>
                <option>Closing Soon</option>
                <option>Closed</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Position type</label>
              <input value={form.position_type} onChange={e => setForm({...form, position_type: e.target.value})}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#1a1a2e]" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Open date</label>
              <input value={form.open_date} onChange={e => setForm({...form, open_date: e.target.value})}
                placeholder="e.g. Jul 1, 2026"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#1a1a2e]" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Close date</label>
              <input value={form.close_date} onChange={e => setForm({...form, close_date: e.target.value})}
                placeholder="e.g. Aug 1, 2026"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#1a1a2e]" />
            </div>
            <div className="col-span-2">
              <label className="block text-xs font-medium text-gray-500 mb-1">Website URL</label>
              <input value={form.website_url} onChange={e => setForm({...form, website_url: e.target.value})}
                placeholder="https://..."
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#1a1a2e]" />
            </div>
          </div>
          {message && <p className="mt-3 text-sm text-emerald-600">{message}</p>}
          <div className="mt-4 flex gap-3">
            <button onClick={handleSave} disabled={saving}
              className="bg-[#1a1a2e] text-white px-6 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition disabled:opacity-60">
              {saving ? 'Saving...' : editingId ? 'Update' : 'Add'}
            </button>
            {editingId && (
              <button onClick={() => { setEditingId(null); setForm({ firm: '', city: '', status: 'Open', open_date: '', close_date: '', website_url: '', position_type: 'Summer Analyst' }) }}
                className="border border-gray-200 text-gray-600 px-6 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition">
                Cancel
              </button>
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-[#1a1a2e]">All Opportunities ({opportunities.length})</h2>
          </div>
          {opportunities.length === 0 ? (
            <p className="p-6 text-sm text-gray-400">No opportunities yet. Add one above.</p>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500">Firm</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500">City</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500">Status</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500">Open Date</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody>
                {opportunities.map(opp => (
                  <tr key={opp.id} className="border-b border-gray-50 hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-[#1a1a2e]">{opp.firm}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{opp.city}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{opp.status}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{opp.open_date}</td>
                    <td className="px-6 py-4 flex gap-2">
                      <button onClick={() => handleEdit(opp)}
                        className="text-xs text-[#1a1a2e] border border-gray-200 px-3 py-1 rounded-lg hover:bg-gray-50">Edit</button>
                      <button onClick={() => handleDelete(opp.id)}
                        className="text-xs text-red-500 border border-red-100 px-3 py-1 rounded-lg hover:bg-red-50">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  )
}
