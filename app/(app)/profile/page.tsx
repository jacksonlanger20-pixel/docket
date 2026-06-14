'use client'

import { useEffect, useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import { supabase } from "@/lib/supabase";

export default function ProfilePage() {
  const { loading: authLoading, user } = useRequireAuth()
  const [profile, setProfile] = useState<any>(null)

  useEffect(() => {
    if (user) {
      setProfile(user)
    }
  }, [user])

  if (authLoading) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1a1a2e]" />
    </div>
  )

  const email = profile?.email || ''
  const fullName = profile?.user_metadata?.full_name || email
  const school = profile?.user_metadata?.school || '—'
  const gradYear = profile?.user_metadata?.grad_year || '—'
  const initials = fullName
    .split(' ')
    .map((n: string) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  return (
    <>
      <PageHeader
        title="My Profile"
        description="Your recruiting profile — shared across all applications."
      />

      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-4 border-b border-gray-100 pb-6">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#1a1a2e] text-xl font-semibold text-white">
            {initials}
          </div>
          <div>
            <h2 className="text-lg font-semibold text-[#1a1a2e]">{fullName}</h2>
            <p className="text-sm text-gray-500">{email}</p>
          </div>
        </div>

        <dl className="mt-6 grid gap-6 sm:grid-cols-2">
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wider text-gray-400">School</dt>
            <dd className="mt-1 text-sm text-[#1a1a2e]">{school}</dd>
          </div>
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wider text-gray-400">Graduation Year</dt>
            <dd className="mt-1 text-sm text-[#1a1a2e]">{gradYear}</dd>
          </div>
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wider text-gray-400">Email</dt>
            <dd className="mt-1 text-sm text-[#1a1a2e]">{email}</dd>
          </div>
        </dl>
      </div>
    </>
  );
}
