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

const CreateTournamentForm = () => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const handleSubmit = async (formData: FormData) => {
    setUploading(true);
    setError(null);
    setSuccess(false);

    const name = formData.get("name") as string;
    const sport = formData.get("sport") as string;
    const description = formData.get("description") as string;
    const startDate = formData.get("startDate") as string;
    const endDate = formData.get("endDate") as string;
    const location = formData.get("location") as string;

    try {
      const res = await fetch("/api/admin/tournaments/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          sport,
          description,
          startDate,
          endDate,
          location,
        }),
      });

      if (!res.ok) throw new Error("Failed to create tournament");
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
        <CardTitle className="text-lg font-medium">Create Tournament</CardTitle>
      </CardHeader>
      <form action={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Tournament Name</Label>
            <Input
              id="name"
              name="name"
              placeholder="Enter tournament name"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="sport">Sport</Label>
            <Input
              id="sport"
              name="sport"
              placeholder="Enter sport name"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Enter tournament description"
              className="min-h-[120px]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              name="location"
              placeholder="Enter tournament location"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date</Label>
              <Input id="startDate" name="startDate" type="date" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="endDate">End Date</Label>
              <Input id="endDate" name="endDate" type="date" required />
            </div>
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
              Tournament created successfully
            </p>
          )}
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button type="submit" className="bg-blue-dark" disabled={uploading}>
            {uploading ? "Creating..." : "Create Tournament"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default CreateTournamentForm;
