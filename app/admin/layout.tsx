import type React from "react";
import { AdminHeader } from "@/app/components/admin/AdminHeader";
import { Sidepanel } from "../components/admin/Sidepanel";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <div className="border-r bg-background h-screen w-64 hidden md:block">
        <Sidepanel />
      </div>
      <div className="flex-1">
        <AdminHeader />
        <main className="p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
