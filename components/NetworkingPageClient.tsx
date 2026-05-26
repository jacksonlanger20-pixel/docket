"use client";

import { useState } from "react";
import { AddContactModal } from "@/components/AddContactModal";
import { useContacts } from "@/context/ContactsContext";

export function NetworkingPageClient() {
  const { contacts, addContact } = useContacts();
  const [modalOpen, setModalOpen] = useState(false);

  const sorted = [...contacts].sort((a, b) => a.name.localeCompare(b.name));

  return (
    <>
      <div className="mb-8 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-[#1a1a2e]">Networking</h1>
          <p className="mt-1 text-sm text-gray-500">
            Your contacts across firms — bankers, recruiters, and alumni.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setModalOpen(true)}
          className="shrink-0 rounded-lg bg-[#1a1a2e] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#2d2d4a]"
        >
          Add Contact
        </button>
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        {sorted.length === 0 ? (
          <p className="px-4 py-12 text-center text-sm text-gray-500">
            No contacts yet. Add your first networking contact.
          </p>
        ) : (
          <table className="docket-table min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Name
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Firm
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
              {sorted.map((contact) => (
                <tr key={contact.id}>
                  <td className="px-4 py-3.5 font-medium text-[#1a1a2e]">{contact.name}</td>
                  <td className="px-4 py-3.5 text-sm text-gray-600">{contact.firm}</td>
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
        onSubmit={(values) => addContact(values)}
      />
    </>
  );
}
