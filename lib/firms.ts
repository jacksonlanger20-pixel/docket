import { comingSoonFirms, opportunities } from "./data";

let firmNameToSlug: Map<string, string> | null = null;

function getFirmNameToSlugMap(): Map<string, string> {
  if (!firmNameToSlug) {
    firmNameToSlug = new Map();
    for (const opp of opportunities) {
      firmNameToSlug.set(opp.firm, opp.slug);
    }
    for (const firm of comingSoonFirms) {
      firmNameToSlug.set(firm.firm, firm.slug);
    }
  }
  return firmNameToSlug;
}

export function getFirmNameBySlug(slug: string): string | undefined {
  const opp = opportunities.find((o) => o.slug === slug);
  if (opp) return opp.firm;
  const soon = comingSoonFirms.find((f) => f.slug === slug);
  return soon?.firm;
}

export function resolveFirmSlug(firmInput: string): string | null {
  const normalized = firmInput.trim().toLowerCase();
  if (!normalized) return null;

  const map = getFirmNameToSlugMap();

  for (const [name, slug] of map.entries()) {
    if (name.toLowerCase() === normalized) return slug;
  }

  const matches = [...map.entries()].filter(
    ([name]) =>
      name.toLowerCase().includes(normalized) || normalized.includes(name.toLowerCase()),
  );

  if (matches.length === 1) return matches[0][1];
  return null;
}

export function getKnownFirmNames(): string[] {
  return [...getFirmNameToSlugMap().keys()].sort((a, b) => a.localeCompare(b));
}
