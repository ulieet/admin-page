"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { cargarConfiguracion } from "@/lib/blocks-storage"
import { RenderBlocks } from "@/components/page-builder/render-blocks"
import { BloqueHeader } from "@/components/bloques/header"
import { BloqueFooter } from "@/components/bloques/footer"
import { WhatsappFloatingButton } from "@/components/bloques/whatsapp-button"
import type { SiteConfig } from "@/lib/types/blocks"

export default function PublicDynamicPage() {
  const params = useParams()
  const [config, setConfig] = useState<SiteConfig | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const data = cargarConfiguracion()
    setConfig(data)
    setLoading(false)
  }, [])

  // Aplicar estilos globales del tema
  useEffect(() => {
    if (config?.estilos && typeof document !== "undefined") {
      const root = document.documentElement
      root.style.setProperty("--color-primario", config.estilos.colores.primario)
      root.style.setProperty("--color-fondo", config.estilos.colores.fondo)
      root.style.setProperty("--color-texto", config.estilos.colores.texto)
      root.style.setProperty("--fuente-base", config.estilos.tipografia.fuente)
      root.style.setProperty("--tamano-base", config.estilos.tipografia.tamanoBase)
      root.style.setProperty("--tamano-titulo", config.estilos.tipografia.tamanoTitulo)
      root.style.setProperty("--tamano-subtitulo", config.estilos.tipografia.tamanoSubtitulo)
    }
  }, [config])

  if (loading) return <div className="min-h-screen flex items-center justify-center">Cargando...</div>
  if (!config) return null

  // Obtener slug de la URL
  const slug = typeof params?.slug === 'string' ? params.slug : ''
  
  // Buscar página (Excluir 'home' ya que tiene su propio archivo page.tsx en la raíz)
  const page = config.pages.find((p) => p.slug === slug && p.slug !== 'home')

  // Si la página no existe, mostrar 404
  if (!page) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 text-center px-4">
        <h1 className="text-4xl font-bold">404</h1>
        <p className="text-xl">Página no encontrada</p>
        <a href="/" className="bg-primary text-white px-4 py-2 rounded hover:opacity-90 transition-opacity">
          Volver al Inicio
        </a>
      </div>
    )
  }

  // Actualizar título del documento
  if (typeof document !== "undefined") {
    document.title = `${page.title} | ${config.empresa.nombre}`
  }

  // Preparar datos para header/footer
  const headerData = { 
    ...config.header.datos, 
    nombreEmpresa: config.header.datos.nombreEmpresa || config.empresa.nombre 
  }
  
  const footerData = { 
    ...config.footer.datos, 
    nombreEmpresa: config.footer.datos.nombreEmpresa || config.empresa.nombre 
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

      {/* CONTENIDO DE LA PÁGINA */}
      <main className="flex-1 flex flex-col w-full">
        <RenderBlocks blocks={page.blocks} />
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