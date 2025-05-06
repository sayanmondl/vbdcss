import { checkIfAdmin } from "@/lib/userauth";
import CreateAnnouncementForm from "./CreateAnnouncementForm";
import { redirect } from "next/navigation";

export default async function Page() {
  const isAdmin = await checkIfAdmin();
  if (!isAdmin) {
    redirect("/");
  }

  return (
    <div className="container font-barlow">
      <h1 className="mb-6 text-3xl font-teko font-medium">
        Create Announcement
      </h1>
      <CreateAnnouncementForm />
    </div>
  );
}
