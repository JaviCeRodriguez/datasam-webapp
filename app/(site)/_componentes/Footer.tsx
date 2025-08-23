import Link from "next/link"
import { Github, Instagram } from "lucide-react"

export const Footer = () => {
  return (
    <footer className="bg-card border-t border-border py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="text-3xl font-bold font-poppins mb-4">
            <span className="text-primary">DATA</span>
            <span className="text-secondary">SAM</span>
          </div>
          <p className="text-muted-foreground mb-6">Donde el conocimiento se comparte y la comunidad se fortalece 🚀</p>
          <div className="flex justify-center space-x-6 mb-8">
            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
              <Github className="h-6 w-6" />
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
              <Instagram className="h-6 w-6" />
            </Link>
          </div>
          <div className="border-t border-border pt-8">
            <p className="text-sm text-muted-foreground">
              Web desarrollada por <span className="text-primary font-semibold">Javo</span> (con muchos 🧉), para{" "}
              <span className="text-secondary font-semibold">DATA SAM</span> © 2025
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
