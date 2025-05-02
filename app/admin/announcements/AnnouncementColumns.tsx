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

export const announcementColumns: ColumnDef<any>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "info",
    header: "Info",
    cell: ({ row }: { row: { original: { info: string } } }) => (
      <span className="truncate max-w-[200px] block">{row.original.info}</span>
    ),
  },
  {
    accessorKey: "isImportant",
    header: "Important",
    cell: ({ row }: { row: { original: { isImportant: boolean } } }) => (
      <span>{row.original.isImportant ? "Yes" : "No"}</span>
    ),
  },
  {
    accessorKey: "publish",
    header: "Publish Date",
    cell: ({ row }: { row: { original: { publish: Date } } }) => (
      <span>{formatDate(new Date(row.original.publish))}</span>
    ),
  },
  {
    id: "actions",
    cell: ({ row }: { row: { original: { id: number } } }) => {
      const [isDeleting, setIsDeleting] = useState(false);
      const router = useRouter();
      const announcementId = row.original.id;

      const handleDeleteAnnouncement = async () => {
        try {
          setIsDeleting(true);
          const response = await fetch(
            `/api/admin/announcements/${announcementId}`,
            {
              method: "DELETE",
            }
          );

          if (response.ok) {
            router.refresh();
          }
        } catch (error) {
          console.error("Error deleting announcement:", error);
        } finally {
          setIsDeleting(false);
        }
      };

      return (
        <div className="flex items-center gap-2">
          <Link href={`/admin/announcements/${row.original.id}`}>
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
                <AlertDialogTitle>Delete Announcement</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete this announcement? This action
                  cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel disabled={isDeleting}>
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDeleteAnnouncement}
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
