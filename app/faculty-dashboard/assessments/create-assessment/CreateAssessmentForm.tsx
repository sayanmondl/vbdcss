"use client";

import type React from "react";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BookOpen, GraduationCap, FileText, Award, Book } from "lucide-react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { createAssessment } from "@/lib/assessments";

export function CreateAssessmentForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    subject: "",
    semester: "",
    course: "",
    total: "",
  });

  type Semester = "_" | "I" | "II" | "III" | "IV" | "V" | "VI" | "VII" | "VIII";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.semester || !formData.total) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await createAssessment({
        name: formData.name,
        subject: formData.subject,
        semester: formData.semester as Semester,
        course: formData.course as "B.Sc." | "M.Sc." | "_",
        total: Number.parseInt(formData.total),
      });

      if (result.success) {
        toast({
          title: "Success",
          description: `Assessment created with ${result.studentCount} students enrolled`,
        });
        router.push(`/faculty-dashboard/assessments/${result.assessmentId}`);
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to create assessment",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card className="font-barlow shadow-none">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Assessment Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              Assessment Name *
            </Label>
            <Input
              id="name"
              placeholder="e.g., Mid-Term Exam, Quiz 1, Final Project"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="subject" className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              Subject
            </Label>
            <Input
              id="subject"
              placeholder="e.g., Mathematics, Physics, Computer Science"
              value={formData.subject}
              onChange={(e) =>
                setFormData({ ...formData, subject: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="course" className="flex items-center gap-2">
              <Book className="w-4 h-4" />
              Course *
            </Label>
            <Select
              value={formData.course}
              onValueChange={(value) =>
                setFormData({ ...formData, course: value })
              }
              required
            >
              <SelectTrigger id="course">
                <SelectValue placeholder="Select Course" />
              </SelectTrigger>
              <SelectContent className="font-barlow">
                <SelectItem value="B.Sc.">B.Sc.</SelectItem>
                <SelectItem value="M.Sc.">M.Sc.</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="semester" className="flex items-center gap-2">
              <GraduationCap className="w-4 h-4" />
              Semester *
            </Label>
            <Select
              value={formData.semester}
              onValueChange={(value) =>
                setFormData({ ...formData, semester: value })
              }
              required
            >
              <SelectTrigger id="semester">
                <SelectValue placeholder="Select semester" />
              </SelectTrigger>
              <SelectContent className="font-barlow">
                <SelectItem value="I">Semester 1</SelectItem>
                <SelectItem value="II">Semester 2</SelectItem>
                <SelectItem value="III">Semester 3</SelectItem>
                <SelectItem value="IV">Semester 4</SelectItem>
                <SelectItem value="V">Semester 5</SelectItem>
                <SelectItem value="VI">Semester 6</SelectItem>
                <SelectItem value="VII">Semester 7</SelectItem>
                <SelectItem value="VIII">Semester 8</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-sm text-muted-foreground">
              All students from this semester will be automatically enrolled
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="total" className="flex items-center gap-2">
              <Award className="w-4 h-4" />
              Total Marks *
            </Label>
            <Input
              id="total"
              type="number"
              min="1"
              placeholder="e.g., 100"
              value={formData.total}
              onChange={(e) =>
                setFormData({ ...formData, total: e.target.value })
              }
              required
            />
          </div>

          <div className="pt-4 flex gap-3">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Creating..." : "Create Assessment"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
