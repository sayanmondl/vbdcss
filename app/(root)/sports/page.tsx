import LoadTournaments from "@/app/components/LoadTournaments";
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
