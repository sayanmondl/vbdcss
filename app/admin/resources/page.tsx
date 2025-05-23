import { DataTable } from "@/app/components/admin/DataTable";
import { db } from "@/db";
import { resources } from "@/db/schema";
import { resourceColumns } from "./ResourceColumns";
import { redirect } from "next/navigation";
import { checkIfAdmin } from "@/lib/userauth";

export default async function ResourcesPage() {
  const isAdmin = await checkIfAdmin();
  if (!isAdmin) {
    redirect("/");
  }

  const allResources = await db.select().from(resources);

  return (
    <div className="space-y-6 font-barlow">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-teko text-blue-dark">Resources</h1>
      </div>

      <DataTable
        columns={resourceColumns}
        data={allResources}
        filterColumn="name"
        filterPlaceholder="Filter by name..."
      />
    </div>
  );
}
