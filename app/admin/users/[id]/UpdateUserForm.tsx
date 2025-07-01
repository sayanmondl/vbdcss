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
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CircleAlert, CircleCheckBig } from "lucide-react";
import { useState } from "react";
import { User } from "@/types";

interface UserProps {
  user: User;
}

const UpdateUserForm = ({ user }: UserProps) => {
  const [email, setEmail] = useState(user.email);
  const [name, setName] = useState(user.name);
  const [role, setRole] = useState(user.role);
  const [isAdmin, setIsAdmin] = useState<boolean>(user.isAdmin);
  const [year, setYear] = useState<number | undefined>(user.year || undefined);
  const [semester, setSemester] = useState(user.semester);
  const [course, setCourse] = useState(user.course);
  const [active, setActive] = useState(user.active);
  const [about, setAbout] = useState(user.about || "");
  const [links, setLinks] = useState<string[]>(user.links || []);
  const [goodIn, setGoodIn] = useState<string[]>(user.goodIn || []);
  const [newLink, setNewLink] = useState("");
  const [newSkill, setNewSkill] = useState("");
  const [imageUrl, setImageUrl] = useState<string | null>(user.image || null);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const addLink = () => {
    if (newLink.trim()) {
      setLinks([...links, newLink.trim()]);
      setNewLink("");
    }
  };

  const removeLink = (index: number) => {
    setLinks(links.filter((_, i) => i !== index));
  };

  const addSkill = () => {
    if (newSkill.trim()) {
      setGoodIn([...goodIn, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const removeSkill = (index: number) => {
    setGoodIn(goodIn.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);
    setError(null);
    setSuccess(false);

    let uploadedUrl = imageUrl;

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
        setImageUrl(data.url);
      } catch (error: any) {
        setError(error.message);
        setUploading(false);
        return;
      }
    }

    try {
      const res = await fetch(`/api/admin/users/${user.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          name,
          role,
          isAdmin,
          year,
          semester,
          course,
          active,
          about,
          links,
          goodIn,
          image: uploadedUrl,
        }),
      });

      if (!res.ok) throw new Error("Failed to update user");
      setSuccess(true);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="font-barlow">
      <Card className="rounded-lg shadow-none">
        <CardHeader>
          <CardTitle className="text-lg font-medium">Update User</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter user email"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter user name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Select value={role} onValueChange={setRole}>
                <SelectTrigger>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="student">Student</SelectItem>
                  <SelectItem value="scholar">Scholar</SelectItem>
                  <SelectItem value="prof">Professor</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2 pt-2">
              <Checkbox
                id="isAdmin"
                checked={isAdmin}
                onCheckedChange={(checked) => setIsAdmin(Boolean(checked))}
              />
              <Label htmlFor="active">Active</Label>
            </div>

            <div className="space-y-2">
              <Label htmlFor="year">Year</Label>
              <Input
                id="year"
                type="number"
                value={year || ""}
                onChange={(e) =>
                  setYear(
                    e.target.value ? Number.parseInt(e.target.value) : undefined
                  )
                }
                placeholder="Enter year"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="semester">Semester</Label>
              <Select value={semester} onValueChange={setSemester}>
                <SelectTrigger>
                  <SelectValue placeholder="Select semester" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="_">--</SelectItem>
                  <SelectItem value="I">I</SelectItem>
                  <SelectItem value="II">II</SelectItem>
                  <SelectItem value="III">III</SelectItem>
                  <SelectItem value="IV">IV</SelectItem>
                  <SelectItem value="V">V</SelectItem>
                  <SelectItem value="VI">VI</SelectItem>
                  <SelectItem value="VII">VII</SelectItem>
                  <SelectItem value="VIII">VIII</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="course">Course</Label>
              <Select value={course} onValueChange={setCourse}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Course" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="_">--</SelectItem>
                  <SelectItem value="B.Sc.">B.Sc.</SelectItem>
                  <SelectItem value="M.Sc.">M.Sc.</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="about">About</Label>
              <Textarea
                id="about"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                placeholder="Enter user bio"
                className="min-h-[120px]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">Profile Image</Label>
              <Input
                id="image"
                type="file"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
              />
              {imageUrl && (
                <p className="text-sm text-gray-600">
                  Current image:{" "}
                  <a
                    href={imageUrl}
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
              <Label>Links</Label>
              <div className="flex gap-2">
                <Input
                  value={newLink}
                  onChange={(e) => setNewLink(e.target.value)}
                  placeholder="Add a link"
                />
                <Button type="button" variant="outline" onClick={addLink}>
                  Add
                </Button>
              </div>
              {links.length > 0 && (
                <div className="mt-2 space-y-2">
                  {links.map((link, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between bg-muted p-2 rounded"
                    >
                      <span className="text-sm truncate">{link}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeLink(index)}
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label>Skills</Label>
              <div className="flex gap-2">
                <Input
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  placeholder="Add a skill"
                />
                <Button type="button" variant="outline" onClick={addSkill}>
                  Add
                </Button>
              </div>
              {goodIn.length > 0 && (
                <div className="mt-2 space-y-2">
                  {goodIn.map((skill, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between bg-muted p-2 rounded"
                    >
                      <span className="text-sm truncate">{skill}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeSkill(index)}
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-center space-x-2 pt-2">
              <Checkbox
                id="active"
                checked={active}
                onCheckedChange={(checked) => setActive(Boolean(checked))}
              />
              <Label htmlFor="active">Active</Label>
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
                User updated successfully
              </p>
            )}
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button type="submit" className="bg-blue-dark" disabled={uploading}>
              {uploading ? "Updating..." : "Update User"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default UpdateUserForm;
