import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { db } from "@/db";
import { tournaments } from "@/db/schema";
import { formatDate } from "@/lib/utils";
import { eq } from "drizzle-orm";
import { CalendarIcon, MapPinIcon, Trophy } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Page = async ({ params }: { params: Promise<{ sportId: string }> }) => {
  const { sportId } = await params;
  const allTournamentsDetails = await db
    .select()
    .from(tournaments)
    .where(eq(tournaments.id, Number.parseInt(sportId)));

  const tournament = allTournamentsDetails[0];
  return (
    <div className="pagemargin">
      <div className="mb-6">
        <a href="/sports">
          <Button variant="outline" className="mb-6">
            ← Back to Tournaments
          </Button>
        </a>
      </div>

      <div className="">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-2xl md:text-3xl">
                    {tournament.name}
                  </CardTitle>
                  <CardDescription className="mt-2">
                    <Badge className="mr-2">{tournament.sport}</Badge>
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {tournament.description && (
                <div>
                  <h3 className="text-lg font-semibold mb-2">About</h3>
                  <p className="text-muted-foreground">
                    {tournament.description}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="my-8">
          <Card>
            <CardHeader>
              <CardTitle>Tournament Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start">
                <CalendarIcon className="h-5 w-5 mr-3 mt-0.5 text-muted-foreground" />
                <div>
                  <h4 className="font-medium">Dates</h4>
                  <p className="text-sm text-muted-foreground">
                    {formatDate(new Date(tournament.startDate))} -{" "}
                    {formatDate(new Date(tournament.endDate))}
                  </p>
                </div>
              </div>

              {tournament.location && (
                <div className="flex items-start">
                  <MapPinIcon className="h-5 w-5 mr-3 mt-0.5 text-muted-foreground" />
                  <div>
                    <h4 className="font-medium">Location</h4>
                    <p className="text-sm text-muted-foreground">
                      {tournament.location}
                    </p>
                  </div>
                </div>
              )}

              <div className="flex items-start">
                <Trophy className="h-5 w-5 mr-3 mt-0.5 text-muted-foreground" />
                <div>
                  <h4 className="font-medium">Sport</h4>
                  <p className="text-sm text-muted-foreground">
                    {tournament.sport}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Page;
