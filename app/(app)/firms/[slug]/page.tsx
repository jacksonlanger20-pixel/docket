import Link from "next/link";
import { notFound } from "next/navigation";
import { FirmContactsSection } from "@/components/FirmContactsSection";
import { OpportunityStatusBadge } from "@/components/StatusBadge";
import { getComingSoonBySlug, getOpportunityBySlug } from "@/lib/data";

interface FirmPageProps {
  params: Promise<{ slug: string }>;
}

export default async function FirmPage({ params }: FirmPageProps) {
  const { slug } = await params;
  const opportunity = getOpportunityBySlug(slug);
  const comingSoon = getComingSoonBySlug(slug);

  if (!opportunity && !comingSoon) {
    notFound();
  }

  const firmName = opportunity?.firm ?? comingSoon!.firm;
  const city = opportunity?.city ?? comingSoon!.city;
  const position =
    opportunity?.position ?? "2026 Summer Analyst — Position details coming soon";
  const website = opportunity?.website ?? "#";
  const details =
    opportunity?.positionDetails ??
    `This firm typically opens around ${comingSoon!.lastYearOpenDate} based on last year's recruiting cycle. Prepare your resume, cover letter, and networking outreach ahead of the opening.`;
  return (
    <>
      <Link
        href={opportunity ? "/opportunities" : "/coming-soon"}
        className="mb-6 inline-flex text-sm font-medium text-gray-500 hover:text-[#1a1a2e]"
      >
        ← Back
      </Link>

      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-[#1a1a2e]">{firmName}</h1>
            <p className="mt-1 text-sm text-gray-500">{city}</p>
          </div>
          {opportunity && <OpportunityStatusBadge status={opportunity.status} />}
          {comingSoon && !opportunity && (
            <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600 ring-1 ring-gray-500/20 ring-inset">
              Coming soon
            </span>
          )}
        </div>

        <p className="mt-4 text-base font-medium text-[#1a1a2e]">{position}</p>

        <a
          href={website}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-block text-sm font-medium text-[#1a1a2e] underline hover:no-underline"
        >
          Visit careers page →
        </a>

        <div className="mt-6 border-t border-gray-100 pt-6">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-400">
            Position details
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-gray-600">{details}</p>
        </div>

        {opportunity && (
          <div className="mt-6 flex flex-wrap gap-6 text-sm text-gray-600">
            <div>
              <span className="font-medium text-gray-400">Opened</span>
              <p className="mt-0.5">{opportunity.openedDate}</p>
            </div>
            <div>
              <span className="font-medium text-gray-400">Closes</span>
              <p className="mt-0.5">{opportunity.closesDate}</p>
            </div>
          </div>
        )}

        {opportunity && (
          <button
            type="button"
            className="mt-6 rounded-lg bg-[#1a1a2e] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#2d2d4a]"
          >
            Apply now
          </button>
        )}
      </div>

      <FirmContactsSection firmSlug={slug} firmName={firmName} />
    </>
  );
}
