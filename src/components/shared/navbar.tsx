import { Link } from "react-router-dom";
import { Menu, CandlestickChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import ProfileDropdown from "@/components/shared/profile-dropdown";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 flex items-center h-16 gap-4 px-4 bg-white border-b md:px-6">
      <nav className="flex-col hidden gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link
          to="/"
          className="flex items-center gap-2 text-lg font-semibold md:text-base"
          unstable_viewTransition
        >
          <CandlestickChart className="w-6 h-6" />
          <span className="sr-only">DATASAM</span>
        </Link>
        <Link
          to="/"
          className="transition-colors text-muted-foreground hover:text-foreground"
          unstable_viewTransition
        >
          Inicio
        </Link>
        <Link
          to="/projects"
          className="transition-colors text-muted-foreground hover:text-foreground"
          unstable_viewTransition
        >
          Proyectos
        </Link>
        <Link
          to="/jobs"
          className="transition-colors text-muted-foreground hover:text-foreground"
          unstable_viewTransition
        >
          Ofertas
        </Link>
        <Link
          to="/subjects"
          className="transition-colors text-muted-foreground hover:text-foreground"
          unstable_viewTransition
        >
          Materias
        </Link>
        <Link
          to="/qr"
          className="transition-colors text-muted-foreground hover:text-foreground"
          unstable_viewTransition
        >
          QR
        </Link>
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="w-5 h-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              to="/"
              className="flex items-center gap-2 text-lg font-semibold"
              unstable_viewTransition
            >
              <CandlestickChart className="w-6 h-6" />
              <span className="sr-only">DATASAM</span>
            </Link>
            <Link
              to="/"
              className="text-muted-foreground hover:text-foreground"
              unstable_viewTransition
            >
              Inicio
            </Link>
            <Link
              to="/projects"
              className="text-muted-foreground hover:text-foreground"
              unstable_viewTransition
            >
              Proyectos
            </Link>
            <Link
              to="/jobs"
              className="text-muted-foreground hover:text-foreground"
              unstable_viewTransition
            >
              Ofertas
            </Link>
            <Link
              to="/qr"
              className="text-muted-foreground hover:text-foreground"
              unstable_viewTransition
            >
              QR
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
      <div className="flex justify-end w-full">
        <ProfileDropdown />
      </div>
    </header>
  );
};

export default Navbar;
