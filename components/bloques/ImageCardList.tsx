// components/bloques/ImageCardList.tsx

"use client"

import { cn } from "@/lib/utils"
import type { StyleConfig, ImageCardListBlock } from "@/lib/types/blocks"
import { BloqueImageCard } from "./ImageCard" 
import { Building2 } from "lucide-react"

interface BloqueImageCardListProps {
  data: ImageCardListBlock["datos"]
  estilos?: StyleConfig | null
  className?: string
}

export function BloqueImageCardList({ data, estilos, className }: BloqueImageCardListProps) {
  const userTextColor = estilos?.colores?.texto || "#0f172a"
  const userTitleSize = estilos?.tipografia?.tamanoTitulo || "2.5rem" 
  const userSubtitleSize = estilos?.tipografia?.tamanoSubtitulo || "1.25rem"
  
  const gridClasses = data.columnas === 4 
    ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
    : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"

  return (
    <section className={cn("py-16 md:py-24", className)}>
      <div className="container mx-auto px-4">
        
        {/* Título de la Sección */}
        {(data.titulo || data.subtitulo) && (
            <div className="text-center mb-12 max-w-3xl mx-auto space-y-4">
                <h2 
                    style={{ color: userTextColor, fontSize: userTitleSize }} 
                    className="font-extrabold tracking-tight"
                >
                    {data.titulo}
                </h2>
                <p 
                    style={{ color: userTextColor, opacity: 0.7, fontSize: userSubtitleSize }}
                    className="text-lg"
                >
                    {data.subtitulo}
                </p>
            </div>
        )}


        {/* Grid de Tarjetas */}
        <div className={cn("grid gap-8", gridClasses)}>
          {data.cards && data.cards.length > 0 ? (
             data.cards.map((cardData, index) => (
                <div key={index} className="flex">
                   <BloqueImageCard 
                       data={cardData} 
                       estilos={estilos}
                   />
                </div>
             ))
          ) : (
            <div className="col-span-full text-center p-8 border-dashed border-2 text-gray-500 rounded-lg">
                <Building2 className="w-6 h-6 mx-auto mb-2" />
                Aún no hay tarjetas añadidas. Usa el editor para agregar contenido.
            </div>
          )}
        </div>
        
      </div>
    </section>
  )
}