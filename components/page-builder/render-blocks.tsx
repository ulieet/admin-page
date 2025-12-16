"use client"

import React, { useEffect, useState } from "react"
import { cargarConfiguracion } from "@/lib/blocks-storage"

import { BloqueHeader } from "@/components/bloques/header"
import { BloqueHero } from "@/components/bloques/hero"
import { BloqueFeatures } from "@/components/bloques/features"
import { BloqueFooter } from "@/components/bloques/footer"
import { BloqueTituloParrafos } from "@/components/bloques/TitulosParrafos"
import { BloqueServices } from "@/components/bloques/services"
import { BloqueGallery } from "@/components/bloques/gallery"
import { BloqueCTA } from "@/components/bloques/cta"
import { BloqueAbout } from "@/components/bloques/about"
import { BloqueBanner } from "@/components/bloques/banner"
import { BloqueStats } from "@/components/bloques/stats"
import { BloqueImageCardList } from "@/components/bloques/ImageCardList"
import { BloqueCards3 } from "@/components/bloques/cards-3"
import { BloqueForm } from "@/components/bloques/form"
import { BloqueContactForm } from "@/components/bloques/contact-form"
import { BloqueLogoMarquee } from "@/components/bloques/logo-marquee"
import { WhatsappFloatingButton } from "@/components/bloques/whatsapp-button"
import { BloqueTextoImagen } from "@/components/bloques/texto-imagen"

export function RenderBlocks({ blocks }: { blocks: any[] }) {
  const [config, setConfig] = useState<any>(null)

  useEffect(() => {
    const loadedConfig = cargarConfiguracion()
    setConfig(loadedConfig)
  }, [])

  const themeStyles = {
    "--color-primario": config?.estilos?.colores?.primario || "#1e3a8a",
    "--color-fondo": config?.estilos?.colores?.fondo || "#ffffff",
    "--color-texto": config?.estilos?.colores?.texto || "#0f172a",
    "--font-family": config?.estilos?.tipografia?.fuente || "Inter, sans-serif",
  } as React.CSSProperties

  if (!blocks || !Array.isArray(blocks)) return null

  return (
    <div 
      style={themeStyles} 
      className="flex flex-col w-full min-h-screen transition-colors duration-300 bg-[var(--color-fondo)] text-[var(--color-texto)]"
    >
      {blocks.map((block, index) => {
        const key = block.id || index 
        const type = block.type

        switch (type) {
          case "header": return <BloqueHeader key={key} data={block.data} />
          case "footer": return <BloqueFooter key={key} data={block.data} />
          case "hero": return <BloqueHero key={key} data={block.data} />
          case "banner": return <BloqueBanner key={key} data={block.data} />
          
          case "features": return <BloqueFeatures key={key} data={block.data} />
          case "services": return <BloqueServices key={key} data={block.data} />
          case "about": return <BloqueAbout key={key} data={block.data} />
          case "titulo-parrafos": return <BloqueTituloParrafos key={key} data={block.data} />
          
          case "image-card-list": return <BloqueImageCardList key={key} data={block.data} />
          case "cards-3": return <BloqueCards3 key={key} data={block.data} />
          
          case "gallery": return <BloqueGallery key={key} data={block.data} />
          case "logo-marquee": return <BloqueLogoMarquee key={key} data={block.data} />
          case "stats": return <BloqueStats key={key} data={block.data} />
          case "cta": return <BloqueCTA key={key} data={block.data} />
          
          case "form": return <BloqueForm key={key} data={block.data} />
          case "contact-form": return <BloqueContactForm key={key} data={block.data} />
          
          case "whatsapp": return <WhatsappFloatingButton key={key} data={block.data} />

          default: return null
        }
      })}
    </div>
  )
}