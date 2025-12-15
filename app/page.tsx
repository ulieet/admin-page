"use client"

import { useEffect, useState } from "react"
import { cargarConfiguracion } from "@/lib/blocks-storage"
import type { Block, StyleConfig } from "@/lib/types/blocks"

// Imports de tus componentes
import { BloqueHeader } from "@/components/bloques/header"
import { BloqueHero } from "@/components/bloques/hero"
import { BloqueFooter } from "@/components/bloques/footer"
import { BloqueBanner } from "@/components/bloques/banner"
import { BloqueCards3 } from "@/components/bloques/cards-3"
import { BloqueTextImage } from "@/components/bloques/text-image"
import { BloqueForm } from "@/components/bloques/form"
import { BloqueStats } from "@/components/bloques/stats"
import { BloqueGallery } from "@/components/bloques/gallery"

// Mapeo de componentes (nombre en DB -> Componente React)
const COMPONENTES: Record<string, any> = {
  header: BloqueHeader,
  hero: BloqueHero,
  footer: BloqueFooter,
  banner: BloqueBanner,
  "cards-3": BloqueCards3,
  "text-image": BloqueTextImage,
  form: BloqueForm,
  stats: BloqueStats,
  gallery: BloqueGallery,
}

export default function Home() {
  const [bloques, setBloques] = useState<Block[]>([])
  const [estilos, setEstilos] = useState<StyleConfig | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const config = cargarConfiguracion()
    setBloques(config.bloques)
    setEstilos(config.estilos)
    setLoading(false)
  }, [])

  // Aplicar variables CSS globales al cargar
  useEffect(() => {
    if (estilos && typeof document !== "undefined") {
      const root = document.documentElement
      root.style.setProperty("--color-primario", estilos.colores.primario)
      root.style.setProperty("--color-secundario", estilos.colores.secundario)
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

  // 1. Identificamos Header y Footer por separado
  const headerBlock = bloques.find((b) => b.tipo === "header" && b.activo)
  const footerBlock = bloques.find((b) => b.tipo === "footer" && b.activo)
  
  // 2. Filtramos el resto de bloques (Contenido Central)
  const contenidoBlocks = bloques
    .filter((b) => b.activo && b.tipo !== "header" && b.tipo !== "footer")
    .sort((a, b) => a.orden - b.orden)

  // Datos para pasar al footer (enlaces de navegación)
  const navLinks = headerBlock ? (headerBlock.datos as any).navegacion : []

  // Helper para renderizar
  const renderBlock = (bloque: Block) => {
    // CORRECCIÓN: Usamos 'as any' para evitar conflictos de tipos
    // entre componentes que tienen 'variant' y los que no.
    const Componente = COMPONENTES[bloque.tipo]

    if (!Componente) return null
    
    return (
      <Componente 
        key={bloque.id} 
        data={bloque.datos as any} 
        // Forzamos el tipo aquí también para máxima seguridad
        variant={bloque.variant as any} 
        estilos={estilos}
        navLinks={navLinks} 
      />
    )
  }

  return (
    <div className="min-h-screen flex flex-col w-full">
      {/* A. HEADER */}
      {headerBlock && renderBlock(headerBlock)}

      {/* B. CONTENIDO PRINCIPAL 
          'flex-1' hace que este div crezca para ocupar todo el espacio disponible,
          empujando el footer hacia abajo si hay poco contenido.
      */}
      <main className="flex-1 flex flex-col w-full">
        {contenidoBlocks.length > 0 ? (
          contenidoBlocks.map((bloque) => renderBlock(bloque))
        ) : (
          // Placeholder invisible para evitar colapsos si no hay contenido
          <div className="min-h-[20vh]" />
        )}
      </main>

      {/* C. FOOTER */}
      {footerBlock && renderBlock(footerBlock)}
    </div>
  )
}