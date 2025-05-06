import React from "react";
import CreateUserForm from "./CreateUserForm";
import { checkIfAdmin } from "@/lib/userauth";
import { redirect } from "next/navigation";

export default async function Page() {
  const isAdmin = await checkIfAdmin();
  if (!isAdmin) {
    redirect("/");
  }

  return (
    <div>
      <CreateUserForm />
    </div>
  );
}
