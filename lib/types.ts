export type City =
  | "All"
  | "New York"
  | "Chicago"
  | "San Francisco"
  | "Charlotte"
  | "Miami";

export type OpportunityStatus = "Open" | "Closing soon" | "Closed";

export type ApplicationStatus = "Applied" | "Interview" | "Rejected";

export interface Opportunity {
  id: string;
  slug: string;
  firm: string;
  city: Exclude<City, "All">;
  position: string;
  openedDate: string;
  closesDate: string;
  status: OpportunityStatus;
  website: string;
  positionDetails: string;
}

export interface ComingSoonFirm {
  id: string;
  slug: string;
  firm: string;
  city: string;
  lastYearOpenDate: string;
}

export interface Application {
  id: string;
  slug: string;
  firm: string;
  city: Exclude<City, "All">;
  dateApplied: string;
  status: ApplicationStatus;
  nextStep: string;
}

export interface Contact {
  id: string;
  name: string;
  firm: string;
  firmSlug: string | null;
  role: string;
  email: string;
}

export type SeedContact = Omit<Contact, "firmSlug">;

export interface FirmContact {
  id: string;
  name: string;
  role: string;
  email: string;
}
