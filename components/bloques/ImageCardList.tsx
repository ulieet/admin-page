"use client"

import { cn } from "@/lib/utils"
import type { ImageCardListBlock } from "@/lib/types/blocks"
import { BloqueImageCard } from "./ImageCard" 
import { Building2 } from "lucide-react"

interface BloqueImageCardListProps {
  data: ImageCardListBlock["datos"]
  className?: string
}

export function BloqueImageCardList({ data, className }: BloqueImageCardListProps) {
  const gridClasses = data.columnas === 4 
    ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
    : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"

  return (
    <section 
      className={cn("py-20 md:py-24", className)}
      style={{ 
        backgroundColor: "var(--color-fondo)", 
        color: "var(--color-texto)" 
      }}
    >
      <div className="container mx-auto px-4">
        
        {(data.titulo || data.subtitulo) && (
            <div className="text-center mb-16 max-w-3xl mx-auto space-y-4">
                {data.titulo && (
                    <h2 
                        className="text-4xl font-extrabold tracking-tight"
                        style={{ color: "var(--color-primario)" }}
                    >
                        {data.titulo}
                    </h2>
                )}
                {data.subtitulo && (
                    <p className="text-xl opacity-70 leading-relaxed">
                        {data.subtitulo}
                    </p>
                )}
            </div>
        )}

        <div className={cn("grid gap-8 items-stretch", gridClasses)}>
          {data.cards && data.cards.length > 0 ? (
             data.cards.map((cardData, index) => (
                <div key={index} className="h-full">
                   <BloqueImageCard data={cardData} />
                </div>
             ))
          ) : (
            <div className="col-span-full text-center p-12 border-2 border-dashed rounded-2xl opacity-50">
                <Building2 className="w-10 h-10 mx-auto mb-4" />
                <p>No hay tarjetas configuradas.</p>
            </div>
          )}
        </div>
        
      </div>
    </section>
  )
}