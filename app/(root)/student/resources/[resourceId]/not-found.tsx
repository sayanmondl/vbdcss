import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FileX } from "lucide-react";

export default function ResourceNotFound() {
  return (
    <div className="pagemargin">
      <div className="container py-12 flex flex-col items-center justify-center min-h-[60vh] text-center">
        <FileX className="h-24 w-24 text-muted-foreground mb-6" />
        <h1 className="text-3xl font-bold mb-2 font-barlow">Resource Not Found</h1>
        <p className="text-muted-foreground mb-8 max-w-md font-barlow">
          The resource you're looking for doesn't exist or has been removed.
        </p>
        <Button asChild className="bg-blue-dark">
          <Link href="/student/resources" className="font-barlow">Browse All Resources</Link>
        </Button>
      </div>
    </div>
  );
}
