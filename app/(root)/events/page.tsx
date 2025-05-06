import LoadEvents from "@/app/components/LoadEvents";

export interface SearchParams {
  page?: string;
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;

  const page = params.page ? Number.parseInt(params.page, 10) : 1;
  const validPage = isNaN(page) || page < 1 ? 1 : page;

  return (
    <div className="pagemargin">
      <LoadEvents page={validPage} />;
    </div>
  );
}
