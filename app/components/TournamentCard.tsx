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
    <article className="group w-full overflow-hidden font-barlow rounded-md border border-border/60 bg-card shadow-sm">
      <div className="min-h-36 flex items-start justify-between border-b border-border/60 bg-muted/40 px-6 pt-6 pb-5">
        <div className="flex flex-col gap-3">
          <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-primary/15 bg-primary/8 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            {tournament.sport}
          </span>
          <h3 className="line-clamp-2 text-2xl font-semibold leading-tight tracking-tight text-foreground">
            {tournament.name}
          </h3>
        </div>
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-foreground/95 text-background">
          <Trophy className="h-5 w-5" strokeWidth={2} />
        </div>
      </div>

      <div className="divide-y divide-border/60">
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
            className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-blue-dark px-4 py-3 text-sm font-medium text-background transition-colors duration-200 hover:bg-blue-medium"
          >
            View Details
            <ArrowUpRight className="h-4 w-4" />
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