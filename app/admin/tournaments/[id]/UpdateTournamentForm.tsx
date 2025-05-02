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
import { Tournament } from "@/types";

interface UpdateTournamentFormProps {
  tournament: Tournament;
}

const UpdateTournamentForm = ({ tournament }: UpdateTournamentFormProps) => {
  const [name, setName] = useState(tournament.name);
  const [sport, setSport] = useState(tournament.sport);
  const [description, setDescription] = useState(tournament.description || "");
  const [location, setLocation] = useState(tournament.location || "");
  const [startDate, setStartDate] = useState(
    tournament.startDate instanceof Date
      ? tournament.startDate.toISOString().split("T")[0]
      : new Date(tournament.startDate).toISOString().split("T")[0]
  );
  const [endDate, setEndDate] = useState(
    tournament.endDate instanceof Date
      ? tournament.endDate.toISOString().split("T")[0]
      : new Date(tournament.endDate).toISOString().split("T")[0]
  );

  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);
    setError(null);
    setSuccess(false);

    if (new Date(startDate) > new Date(endDate)) {
      setError("Start date cannot be after end date");
      setUploading(false);
      return;
    }

    try {
      const res = await fetch(`/api/admin/tournaments/${tournament.id}`, {
        method: "PUT",
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

      if (!res.ok) throw new Error("Failed to update tournament");
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
        <CardTitle className="text-lg font-medium">Update Tournament</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Tournament Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter tournament name"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="sport">Sport</Label>
            <Input
              id="sport"
              value={sport}
              onChange={(e) => setSport(e.target.value)}
              placeholder="Enter sport name"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter tournament description"
              className="min-h-[120px]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter tournament location"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date</Label>
              <Input
                id="startDate"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="endDate">End Date</Label>
              <Input
                id="endDate"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                required
              />
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
              Tournament updated successfully
            </p>
          )}
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button type="submit" className="bg-blue-dark" disabled={uploading}>
            {uploading ? "Updating..." : "Update Tournament"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default UpdateTournamentForm;
