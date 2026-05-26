"use client";

import { useMemo, useState } from "react";
import { AddContactModal } from "@/components/AddContactModal";
import { useContacts } from "@/context/ContactsContext";

interface FirmContactsSectionProps {
  firmSlug: string;
  firmName: string;
}

export function FirmContactsSection({ firmSlug, firmName }: FirmContactsSectionProps) {
  const { getContactsByFirmSlug, addContact } = useContacts();
  const [modalOpen, setModalOpen] = useState(false);

  const contacts = useMemo(
    () =>
      getContactsByFirmSlug(firmSlug).sort((a, b) => a.name.localeCompare(b.name)),
    [getContactsByFirmSlug, firmSlug],
  );

  return (
    <section className="mt-10">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-[#1a1a2e]">Contacts</h2>
        <button
          type="button"
          onClick={() => setModalOpen(true)}
          className="rounded-lg bg-[#1a1a2e] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#2d2d4a]"
        >
          Add Contact
        </button>
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        {contacts.length === 0 ? (
          <p className="px-4 py-8 text-center text-sm text-gray-500">
            No contacts yet. Add someone you&apos;ve networked with at this firm.
          </p>
        ) : (
          <table className="docket-table min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Name
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Role
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Email
                </th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact) => (
                <tr key={contact.id}>
                  <td className="px-4 py-3.5 font-medium text-[#1a1a2e]">{contact.name}</td>
                  <td className="px-4 py-3.5 text-sm text-gray-600">{contact.role}</td>
                  <td className="px-4 py-3.5">
                    <a
                      href={`mailto:${contact.email}`}
                      className="text-sm text-[#1a1a2e] hover:underline"
                    >
                      {contact.email}
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <AddContactModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        defaultFirm={firmName}
        onSubmit={(values) =>
          addContact({ ...values, firmSlug })
        }
      />
    </section>
  );
}
