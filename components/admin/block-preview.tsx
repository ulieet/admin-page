"use client"

import type { Block, StyleConfig } from "@/lib/types/blocks"
import { BloqueHeader } from "@/components/bloques/header"
import { BloqueHero } from "@/components/bloques/hero"
import { BloqueFooter } from "@/components/bloques/footer"
import { BloqueBanner } from "@/components/bloques/banner"
import { BloqueCards3 } from "@/components/bloques/cards-3"
import { BloqueTextImage } from "@/components/bloques/text-image"
import { BloqueForm } from "@/components/bloques/form"
import { BloqueGallery } from "@/components/bloques/gallery"
import { BloqueLogoMarquee } from "@/components/bloques/logo-marquee"
import { BloqueImageCard } from "@/components/bloques/ImageCard" // ✅ IMPORTAMOS EL NUEVO BLOQUE

// Mapeo de tipos de bloque a componentes de React
const BLOCK_COMPONENTS: Record<string, React.ComponentType<any>> = {
  header: BloqueHeader,
  hero: BloqueHero,
  footer: BloqueFooter,
  banner: BloqueBanner,
  "cards-3": BloqueCards3,
  "text-image": BloqueTextImage,
  form: BloqueForm,
  gallery: BloqueGallery,
  "logo-marquee": BloqueLogoMarquee,
  "image-card": BloqueImageCard, // ✅ AÑADIDO: Mapeamos el nuevo componente
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
  
  // 1. CORRECCIÓN DEL TAMAÑO DE FUENTE Y ESCALADO
  // Para evitar que los estilos globales de rem (que dependen del <html>)
  // rompan la visualización dentro del iframe del editor (o preview),
  // forzamos el tamaño base (tamanoBase) al contenedor.
  // Esto asegura que 1rem sea igual a tamanoBase (ej. 16px) dentro del preview.
  
  const tamanoBase = estilos.tipografia.tamanoBase || "16px";

  const previewStyle: React.CSSProperties = {
    // Forzamos el tamaño de fuente base para que todas las unidades 'rem'
    // dentro del preview se escalen correctamente según la configuración del usuario.
    fontSize: tamanoBase, 
    // Aplicamos la fuente global para una vista previa precisa.
    fontFamily: estilos.tipografia.fuente || 'inherit', 
    // Aseguramos que el contenedor no tenga un color de fondo extra
    backgroundColor: 'transparent',
  };


  // 2. CORRECCIÓN DE DATOS DE TARJETAS (CARDS-3)
  // El error "no se ven las cards" ocurre si `bloque.datos.items` no existe o no es un array,
  // lo cual puede pasar si el bloque se inicializa mal.
  // Aseguramos que, si es un bloque de cards-3, los datos tengan la estructura correcta.

  let datosCorregidos = bloque.datos;

  if (bloque.tipo === "cards-3") {
    // Si la propiedad 'items' no es un array, la inicializamos con 3 elementos por defecto.
    if (!Array.isArray(bloque.datos.items) || bloque.datos.items.length === 0) {
        console.warn(`[BlockPreview] Inicializando items faltantes para cards-3 en el preview.`)
        datosCorregidos = {
            ...bloque.datos,
            items: [
                { titulo: "Tarjeta 1", descripcion: "Placeholder", icono: "activity", botonTexto: "Ver", botonUrl: "#" },
                { titulo: "Tarjeta 2", descripcion: "Placeholder", icono: "settings", botonTexto: "Ver", botonUrl: "#" },
                { titulo: "Tarjeta 3", descripcion: "Placeholder", icono: "users", botonTexto: "Ver", botonUrl: "#" },
            ]
        }
    }
  }


  return (
    // Aplicamos los estilos corregidos al contenedor
    <div style={previewStyle}>
      <Component 
        data={datosCorregidos} 
        variant={bloque.variant} 
        estilos={estilos} 
      />
    </div>
  )
}