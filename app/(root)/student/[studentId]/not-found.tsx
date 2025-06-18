import { Button } from "@/components/ui/button";
import { UserX } from "lucide-react";
import Link from "next/link";

export default function StudentNotFound() {
  return (
    <div className="pagemargin">
      <div className="container py-12 flex flex-col items-center justify-center min-h-[60vh] text-center">
        <UserX className="h-24 w-24 text-muted-foreground mb-6" />
        <h1 className="text-3xl font-bold mb-2 font-barlow">
          User Not Found
        </h1>
        <p className="text-muted-foreground mb-8 max-w-md font-barlow">
          The user you're looking for doesn't exist or has been removed.
        </p>
        <Button asChild className="bg-blue-dark">
          <Link href="/student" className="font-barlow">
            Browse All Students
          </Link>
        </Button>
      </div>
    </div>
  );
}
