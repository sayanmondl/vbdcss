"use client";

import type React from "react";

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
import { Event } from "@/types";

interface EventProps {
  event: Event;
}

const UpdateEventForm = ({ event }: EventProps) => {
  const [title, setTitle] = useState(event.title);
  const [description, setDescription] = useState(event.description);
  const [location, setLocation] = useState(event.location || "");
  const [date, setDate] = useState(
    event.date ? new Date(event.date).toISOString().slice(0, 16) : ""
  );
  const [coverUrl, setCoverUrl] = useState<string | null>(
    event.coverUrl || null
  );
  const [archiveUrl, setArchiveUrl] = useState(event.archive || "");
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);
    setError(null);
    setSuccess(false);

    let uploadedCoverUrl = coverUrl;

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
        uploadedCoverUrl = data.url;
        setCoverUrl(data.url);
      } catch (error: any) {
        setError(error.message);
        setUploading(false);
        return;
      }
    }

    try {
      const res = await fetch(`/api/admin/events/${event.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          location,
          date: new Date(date).toISOString(),
          coverUrl: uploadedCoverUrl,
          archiveUrl,
        }),
      });

      if (!res.ok) throw new Error("Failed to update event");
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
        <CardTitle className="text-lg font-medium">Update Event</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter event title"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter event description"
              className="min-h-[120px]"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter event location"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="date">Date and Time</Label>
            <Input
              id="date"
              type="datetime-local"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="cover">Cover Image</Label>
            <Input
              id="cover"
              type="file"
              onChange={(e) => setCoverFile(e.target.files?.[0] || null)}
            />
            {coverUrl && (
              <p className="text-sm text-gray-600">
                Current cover:{" "}
                <a
                  href={coverUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  View image
                </a>
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="archive">Archive Link</Label>
            <Input
              id="archive"
              placeholder="Enter archive link"
              value={archiveUrl}
              onChange={(e) => setArchiveUrl(e.target.value)}
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
              Event updated successfully
            </p>
          )}
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button type="submit" className="bg-blue-dark" disabled={uploading}>
            {uploading ? "Updating..." : "Update Event"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default UpdateEventForm;
