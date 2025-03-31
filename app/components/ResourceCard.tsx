import { Card, CardContent } from "@/components/ui/card";
import { FileCode, FileText, FileQuestion } from "lucide-react";
import { cn } from "@/lib/utils";

import Link from "next/link";

export const getIcon = (type: string) => {
  switch (type) {
    case "code":
      return <FileCode className="h-8 w-8 text-blue-500" />;
    case "notes":
      return <FileText className="h-8 w-8 text-red-500" />;
    case "pyqs":
      return <FileQuestion className="h-8 w-8 text-green-500" />;
  }
};

export function ResourceCard({
  id,
  type,
  name,
  subject,
}: {
  id: string;
  type: string;
  name: string;
  subject: string;
}) {
  return (
    <Link href={`/student/resources/${id}`}>
      <Card className="h-full overflow-hidden transition-all hover:shadow-md hover:-translate-y-1">
        <div
          className={cn(
            "h-32 flex items-center justify-center",
            type === "code"
              ? "bg-blue-50"
              : type === "notes"
                ? "bg-red-50"
                : type === "pyqs"
                  ? "bg-green-50"
                  : "bg-gray-50"
          )}
        >
          {getIcon(type)}
        </div>
        <CardContent className="p-4">
          <h3 className="font-medium text-base font-barlow truncate" title={name}>
            {name}
          </h3>
          <p className="text-sm font-barlow text-muted-foreground mt-1">{subject}</p>
        </CardContent>
      </Card>
    </Link>
  );
}
