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
import { Announcement } from "@/types";
import { Cross } from "lucide-react";
import { useState } from "react";

interface AnnouncementProps {
  announcement: Announcement;
}

const UpdateAnnouncementForm = ({ announcement }: AnnouncementProps) => {
  const [title, setTitle] = useState(announcement.title);
  const [info, setInfo] = useState(announcement.info);
  const [isImportant, setIsImportant] = useState(!!announcement.isImportant);
  const [fileUrl, setFileUrl] = useState<string | null>(
    announcement.attachment || null
  );
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);
    setError(null);
    setSuccess(false);

    let uploadedUrl = fileUrl;

    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Upload failed");
        uploadedUrl = data.url;
        setFileUrl(data.url);
      } catch (error: any) {
        setError(error.message);
        setUploading(false);
        return;
      }
    }

    try {
      const res = await fetch(`/api/admin/announcements/${announcement.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          info,
          isImportant,
          fileUrl: uploadedUrl,
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
          Update Announcement
        </CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter announcement title"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="info">Information</Label>
            <Textarea
              id="info"
              value={info}
              onChange={(e) => setInfo(e.target.value)}
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
            {fileUrl && (
              <p className="text-sm text-gray-600">
                Current file:{" "}
                <a
                  href={fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  View attachment
                </a>
              </p>
            )}
          </div>

          <div className="flex items-center space-x-2 pt-2">
            <Checkbox
              id="isImportant"
              checked={isImportant}
              onCheckedChange={(val) => setIsImportant(Boolean(val))}
            />
            <Label htmlFor="isImportant">Mark as Important</Label>
          </div>

          {error && (
            <p className="text-red-600 text-sm flex items-center gap-4">
              <Cross className="text-red-600" size={16} />
              {error}
            </p>
          )}
          {success && (
            <p className="text-green-600 text-sm flex items-center gap-4">
              <Cross className="text-green-600" size={16} />
              Announcement updated
            </p>
          )}
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button type="submit" disabled={uploading}>
            {uploading ? "Updating..." : "Update Announcement"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default UpdateAnnouncementForm;
