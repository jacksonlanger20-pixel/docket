"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createClient } from "@/lib/supabase";

export default function SignupPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [school, setSchool] = useState("");
  const [gradYear, setGradYear] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);

    const supabase = createClient();
    const { error: signUpError } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: {
        data: {
          full_name: fullName.trim(),
          school: school.trim(),
          grad_year: gradYear.trim(),
        },
      },
    });

    setLoading(false);

    if (signUpError) {
      setError(signUpError.message);
      return;
    }

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    if (signInError) {
      setError(signInError.message);
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#1a1a2e] text-lg font-bold text-white">
              D
            </div>
            <span className="text-2xl font-semibold tracking-tight text-[#1a1a2e]">
              Docket
            </span>
          </Link>
          <p className="mt-2 text-sm text-gray-500">
            Create your recruiting portal account
          </p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
          <h1 className="text-lg font-semibold text-[#1a1a2e]">Sign up</h1>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label htmlFor="full-name" className="mb-1 block text-xs font-medium text-gray-500">
                Full name
              </label>
              <input
                id="full-name"
                type="text"
                autoComplete="name"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-[#1a1a2e] focus:outline-none focus:ring-1 focus:ring-[#1a1a2e]"
              />
            </div>

            <div>
              <label htmlFor="school" className="mb-1 block text-xs font-medium text-gray-500">
                School / University
              </label>
              <input
                id="school"
                type="text"
                autoComplete="organization"
                required
                value={school}
                onChange={(e) => setSchool(e.target.value)}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-[#1a1a2e] focus:outline-none focus:ring-1 focus:ring-[#1a1a2e]"
              />
            </div>

            <div>
              <label htmlFor="grad-year" className="mb-1 block text-xs font-medium text-gray-500">
                Graduation year
              </label>
              <select
                id="grad-year"
                required
                value={gradYear}
                onChange={(e) => setGradYear(e.target.value)}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-[#1a1a2e] focus:outline-none focus:ring-1 focus:ring-[#1a1a2e]"
              >
                <option value="">Select year</option>
                <option value="2026">2026</option>
                <option value="2027">2027</option>
                <option value="2028">2028</option>
                <option value="2029">2029</option>
              </select>
            </div>

            <div>
              <label htmlFor="email" className="mb-1 block text-xs font-medium text-gray-500">
                Email
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-[#1a1a2e] focus:outline-none focus:ring-1 focus:ring-[#1a1a2e]"
              />
            </div>

            <div>
              <label htmlFor="password" className="mb-1 block text-xs font-medium text-gray-500">
                Password
              </label>
              <input
                id="password"
                type="password"
                autoComplete="new-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-[#1a1a2e] focus:outline-none focus:ring-1 focus:ring-[#1a1a2e]"
              />
            </div>

            <div>
              <label htmlFor="confirm-password" className="mb-1 block text-xs font-medium text-gray-500">
                Confirm password
              </label>
              <input
                id="confirm-password"
                type="password"
                autoComplete="new-password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-[#1a1a2e] focus:outline-none focus:ring-1 focus:ring-[#1a1a2e]"
              />
            </div>

            {error && (
              <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>
            )}

            {success && (
              <p className="rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-700">{success}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-[#1a1a2e] py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#2d2d4a] disabled:opacity-60"
            >
              {loading ? "Creating account…" : "Create account"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link href="/login" className="font-medium text-[#1a1a2e] hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}