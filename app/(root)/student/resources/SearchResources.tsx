"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Search } from "lucide-react";
import { useDebouncedCallback } from "use-debounce";

interface SearchResourcesProps {
  query: string;
  subjects: string[];
  types: string[];
  subjectFilter: string;
  typeFilter: string;
}

export default function SearchResources({
  query,
  subjects,
  types,
  subjectFilter: initialSubjectFilter,
  typeFilter: initialTypeFilter,
}: SearchResourcesProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [searchQuery, setSearchQuery] = useState(query);
  const [subjectFilter, setSubjectFilter] = useState(initialSubjectFilter);
  const [typeFilter, setTypeFilter] = useState(initialTypeFilter);

  const createQueryString = (params: Record<string, string | null>) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());

    Object.entries(params).forEach(([key, value]) => {
      if (value === null) newSearchParams.delete(key);
      else newSearchParams.set(key, value);
    });

    return newSearchParams.toString();
  };

  const debouncedNavigate = useDebouncedCallback(() => {
    router.push(
      `/student/resources?${createQueryString({
        query: searchQuery || null,
        subject: subjectFilter === "all" ? null : subjectFilter,
        type: typeFilter === "all" ? null : typeFilter,
      })}`
    );
  }, 300);

  useEffect(() => {
    debouncedNavigate();
  }, [searchQuery, subjectFilter, typeFilter, debouncedNavigate]);

  return (
    <div className="mb-8 space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <Label htmlFor="search-query" className="mb-1 hidden md:block font-barlow text-base text-blue-medium">
            Search
          </Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search resources..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 placeholder:font-barlow font-barlow"
            />
          </div>
        </div>

        <div className="flex gap-4">
          <div className="flex-1 min-w-40">
            <Label htmlFor="subject-filter" className="mb-1 block font-barlow text-base text-blue-medium">
              Subject
            </Label>
            <Select value={subjectFilter} onValueChange={setSubjectFilter}>
              <SelectTrigger id="subject-filter" className="font-barlow">
                <SelectValue placeholder="All Subjects" />
              </SelectTrigger>
              <SelectContent className="font-barlow">
                {subjects.map((subject) => (
                  <SelectItem key={subject} value={subject}>
                    {subject === "all" ? "All Subjects" : subject}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex-1 min-w-40">
            <Label htmlFor="type-filter" className="mb-1 block font-barlow text-base text-blue-medium">
              Type
            </Label>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger id="type-filter" className="font-barlow">
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent className="font-barlow">
                {types.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type === "all"
                      ? "All Types"
                      : type.charAt(0).toUpperCase() + type.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
}
