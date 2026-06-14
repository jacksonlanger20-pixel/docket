'use client'

import { useRouter } from 'next/navigation'

export default function LandingPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <nav className="flex items-center justify-between px-8 py-5 border-b border-gray-100">
        <span className="text-xl font-bold tracking-tight text-[#1a1a2e]">Docket</span>
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push('/login')}
            className="px-4 py-2 text-sm font-medium text-[#1a1a2e] hover:text-gray-600 transition-colors"
          >
            Log In
          </button>
          <button
            onClick={() => router.push('/signup')}
            className="px-4 py-2 text-sm font-medium text-white bg-[#1a1a2e] rounded-lg hover:bg-[#2d2d4e] transition-colors"
          >
            Sign Up
          </button>
        </div>
      </nav>

      <main className="flex-1 flex flex-col items-center justify-center px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-5xl font-bold text-[#1a1a2e] leading-tight mb-5 tracking-tight">
            Your recruiting command center.
          </h1>
          <p className="text-lg text-gray-500 mb-10 max-w-lg mx-auto leading-relaxed">
            Track every opportunity, manage every application, and stay ahead of deadlines — all in one place built for IB recruiting.
          </p>
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => router.push('/signup')}
              className="px-7 py-3 text-sm font-semibold text-white bg-[#1a1a2e] rounded-lg hover:bg-[#2d2d4e] transition-colors shadow-sm"
            >
              Get Started
            </button>
            <button
              onClick={() => router.push('/login')}
              className="px-7 py-3 text-sm font-semibold text-[#1a1a2e] bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Log In
            </button>
          </div>
        </div>
      </main>

      <footer className="px-8 py-5 border-t border-gray-100 text-center">
        <p className="text-xs text-gray-400">© 2025 Docket. All rights reserved.</p>
      </footer>
    </div>
  )
}
