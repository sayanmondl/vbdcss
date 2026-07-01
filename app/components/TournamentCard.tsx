import type { Tournament } from "@/types";
import { MapPin, Calendar, Trophy, ArrowUpRight } from "lucide-react";

interface TournamentCardProps {
  tournament: Tournament;
}

const formatRange = (start: string, end: string) => {
  const s = new Date(start);
  const e = new Date(end);
  if (isNaN(s.getTime()) || isNaN(e.getTime())) return `${start} – ${end}`;
  const sameYear = s.getFullYear() === e.getFullYear();
  const sameMonth = sameYear && s.getMonth() === e.getMonth();
  const monthDay = (d: Date) =>
    d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  if (sameMonth) {
    return `${monthDay(s)} – ${e.getDate()}, ${e.getFullYear()}`;
  }
  return `${monthDay(s)} – ${monthDay(e)}, ${e.getFullYear()}`;
};

const TournamentCard = ({ tournament }: TournamentCardProps) => {
  return (
    <article className="group relative w-full overflow-hidden font-barlow rounded-md border border-border/60 bg-card shadow-[0_1px_2px_rgba(15,23,42,0.04),0_8px_24px_-12px_rgba(15,23,42,0.12)] transition-all duration-500 hover:-translate-y-1 hover:border-border hover:shadow-[0_2px_4px_rgba(15,23,42,0.06),0_24px_48px_-16px_rgba(15,23,42,0.2)]">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-[radial-gradient(circle,theme(colors.primary/25%),transparent_70%)] opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
      />

      <div className="min-h-36 relative flex items-start justify-between border-b border-border/60 bg-gradient-to-br from-muted/60 via-background to-background px-6 pt-6 pb-5">
        <div className="flex flex-col gap-3">
          <div className="inline-flex w-fit items-center gap-1.5 rounded-full border border-primary/15 bg-primary/8 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
            {tournament.sport}
          </div>
          <h3 className="line-clamp-2 text-2xl font-semibold leading-tight tracking-tight text-foreground">
            {tournament.name}
          </h3>
        </div>
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-foreground/95 text-background shadow-sm ring-1 ring-inset ring-white/10">
          <Trophy className="h-5 w-5" strokeWidth={2} />
        </div>
      </div>

      <div className="grid grid-cols-1 divide-y divide-border/60">
        <MetaRow
          icon={<Calendar className="h-4 w-4" />}
          label="Dates"
          value={formatRange(
            tournament.startDate as string,
            tournament.endDate as string,
          )}
        />
        {tournament.location && (
          <MetaRow
            icon={<MapPin className="h-4 w-4" />}
            label="Location"
            value={tournament.location}
          />
        )}
      </div>

      <div className="p-5 pt-4">
        <a href={`/sports/${tournament.id}`}>
          <button
            type="button"
            className="group/btn relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-md bg-blue-dark px-4 py-3 text-sm font-medium text-background transition-all duration-300 hover:gap-3"
          >
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover/btn:translate-x-full" />
            View Details
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:rotate-45" />
          </button>
        </a>
      </div>
    </article>
  );
};

const MetaRow = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) => (
  <div className="flex items-center gap-3 px-6 py-3.5">
    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
      {icon}
    </div>
    <div className="min-w-0 flex-1">
      <div className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground/70">
        {label}
      </div>
      <div className="truncate text-sm font-medium text-foreground">
        {value}
      </div>
    </div>
  </div>
);

export default TournamentCard;
