import React from "react";
import { Navbar, NavbarContent, NavbarItem, Link } from "@nextui-org/react";

const CustomNavbar = () => {
  return (
    <Navbar position="static">
      <NavbarContent className="hidden sm:flex gap-4" justify="end">
        <NavbarItem>
          <Link color="foreground" href="/">
            Inicio
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href="/correlativas" aria-current="page">
            Correlativas
          </Link>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};

export default CustomNavbar;
