import { sql } from "drizzle-orm";
import {
  boolean,
  date,
  index,
  integer,
  pgEnum,
  pgTable,
  primaryKey,
  serial,
  text,
  timestamp,
  uniqueIndex,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import type { AdapterAccountType } from "next-auth/adapters";

export const USER_ROLE_ENUM = pgEnum("user_role", [
  "student",
  "scholar",
  "prof",
]);
export const RESOURCE_TYPE_ENUM = pgEnum("resource_type", [
  "code",
  "notes",
  "pyqs",
]);

export const users = pgTable(
  "users",
  {
    id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
    email: varchar("email", { length: 255 }).notNull().unique(),
    emailVerified: timestamp("emailVerified", { mode: "date" }),
    name: varchar("name", { length: 255 }).notNull(),
    image: text("image"),
    role: USER_ROLE_ENUM("role").default("student").notNull(),
    year: integer("year"),
    active: boolean("active").default(true).notNull(),
    isAdmin: boolean("is_admin").default(false).notNull(),
    about: text("about"),
    links: text("links")
      .array()
      .default(sql`ARRAY[]::text[]`),
    goodIn: text("goodIn")
      .array()
      .default(sql`ARRAY[]::text[]`),
  },
  (table) => [
    index("users_role_idx").on(table.role),
    index("users_year_idx").on(table.year),
  ]
);

export const announcements = pgTable(
  "announcements",
  {
    id: serial("id").primaryKey(),
    title: varchar("title", { length: 255 }).notNull(),
    info: text("info").notNull(),
    attachment: text("attachment"),
    isImportant: boolean("is_important").default(false),
    publish: timestamp("publish").defaultNow().notNull(),
  },
  (table) => [
    index("announcements_publish_idx").on(table.publish),
    index("announcements_important_idx").on(table.isImportant),
  ]
);

export const events = pgTable(
  "events",
  {
    id: serial("id").primaryKey(),
    title: varchar("title", { length: 255 }).notNull(),
    description: text("description").notNull(),
    location: varchar("location", { length: 255 }),
    date: timestamp("date").notNull(),
    coverUrl: varchar("cover_url", { length: 255 }),
    archive: varchar("archive", { length: 255 }),
  },
  (table) => [
    index("events_date_idx").on(table.date),
    index("events_location_idx").on(table.location),
  ]
);

export const sportsTeams = pgTable(
  "sports_teams",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 100 }).notNull(),
    sport: varchar("sport", { length: 100 }).notNull(),
    year: integer("year").notNull(),
    captainId: uuid("captain_id")
      .notNull()
      .references(() => users.id),
    logoUrl: varchar("logo_url", { length: 255 }),
    tournamentPlayed: integer("tournament_played")
      .references(() => tournaments.id)
      .notNull(),
  },
  (table) => [
    index("sports_teams_captain_id_idx").on(table.captainId),
    index("sports_teams_tournament_idx").on(table.tournamentPlayed),
    index("sports_teams_sport_year_idx").on(table.sport, table.year),
  ]
);

export const teamMembers = pgTable(
  "team_members",
  {
    teamId: integer("team_id")
      .references(() => sportsTeams.id)
      .notNull(),
    userId: uuid("user_id")
      .references(() => users.id)
      .notNull(),
  },
  (table) => [
    uniqueIndex("team_user_idx").on(table.teamId, table.userId),
    index("team_members_team_id_idx").on(table.teamId),
    index("team_members_user_id_idx").on(table.userId),
  ]
);

export const tournaments = pgTable(
  "tournaments",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    sport: varchar("sport", { length: 100 }).notNull(),
    description: text("description"),
    startDate: date("start_date").notNull(),
    endDate: date("end_date").notNull(),
    location: varchar("location", { length: 255 }),
  },
  (table) => [
    index("tournaments_sport_idx").on(table.sport),
    index("tournaments_date_range_idx").on(table.startDate, table.endDate),
    index("tournaments_location_idx").on(table.location),
  ]
);

export const resources = pgTable(
  "resources",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    description: text("description"),
    type: RESOURCE_TYPE_ENUM("type").default("notes").notNull(),
    fileUrl: varchar("file_url", { length: 255 }).notNull(),
    uploaderId: uuid("uploader_id")
      .references(() => users.id)
      .notNull(),
    subject: varchar("subject", { length: 100 }),
  },
  (table) => [
    index("resources_uploader_id_idx").on(table.uploaderId),
    index("resources_type_subject_idx").on(table.type, table.subject),
    index("resources_type_idx").on(table.type),
  ]
);

export const accounts = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccountType>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => [
    {
      compoundKey: primaryKey({
        columns: [account.provider, account.providerAccountId],
      }),
    },
  ]
);

export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").primaryKey(),
  userId: uuid("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (verificationToken) => [
    {
      compositePk: primaryKey({
        columns: [verificationToken.identifier, verificationToken.token],
      }),
    },
  ]
);

export const authenticators = pgTable(
  "authenticator",
  {
    credentialID: text("credentialID").notNull().unique(),
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    providerAccountId: text("providerAccountId").notNull(),
    credentialPublicKey: text("credentialPublicKey").notNull(),
    counter: integer("counter").notNull(),
    credentialDeviceType: text("credentialDeviceType").notNull(),
    credentialBackedUp: boolean("credentialBackedUp").notNull(),
    transports: text("transports"),
  },
  (authenticator) => [
    {
      compositePK: primaryKey({
        columns: [authenticator.userId, authenticator.credentialID],
      }),
    },
  ]
);
