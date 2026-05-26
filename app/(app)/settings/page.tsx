import { PageHeader } from "@/components/PageHeader";

export default function SettingsPage() {
  return (
    <>
      <PageHeader title="Settings" description="Manage your account and notification preferences." />

      <div className="space-y-6">
        <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-sm font-semibold text-[#1a1a2e]">Notifications</h2>
          <div className="mt-4 space-y-3">
            {[
              "Email when a tracked firm opens applications",
              "Weekly digest of new opportunities",
              "Reminder before application deadlines",
            ].map((label) => (
              <label key={label} className="flex items-center gap-3">
                <input
                  type="checkbox"
                  defaultChecked
                  className="h-4 w-4 rounded border-gray-300 text-[#1a1a2e] focus:ring-[#1a1a2e]"
                />
                <span className="text-sm text-gray-600">{label}</span>
              </label>
            ))}
          </div>
        </section>

        <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-sm font-semibold text-[#1a1a2e]">Account</h2>
          <p className="mt-2 text-sm text-gray-500">alex.chen@university.edu</p>
          <button
            type="button"
            className="mt-4 text-sm font-medium text-red-600 hover:text-red-700"
          >
            Sign out
          </button>
        </section>
      </div>
    </>
  );
}
