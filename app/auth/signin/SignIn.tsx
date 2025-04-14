"use client";

import type React from "react";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const searchParams = useSearchParams();
  const callbackUrl = searchParams?.get("callbackUrl") || "/";
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await signIn("nodemailer", {
        email,
        redirect: false,
        callbackUrl,
      });

      if (result?.error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: result.error,
          className: "bg-red-700 border-none font-barlow text-white",
        });
      } else {
        setSuccess(true);
        toast({
          title: "Email sent",
          description: "Check your email to sign in.",
          variant: "default",
          className: "bg-green-700 border-none font-barlow text-white",
        });
      }
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        className: "bg-red-700 border-none font-barlow text-white",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-10 h-screen">
      <div className="flex rounded-3xl overflow-hidden h-full bg-blue-fade border">
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="w-full max-w-md font-barlow">
            <div className="mb-6">
              <h1 className="font-medium text-3xl mb-2">Sign In</h1>
              <p className="text-gray-500">
                Enter your email to receive a link to your E-Mail
              </p>
            </div>

            {success ? (
              <div className="space-y-4 flex flex-col items-center">
                <div className="p-4 bg-green-50 border border-green-200 rounded-md text-green-700">
                  Check your email! We've sent you a link to sign in.
                </div>
                <p className="text-xs text-gray-500">
                  If you don't see the email in your inbox, check your spam
                  folder.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={isLoading}
                    className="w-full"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-blue-middark"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending E-Mail...
                    </>
                  ) : (
                    "Send E-Mail"
                  )}
                </Button>
              </form>
            )}

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500">
                We'll email you a link. Open that link in a browser to sign in
                to your account.
              </p>
            </div>
          </div>
        </div>
        <div className="flex-1 bg-black relative">
          <Image
            src="/dept.png"
            alt="department"
            width={800}
            height={800}
            className="object-cover size-full opacity-40"
          />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
            <Image src="/logo.svg" alt="Logo" width={150} height={80} />
            <p className="font-barlow mt-6 text-white">
              Sign in to your account
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
