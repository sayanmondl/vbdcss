"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CircleAlert, CircleCheckBig, X } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState, useEffect } from "react";

interface Team {
  id: number;
  name: string;
  sport: string;
  year: number;
  captainId: string;
  logoUrl: string | null;
  tournamentPlayed: number;
}

interface TeamMember {
  teamId: number;
  userId: string;
}

interface User {
  id: string;
  name: string;
  image?: string;
  semester?: string;
  course?: string;
}

interface TeamMemberWithName extends TeamMember {
  userName?: string;
  userImage?: string;
  userSemester?: string;
  userCourse?: string;
}

interface UpdateTeamFormProps {
  team: Team;
  members: TeamMember[];
}

const UpdateTeamForm = ({ team, members }: UpdateTeamFormProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [teamMembers, setTeamMembers] = useState<TeamMemberWithName[]>(members);
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [loadingUsers, setLoadingUsers] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/admin/users");
        if (!res.ok) throw new Error("Failed to fetch users");
        const data = await res.json();
        setAllUsers(data);

        const enrichedMembers = members.map((member) => {
          const user = data.find((u: User) => u.id === member.userId);
          return {
            ...member,
            userName: user?.name,
            userImage: user?.image,
            userSemester: user?.semester,
            userCourse: user?.course,
          };
        });
        setTeamMembers(enrichedMembers);
      } catch (err) {
        console.error("Error fetching users:", err);
      } finally {
        setLoadingUsers(false);
      }
    };

    fetchUsers();
  }, [members]);

  const handleSearch = async (value: string) => {
    setSearchQuery(value);
    if (value.trim().length > 0) {
      setShowDropdown(true);
    }
  };

  const filteredUsers = allUsers.filter((user) => {
    const alreadyAdded = teamMembers.some((m) => m.userId === user.id);
    const matchesSearch = user.name
      ?.toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesSearch && !alreadyAdded;
  });

  const addMember = (user: User) => {
    setTeamMembers((prev) => [
      ...prev,
      {
        teamId: team.id,
        userId: user.id,
        userName: user.name,
        userImage: user.image,
        userSemester: user.semester,
        userCourse: user.course,
      },
    ]);
    setSearchQuery("");
    setShowDropdown(false);
  };

  const removeMember = (userId: string) => {
    setTeamMembers((prev) => prev.filter((m) => m.userId !== userId));
  };

  const handleSubmit = async (formData: FormData) => {
    setUpdating(true);
    setError(null);
    setSuccess(false);

    let logoUrl = team.logoUrl;
    const name = formData.get("name") as string;
    const sport = formData.get("sport") as string;
    const year = Number.parseInt(formData.get("year") as string);
    const tournamentId = Number.parseInt(formData.get("tournament") as string);

    if (file) {
      const uploadForm = new FormData();
      uploadForm.append("file", file);
      try {
        const res = await fetch("/api/upload", {
          method: "POST",
          body: uploadForm,
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Logo upload failed");
        logoUrl = data.url;
      } catch (error: any) {
        setError(error.message);
        setUpdating(false);
        return;
      }
    }

    try {
      const res = await fetch(`/api/admin/sports-teams/${team.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          sport,
          year,
          logoUrl,
          tournamentPlayed: tournamentId,
          members: teamMembers.map((m) => m.userId),
        }),
      });

      if (!res.ok) throw new Error("Failed to update team");
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setUpdating(false);
    }
  };

  return (
    <Card className="sticky top-4">
      <CardHeader>
        <CardTitle className="text-lg">Update Team</CardTitle>
      </CardHeader>
      <form action={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm">
              Team Name
            </Label>
            <Input id="name" name="name" defaultValue={team.name} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="sport" className="text-sm">
              Sport
            </Label>
            <Input id="sport" name="sport" defaultValue={team.sport} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="year" className="text-sm">
              Year
            </Label>
            <Input
              id="year"
              name="year"
              type="number"
              defaultValue={team.year}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tournament" className="text-sm">
              Last Tournament
            </Label>
            <Select
              name="tournament"
              defaultValue={team.tournamentPlayed.toString()}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={team.tournamentPlayed.toString()}>
                  Tournament {team.tournamentPlayed}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="logo" className="text-sm">
              Logo
            </Label>
            <Input
              id="logo"
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />
            {file && (
              <p className="text-xs text-muted-foreground">{file.name}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label className="text-sm">Add Members</Label>
            <div className="relative">
              <Input
                placeholder="Search and add players..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                onFocus={() => searchQuery && setShowDropdown(true)}
                disabled={loadingUsers}
              />
              {showDropdown && filteredUsers.length > 0 && (
                <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg max-h-40 overflow-y-auto">
                  {filteredUsers.map((user) => (
                    <button
                      key={user.id}
                      type="button"
                      onClick={() => addMember(user)}
                      className="w-full text-left px-3 py-2 hover:bg-gray-100 text-sm"
                    >
                      {user.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-sm">
              Team Members ({teamMembers.length})
            </Label>
            <div className="max-h-64 overflow-y-auto border rounded-md p-2 space-y-2">
              {teamMembers.length === 0 ? (
                <p className="text-xs text-muted-foreground text-center py-4">
                  No members yet
                </p>
              ) : (
                teamMembers.map((member) => (
                  <div
                    key={member.userId}
                    className="flex items-center justify-between gap-3 bg-gray-50 p-3 rounded text-sm"
                  >
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <Avatar className="h-8 w-8 flex-shrink-0">
                        <AvatarImage
                          src={member.userImage || ""}
                          alt={member.userName}
                        />
                        <AvatarFallback>
                          {member.userName?.substring(0, 2).toUpperCase() ||
                            "?"}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">
                          {member.userName || member.userId}
                        </p>
                        <div className="text-xs text-muted-foreground space-y-0.5">
                          {member.userSemester && (
                            <p>Sem: {member.userSemester}</p>
                          )}
                          {member.userCourse && (
                            <p className="truncate">
                              Course: {member.userCourse}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeMember(member.userId)}
                      className="text-red-500 hover:text-red-700 flex-shrink-0"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          {error && (
            <div className="text-red-600 text-sm flex items-center gap-2">
              <CircleAlert className="h-4 w-4" />
              {error}
            </div>
          )}

          {success && (
            <div className="text-green-600 text-sm flex items-center gap-2">
              <CircleCheckBig className="h-4 w-4" />
              Team updated successfully
            </div>
          )}

          <Button type="submit" className="w-full" disabled={updating}>
            {updating ? "Saving..." : "Save Changes"}
          </Button>
        </CardContent>
      </form>
    </Card>
  );
};

export default UpdateTeamForm;
