"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CircleAlert, CircleCheckBig } from "lucide-react";
import { useState } from "react";

const CreateEventForm = () => {
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const handleSubmit = async (formData: FormData) => {
    setUploading(true);
    setError(null);
    setSuccess(false);

    let coverUrl;
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const location = formData.get("location") as string;
    const date = formData.get("date") as string;
    const archive = formData.get("archive") as string;

    if (coverFile) {
      const fileForm = new FormData();
      fileForm.append("file", coverFile);
      try {
        const res = await fetch("/api/upload", {
          method: "POST",
          body: fileForm,
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Cover upload failed");
        coverUrl = data.url;
      } catch (error: any) {
        setError(error.message);
        setUploading(false);
        return;
      }
    }

    try {
      const res = await fetch("/api/admin/events/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          location,
          date: new Date(date).toISOString(),
          coverUrl,
          archive,
        }),
      });

      if (!res.ok) throw new Error("Failed to create event");
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
        <CardTitle className="text-lg font-medium">Create Event</CardTitle>
      </CardHeader>
      <form action={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              placeholder="Enter event title"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Enter event description"
              className="min-h-[120px]"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              name="location"
              placeholder="Enter event location"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="date">Date and Time</Label>
            <Input id="date" name="date" type="datetime-local" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="cover">Cover Image</Label>
            <Input
              id="cover"
              type="file"
              onChange={(e) => setCoverFile(e.target.files?.[0] || null)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="archive">Archive Link</Label>
            <Input
              id="archive"
              name="archive"
              placeholder="Enter a drive (Google-drive or Onedrive) link"
            />
          </div>

          {error && (
            <p className="text-red-600 text-sm flex items-center gap-2">
              <CircleAlert className="text-red-600" size={16} />
              {error}
            </p>
          )}
          {success && (
            <p className="text-green-600 text-sm flex items-center gap-2">
              <CircleCheckBig className="text-green-600" size={16} />
              Event created successfully
            </p>
          )}
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button type="submit" className="bg-blue-dark" disabled={uploading}>
            {uploading ? "Creating..." : "Create Event"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default CreateEventForm;
