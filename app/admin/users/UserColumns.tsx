"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
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
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export const userColumns: ColumnDef<any>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    accessorKey: "year",
    header: "Year",
  },
  {
    accessorKey: "active",
    header: "Active",
    cell: ({ row }) => <span>{row.original.active ? "Yes" : "No"}</span>,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const [isDeleting, setIsDeleting] = useState(false);
      const router = useRouter();
      const userId = row.original.id;

      const handleDeleteUser = async () => {
        try {
          setIsDeleting(true);
          const response = await fetch(`/api/admin/users/${userId}`, {
            method: "DELETE",
          });

          if (response.ok) {
            router.refresh();
          }
        } catch (error) {
          console.error("Error deleting user:", error);
        } finally {
          setIsDeleting(false);
        }
      };

      return (
        <div className="flex items-center gap-2">
          <Link href={`/admin/users/${row.original.id}`}>
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
                <AlertDialogTitle>Delete User</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete this user? This action cannot
                  be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel disabled={isDeleting}>
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDeleteUser}
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
