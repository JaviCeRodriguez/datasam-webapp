import { Link } from "react-router-dom";
import { Menu, CandlestickChart } from "lucide-react";
import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
// import ProfileDropdown from "@/components/shared/profile-dropdown";

const Navbar = () => {
  return (
    <header className="sticky top-0 flex items-center h-16 gap-4 px-4 border-b bg-background md:px-6">
      <nav className="flex-col hidden gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link
          to="/"
          className="flex items-center gap-2 text-lg font-semibold md:text-base"
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
          to="/profiles"
          className="transition-colors text-muted-foreground hover:text-foreground"
          unstable_viewTransition
        >
          Perfiles
        </Link>
        <Link
          to="/jobs"
          className="transition-colors text-muted-foreground hover:text-foreground"
          unstable_viewTransition
        >
          Ofertas
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
              to="/profiles"
              className="text-muted-foreground hover:text-foreground"
              unstable_viewTransition
            >
              Perfiles
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
      {/* <div className="flex items-center w-full gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <form className="flex-1 ml-auto sm:flex-initial">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products..."
              className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
            />
          </div>
        </form>
        <ProfileDropdown />
      </div> */}
    </header>
  );
};

export default Navbar;
