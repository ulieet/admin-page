"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import type { SiteConfig } from "@/lib/types/blocks"
import { cargarConfiguracion } from "@/lib/blocks-storage"
import { RenderBlocks } from "@/components/page-builder/render-blocks"
import { BloqueHeader } from "@/components/bloques/header"
import { BloqueFooter } from "@/components/bloques/footer"
import { WhatsappFloatingButton } from "@/components/bloques/whatsapp-button"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function DynamicPage() {
  const params = useParams()
  const [config, setConfig] = useState<SiteConfig | null>(null)
  const [loading, setLoading] = useState(true)

  const slug = params?.slug as string

  useEffect(() => {
    const data = cargarConfiguracion()
    setConfig(data)
    
    if (data?.empresa?.nombre) {
      document.title = `${data.empresa.nombre} - ${slug}` 
    }
    
    setLoading(false)
  }, [slug])

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
    return <div className="min-h-screen flex items-center justify-center">Cargando...</div>
  }

  const currentPage = config.pages.find(p => p.slug === slug)

  // si me tira error 404
  if (!currentPage) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 text-center px-4 pt-24">
        <h1 className="text-4xl font-bold text-gray-800">404</h1>
        <p className="text-xl text-gray-600">Página no encontrada</p>
        <div className="flex gap-4 mt-4">
             <Link href="/"><Button>Ir al Inicio</Button></Link>
             <Link href="/admin"><Button variant="outline">Ir al Admin</Button></Link>
        </div>
      </div>
    )
  }

  const headerData = { ...config.header.datos, nombreEmpresa: config.header.datos.nombreEmpresa || config.empresa.nombre }
  const footerData = { ...config.footer.datos, nombreEmpresa: config.footer.datos.nombreEmpresa || config.empresa.nombre }

  const announcementBlocks = currentPage.blocks.filter(b => b.tipo === "announcement" && b.activo)
  const contentBlocks = currentPage.blocks.filter(b => b.tipo !== "announcement")

  return (
    <div className="min-h-screen flex flex-col w-full font-[family-name:var(--fuente-base)] bg-[var(--color-fondo)] text-[var(--color-texto)]">

      {/* 1. TOP BAR (Antes del Header) */}
      {announcementBlocks.length > 0 && (
        <div className="relative z-[100] w-full">
          <RenderBlocks blocks={announcementBlocks} />
        </div>
      )}

      {/* 2. HEADER */}
      {config.header.activo && (
        <BloqueHeader
          data={headerData}
          navLinks={config.header.datos.navegacion}
          variant={config.header.variant}
        />
      )}

      {/* 3. MAIN CONTENT (Resto de bloques) */}
      <main className="flex-1 flex flex-col w-full">
        {contentBlocks.length === 0 ? (
            <div className="py-20 text-center text-muted-foreground bg-muted/20 m-8 rounded-lg border border-dashed pt-32">
                <p>Esta página está vacía.</p>
            </div>
        ) : (
            <RenderBlocks blocks={contentBlocks} />
        )}
      </main>

      {/* 4. FOOTER */}
      {config.footer.activo && (
        <BloqueFooter
          data={footerData}
          navLinks={config.header.datos.navegacion}
          estilos={config.estilos}
        />
      )}

      <WhatsappFloatingButton numero={config.empresa.whatsapp} />
    </div>
  )
}