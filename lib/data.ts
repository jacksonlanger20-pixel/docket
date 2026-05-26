import type {
  Application,
  ComingSoonFirm,
  FirmContact,
  SeedContact,
  Opportunity,
} from "./types";

export const CURRENT_USER = {
  name: "Alex Chen",
  initials: "AC",
  email: "alex.chen@university.edu",
};

export const DASHBOARD_STATS = {
  openNow: 14,
  comingSoon: 22,
  applied: 6,
  interviews: 2,
};

export const opportunities: Opportunity[] = [
  {
    id: "1",
    slug: "goldman-sachs",
    firm: "Goldman Sachs",
    city: "New York",
    position: "2026 Summer Analyst — Investment Banking",
    openedDate: "Jul 8, 2025",
    closesDate: "Aug 15, 2025",
    status: "Open",
    website: "https://www.goldmansachs.com/careers",
    positionDetails:
      "Join our Investment Banking Division as a Summer Analyst. You will work on live M&A, equity, and debt transactions across industry groups. Ideal candidates have strong analytical skills, leadership experience, and a passion for finance.",
  },
  {
    id: "2",
    slug: "morgan-stanley",
    firm: "Morgan Stanley",
    city: "New York",
    position: "2026 Summer Analyst — Investment Banking",
    openedDate: "Jul 10, 2025",
    closesDate: "Aug 18, 2025",
    status: "Open",
    website: "https://www.morganstanley.com/careers",
    positionDetails:
      "Morgan Stanley's Investment Banking Summer Analyst program offers hands-on experience in advisory, capital raising, and restructuring. Rotations across product and industry coverage teams.",
  },
  {
    id: "3",
    slug: "jpmorgan",
    firm: "J.P. Morgan",
    city: "New York",
    position: "2026 Summer Analyst — Global Investment Banking",
    openedDate: "Jul 12, 2025",
    closesDate: "Aug 20, 2025",
    status: "Closing soon",
    website: "https://careers.jpmorgan.com",
    positionDetails:
      "Work alongside bankers on high-profile transactions for Fortune 500 clients. Program includes training, mentorship, and potential full-time offer upon graduation.",
  },
  {
    id: "4",
    slug: "evercore",
    firm: "Evercore",
    city: "New York",
    position: "2026 Summer Analyst — Advisory",
    openedDate: "Jul 14, 2025",
    closesDate: "Aug 22, 2025",
    status: "Open",
    website: "https://www.evercore.com/careers",
    positionDetails:
      "Evercore's independent advisory platform provides unmatched exposure to complex M&A and restructuring mandates. Small class sizes ensure meaningful responsibility.",
  },
  {
    id: "5",
    slug: "lazard",
    firm: "Lazard",
    city: "New York",
    position: "2026 Summer Analyst — Financial Advisory",
    openedDate: "Jul 15, 2025",
    closesDate: "Aug 25, 2025",
    status: "Open",
    website: "https://www.lazard.com/careers",
    positionDetails:
      "Lazard's Summer Analyst program focuses on strategic advisory across M&A, capital structure, and shareholder advisory. Global footprint with collaborative culture.",
  },
  {
    id: "6",
    slug: "centerview",
    firm: "Centerview Partners",
    city: "New York",
    position: "2026 Summer Analyst",
    openedDate: "Jul 16, 2025",
    closesDate: "Aug 28, 2025",
    status: "Open",
    website: "https://www.centerviewpartners.com",
    positionDetails:
      "Centerview offers a premier advisory experience with senior banker mentorship from day one. Focus on quality over quantity in deal flow.",
  },
  {
    id: "7",
    slug: "bofa",
    firm: "Bank of America",
    city: "Charlotte",
    position: "2026 Summer Analyst — Global Banking & Markets",
    openedDate: "Jul 18, 2025",
    closesDate: "Sep 1, 2025",
    status: "Open",
    website: "https://careers.bankofamerica.com",
    positionDetails:
      "Charlotte-based IB summer program with exposure to coverage, M&A, and capital markets. Strong pipeline to full-time analyst roles.",
  },
  {
    id: "8",
    slug: "citi",
    firm: "Citi",
    city: "New York",
    position: "2026 Summer Analyst — Banking, Capital Markets & Advisory",
    openedDate: "Jul 20, 2025",
    closesDate: "Sep 5, 2025",
    status: "Open",
    website: "https://jobs.citi.com",
    positionDetails:
      "Citi's global platform offers diverse deal experience across sectors and geographies. Comprehensive training and networking opportunities.",
  },
  {
    id: "9",
    slug: "barclays",
    firm: "Barclays",
    city: "New York",
    position: "2026 Summer Analyst — Investment Banking",
    openedDate: "Jul 22, 2025",
    closesDate: "Sep 8, 2025",
    status: "Open",
    website: "https://home.barclays/careers",
    positionDetails:
      "Barclays Investment Bank summer program spans M&A, ECM, DCM, and industry coverage. Collaborative teams and global client base.",
  },
  {
    id: "10",
    slug: "ubs",
    firm: "UBS",
    city: "New York",
    position: "2026 Summer Analyst — Investment Banking",
    openedDate: "Jul 24, 2025",
    closesDate: "Sep 10, 2025",
    status: "Closing soon",
    website: "https://www.ubs.com/careers",
    positionDetails:
      "UBS offers a balanced advisory and capital markets experience. Strong emphasis on client service and cross-border transactions.",
  },
  {
    id: "11",
    slug: "jefferies",
    firm: "Jefferies",
    city: "New York",
    position: "2026 Summer Analyst — Investment Banking",
    openedDate: "Jul 26, 2025",
    closesDate: "Sep 12, 2025",
    status: "Open",
    website: "https://www.jefferies.com/careers",
    positionDetails:
      "Jefferies' entrepreneurial culture provides broad responsibility on live deals. Fast-paced environment with high conversion to full-time.",
  },
  {
    id: "12",
    slug: "moelis",
    firm: "Moelis & Company",
    city: "San Francisco",
    position: "2026 Summer Analyst — Advisory",
    openedDate: "Jul 28, 2025",
    closesDate: "Sep 15, 2025",
    status: "Open",
    website: "https://www.moelis.com/careers",
    positionDetails:
      "San Francisco office focuses on technology, healthcare, and consumer M&A. Boutique feel with global reach.",
  },
  {
    id: "13",
    slug: "pjt-partners",
    firm: "PJT Partners",
    city: "New York",
    position: "2026 Summer Analyst — Strategic Advisory",
    openedDate: "Jul 30, 2025",
    closesDate: "Sep 18, 2025",
    status: "Open",
    website: "https://www.pjtpartners.com/careers",
    positionDetails:
      "PJT Partners combines M&A advisory with restructuring expertise. Analysts gain exposure to complex, high-stakes situations.",
  },
  {
    id: "14",
    slug: "rothschild",
    firm: "Rothschild & Co",
    city: "Chicago",
    position: "2026 Summer Analyst — Global Advisory",
    openedDate: "Aug 1, 2025",
    closesDate: "Sep 20, 2025",
    status: "Open",
    website: "https://www.rothschildandco.com/en/careers",
    positionDetails:
      "Chicago advisory team works on middle-market and large-cap transactions across industrials, business services, and healthcare.",
  },
];

