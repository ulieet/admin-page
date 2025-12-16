"use client"

import type { GalleryBlock } from "@/lib/types/blocks"
import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface BloqueGalleryProps {
  data: GalleryBlock["datos"]
  // Sin 'estilos'
}

export function BloqueGallery({ data }: BloqueGalleryProps) {
  const columnas = data.columnas || 3
  const titulo = data.titulo || ""

  return (
    <section className="py-20 md:py-24 bg-[var(--color-fondo)] text-[var(--color-texto)]">
      <div className="container mx-auto px-4">
        {titulo && (
          <h2 
            className="text-3xl md:text-4xl font-bold text-center mb-12 text-balance"
            style={{ color: "var(--color-primario)" }}
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
            
            // Renderizado de la imagen
            const ImageContent = (
              <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-black/5 group shadow-sm hover:shadow-md transition-all">
                <Image
                  src={imagen.url || "/placeholder.svg"}
                  alt={imagen.alt || `Imagen ${index + 1}`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Overlay oscuro al pasar el mouse (solo si tiene link o descripción) */}
                {(imagen.link || imagen.descripcion) && (
                   <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
                      {imagen.descripcion && (
                          <p className="text-white text-center font-medium drop-shadow-md transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                              {imagen.descripcion}
                          </p>
                      )}
                   </div>
                )}
              </div>
            )

            // Si es un link, lo envolvemos
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