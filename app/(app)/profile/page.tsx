'use client'

import { PageHeader } from "@/components/PageHeader";
import { CURRENT_USER } from "@/lib/data";
import { useRequireAuth } from "@/hooks/useRequireAuth";

export default function ProfilePage() {
  const { loading: authLoading } = useRequireAuth()

  if (authLoading) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1a1a2e]" />
    </div>
  )

  return (
    <>
      <PageHeader
        title="My Profile"
        description="Your recruiting profile — shared across all applications."
      />

      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-4 border-b border-gray-100 pb-6">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#1a1a2e] text-xl font-semibold text-white">
            {CURRENT_USER.initials}
          </div>
          <div>
            <h2 className="text-lg font-semibold text-[#1a1a2e]">{CURRENT_USER.name}</h2>
            <p className="text-sm text-gray-500">{CURRENT_USER.email}</p>
          </div>
        </div>

        <dl className="mt-6 grid gap-6 sm:grid-cols-2">
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wider text-gray-400">School</dt>
            <dd className="mt-1 text-sm text-[#1a1a2e]">University of Pennsylvania</dd>
          </div>
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wider text-gray-400">Major</dt>
            <dd className="mt-1 text-sm text-[#1a1a2e]">Finance & Real Estate (Wharton)</dd>
          </div>
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wider text-gray-400">Graduation</dt>
            <dd className="mt-1 text-sm text-[#1a1a2e]">May 2027</dd>
          </div>
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wider text-gray-400">GPA</dt>
            <dd className="mt-1 text-sm text-[#1a1a2e]">3.85 / 4.0</dd>
          </div>
        </dl>
      </div>
    </>
  );
}
