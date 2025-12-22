"use client"

import { useEffect, useState } from "react"
import type { SiteConfig } from "@/lib/types/blocks"

import { cargarConfiguracion } from "@/lib/blocks-storage"
import { RenderBlocks } from "@/components/page-builder/render-blocks"
import { BloqueHeader } from "@/components/bloques/header"
import { BloqueFooter } from "@/components/bloques/footer"
import { WhatsappFloatingButton } from "@/components/bloques/whatsapp-button"

export default function HomePage() {
  const [config, setConfig] = useState<SiteConfig | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const data = cargarConfiguracion()
    setConfig(data)

    if (data?.empresa?.nombre) {
      document.title = data.empresa.nombre
    }

    setLoading(false)
  }, [])

  // Aplicar estilos globales
  useEffect(() => {
    if (!config?.estilos) return

    const root = document.documentElement
    root.style.setProperty("--color-primario", config.estilos.colores.primario)
    root.style.setProperty("--color-fondo", config.estilos.colores.fondo)
    root.style.setProperty("--color-texto", config.estilos.colores.texto)
    root.style.setProperty("--fuente-base", config.estilos.tipografia.fuente)
    root.style.setProperty("--tamano-base", config.estilos.tipografia.tamanoBase)
    root.style.setProperty("--tamano-titulo", config.estilos.tipografia.tamanoTitulo)
    root.style.setProperty("--tamano-subtitulo", config.estilos.tipografia.tamanoSubtitulo)
  }, [config])

  if (loading || !config) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Cargando...
      </div>
    )
  }

  // Página HOME
  const homePage = config.pages.find(p => p.slug === "home")

  if (!homePage) {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col gap-4">
        <h1 className="text-xl font-bold">Bienvenido</h1>
        <p>No se encontró la página de inicio.</p>
        <a href="/admin" className="text-blue-600 underline">
          Ir al Admin
        </a>
      </div>
    )
  }

  // 🔒 ASEGURAR HERO EN HOME (INYECCIÓN CONTROLADA)
  if (!Array.isArray(homePage.blocks)) {
    homePage.blocks = []
  }

  const hasHero = homePage.blocks.some(b => b.tipo === "hero")

  if (!hasHero) {
    homePage.blocks.unshift({
      id: "hero-home",
      tipo: "hero",
      activo: true,
      orden: 0,
      variant: "default",
      datos: {
        titulo: "Título principal",
        subtitulo: "Subtítulo editable desde el admin",
        imagenes: [],
        botonPrimarioTexto: "Contactanos",
        botonPrimarioUrl: "#",
      },
    })
  }

  // Header / Footer data
  const headerData = {
    ...config.header.datos,
    nombreEmpresa:
      config.header.datos.nombreEmpresa || config.empresa.nombre,
  }

  const footerData = {
    ...config.footer.datos,
    nombreEmpresa:
      config.footer.datos.nombreEmpresa || config.empresa.nombre,
  }

  return (
    <div className="min-h-screen flex flex-col w-full font-[family-name:var(--fuente-base)] bg-[var(--color-fondo)] text-[var(--color-texto)]">

      {/* HEADER GLOBAL */}
      {config.header.activo && (
        <BloqueHeader
          data={headerData}
          navLinks={config.header.datos.navegacion}
          variant={config.header.variant}
        />
      )}

      {/* CONTENIDO HOME */}
      <main className="flex-1 flex flex-col w-full">
        <RenderBlocks blocks={homePage.blocks} />
      </main>

      {/* FOOTER GLOBAL */}
      {config.footer.activo && (
        <BloqueFooter
          data={footerData}
          variant={config.footer.variant}
        />
      )}

      {/* EXTRAS */}
      <WhatsappFloatingButton numero={config.empresa.whatsapp} />
    </div>
  )
}
