"use client";

import { Menu, CandlestickChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import ProfileDropdown from "@/components/shared/profile-dropdown";
import Link from "next/link";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 flex items-center h-16 gap-4 px-4 bg-white border-b md:px-6">
      <nav className="flex-col hidden gap-6 text-lg md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-semibold md:text-base"
        >
          <CandlestickChart className="w-6 h-6" />
          <span className="sr-only">DATASAM</span>
        </Link>
        <Link
          href="/"
          className="font-semibold transition-colors text-muted-foreground hover:text-foreground"
        >
          Inicio
        </Link>
        {/* <Link
          href="/projects"
          className="font-semibold transition-colors text-muted-foreground hover:text-foreground"
        >
          Proyectos
        </Link>
        <Link
          href="/jobs"
          className="font-semibold transition-colors text-muted-foreground hover:text-foreground"
        >
          Ofertas
        </Link> */}
        <Link
          href="/subjects"
          className="font-semibold transition-colors text-muted-foreground hover:text-foreground"
        >
          Materias
        </Link>
        <Link
          href="/qr"
          className="font-semibold transition-colors text-muted-foreground hover:text-foreground"
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
              href="/"
              className="flex items-center gap-2 text-lg font-semibold"
            >
              <CandlestickChart className="w-6 h-6" />
              <span className="sr-only">DATASAM</span>
            </Link>
            <Link
              href="/"
              className="font-semibold text-muted-foreground hover:text-foreground"
            >
              Inicio
            </Link>
            {/* <Link
              href="/projects"
              className="font-semibold text-muted-foreground hover:text-foreground"
            >
              Proyectos
            </Link> */}
            {/* <Link
              href="/jobs"
              className="font-semibold text-muted-foreground hover:text-foreground"
            >
              Ofertas
            </Link> */}
            <Link
              href="/subjects"
              className="font-semibold text-muted-foreground hover:text-foreground"
            >
              Materias
            </Link>
            <Link
              href="/qr"
              className="font-semibold text-muted-foreground hover:text-foreground"
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
