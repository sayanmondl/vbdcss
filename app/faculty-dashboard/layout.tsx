import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import NavbarDash from "../components/NavbarDash";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { FacultySidePanel } from "../components/faculty/FacultySidePanel";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div>
      <NavbarDash />
      <div className="flex min-h-screen flex-col md:flex-row">
        <div className="border-r bg-background h-screen w-64 hidden md:block">
          <FacultySidePanel />
        </div>
        <div className="flex-1">
          <Sheet>
            <SheetTitle className="sr-only">Admin Panel</SheetTitle>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="mx-4 mt-3 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0">
              <FacultySidePanel />
            </SheetContent>
          </Sheet>
          <main className="p-4 md:p-6">{children}</main>
        </div>
      </div>
    </div>
  );
};

export default Layout;
