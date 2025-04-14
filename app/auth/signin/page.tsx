import { auth } from "@/auth";
import React from "react";
import SignIn from "./SignIn";
import { redirect } from "next/navigation";

export default async function SignInPage() {
  const session = await auth();
  if (!session) {
    return <SignIn />;
  } else {
    redirect("/");
  }
}
