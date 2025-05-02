"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
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

export const tournamentColumns: ColumnDef<any>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "sport",
    header: "Sport",
  },
  {
    accessorKey: "location",
    header: "Location",
  },
  {
    accessorKey: "startDate",
    header: "Start Date",
    cell: ({ row }: { row: { original: { startDate: Date } } }) => (
      <span>{formatDate(new Date(row.original.startDate))}</span>
    ),
  },
  {
    accessorKey: "endDate",
    header: "End Date",
    cell: ({ row }: { row: { original: { endDate: Date } } }) => (
      <span>{formatDate(new Date(row.original.endDate))}</span>
    ),
  },
  {
    id: "actions",
    cell: ({ row }: { row: { original: { id: number } } }) => {
      const [isDeleting, setIsDeleting] = useState(false);
      const router = useRouter();
      const tournamentId = row.original.id;

      const handleDeleteTournament = async () => {
        try {
          setIsDeleting(true);
          const response = await fetch(
            `/api/admin/tournaments/${tournamentId}`,
            {
              method: "DELETE",
            }
          );

          if (response.ok) {
            router.refresh();
          }
        } catch (error) {
          console.error("Error deleting tournament:", error);
        } finally {
          setIsDeleting(false);
        }
      };

      return (
        <div className="flex items-center gap-2">
          <Link href={`/admin/tournaments/${row.original.id}`}>
            <Button variant="ghost" size="sm">
              Edit
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
                <AlertDialogTitle>Delete Tournament</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete this tournament? This action
                  cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel disabled={isDeleting}>
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDeleteTournament}
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
