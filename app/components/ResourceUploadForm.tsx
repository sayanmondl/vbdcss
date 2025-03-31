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

export default function ResourceUploadForm() {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted");
  };

  return (
    <Card className="w-full max-w-6xl mx-auto rounded-none sm:rounded-xl mb-10 sm:my-10 font-barlow">
      <CardHeader>
        <CardTitle className="font-barlow font-medium text-blue-dark text-3xl">
          Upload Resource
        </CardTitle>
        <CardDescription>
          Upload a file along with its details. Supported formats include
          images, PDFs, documents, and more (except videos).
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
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
                accept="image/*,.pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.txt,.csv,.zip,.rar"
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
            <Input id="fileName" placeholder="Enter file name" required />
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
            />
          </div>

          <div className="space-y-2">
            <Label className="text-base">Options</Label>
            <RadioGroup defaultValue="code">
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
            <Select required>
              <SelectTrigger id="subject">
                <SelectValue placeholder="Select a subject" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="computerArchitecture">
                  Computer Architecture
                </SelectItem>
                <SelectItem value="operatingSystems">
                  Operating Systems
                </SelectItem>
                <SelectItem value="computerNetworks">
                  Computer Networks
                </SelectItem>
                <SelectItem value="databases">Databases</SelectItem>
                <SelectItem value="algorithms">Algorithms</SelectItem>
                <SelectItem value="dataStructures">Data Structures</SelectItem>
                <SelectItem value="java">Java Programming</SelectItem>
                <SelectItem value="python">Python Programming</SelectItem>
                <SelectItem value="cProgramming">C Programming</SelectItem>
                <SelectItem value="machineLearning">
                  Machine Learning
                </SelectItem>
                <SelectItem value="deepLearning">Deep Learning</SelectItem>
                <SelectItem value="artificialIntelligence">
                  Artificial Intelligence
                </SelectItem>
                <SelectItem value="cyberSecurity">Cyber Security</SelectItem>
                <SelectItem value="softwareEngineering">
                  Software Engineering
                </SelectItem>
                <SelectItem value="webDevelopment">Web Development</SelectItem>
                <SelectItem value="cloudComputing">Cloud Computing</SelectItem>
                <SelectItem value="computerGraphics">
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
          <Button type="submit" className="text-base">
            Upload Resource
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
