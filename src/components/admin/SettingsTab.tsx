"use client";

import { Settings } from "lucide-react";

export function SettingsTab() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center">
      <Settings className="h-12 w-12 text-gray-300 mx-auto mb-4" />
      <h2 className="text-lg font-semibold text-gray-900 mb-2">Settings</h2>
      <p className="text-sm text-gray-500 max-w-md mx-auto">
        Admin settings including user management, notification preferences,
        and system configuration will be available here.
      </p>
    </div>
  );
}
