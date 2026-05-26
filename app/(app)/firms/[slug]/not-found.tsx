import Link from "next/link";

export default function FirmNotFound() {
  return (
    <div className="py-16 text-center">
      <h1 className="text-xl font-semibold text-[#1a1a2e]">Firm not found</h1>
      <p className="mt-2 text-sm text-gray-500">This firm profile doesn&apos;t exist in Docket yet.</p>
      <Link href="/opportunities" className="mt-6 inline-block text-sm font-medium text-[#1a1a2e] hover:underline">
        Browse opportunities →
      </Link>
    </div>
  );
}
