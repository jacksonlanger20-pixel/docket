import type { ApplicationStatus, OpportunityStatus } from "@/lib/types";

const opportunityStyles: Record<OpportunityStatus, string> = {
  Open: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  "Closing soon": "bg-amber-50 text-amber-700 ring-amber-600/20",
  Closed: "bg-gray-100 text-gray-600 ring-gray-500/20",
};

const applicationStyles: Record<ApplicationStatus, string> = {
  Applied: "bg-blue-50 text-blue-700 ring-blue-600/20",
  Interview: "bg-violet-50 text-violet-700 ring-violet-600/20",
  Rejected: "bg-red-50 text-red-600 ring-red-500/20",
};

export function OpportunityStatusBadge({ status }: { status: OpportunityStatus }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${opportunityStyles[status]}`}
    >
      {status}
    </span>
  );
}

export function ApplicationStatusBadge({ status }: { status: ApplicationStatus }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${applicationStyles[status]}`}
    >
      {status}
    </span>
  );
}