export const comingSoonFirms: ComingSoonFirm[] = [
  { id: "c1", slug: "blackstone", firm: "Blackstone", city: "New York", lastYearOpenDate: "~Jul 1, 2025" },
  { id: "c2", slug: "kkr", firm: "KKR", city: "New York", lastYearOpenDate: "~Jul 3, 2025" },
  { id: "c3", slug: "apollo", firm: "Apollo Global Management", city: "New York", lastYearOpenDate: "~Jul 5, 2025" },
  { id: "c4", slug: "carlyle", firm: "The Carlyle Group", city: "New York", lastYearOpenDate: "~Jul 7, 2025" },
  { id: "c5", slug: "bain-capital", firm: "Bain Capital", city: "Boston", lastYearOpenDate: "~Jul 8, 2025" },
  { id: "c6", slug: "tpg", firm: "TPG", city: "San Francisco", lastYearOpenDate: "~Jul 10, 2025" },
  { id: "c7", slug: "warburg-pincus", firm: "Warburg Pincus", city: "New York", lastYearOpenDate: "~Jul 12, 2025" },
  { id: "c8", slug: "silver-lake", firm: "Silver Lake", city: "Menlo Park", lastYearOpenDate: "~Jul 14, 2025" },
  { id: "c9", slug: "general-atlantic", firm: "General Atlantic", city: "New York", lastYearOpenDate: "~Jul 15, 2025" },
  { id: "c10", slug: "thoma-bravo", firm: "Thoma Bravo", city: "Chicago", lastYearOpenDate: "~Jul 16, 2025" },
  { id: "c11", slug: "vista-equity", firm: "Vista Equity Partners", city: "Austin", lastYearOpenDate: "~Jul 18, 2025" },
  { id: "c12", slug: "advent", firm: "Advent International", city: "Boston", lastYearOpenDate: "~Jul 20, 2025" },
  { id: "c13", slug: "permira", firm: "Permira", city: "New York", lastYearOpenDate: "~Jul 22, 2025" },
  { id: "c14", slug: "cvc", firm: "CVC Capital Partners", city: "New York", lastYearOpenDate: "~Jul 24, 2025" },
  { id: "c15", slug: "hellman-friedman", firm: "Hellman & Friedman", city: "San Francisco", lastYearOpenDate: "~Jul 26, 2025" },
  { id: "c16", slug: "eqt", firm: "EQT Partners", city: "New York", lastYearOpenDate: "~Jul 28, 2025" },
  { id: "c17", slug: "brookfield", firm: "Brookfield Asset Management", city: "New York", lastYearOpenDate: "~Jul 30, 2025" },
  { id: "c18", slug: "ares", firm: "Ares Management", city: "Los Angeles", lastYearOpenDate: "~Aug 1, 2025" },
  { id: "c19", slug: "oaktree", firm: "Oaktree Capital", city: "Los Angeles", lastYearOpenDate: "~Aug 3, 2025" },
  { id: "c20", slug: "cerberus", firm: "Cerberus Capital Management", city: "New York", lastYearOpenDate: "~Aug 5, 2025" },
  { id: "c21", slug: "leonard-green", firm: "Leonard Green & Partners", city: "Los Angeles", lastYearOpenDate: "~Aug 7, 2025" },
  { id: "c22", slug: "apax", firm: "Apax Partners", city: "New York", lastYearOpenDate: "~Aug 10, 2025" },
];

