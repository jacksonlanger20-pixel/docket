"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { buildInitialContacts } from "@/lib/initial-contacts";
import { resolveFirmSlug } from "@/lib/firms";
import type { Contact } from "@/lib/types";

const STORAGE_KEY = "docket-contacts";

interface ContactsContextValue {
  contacts: Contact[];
  addContact: (input: {
    name: string;
    firm: string;
    role: string;
    email: string;
    firmSlug?: string | null;
  }) => Contact;
  getContactsByFirmSlug: (slug: string) => Contact[];
}

const ContactsContext = createContext<ContactsContextValue | null>(null);

function loadContacts(): Contact[] {
  if (typeof window === "undefined") return buildInitialContacts();
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored) as Contact[];
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {
    // ignore corrupt storage
  }
  return buildInitialContacts();
}

export function ContactsProvider({ children }: { children: React.ReactNode }) {
  const [contacts, setContacts] = useState<Contact[]>(buildInitialContacts);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setContacts(loadContacts());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts, hydrated]);

  const addContact = useCallback(
    (input: {
      name: string;
      firm: string;
      role: string;
      email: string;
      firmSlug?: string | null;
    }) => {
      const firm = input.firm.trim();
      const firmSlug =
        input.firmSlug !== undefined ? input.firmSlug : resolveFirmSlug(firm);

      const contact: Contact = {
        id: `contact-${Date.now()}`,
        name: input.name.trim(),
        firm,
        firmSlug,
        role: input.role.trim() || "Contact",
        email: input.email.trim(),
      };

      setContacts((prev) => [...prev, contact]);
      return contact;
    },
    [],
  );

  const getContactsByFirmSlug = useCallback(
    (slug: string) => contacts.filter((c) => c.firmSlug === slug),
    [contacts],
  );

  const value = useMemo(
    () => ({ contacts, addContact, getContactsByFirmSlug }),
    [contacts, addContact, getContactsByFirmSlug],
  );

  return <ContactsContext.Provider value={value}>{children}</ContactsContext.Provider>;
}

export function useContacts() {
  const ctx = useContext(ContactsContext);
  if (!ctx) {
    throw new Error("useContacts must be used within ContactsProvider");
  }
  return ctx;
}
