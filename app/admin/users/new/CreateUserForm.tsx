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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CircleAlert, CircleCheckBig } from "lucide-react";
import { useState } from "react";

const CreateUserForm = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [links, setLinks] = useState<string[]>([]);
  const [goodIn, setGoodIn] = useState<string[]>([]);
  const [newLink, setNewLink] = useState("");
  const [newSkill, setNewSkill] = useState("");

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

  const handleSubmit = async (formData: FormData) => {
    setUploading(true);
    setError(null);
    setSuccess(false);

    let imageUrl;
    const email = formData.get("email") as string;
    const name = formData.get("name") as string;
    const role = formData.get("role") as string;
    const year = formData.get("year")
      ? Number.parseInt(formData.get("year") as string)
      : null;
    const active = formData.get("active") === "on";
    const isAdmin = formData.get("isAdmin") === "on";
    const about = formData.get("about") as string;

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
        imageUrl = data.url;
      } catch (error: any) {
        setError(error.message);
        setUploading(false);
        return;
      }
    }

    try {
      const res = await fetch("/api/admin/users/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          name,
          role,
          isAdmin,
          year,
          active,
          about,
          links,
          goodIn,
          image: imageUrl,
        }),
      });

      if (!res.ok) throw new Error("Failed to create user");
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
          <CardTitle className="text-lg font-medium">Create User</CardTitle>
        </CardHeader>
        <form action={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter user email"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="Enter user name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Select name="role" defaultValue="student">
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
              <Checkbox id="isAdmin" name="isAdmin" />
              <Label htmlFor="isAdmin">Set Admin</Label>
            </div>

            <div className="space-y-2">
              <Label htmlFor="year">Year</Label>
              <Input
                id="year"
                name="year"
                type="number"
                placeholder="Enter year"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="about">About</Label>
              <Textarea
                id="about"
                name="about"
                placeholder="Enter user bio"
                className="min-h-[120px]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">Profile Image</Label>
              <Input
                id="image"
                type="file"
                accept="image/*"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
              />
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
              <Checkbox id="active" name="active" defaultChecked />
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
                User created successfully
              </p>
            )}
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button type="submit" className="bg-blue-dark" disabled={uploading}>
              {uploading ? "Creating..." : "Create User"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default CreateUserForm;
