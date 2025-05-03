import { DataTable } from "@/app/components/admin/DataTable";
import { Button } from "@/components/ui/button";
import { db } from "@/db";
import { users } from "@/db/schema";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { userColumns } from "./UserColumns";
import { checkIfAdmin } from "@/lib/userauth";
import { redirect } from "next/navigation";

export default async function UsersPage() {
  const isAdmin = await checkIfAdmin();
  if (!isAdmin) {
    redirect("/");
  }

  const allUsers = await db.select().from(users);

  return (
    <div className="space-y-6 font-barlow">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl text-blue-dark font-teko">Users</h1>
        <Link href="/admin/users/new">
          <Button className="bg-blue-dark">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add User
          </Button>
        </Link>
      </div>

      <DataTable
        columns={userColumns}
        data={allUsers}
        filterColumn="name"
        filterPlaceholder="Filter by name..."
      />
    </div>
  );
}
