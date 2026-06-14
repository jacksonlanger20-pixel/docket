"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { createBrowserClient } from "@supabase/ssr";

const mainNav = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/opportunities", label: "Opportunities", badge: 14 },
  { href: "/coming-soon", label: "Coming Soon", badge: 22, badgeSoft: true },
  { href: "/applications", label: "My Applications" },
  { href: "/networking", label: "Networking" },
];

const profileNav = [
  { href: "/profile", label: "My Profile" },
  { href: "/resume", label: "Resume" },
  { href: "/settings", label: "Settings" },
];

function NavLink({
  href, label, badge, badgeSoft,
}: {
  href: string; label: string; badge?: number; badgeSoft?: boolean;
}) {
  const pathname = usePathname();
  const isActive = pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Link
      href={href}
      className={`flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
        isActive ? "bg-[#1a1a2e] text-white" : "text-gray-600 hover:bg-gray-100 hover:text-[#1a1a2e]"
      }`}
    >
      <span>{label}</span>
      {badge !== undefined && (
        <span className={`ml-2 rounded-full px-2 py-0.5 text-xs font-semibold ${
          isActive ? "bg-white/20 text-white" : badgeSoft ? "bg-gray-200 text-gray-600" : "bg-[#1a1a2e] text-white"
        }`}>
          {badge}
        </span>
      )}
    </Link>
  );
}

export function Sidebar() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [initials, setInitials] = useState("");

  useEffect(() => {
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!
    );
    supabase.auth.getUser().then(({ data }) => {
      const user = data?.user;
      if (!user) return;

      const rawEmail = user.email ?? "";
      setEmail(rawEmail);

      const fullName = (
        user.user_metadata?.full_name ||
        user.user_metadata?.name ||
        ""
      ).trim();

      if (fullName) {
        setName(fullName);
        const parts = fullName.split(" ").filter(Boolean);
        const init = ((parts[0]?.[0] ?? "") + (parts[1]?.[0] ?? "")).toUpperCase();
        setInitials(init || fullName[0].toUpperCase());
      } else {
        const derived = rawEmail.split("@")[0].replace(/[._]/g, " ").trim();
        setName(derived);
        const parts = derived.split(" ").filter(Boolean);
        setInitials(((parts[0]?.[0] ?? "") + (parts[1]?.[0] ?? "")).toUpperCase());
      }
    });
  }, []);

  return (
    <aside className="flex h-screen w-64 shrink-0 flex-col border-r border-gray-200 bg-white">
      <div className="border-b border-gray-200 px-5 py-5">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#1a1a2e] text-sm font-bold text-white">
            D
          </div>
          <span className="text-lg font-semibold tracking-tight text-[#1a1a2e]">Docket</span>
        </Link>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <ul className="space-y-1">
          {mainNav.map((item) => (
            <li key={item.href}><NavLink {...item} /></li>
          ))}
        </ul>

        <div className="mt-8">
          <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
            Profile
          </p>
          <ul className="space-y-1">
            {profileNav.map((item) => (
              <li key={item.href}><NavLink href={item.href} label={item.label} /></li>
            ))}
          </ul>
        </div>
      </nav>

      <div className="border-t border-gray-200 p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#1a1a2e] text-sm font-semibold text-white">
            {initials || "?"}
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-[#1a1a2e]">{name || "Loading..."}</p>
            <p className="truncate text-xs text-gray-500">{email || ""}</p>
          </div>
        </div>
      </div>
    </aside>
  );
}