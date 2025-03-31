import { Suspense } from "react";
import { ResourceCard } from "@/app/components/ResourceCard";
import { getResources } from "@/lib/resource";
import { ResourcesSkeleton } from "./ResourceSkeleton";
import SearchResources from "./SearchResources";

async function ResourcesList({
  searchParams,
}: {
  searchParams: Promise<{ query?: string; subject?: string; type?: string }>;
}) {
  const { query } = await searchParams;
  const { subject } = await searchParams;
  const { type } = await searchParams;

  const searchQuery = query || "";
  const subjectFilter = subject || "all";
  const typeFilter = type || "all";

  const resources = await getResources();

  const filteredResources = resources.filter((resource) => {
    const matchesSearch =
      resource.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesSubject =
      subjectFilter === "all" || resource.subject === subjectFilter;
    const matchesType = typeFilter === "all" || resource.type === typeFilter;

    return matchesSearch && matchesSubject && matchesType;
  });

  const subjects = [
    "all",
    ...Array.from(new Set(resources.map((r) => r.subject))),
  ];
  const types = ["all", ...Array.from(new Set(resources.map((r) => r.type)))];

  return (
    <>
      <SearchResources
        query={searchQuery}
        subjects={subjects}
        types={types}
        subjectFilter={subjectFilter}
        typeFilter={typeFilter}
      />

      {filteredResources.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground font-barlow">
            No resources found matching your criteria.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredResources.map((resource) => (
            <ResourceCard
              key={resource.id}
              id={resource.id}
              name={resource.name}
              type={resource.type}
              subject={resource.subject}
            />
          ))}
        </div>
      )}
    </>
  );
}

export default function Page({
  searchParams,
}: {
  searchParams: Promise<{ query?: string; subject?: string; type?: string }>;
}) {
  return (
    <div className="pagemargin">
      <h1 className="barlow-heading-thin mb-6">Resources:</h1>
      <Suspense fallback={<ResourcesSkeleton />}>
        <ResourcesList searchParams={searchParams} />
      </Suspense>
      <div className="h-10"></div>
    </div>
  );
}
