import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ExternalLink } from "lucide-react"
import { linksHome } from "@/lib/links-data"
import Link from "next/link"
import Image from "next/image"

export const ResourcesSection = () => {
  return (
    <section id="recursos" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold font-poppins mb-4">Links Útiles</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-8"></div>
          <p className="text-lg text-muted-foreground">Recursos esenciales para tu carrera en Ciencia de Datos</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {linksHome.map((resource, index) => (
            <Link key={index} href={resource.link} target="_blank" rel="noopener noreferrer">
              <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center">
                      <div className="mr-3 w-6 h-6 relative">
                        <Image
                          src={resource.image || "/placeholder.svg"}
                          alt={resource.name}
                          width={24}
                          height={24}
                          className="rounded"
                        />
                      </div>
                      {resource.name}
                    </CardTitle>
                    <ExternalLink className="h-4 w-4 text-muted-foreground" />
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{resource.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
