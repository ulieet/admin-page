"use client"

import { useEffect, useState } from "react"
import type { SiteConfig } from "@/lib/types/blocks"
import { cargarConfiguracion } from "@/lib/blocks-storage"
import { RenderBlocks } from "@/components/page-builder/render-blocks"
import { BloqueHeader } from "@/components/bloques/header"
import { BloqueFooter } from "@/components/bloques/footer"
import { WhatsappFloatingButton } from "@/components/bloques/whatsapp-button"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function HomePage() {
  const [config, setConfig] = useState<SiteConfig | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const data = cargarConfiguracion()
    setConfig(data)
    setLoading(false)
  }, [])

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

  const homePage = config.pages.find(p => p.slug === "home")
  const headerData = { ...config.header.datos, nombreEmpresa: config.header.datos.nombreEmpresa || config.empresa.nombre }
  const footerData = { ...config.footer.datos, nombreEmpresa: config.footer.datos.nombreEmpresa || config.empresa.nombre }

  return (
    <div className="min-h-screen flex flex-col w-full font-[family-name:var(--fuente-base)] bg-[var(--color-fondo)] text-[var(--color-texto)]">
      
      {/* HEADER */}
      {config.header.activo && (
        <BloqueHeader
          data={headerData}
          navLinks={config.header.datos.navegacion}
          variant={config.header.variant}
        />
      )}

      {/* MAIN */}
      <main className="flex-1 flex flex-col w-full pt-10">
        {!homePage || homePage.blocks.length === 0 ? (
          <div className="py-20 text-center space-y-4">
             <h1 className="text-4xl font-bold">¡Bienvenido!</h1>
             <p className="text-muted-foreground">Aún no has configurado la página de inicio en el Admin.</p>
             <Link href="/admin"><Button>Ir al Admin</Button></Link>
          </div>
        ) : (
          <RenderBlocks blocks={homePage.blocks} />
        )}
      </main>

      {/* FOOTER */}
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