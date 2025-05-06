import React from "react";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import UpdateForm from "./UpdateForm";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await auth();
  if (!session) {
    redirect("/auth/signin");
  }

  const currentUserId = session.user?.id as string;

  const oldUsers = await db
    .select()
    .from(users)
    .where(eq(users.id, currentUserId));
  const oldUser = oldUsers[0];

  return (
    <div>
      <UpdateForm user={oldUser} />
    </div>
  );
}
