"use client"

import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Share2, Download, Copy } from "lucide-react"

export const QRSection = () => {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "DataSam - Únete a la comunidad",
          text: "Mostrá el QR a tus amigos para que se unan a la comunidad de DATASAM",
          url: window.location.origin,
        })
      } catch (error) {
        console.log("Error sharing:", error)
      }
    }
  }

  const handleDownload = () => {
    const link = document.createElement("a")
    link.href = "https://datasam.com.ar/images/qr_datasam.svg"
    link.download = "qr_datasam.svg"
    link.click()
  }

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.origin)
      // Aquí podrías agregar un toast notification
    } catch (error) {
      console.log("Error copying to clipboard:", error)
    }
  }

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-poppins mb-6">
            ¡Compartí el <span className="text-primary">QR</span>!
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Mostrá el QR a tus amigos para que se unan a la comunidad de{" "}
            <span className="font-semibold text-primary">DATASAM</span>
          </p>
        </div>

        {/* QR Card */}
        <Card className="max-w-md mx-auto mb-8 shadow-lg">
          <CardContent className="p-8">
            <div className="bg-white p-6 rounded-lg mb-6">
              <Image
                src="https://datasam.com.ar/images/qr_datasam.svg"
                alt="QR Code DataSam"
                width={300}
                height={300}
                className="w-full h-auto"
                priority
              />
            </div>
            <p className="text-sm text-muted-foreground">Escaneá para acceder a DataSam</p>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button onClick={handleShare} className="bg-primary hover:bg-primary/90 flex items-center gap-2">
            <Share2 className="w-4 h-4" />
            Compartir QR
          </Button>
          <Button onClick={handleDownload} variant="outline" className="flex items-center gap-2 bg-transparent">
            <Download className="w-4 h-4" />
            Descargar QR
          </Button>
          <Button onClick={handleCopyLink} variant="outline" className="flex items-center gap-2 bg-transparent">
            <Copy className="w-4 h-4" />
            Copiar enlace
          </Button>
        </div>

        {/* Additional Info */}
        <div className="mt-12 p-6 bg-muted/50 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">¿Cómo funciona?</h3>
          <p className="text-muted-foreground">
            Tus amigos pueden escanear este código QR con la cámara de su teléfono para acceder directamente al sitio
            web de DataSam y unirse a nuestra comunidad de estudiantes.
          </p>
        </div>
      </div>
    </section>
  )
}
