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

export const eventColumns: ColumnDef<any>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "location",
    header: "Location",
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }: { row: { original: { date: Date } } }) => (
      <span>{formatDate(new Date(row.original.date))}</span>
    ),
  },
  {
    id: "actions",
    cell: ({ row }: { row: { original: { id: number } } }) => {
      const [isDeleting, setIsDeleting] = useState(false);
      const router = useRouter();
      const eventId = row.original.id;

      const handleDeleteEvent = async () => {
        try {
          setIsDeleting(true);
          const response = await fetch(`/api/admin/events/${eventId}`, {
            method: "DELETE",
          });

          if (response.ok) {
            router.refresh();
          }
        } catch (error) {
          console.error("Error deleting event:", error);
        } finally {
          setIsDeleting(false);
        }
      };

      return (
        <div className="flex items-center gap-2">
          <Link href={`/admin/events/${row.original.id}`}>
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
                <AlertDialogTitle>Delete Event</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete this event? This action cannot
                  be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel disabled={isDeleting}>
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDeleteEvent}
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
