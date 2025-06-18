import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Mail, Calendar } from "lucide-react";

interface Professor {
  id: string;
  email: string;
  name: string;
  year: number | null;
  image: string | null;
}

interface ProfessorCardProps {
  professor: Professor;
}

export default function ProfessorCard({ professor }: ProfessorCardProps) {
  return (
    <Card className="w-full shadow-none">
      <CardContent className="p-6">
        <div className="flex items-center gap-6">
          <div className="flex-shrink-0">
            <Avatar className="h-20 w-20">
              <AvatarImage
                src={professor.image || "/placeholder.svg?height=80&width=80"}
                alt={professor.name}
              />
              <AvatarFallback className="text-lg">
                {professor.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-gray-900 truncate">
                  {professor.name}
                </h3>

                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Mail className="h-4 w-4" />
                  <span className="truncate">{professor.email}</span>
                </div>

                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <Badge variant="secondary" className="text-xs">
                    Since {professor.year}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
