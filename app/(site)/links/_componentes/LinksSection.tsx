"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { allLinks } from "@/lib/links-data"
import { ExternalLink } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export function LinksSection() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold font-poppins mb-4">Links Útiles</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-8"></div>
          <p className="text-lg text-muted-foreground">Enlaces esenciales para la comunidad DataSam</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allLinks.map((link, index) => (
            <Link key={index} href={link.link} target="_blank" rel="noopener noreferrer">
              <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center">
                      <div className="mr-3 w-6 h-6 relative">
                        <Image
                          src={link.image || "/placeholder.svg"}
                          alt={link.name}
                          width={24}
                          height={24}
                          className="rounded"
                        />
                      </div>
                      {link.name}
                    </CardTitle>
                    <ExternalLink className="h-4 w-4 text-muted-foreground" />
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{link.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
