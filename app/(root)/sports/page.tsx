import LoadTournaments from "@/app/components/LoadLatestSportEvents";

import React from "react";

export interface SearchParams {
  page?: string;
}

export default async function Page() {
  return (
    <div className="pagemargin ">
      <LoadTournaments />
    </div>
  );
}
