"use client";

import { useSearchParams } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { AlertCircle } from "lucide-react";

export default function ErrorPage() {
  const searchParams = useSearchParams();
  const error = searchParams?.get("error");

  const errorMessages: Record<string, string> = {
    Configuration: "There is a problem with the server configuration.",
    AccessDenied: "You do not have access to this resource.",
    Verification: "The token has expired or has already been used.",
    Default: "An unexpected error occurred. Please try again.",
  };

  const errorMessage = error
    ? errorMessages[error] || errorMessages.Default
    : errorMessages.Default;

  return (
    <div className="flex items-center justify-center min-h-screen p-4 font-barlow">
      <Card className="w-full max-w-md bg-blue-fade shadow-none">
        <CardHeader className="text-center">
          <AlertCircle className="mx-auto h-12 w-12 text-destructive mb-4" />
          <CardTitle className="font-medium text-xl">
            Authentication Error
          </CardTitle>
          <CardDescription>{errorMessage}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-6">
            <Link href="/auth/signin" className="flex-1">
              <Button className="w-full bg-blue-dark">Try Again</Button>
            </Link>
            <Link href="/" className="flex-1">
              <Button variant="outline" className="w-full hover:bg-slate-300">
                Back to Home
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
