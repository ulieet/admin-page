"use client"

import { useEffect, useState } from "react"
import { cargarConfiguracion } from "@/lib/blocks-storage"
import type { Block, StyleConfig } from "@/lib/types/blocks"
import { BloqueHeader } from "@/components/bloques/header"
import { BloqueHero } from "@/components/bloques/hero"
import { BloqueFooter } from "@/components/bloques/footer"
import { BloqueBanner } from "@/components/bloques/banner"
import { BloqueCards3 } from "@/components/bloques/cards-3"
import { BloqueTextImage } from "@/components/bloques/text-image"
import { BloqueForm } from "@/components/bloques/form"
import { BloqueStats } from "@/components/bloques/stats"
import { BloqueGallery } from "@/components/bloques/gallery"

const COMPONENTES = {
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
    console.log("[v0] Bloques cargados en página principal:", config.bloques)
    console.log("[v0] Estilos cargados:", config.estilos)
  }, [])

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

  // Obtenemos los links del header para pasarlos al footer
  const headerBlock = bloques.find((b) => b.tipo === "header")
  const navLinks = headerBlock ? (headerBlock.datos as any).navegacion : []

  const bloquesVisibles = bloques.filter((b) => b.activo).sort((a, b) => a.orden - b.orden)

  return (
    <>
      {bloquesVisibles.map((bloque) => {
        const Componente = COMPONENTES[bloque.tipo]
        if (!Componente) {
          console.warn("[v0] Componente no encontrado para tipo:", bloque.tipo)
          return null
        }
        return (
          <Componente 
            key={bloque.id} 
            data={bloque.datos as any} 
            variant={bloque.variant} 
            estilos={estilos}
            // Pasamos los links a todos los componentes (el Footer los usará)
            navLinks={navLinks} 
          />
        )
      })}
    </>
  )
}