"use client"

import type { Block, StyleConfig } from "@/lib/types/blocks"
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
import { BloqueAbout } from "@/components/bloques/about"
import { BloqueServices } from "@/components/bloques/services"
import { BloqueFeatures } from "@/components/bloques/features"
import { BloqueCTA } from "@/components/bloques/cta"
import { BloqueContactForm } from "@/components/bloques/contact-form"
import { BloqueStats } from "@/components/bloques/stats"

// --- CORRECCIÓN ---
import { BloqueTextoImagen } from "@/components/bloques/texto-imagen"

const BLOCK_COMPONENTS: Record<string, React.ComponentType<any>> = {
  header: BloqueHeader,
  hero: BloqueHero,
  footer: BloqueFooter,
  banner: BloqueBanner,
  "cards-3": BloqueCards3,
  "text-image": BloqueTextoImagen, // Corregido
  "texto-imagen": BloqueTextoImagen, // Soporte extra
  form: BloqueForm,
  gallery: BloqueGallery,
  "logo-marquee": BloqueLogoMarquee,
  "image-card": BloqueImageCard,
  "image-card-list": BloqueImageCardList,
  about: BloqueAbout,
  services: BloqueServices,
  features: BloqueFeatures,
  cta: BloqueCTA,
  "contact-form": BloqueContactForm,
  stats: BloqueStats,
  "titulo-parrafos": BloqueTituloParrafos,
}

interface BlockPreviewProps {
  bloque: Block
  estilos: StyleConfig
}

export function BlockPreview({ bloque, estilos }: BlockPreviewProps) {
  const Component = BLOCK_COMPONENTS[bloque.tipo]

  if (!Component) {
    return <div className="p-8 bg-red-100 text-red-700">Componente para el tipo "{bloque.tipo}" no encontrado.</div>
  }
  
  const tamanoBase = estilos.tipografia.tamanoBase || "16px";

  const previewStyle: React.CSSProperties = {
    fontSize: tamanoBase, 
    fontFamily: estilos.tipografia.fuente || 'inherit',
    backgroundColor: 'transparent',
    "--color-primario": estilos.colores.primario,
    "--color-fondo": estilos.colores.fondo,
    "--color-texto": estilos.colores.texto,
  } as React.CSSProperties;

  // Corrección para evitar fallos en cards vacías
  let datosCorregidos = bloque.datos;
  if (bloque.tipo === "cards-3") {
    if (!Array.isArray(bloque.datos.items) || bloque.datos.items.length === 0) {
        datosCorregidos = {
            ...bloque.datos,
            items: [
                { titulo: "Ejemplo 1", descripcion: "Descripción...", icono: "activity", botonTexto: "Ver" },
                { titulo: "Ejemplo 2", descripcion: "Descripción...", icono: "settings", botonTexto: "Ver" },
                { titulo: "Ejemplo 3", descripcion: "Descripción...", icono: "users", botonTexto: "Ver" },
            ]
        }
    }
  }

  return (
    <div style={previewStyle}>
      <Component 
        data={datosCorregidos} 
        variant={bloque.variant} 
        estilos={estilos} 
      />
    </div>
  )
}