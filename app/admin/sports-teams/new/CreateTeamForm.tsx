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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CircleAlert, CircleCheckBig, Search, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface User {
  id: string;
  name: string;
  image?: string;
}

interface Tournament {
  id: string;
  name: string;
  sport: string;
}

const CreateTeamForm = () => {
  // Form related
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  // Data related
  const [fetchedUserData, setFetchedUserData] = useState<User[]>([]);
  const [fetchedTournamentData, setFetchedTournamentData] = useState<
    Tournament[]
  >([]);

  // Captain Selection
  const [selectedCaptain, setSelectedCaptain] = useState<User | null>(null);
  const [captainSearchQuery, setCaptainSearchQuery] = useState("");
  const [showCaptainDropdown, setShowCaptainDropdown] = useState(false);

  // Team members selection
  const [teamMembers, setTeamMembers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showMembersDropdown, setShowMembersDropdown] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersRes = await fetch("/api/admin/users");
        if (!usersRes.ok) throw new Error("Failed to fetch users");
        const usersData = await usersRes.json();
        setFetchedUserData(usersData);

        const tournamentsRes = await fetch("/api/admin/tournaments");
        if (!tournamentsRes.ok) throw new Error("Failed to fetch tournaments");
        const tournamentsData = await tournamentsRes.json();
        setFetchedTournamentData(tournamentsData);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load data. Please refresh the page.");
      }
    };
    fetchData();
  }, []);

  const filteredCaptains = captainSearchQuery
    ? fetchedUserData.filter((user) =>
        Object.values(user).some((value) =>
          String(value).toLowerCase().includes(captainSearchQuery.toLowerCase())
        )
      )
    : [];

  const filteredMembers = searchQuery
    ? fetchedUserData.filter(
        (user) =>
          Object.values(user).some((value) =>
            String(value).toLowerCase().includes(searchQuery.toLowerCase())
          ) && !teamMembers.some((member) => member.id === user.id)
      )
    : [];

  const addTeamMember = (user: User) => {
    setTeamMembers((prev) => [...prev, user]);
    setSearchQuery("");
    setShowMembersDropdown(false);
  };

  const removeTeamMember = (userId: string) => {
    setTeamMembers((prev) => prev.filter((member) => member.id !== userId));
  };

  const selectCaptain = (user: User) => {
    setTeamMembers((prev) => [user, ...prev]);
    setSelectedCaptain(user);
    setCaptainSearchQuery(user.name);
    setShowCaptainDropdown(false);
  };

  const handleSubmit = async (formData: FormData) => {
    setUploading(true);
    setError(null);
    setSuccess(false);

    let logoUrl;
    const name = formData.get("name") as string;
    const sport = formData.get("sport") as string;
    const year = Number.parseInt(formData.get("year") as string);
    const tournamentId = Number.parseInt(formData.get("tournament") as string);

    if (!selectedCaptain) {
      setError("Please select a captain");
      setUploading(false);
      return;
    }

    if (teamMembers.length === 0) {
      setError("Please add at least one team member");
      setUploading(false);
      return;
    }

    if (file) {
      const fileForm = new FormData();
      fileForm.append("file", file);
      try {
        const res = await fetch("/api/upload", {
          method: "POST",
          body: fileForm,
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Logo upload failed");
        logoUrl = data.url;
      } catch (error: any) {
        setError(error.message);
        setUploading(false);
        return;
      }
    }

    try {
      const res = await fetch("/api/admin/sports-teams/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          sport,
          year,
          captainId: selectedCaptain.id,
          logoUrl,
          tournamentPlayed: tournamentId,
          members: teamMembers.map((member) => member.id),
        }),
      });

      if (!res.ok) throw new Error("Failed to create team");
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
          Create Sports Team
        </CardTitle>
      </CardHeader>
      <form action={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Team Name</Label>
            <Input
              id="name"
              name="name"
              placeholder="Enter team name"
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
            <Label htmlFor="year">Year</Label>
            <Input
              id="year"
              name="year"
              type="number"
              placeholder="Enter year"
              defaultValue={new Date().getFullYear()}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tournament">Tournament</Label>
            <Select name="tournament">
              <SelectTrigger>
                <SelectValue placeholder="Select tournament" />
              </SelectTrigger>
              <SelectContent>
                {fetchedTournamentData.map((tournament) => (
                  <SelectItem
                    key={tournament.id}
                    value={tournament.id.toString()}
                    className="font-barlow"
                  >
                    {tournament.name} ({tournament.sport})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="captain">Captain</Label>
            <div className="relative">
              <Input
                id="captain-search"
                placeholder="Search for captain..."
                value={captainSearchQuery}
                onChange={(e) => {
                  setCaptainSearchQuery(e.target.value);
                  setShowCaptainDropdown(true);
                }}
                onFocus={() => setShowCaptainDropdown(true)}
              />
              <input
                type="hidden"
                name="captain"
                value={selectedCaptain?.name || ""}
                required
              />

              {showCaptainDropdown && filteredCaptains.length > 0 && (
                <div className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg max-h-60 overflow-auto border">
                  {filteredCaptains.map((captain) => (
                    <div
                      key={captain.id}
                      className="flex items-center p-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => selectCaptain(captain)}
                    >
                      <Avatar className="h-8 w-8 mr-2">
                        <AvatarImage
                          src={captain.image || ""}
                          alt={captain.name}
                        />
                        <AvatarFallback>
                          {captain.name.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{captain.name}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {selectedCaptain && (
              <div className="mt-2 p-2 bg-gray-50 rounded-md flex items-center justify-between">
                <div className="flex items-center">
                  <Badge className="mr-2 font-medium">Captain</Badge>
                  <span className="text-sm font-medium">
                    {selectedCaptain.name}
                  </span>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSelectedCaptain(null);
                    setCaptainSearchQuery("");
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="logo">Team Logo</Label>
            <Input
              id="logo"
              type="file"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />
          </div>

          <div className="space-y-2">
            <Label>Team Members</Label>
            <div className="relative">
              <div className="flex items-center border rounded-md">
                <Input
                  className="border-0"
                  placeholder="Search for team members..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowMembersDropdown(true);
                  }}
                  onFocus={() => setShowMembersDropdown(true)}
                />
              </div>

              {showMembersDropdown && filteredMembers.length > 0 && (
                <div className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg max-h-60 overflow-auto border">
                  {filteredMembers.map((user) => (
                    <div
                      key={user.id}
                      className="flex items-center p-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => addTeamMember(user)}
                    >
                      <Avatar className="h-8 w-8 mr-2">
                        <AvatarImage src={user.image || ""} alt={user.name} />
                        <AvatarFallback>
                          {user.name.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{user.name}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {searchQuery && filteredMembers.length === 0 && (
                <div className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg p-4 text-center border">
                  No users found
                </div>
              )}
            </div>

            {teamMembers.length > 0 && (
              <div className="mt-4 space-y-2">
                <Label>Selected Team Members ({teamMembers.length})</Label>
                <div className="grid gap-2">
                  {teamMembers.map((member) => (
                    <div
                      key={member.id}
                      className="flex items-center justify-between bg-blue-fade p-2 rounded-md"
                    >
                      <div className="flex items-center">
                        <Avatar className="h-8 w-8 mr-2">
                          <AvatarImage
                            src={member.image || ""}
                            alt={member.name}
                          />
                          <AvatarFallback>
                            {member.name.substring(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">{member.name}</p>
                        </div>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeTeamMember(member.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
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
              Team created successfully
            </p>
          )}
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button type="submit" className="bg-blue-dark" disabled={uploading}>
            {uploading ? "Creating..." : "Create Team"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default CreateTeamForm;
