"use client";

import type React from "react";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Upload, File, X } from "lucide-react";

export default function ResourceUploadForm({ userId }: { userId: string }) {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleFileChange = (selectedFile: File | null) => {
    if (!selectedFile) return;

    if (selectedFile.type.startsWith("video/")) {
      alert("Video files are not allowed");
      return;
    }

    setFile(selectedFile);

    if (selectedFile.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target?.result as string);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setPreview(null);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const removeFile = () => {
    setFile(null);
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);
    setError(null);
    setSuccess(false);

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    let fileUrl;
    const fileName = formData.get("fileName") as string;
    const description = formData.get("description") as string;
    const resourceType = formData.get("resourceType") as string;
    const subject = formData.get("subject") as string;

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
        fileUrl = data.url;
      } catch (error: any) {
        setError(error.message);
        setUploading(false);
        return;
      }
    } else {
      setError("Please select a file to upload");
      setUploading(false);
      return;
    }

    try {
      const res = await fetch("/api/resources/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fileName,
          description,
          resourceType,
          subject,
          userId,
          fileUrl,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to create resource");

      setSuccess(true);
      form.reset();
      setFile(null);
      setPreview(null);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <Card className="w-full mb-10 font-barlow shadow-none border-none">
      <CardHeader className="p-0 py-6">
        <CardTitle className="font-barlow font-medium text-blue-dark text-3xl">
          Upload Resource
        </CardTitle>
        <CardDescription>
          Upload a file along with its details. Supported formats include
          images, PDFs, documents, and more (except videos)
          <br />
          <br />
          <strong className="font-teko text-lg font-medium text-blue-medium">
            Note! - ZIP your codes, PPTs and DOCXs before uploading.
          </strong>
        </CardDescription>
        {success && (
          <div className="mt-4 p-3 bg-green-50 text-green-700 rounded-md">
            Resource uploaded successfully!
          </div>
        )}
        {error && (
          <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-md">
            {error}
          </div>
        )}
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6 p-0 pb-6">
          <div className="space-y-2">
            <Label htmlFor="file" className="text-base">
              File Upload
            </Label>
            <div
              className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
                isDragging
                  ? "border-primary bg-primary/5"
                  : "border-muted-foreground/25"
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                type="file"
                id="file"
                ref={fileInputRef}
                className="hidden"
                onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
                accept="image/*,.pdf,.zip,"
              />

              {file ? (
                <div className="flex flex-col items-center gap-2">
                  {preview ? (
                    <div className="relative w-40 h-40 mx-auto mb-2">
                      <img
                        src={preview || "/placeholder.svg"}
                        alt="File preview"
                        className="w-full h-full object-contain"
                      />
                    </div>
                  ) : (
                    <File className="h-10 w-10 text-muted-foreground mb-2" />
                  )}
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium truncate max-w-[200px]">
                      {file.name}
                    </span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFile();
                      }}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </span>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2">
                  <Upload className="h-10 w-10 text-muted-foreground" />
                  <p className="text-base font-medium">
                    Drag and drop your file here or click to browse
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Supports images, PDFs, documents, and more (except videos)
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="fileName" className="text-base">
              File Name
            </Label>
            <Input
              id="fileName"
              placeholder="Enter file name"
              required
              name="fileName"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-base">
              File Description
            </Label>
            <Textarea
              id="description"
              placeholder="Enter a description of this resource"
              className="min-h-[100px]"
              required
              name="description"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-base">Options</Label>
            <RadioGroup
              defaultValue="code"
              name="resourceType"
              className="flex gap-6"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="code" id="code" />
                <Label htmlFor="code" className="cursor-pointer">
                  Code
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="notes" id="notes" />
                <Label htmlFor="notes" className="cursor-pointer">
                  Notes
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="pyqs" id="pyqs" />
                <Label htmlFor="pyqs" className="cursor-pointer">
                  PYQs
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="subject" className="text-base">
              Subject
            </Label>
            <Select name="subject" required>
              <SelectTrigger id="subject">
                <SelectValue placeholder="Select a subject" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Computer Architecture">
                  Computer Architecture
                </SelectItem>
                <SelectItem value="Operating Systems">
                  Operating Systems
                </SelectItem>
                <SelectItem value="Computer Networks">
                  Computer Networks
                </SelectItem>
                <SelectItem value="Databases">Databases</SelectItem>
                <SelectItem value="Algorithms">Algorithms</SelectItem>
                <SelectItem value="Data Structures">Data Structures</SelectItem>
                <SelectItem value="Java Programming">
                  Java Programming
                </SelectItem>
                <SelectItem value="Python Programming">
                  Python Programming
                </SelectItem>
                <SelectItem value="C Programming">C Programming</SelectItem>
                <SelectItem value="Machine Learning">
                  Machine Learning
                </SelectItem>
                <SelectItem value="Deep Learning">Deep Learning</SelectItem>
                <SelectItem value="Artificial Intelligence">
                  Artificial Intelligence
                </SelectItem>
                <SelectItem value="Cyber Security">Cyber Security</SelectItem>
                <SelectItem value="Software Engineering">
                  Software Engineering
                </SelectItem>
                <SelectItem value="Web Development">Web Development</SelectItem>
                <SelectItem value="Cloud Computing">Cloud Computing</SelectItem>
                <SelectItem value="Computer Graphics">
                  Computer Graphics
                </SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          <Button type="button" variant="outline" className="text-base">
            Cancel
          </Button>
          <Button type="submit" className="text-base bg-blue-dark" disabled={uploading}>
            {uploading ? "Uploading..." : "Upload Resource"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
