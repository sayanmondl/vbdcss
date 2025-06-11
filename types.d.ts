interface User {
  id: string;
  email: string;
  emailVerified?: Date | null;
  name: string;
  image?: string | null;
  role: "student" | "scholar" | "prof" | string;
  isAdmin: boolean;
  semester:
    | "_"
    | "I"
    | "II"
    | "III"
    | "IV"
    | "V"
    | "VI"
    | "VII"
    | "VIII"
    | string;
  year?: number | null;
  active: boolean;
  about?: string | null;
  links?: string[] | null;
  goodIn?: string[] | null;
}

interface Announcement {
  id: number;
  title: string;
  info: string;
  attachment?: string | null;
  isImportant?: boolean | null;
  publish: Date;
}

export interface Event {
  id: number;
  title: string;
  description: string;
  location?: string | null;
  date: Date | string;
  coverUrl?: string | null;
  archive?: string | null;
}

interface Tournament {
  id: number;
  name: string;
  sport: string;
  description?: string | null;
  startDate: Date | string;
  endDate: Date | string;
  location?: string | null;
}

interface Team {
  id: number;
  name: string;
  sport: string;
  year: number;
  captainId: string;
  logoUrl: string | null;
  tournamentPlayed: number;
}
