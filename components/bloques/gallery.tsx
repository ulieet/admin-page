import type { GalleryBlock, StyleConfig } from "@/lib/types/blocks"
import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface BloqueGalleryProps {
  data: GalleryBlock["datos"]
  estilos?: StyleConfig | null
}

export function BloqueGallery({ data, estilos }: BloqueGalleryProps) {
  const columnas = data.columnas || 3
  const titulo = data.titulo || ""
  const textColor = estilos?.colores.texto || "#1f2937"

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {titulo && (
          <h2 
            className="text-3xl font-bold text-center mb-12"
            style={{ color: textColor }}
          >
            {titulo}
          </h2>
        )}

        <div className={cn(
          "grid gap-6",
          columnas === 2 && "grid-cols-1 md:grid-cols-2",
          columnas === 3 && "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
          columnas === 4 && "grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        )}>
          {(data.imagenes || []).map((imagen, index) => {
            
            // Contenido de la imagen
            const ImageContent = (
              <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-muted group">
                <Image
                  src={imagen.url || "/placeholder.svg"}
                  alt={imagen.alt || `Imagen de galería ${index + 1}`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Overlay sutil al hacer hover si es linkeable */}
                {imagen.link && (
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                )}
              </div>
            )

            // Si tiene link, lo envolvemos. Si no, solo mostramos la imagen.
            return (
              <div key={index}>
                {imagen.link ? (
                  <Link href={imagen.link} className="block cursor-pointer">
                    {ImageContent}
                  </Link>
                ) : (
                  ImageContent
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}