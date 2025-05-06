import ResourceUploadForm from "@/app/profile/uploadres/ResourceUploadForm";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import React from "react";

const Page = async () => {
  const session = await auth();
  if (!session) {
    redirect("/auth/signin");
  }

  const userId = session.user?.id as string;

  return (
    <div>
      <ResourceUploadForm userId={userId} />
    </div>
  );
};

export default Page;
