"use client"

import { useEffect, useState } from "react"
import { Menu, X } from "lucide-react"

import { Button } from "@/components/ui/button"

import { eventDetails, navItems } from "./event-data"

export function EventNavigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)

    handleScroll()
    window.addEventListener("scroll", handleScroll)

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        isScrolled ? "border-b bg-background/90 shadow-sm backdrop-blur-lg" : "bg-background/75 backdrop-blur"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1" />

          <div className="hidden items-center gap-6 md:flex">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="text-sm font-medium transition-colors hover:text-sky-700">
                {item.label}
              </a>
            ))}
          </div>

          <Button asChild className="hidden bg-[#0284c7] text-white hover:bg-[#0369a1] md:inline-flex">
            <a href={eventDetails.registrationUrl} target="_blank" rel="noopener noreferrer">
              Registrate
            </a>
          </Button>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen((value) => !value)}
            aria-label={isMobileMenuOpen ? "Cerrar menu" : "Abrir menu"}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>

        {isMobileMenuOpen ? (
          <div className="grid gap-3 border-t pt-4 md:hidden">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-medium transition-colors hover:text-sky-700"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <Button asChild className="bg-[#0284c7] text-white hover:bg-[#0369a1]">
              <a
                href={eventDetails.registrationUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Registrate
              </a>
            </Button>
          </div>
        ) : null}
      </div>
    </nav>
  )
}
