"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter, usePathname } from "next/navigation";

interface SemesterSelectorProps {
  selectedSemester: string;
}

const SemesterSelector = ({ selectedSemester }: SemesterSelectorProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleSemesterChange = (value: string) => {
    const params = new URLSearchParams();
    if (value !== "all") {
      params.set("semester", value);
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="mb-6 flex mx-5 gap-10">
      <h2 className="barlow-heading-thin mb-2">Filter Students by Semester:</h2>
      <div className="flex-1"></div>
      <Select value={selectedSemester} onValueChange={handleSemesterChange}>
        <SelectTrigger className="w-[200px] font-barlow blue-border-thin">
          <SelectValue placeholder="Select semester" />
        </SelectTrigger>
        <SelectContent className="font-barlow">
          <SelectItem value="all">All Semesters</SelectItem>
          <SelectItem value="1">Semester 1</SelectItem>
          <SelectItem value="2">Semester 2</SelectItem>
          <SelectItem value="3">Semester 3</SelectItem>
          <SelectItem value="4">Semester 4</SelectItem>
          <SelectItem value="5">Semester 5</SelectItem>
          <SelectItem value="6">Semester 6</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SemesterSelector;
