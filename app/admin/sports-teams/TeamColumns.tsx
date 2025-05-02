"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
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

export const teamColumns: ColumnDef<any>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Team Name",
  },
  {
    accessorKey: "sport",
    header: "Sport",
  },
  {
    accessorKey: "year",
    header: "Year",
  },
  {
    accessorKey: "captainName",
    header: "Captain",
  },
  {
    accessorKey: "tournamentName",
    header: "Tournament",
  },
  {
    id: "actions",
    cell: ({ row }: { row: { original: { id: number } } }) => {
      const [isDeleting, setIsDeleting] = useState(false);
      const router = useRouter();
      const teamId = row.original.id;

      const handleDeleteTeam = async () => {
        try {
          setIsDeleting(true);
          const response = await fetch(`/api/admin/sports-teams/${teamId}`, {
            method: "DELETE",
          });

          if (response.ok) {
            router.refresh();
          }
        } catch (error) {
          console.error("Error deleting this team:", error);
        } finally {
          setIsDeleting(false);
        }
      };

      return (
        <div className="flex items-center gap-2">
          <Link href={`/admin/sports-teams/${row.original.id}`}>
            <Button variant="ghost" size="sm">
              Edit
            </Button>
          </Link>
          <Link href={`/admin/sports-teams/${row.original.id}/members`}>
            <Button variant="outline" size="sm">
              Members
            </Button>
          </Link>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" size="sm">
                Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="font-barlow">
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Team</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete this team? This action cannot
                  be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel disabled={isDeleting}>
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDeleteTeam}
                  disabled={isDeleting}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  {isDeleting ? "Deleting..." : "Delete"}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      );
    },
  },
];
