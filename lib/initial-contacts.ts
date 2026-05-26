import { firmContactsBySlug, networkingContacts } from "./data";
import { getFirmNameBySlug, resolveFirmSlug } from "./firms";
import type { Contact } from "./types";

export function buildInitialContacts(): Contact[] {
  const byId = new Map<string, Contact>();

  for (const contact of networkingContacts) {
    byId.set(contact.id, {
      ...contact,
      firmSlug: resolveFirmSlug(contact.firm),
    });
  }

  for (const [slug, firmContacts] of Object.entries(firmContactsBySlug)) {
    const firmName = getFirmNameBySlug(slug) ?? slug;
    for (const fc of firmContacts) {
      if (byId.has(fc.id)) continue;
      byId.set(fc.id, {
        id: fc.id,
        name: fc.name,
        firm: firmName,
        role: fc.role,
        email: fc.email,
        firmSlug: slug,
      });
    }
  }

  return Array.from(byId.values());
}
