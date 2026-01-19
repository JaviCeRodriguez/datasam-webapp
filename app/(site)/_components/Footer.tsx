import Link from "next/link"
import { Github, Instagram } from "lucide-react"
import Image from "next/image"

export const Footer = () => {
  return (
    <footer className="bg-card border-t border-border py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="w-full mx-auto flex justify-center items-center mb-4">
            <Image
              src="/images/logo_h_claro_final.svg"
              alt="DataSam"
              width={200}
              height={200}
            />
          </div>
          <p className="text-muted-foreground mb-6">Donde el conocimiento se comparte y la comunidad se fortalece 🚀</p>
          <div className="flex justify-center space-x-6 mb-8">
            <Link href="https://github.com/JaviCeRodriguez/datasam-webapp" target="_blank" className="text-muted-foreground hover:text-primary transition-colors">
              <Github className="h-6 w-6" />
            </Link>
            <Link href="https://www.instagram.com/datasamok/" target="_blank" className="text-muted-foreground hover:text-primary transition-colors">
              <Instagram className="h-6 w-6" />
            </Link>
          </div>
          <div className="border-t border-border pt-8">
            <p className="text-sm text-muted-foreground">
              Web desarrollada por <Link href="https://javo.com.ar/" target="_blank" className="text-muted-foreground hover:text-primary transition-colors font-semibold">Javo</Link> (con muchos 🧉), para{" "}
              <span className="text-secondary font-semibold">DATA SAM</span> © 2025
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
