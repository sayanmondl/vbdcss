import { notFound } from "next/navigation";
import { getResources } from "@/lib/resource";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Download, User, BookOpen, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { getIcon } from "@/app/components/ResourceCard";

export default async function ResourcePage({
  params,
}: {
  params: Promise<{ resourceId: string }>;
}) {
  const { resourceId } = await params;
  const resources = await getResources();
  const resource = resources.find((r) => r.id === resourceId);

  if (!resource) {
    notFound();
  }

  const getBackgroundColor = (type: string) => {
    switch (type) {
      case "code":
        return "bg-blue-50";
      case "notes":
        return "bg-amber-50";
      case "pyqs":
        return "bg-purple-50";
      default:
        return "bg-gray-50";
    }
  };

  return (
    <div className="pagemargin">
      <div className="mb-6 group">
        <Link href="/student/resources" className="button-white flex gap-3 w-min text-nowrap items-center !font-normal">
        <ArrowLeft size={16} className="text-blue-middark group-hover:text-white duration-200"/>
        All Resources
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card className="md:col-span-1">
          <div
            className={`h-48 flex items-center justify-center ${getBackgroundColor(resource.type)}`}
          >
            {getIcon(resource.type)}
          </div>
          <CardContent className="p-6">
            <div className="flex flex-col gap-4">
              <Button
                asChild
                className="w-full gap-2 bg-blue-dark hover:bg-blue-medium font-barlow text-base"
              >
                <a
                  href={resource.fileUrl}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Download className="h-4 w-4" />
                  Download Resource
                </a>
              </Button>

              <Separator />

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="font-barlow text-base">
                    Uploaded by {resource.uploader}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                  <span className="font-barlow text-base">
                    {resource.subject}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="md:col-span-2">
          <h1 className="text-4xl font-medium mb-4 font-teko text-blue-dark">
            {resource.name}
          </h1>

          <div className="bg-muted/40 p-4 rounded-md mb-6">
            <h2 className="font-medium mb-2 font-barlow text-lg">
              Description
            </h2>
            <p className="text-muted-foreground whitespace-pre-line font-barlow">
              {resource.description}
            </p>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4 font-barlow">
              Related Resources
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {resources
                .filter(
                  (r) => r.id !== resource.id && r.subject === resource.subject
                )
                .slice(0, 2)
                .map((relatedResource) => (
                  <Link
                    href={`/student/resources/${relatedResource.id}`}
                    key={relatedResource.id}
                  >
                    <Card className="h-full hover:shadow-md transition-shadow">
                      <CardContent className="p-4 flex items-center gap-3">
                        <div
                          className={`h-12 w-12 rounded-md flex items-center justify-center ${getBackgroundColor(relatedResource.type)}`}
                        >
                          {getIcon(relatedResource.type)}
                        </div>
                        <div>
                          <h3 className="font-medium text-base line-clamp-1 font-barlow">
                            {relatedResource.name}
                          </h3>
                          <p className="text-sm text-muted-foreground font-barlow">
                            {relatedResource.subject}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
            </div>
          </div>
        </div>
        <div className="h-10"></div>
      </div>
    </div>
  );
}
