"use server";

import { auth, signOut } from "@/auth";
import { db } from "@/db";
import { sessions } from "@/db/schema";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";

export async function getCurrentSession() {
  const session = await auth();

  if (!session) {
    return null;
  }

  const cookieStore = cookies();
  const sessionToken = (await cookieStore).get("authjs.session-token")?.value;

  if (!sessionToken) {
    return null;
  }

  const currentSession = await db
    .select()
    .from(sessions)
    .where(eq(sessions.sessionToken, sessionToken))
    .then((results) => results[0]);

  return currentSession;
}

export async function getSessions() {
  const session = await auth();

  if (!session) {
    return [];
  }
  const userId = session?.user?.id as string;
  const allSessions = db
    .select()
    .from(sessions)
    .where(eq(sessions.userId, userId));

  return allSessions;
}

export async function logOutAllSessions() {
  const session = await auth();

  if (!session) {
    return;
  }

  const userId = session?.user?.id as string;

  await signOut({ redirect: false });
  await db.delete(sessions).where(eq(sessions.userId, userId));
}

export async function logOutSession(sessionToken: string) {
  const currentSession = await getCurrentSession();

  await db.delete(sessions).where(eq(sessions.sessionToken, sessionToken));

  if (currentSession && currentSession.sessionToken === sessionToken) {
    await signOut({ redirect: false });
  }
}
