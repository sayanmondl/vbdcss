"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CircleAlert, CircleCheckBig } from "lucide-react";
import { useState } from "react";

const CreateAnnouncementForm = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const handleSubmit = async (formData: FormData) => {
    setUploading(true);
    setError(null);
    setSuccess(false);

    let fileUrl;
    const title = formData.get("title") as string;
    const info = formData.get("info") as string;
    const isImportant = formData.get("isImportant") === "on";

    if (file) {
      const fileForm = new FormData();
      fileForm.append("file", file);
      try {
        const res = await fetch("/api/upload", {
          method: "POST",
          body: fileForm,
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Upload failed");
        fileUrl = data.url;
      } catch (error: any) {
        setError(error.message);
        setUploading(false);
        return;
      }
    }

    try {
      const res = await fetch("/api/admin/announcements/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          info,
          isImportant,
          fileUrl,
        }),
      });

      if (!res.ok) throw new Error("Failed to update announcement");
      setSuccess(true);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <Card className="rounded-lg shadow-none">
      <CardHeader>
        <CardTitle className="text-lg font-medium">
          Create Announcement
        </CardTitle>
      </CardHeader>
      <form action={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              placeholder="Enter announcement title"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="info">Information</Label>
            <Textarea
              id="info"
              name="info"
              placeholder="Enter announcement details"
              className="min-h-[120px]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="attachment">Attachment</Label>
            <Input
              id="attachment"
              type="file"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />
          </div>

          <div className="flex items-center space-x-2 pt-2">
            <Checkbox id="isImportant" />
            <Label htmlFor="isImportant">Mark as Important</Label>
          </div>

          {error && (
            <p className="text-red-600 text-sm flex items-center">
              <CircleAlert className="text-red-600" size={16} />
              {error}
            </p>
          )}
          {success && (
            <p className="text-green-600 text-sm flex items-center">
              <CircleCheckBig className="text-green-600" size={16} />
              Announcement created
            </p>
          )}
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button type="submit" className="bg-blue-dark" disabled={uploading}>
            {uploading ? "Creating..." : "Create Announcement"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default CreateAnnouncementForm;
