'use client'

import { PageHeader } from "@/components/PageHeader";
import { useRequireAuth } from "@/hooks/useRequireAuth";

export default function ResumePage() {
  const { loading: authLoading } = useRequireAuth()

  if (authLoading) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1a1a2e]" />
    </div>
  )

  return (
    <>
      <PageHeader
        title="Resume"
        description="Upload and manage your resume for one-click applications."
      />

      <div className="rounded-xl border border-dashed border-gray-300 bg-white p-12 text-center shadow-sm">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gray-100">
          <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <p className="mt-4 text-sm font-medium text-[#1a1a2e]">Alex_Chen_Resume_2025.pdf</p>
        <p className="mt-1 text-xs text-gray-500">Last updated Jul 15, 2025 · PDF, 1 page</p>
        <button
          type="button"
          className="mt-6 rounded-lg bg-[#1a1a2e] px-4 py-2 text-sm font-medium text-white hover:bg-[#2d2d4a]"
        >
          Upload new resume
        </button>
      </div>
    </>
  );
}
