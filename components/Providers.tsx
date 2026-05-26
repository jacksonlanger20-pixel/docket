"use client";

import { ContactsProvider } from "@/context/ContactsContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return <ContactsProvider>{children}</ContactsProvider>;
}
