import React from "react";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import UpdateUserForm from "./UpdateUserForm";
import { redirect } from "next/navigation";
import { checkIfAdmin } from "@/lib/userauth";

export default async function EditUserPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const isAdmin = await checkIfAdmin();
  if (!isAdmin) {
    redirect("/");
  }

  const id = (await params).id;

  const oldUsers = await db.select().from(users).where(eq(users.id, id));
  const oldUser = oldUsers[0];
  return (
    <div>
      <UpdateUserForm user={oldUser} />
    </div>
  );
}
