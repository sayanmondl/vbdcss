"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter, usePathname } from "next/navigation";

interface YearSelectorProps {
  selectedYear: string;
  years: number[];
}

const YearSelector = ({ selectedYear, years }: YearSelectorProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleYearChange = (value: string) => {
    const params = new URLSearchParams();
    if (value !== "all") {
      params.set("year", value);
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="mb-6 flex mx-5 gap-10">
      <h2 className="barlow-heading-thin mb-2">Filter Students by Year:</h2>
      <div className="flex-1"></div>
      <Select value={selectedYear} onValueChange={handleYearChange}>
        <SelectTrigger className="w-[200px] font-barlow blue-border-thin">
          <SelectValue placeholder="Select year" />
        </SelectTrigger>
        <SelectContent className="font-barlow">
          <SelectItem value="all">All years</SelectItem>
          {years.map((year) => (
            <SelectItem key={year} value={year.toString()}>
              Year {year}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default YearSelector;
