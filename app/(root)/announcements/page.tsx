import LoadAnnouncements from "@/app/components/LoadAnnouncements";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export interface SearchParams {
  page?: string;
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const session = await auth();
  if (!session) {
    redirect("/auth/signin");
  }
  const params = await searchParams;
  
  const page = params.page ? Number.parseInt(params.page, 10) : 1;
  const validPage = isNaN(page) || page < 1 ? 1 : page;

  return (
    <div className="pagemargin">
      <LoadAnnouncements page={validPage} />;
    </div>
  );
}
