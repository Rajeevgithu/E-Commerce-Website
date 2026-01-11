import { useState } from "react";
import { Save, Shield, Globe, Bell } from "lucide-react";

export default function Settings() {
  const [activeTab, setActiveTab] = useState("general");
  const [formData, setFormData] = useState({
    siteName: "Text-Tech Website",
    siteDescription: "Your premier destination for textile testing solutions",
    siteEmail: "admin@texttech.com",
    sitePhone: "+1 234 567 8900",
    siteAddress: "123 Business Street, City, Country",
    notifications: true,
    newsletter: false,
  });

  const handleSave = (e) => {
    e.preventDefault();
    alert("Settings saved successfully!");
  };

  const update = (key, value) =>
    setFormData((prev) => ({ ...prev, [key]: value }));

  const tabs = [
    { id: "general", label: "General", icon: Globe },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "security", label: "Security", icon: Shield },
  ];

  return (
    <div className="space-y-8">
      {/* ================= HEADER ================= */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
        <p className="text-sm text-gray-600 mt-1">
          Configure application preferences and security
        </p>
      </div>

      {/* ================= TABS ================= */}
      <div className="bg-white border border-gray-200 rounded-xl p-2 flex gap-2 w-fit">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition ${
              activeTab === id
                ? "bg-indigo-600 text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <Icon size={16} />
            {label}
          </button>
        ))}
      </div>

      {/* ================= CONTENT ================= */}
      <form
        onSubmit={handleSave}
        className="bg-white border border-gray-200 rounded-2xl p-6 space-y-6 max-w-4xl"
      >
        {/* -------- GENERAL -------- */}
        {activeTab === "general" && (
          <div className="space-y-5">
            <Input
              label="Site Name"
              value={formData.siteName}
              onChange={(v) => update("siteName", v)}
            />

            <Textarea
              label="Site Description"
              rows={3}
              value={formData.siteDescription}
              onChange={(v) => update("siteDescription", v)}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Contact Email"
                type="email"
                value={formData.siteEmail}
                onChange={(v) => update("siteEmail", v)}
              />
              <Input
                label="Contact Phone"
                value={formData.sitePhone}
                onChange={(v) => update("sitePhone", v)}
              />
            </div>

            <Textarea
              label="Business Address"
              rows={2}
              value={formData.siteAddress}
              onChange={(v) => update("siteAddress", v)}
            />
          </div>
        )}

        {/* -------- NOTIFICATIONS -------- */}
        {activeTab === "notifications" && (
          <div className="space-y-4">
            <Toggle
              label="Enable email notifications"
              checked={formData.notifications}
              onChange={(v) => update("notifications", v)}
            />

            <Toggle
              label="Subscribe to newsletter"
              checked={formData.newsletter}
              onChange={(v) => update("newsletter", v)}
            />
          </div>
        )}

        {/* -------- SECURITY -------- */}
        {activeTab === "security" && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-5 space-y-4">
            <p className="text-sm text-yellow-800 font-medium">
              Change Admin Password
            </p>

            <Input label="Current Password" type="password" />
            <Input label="New Password" type="password" />
            <Input label="Confirm New Password" type="password" />
          </div>
        )}

        {/* ================= FOOTER ================= */}
        <div className="flex justify-end pt-6 border-t">
          <button
            type="submit"
            className="flex items-center gap-2 px-5 py-2.5 
            bg-indigo-600 text-white rounded-lg font-semibold 
            hover:bg-indigo-500 transition"
          >
            <Save size={18} />
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}

/* ================= REUSABLE FIELDS ================= */

function Input({ label, type = "text", value, onChange }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg 
        focus:ring-2 focus:ring-indigo-500 outline-none"
      />
    </div>
  );
}

function Textarea({ label, rows, value, onChange }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <textarea
        rows={rows}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg 
        focus:ring-2 focus:ring-indigo-500 outline-none"
      />
    </div>
  );
}

function Toggle({ label, checked, onChange }) {
  return (
    <label className="flex items-center gap-3 cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="h-4 w-4 text-indigo-600 rounded focus:ring-indigo-500"
      />
      <span className="text-sm text-gray-700">{label}</span>
    </label>
  );
}
