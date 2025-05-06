"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ShowRes({
  id,
  name,
  type,
  subject,
}: {
  id: number;
  name: string;
  type: string;
  subject: string | null;
}) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDeleteResource = async () => {
    try {
      setIsDeleting(true);
      const response = await fetch(`/api/resources/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        router.refresh();
      }
    } catch (error) {
      console.error("Error deleting resource:", error);
    } finally {
      setIsDeleting(false);
    }
  };
  return (
    <div>
      <a href={`/student/resources/${id}`}>
      <div className="flex mb-2 items-center gap-3">
        <div className="text-lg font-medium text-blue-dark">{name}</div>
        <Badge className="font-medium">{type}</Badge>
      </div>
      </a>
      <div className="text-sm text-slate-600 flex justify-between items-center">
        {subject}

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" className="w-4 h-8">
              <X />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="font-barlow">
            <AlertDialogHeader>
              <AlertDialogTitle>Delete this resource?</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete this resource? This action
                cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel disabled={isDeleting}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDeleteResource}
                disabled={isDeleting}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
