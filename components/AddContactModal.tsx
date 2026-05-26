"use client";

import { useEffect, useState } from "react";
import { getKnownFirmNames } from "@/lib/firms";

export interface AddContactFormValues {
  name: string;
  firm: string;
  role: string;
  email: string;
}

interface AddContactModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: AddContactFormValues) => void;
  defaultFirm?: string;
}

export function AddContactModal({
  open,
  onClose,
  onSubmit,
  defaultFirm = "",
}: AddContactModalProps) {
  const [name, setName] = useState("");
  const [firm, setFirm] = useState(defaultFirm);
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const firmNames = getKnownFirmNames();

  useEffect(() => {
    if (open) {
      setFirm(defaultFirm);
    }
  }, [open, defaultFirm]);

  useEffect(() => {
    if (!open) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !firm.trim() || !email.trim()) return;
    onSubmit({
      name: name.trim(),
      firm: firm.trim(),
      role: role.trim(),
      email: email.trim(),
    });
    setName("");
    setFirm(defaultFirm);
    setRole("");
    setEmail("");
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        type="button"
        aria-label="Close"
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />
      <div className="relative w-full max-w-md rounded-xl border border-gray-200 bg-white p-6 shadow-xl">
        <h2 className="text-lg font-semibold text-[#1a1a2e]">Add contact</h2>
        <p className="mt-1 text-sm text-gray-500">
          Saved to Networking and the matching firm profile.
        </p>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div>
            <label htmlFor="contact-name" className="mb-1 block text-xs font-medium text-gray-500">
              Name
            </label>
            <input
              id="contact-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-[#1a1a2e] focus:outline-none focus:ring-1 focus:ring-[#1a1a2e]"
            />
          </div>
          <div>
            <label htmlFor="contact-firm" className="mb-1 block text-xs font-medium text-gray-500">
              Firm
            </label>
            <input
              id="contact-firm"
              list="firm-suggestions"
              value={firm}
              onChange={(e) => setFirm(e.target.value)}
              required
              placeholder="e.g. Goldman Sachs"
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-[#1a1a2e] focus:outline-none focus:ring-1 focus:ring-[#1a1a2e]"
            />
            <datalist id="firm-suggestions">
              {firmNames.map((f) => (
                <option key={f} value={f} />
              ))}
            </datalist>
          </div>
          <div>
            <label htmlFor="contact-role" className="mb-1 block text-xs font-medium text-gray-500">
              Role
            </label>
            <input
              id="contact-role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="e.g. VP, TMT Banking"
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-[#1a1a2e] focus:outline-none focus:ring-1 focus:ring-[#1a1a2e]"
            />
          </div>
          <div>
            <label htmlFor="contact-email" className="mb-1 block text-xs font-medium text-gray-500">
              Email
            </label>
            <input
              id="contact-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-[#1a1a2e] focus:outline-none focus:ring-1 focus:ring-[#1a1a2e]"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-lg bg-[#1a1a2e] px-4 py-2 text-sm font-medium text-white hover:bg-[#2d2d4a]"
            >
              Add contact
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
