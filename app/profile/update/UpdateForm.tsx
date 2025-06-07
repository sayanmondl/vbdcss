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
import { ArrowBigRight, CircleAlert, CircleCheckBig } from "lucide-react";
import { useState } from "react";
import { User } from "@/types";

interface UserProps {
  user: User;
}

const UpdateForm = ({ user }: UserProps) => {
  const [email, setEmail] = useState(user.email);
  const [name, setName] = useState(user.name);
  const [year, setYear] = useState<number | undefined>(user.year || undefined);
  const [active, setActive] = useState(user.active);
  const [about, setAbout] = useState(user.about || "");
  const [links, setLinks] = useState<string[]>(user.links || []);
  const [goodIn, setGoodIn] = useState<string[]>(user.goodIn || []);
  const [newLink, setNewLink] = useState("");
  const [newSkill, setNewSkill] = useState("");
  const [imageUrl, setImageUrl] = useState<string | null>(user.image || null);
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);

    if (selectedFile) {
      const objectUrl = URL.createObjectURL(selectedFile);
      setPreviewUrl(objectUrl);

      return () => URL.revokeObjectURL(objectUrl);
    } else {
      setPreviewUrl(null);
    }
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
      const res = await fetch(`/api/users/${user.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          name,
          year,
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
      <Card className="rounded-lg shadow-none text-blue-dark">
        <CardHeader>
          <CardTitle className="text-xl font-medium">Update User</CardTitle>
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
              <div className="flex items-center space-x-4">
                <label
                  htmlFor="image"
                  className="cursor-pointer bg-blue-dark hover:bg-blue-middark text-white font-medium py-2 px-4 rounded-md shadow transition duration-300"
                >
                  Upload Image
                </label>
                <input
                  id="image"
                  type="file"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>
              <div className="flex gap-5">
                {imageUrl && (
                  <img
                    src={imageUrl}
                    alt="current-profile-image"
                    className="mt-2 rounded w-32 h-32 object-cover"
                  />
                )}
                {previewUrl && (
                  <img
                    src={previewUrl}
                    alt="preview"
                    className="mt-2 rounded w-32 h-32 object-cover"
                  />
                )}
              </div>
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

export default UpdateForm;
