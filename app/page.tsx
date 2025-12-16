"use client"

import { useEffect, useState } from "react"
import { cargarConfiguracion } from "@/lib/blocks-storage"
import type { Block, StyleConfig } from "@/lib/types/blocks"

// --- IMPORTS DE COMPONENTES EXISTENTES ---
import { BloqueHeader } from "@/components/bloques/header"
import { BloqueHero } from "@/components/bloques/hero"
import { BloqueFooter } from "@/components/bloques/footer"
import { BloqueBanner } from "@/components/bloques/banner"
import { BloqueCards3 } from "@/components/bloques/cards-3"
import { BloqueForm } from "@/components/bloques/form"
import { BloqueGallery } from "@/components/bloques/gallery"
import { BloqueLogoMarquee } from "@/components/bloques/logo-marquee"
import { BloqueImageCard } from "@/components/bloques/ImageCard"
import { BloqueImageCardList } from "@/components/bloques/ImageCardList"
import { BloqueTituloParrafos } from "@/components/bloques/TitulosParrafos"
import { WhatsappFloatingButton } from "@/components/bloques/whatsapp-button"
import { BloqueTextoImagen } from "@/components/bloques/texto-imagen"

// Bloques adicionales detectados en tu estructura
import { BloqueAbout } from "@/components/bloques/about"
import { BloqueServices } from "@/components/bloques/services"
import { BloqueFeatures } from "@/components/bloques/features"
import { BloqueCTA } from "@/components/bloques/cta"
import { BloqueStats } from "@/components/bloques/stats"
import { BloqueContactForm } from "@/components/bloques/contact-form"

// --- MAPEO DE COMPONENTES (BlockType -> React Component) ---
const COMPONENTES: Record<string, any> = {
  // Estructurales
  header: BloqueHeader,
  hero: BloqueHero,
  footer: BloqueFooter,
  
  // Contenido
  banner: BloqueBanner,
  "cards-3": BloqueCards3,
  "text-image": BloqueTextoImagen,
  "titulo-parrafos": BloqueTituloParrafos,
  about: BloqueAbout,
  services: BloqueServices,
  features: BloqueFeatures,
  stats: BloqueStats,
  cta: BloqueCTA,
  
  // Formularios
  form: BloqueForm,
  "contact-form": BloqueContactForm,
  
  // Imágenes / Medios
  gallery: BloqueGallery,
  "logo-marquee": BloqueLogoMarquee, // Reemplaza a "clientes"
  "image-card": BloqueImageCard,
  "image-card-list": BloqueImageCardList,
}

export default function Home() {
  const [bloques, setBloques] = useState<Block[]>([])
  const [estilos, setEstilos] = useState<StyleConfig | null>(null)
  
  const [empresaConfig, setEmpresaConfig] = useState<{ nombre: string; whatsapp?: string }>({ 
    nombre: "", 
    whatsapp: "" 
  })
  
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const config = cargarConfiguracion()
    setBloques(config.bloques)
    setEstilos(config.estilos)
    
    if (config.empresa) {
      setEmpresaConfig(config.empresa)
      if (config.empresa.nombre) {
        document.title = config.empresa.nombre
      }
    }

    setLoading(false)
  }, [])

  useEffect(() => {
    if (estilos && typeof document !== "undefined") {
      const root = document.documentElement
      root.style.setProperty("--color-primario", estilos.colores.primario)
      root.style.setProperty("--color-fondo", estilos.colores.fondo)
      root.style.setProperty("--color-texto", estilos.colores.texto)
      root.style.setProperty("--fuente-base", estilos.tipografia.fuente)
      root.style.setProperty("--tamano-base", estilos.tipografia.tamanoBase)
      root.style.setProperty("--tamano-titulo", estilos.tipografia.tamanoTitulo)
      root.style.setProperty("--tamano-subtitulo", estilos.tipografia.tamanoSubtitulo)
    }
  }, [estilos])

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Cargando...</div>
  }

  const headerBlock = bloques.find((b) => b.tipo === "header" && b.activo)
  const footerBlock = bloques.find((b) => b.tipo === "footer" && b.activo)
  
  const contenidoBlocks = bloques
    .filter((b) => b.activo && b.tipo !== "header" && b.tipo !== "footer")
    .sort((a, b) => a.orden - b.orden)

  const navLinks = headerBlock ? (headerBlock.datos as any).navegacion : []

  const renderBlock = (bloque: Block) => {
    const Componente = COMPONENTES[bloque.tipo]

    if (!Componente) return null
    
    const datosMejorados = {
        ...bloque.datos as any,
        nombreEmpresa: (bloque.datos as any).nombreEmpresa || empresaConfig.nombre
    }

    return (
      <Componente 
        key={bloque.id} 
        data={datosMejorados} 
        variant={bloque.variant as any} 
        estilos={estilos}
        navLinks={navLinks} 
      />
    )
  }

  return (
    <div className="min-h-screen flex flex-col w-full">
      {headerBlock && renderBlock(headerBlock)}

      <main className="flex-1 flex flex-col w-full">
        {contenidoBlocks.length > 0 ? (
          contenidoBlocks.map((bloque) => renderBlock(bloque))
        ) : (
          <div className="min-h-[20vh]" />
        )}
      </main>

      {footerBlock && renderBlock(footerBlock)}

      <WhatsappFloatingButton numero={empresaConfig.whatsapp} />
    </div>
  )
}