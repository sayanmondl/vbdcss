import { LogOut, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  getCurrentSession,
  getSessions,
  logOutAllSessions,
  logOutSession,
} from "@/lib/sessions";
import { formatDate } from "@/lib/utils";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function SessionsPage() {
  const session = await auth();
  if (!session) {
    redirect("/auth/signin");
  }

  const currentSession = await getCurrentSession();
  const allSessions = await getSessions();

  const currentSessionToken = currentSession?.sessionToken;

  return (
    <div className="container py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-teko font-medium">Your Sessions</h1>
        <form action={logOutAllSessions}>
          <Button variant="destructive" type="submit" className="font-barlow">
            <LogOut className="mr-2 h-4 w-4" />
            Log out all sessions
          </Button>
        </form>
      </div>

      <div className="grid gap-6">
        {allSessions.map((session) => {
          const isCurrentSession = session.sessionToken === currentSessionToken;
          const expiresDate = new Date(session.expires);

          return (
            <Card
              key={session.sessionToken}
              className={
                isCurrentSession
                  ? "bg-blue-fadedark font-barlow"
                  : "font-barlow"
              }
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-medium text-blue-dark">
                    Session {session.sessionToken.substring(0, 8)}...
                  </CardTitle>
                  {isCurrentSession && (
                    <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                      Current Session
                    </span>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="mr-2 h-4 w-4" />
                  <span>Expires: {formatDate(expiresDate)}</span>
                </div>
              </CardContent>
              <CardFooter>
                <form
                  action={async () => {
                    "use server";
                    await logOutSession(session.sessionToken);
                  }}
                >
                  <Button
                    variant={isCurrentSession ? "default" : "outline"}
                    type="submit"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    {isCurrentSession ? "Log out" : "Terminate session"}
                  </Button>
                </form>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
