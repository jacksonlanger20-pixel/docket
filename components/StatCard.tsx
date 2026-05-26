import Link from "next/link";

interface StatCardProps {
  label: string;
  value: number;
  href?: string;
}

export function StatCard({ label, value, href }: StatCardProps) {
  const content = (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
      <p className="text-sm font-medium text-gray-500">{label}</p>
      <p className="mt-2 text-3xl font-semibold tracking-tight text-[#1a1a2e]">{value}</p>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block">
        {content}
      </Link>
    );
  }

  return content;
}