export const applications: Application[] = [
  {
    id: "a1",
    slug: "goldman-sachs",
    firm: "Goldman Sachs",
    city: "New York",
    dateApplied: "Jul 20, 2025",
    status: "Interview",
    nextStep: "Superday — Aug 12, 2025",
  },
  {
    id: "a2",
    slug: "morgan-stanley",
    firm: "Morgan Stanley",
    city: "New York",
    dateApplied: "Jul 22, 2025",
    status: "Applied",
    nextStep: "Awaiting first-round invite",
  },
  {
    id: "a3",
    slug: "evercore",
    firm: "Evercore",
    city: "New York",
    dateApplied: "Jul 25, 2025",
    status: "Interview",
    nextStep: "First round — Aug 8, 2025",
  },
  {
    id: "a4",
    slug: "lazard",
    firm: "Lazard",
    city: "New York",
    dateApplied: "Jul 28, 2025",
    status: "Applied",
    nextStep: "Complete HireVue by Aug 5",
  },
  {
    id: "a5",
    slug: "jpmorgan",
    firm: "J.P. Morgan",
    city: "New York",
    dateApplied: "Jul 18, 2025",
    status: "Rejected",
    nextStep: "—",
  },
  {
    id: "a6",
    slug: "centerview",
    firm: "Centerview Partners",
    city: "New York",
    dateApplied: "Aug 1, 2025",
    status: "Applied",
    nextStep: "Networking follow-up",
  },
];

export const networkingContacts: SeedContact[] = [
  { id: "n1", name: "Sarah Mitchell", firm: "Goldman Sachs", role: "VP, TMT Banking", email: "sarah.mitchell@gs.com" },
  { id: "n2", name: "James Park", firm: "Morgan Stanley", role: "Associate, Healthcare", email: "james.park@morganstanley.com" },
  { id: "n3", name: "Emily Rodriguez", firm: "Evercore", role: "Analyst, M&A", email: "emily.rodriguez@evercore.com" },
  { id: "n4", name: "Michael Thompson", firm: "Lazard", role: "MD, Restructuring", email: "michael.thompson@lazard.com" },
  { id: "n5", name: "Priya Sharma", firm: "Centerview Partners", role: "Associate, Consumer", email: "priya.sharma@centerview.com" },
  { id: "n6", name: "David Kim", firm: "J.P. Morgan", role: "VP, Industrials", email: "david.kim@jpmorgan.com" },
  { id: "n7", name: "Rachel Foster", firm: "Moelis & Company", role: "Analyst, Tech", email: "rachel.foster@moelis.com" },
  { id: "n8", name: "Chris Alvarez", firm: "PJT Partners", role: "Associate, Advisory", email: "chris.alvarez@pjtpartners.com" },
];

export const firmContactsBySlug: Record<string, FirmContact[]> = {
  "goldman-sachs": [
    { id: "fc1", name: "Sarah Mitchell", role: "VP, TMT Banking", email: "sarah.mitchell@gs.com" },
    { id: "fc2", name: "Kevin Walsh", role: "Campus Recruiter", email: "kevin.walsh@gs.com" },
  ],
  "morgan-stanley": [
    { id: "fc3", name: "James Park", role: "Associate, Healthcare", email: "james.park@morganstanley.com" },
  ],
  "evercore": [
    { id: "fc4", name: "Emily Rodriguez", role: "Analyst, M&A", email: "emily.rodriguez@evercore.com" },
    { id: "fc5", name: "Lisa Chen", role: "Campus Recruiting", email: "lisa.chen@evercore.com" },
  ],
};

export function getOpportunityBySlug(slug: string): Opportunity | undefined {
  return opportunities.find((o) => o.slug === slug);
}

export function getComingSoonBySlug(slug: string): ComingSoonFirm | undefined {
  return comingSoonFirms.find((f) => f.slug === slug);
}

export function getFirmContacts(slug: string): FirmContact[] {
  return firmContactsBySlug[slug] ?? [];
}
