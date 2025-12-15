// components/bloques/ImageCard.tsx

"use client"

import { cn } from "@/lib/utils"
import type { StyleConfig, ImageCardBlock } from "@/lib/types/blocks" 
import Link from "next/link"
import { ArrowRight, Building2 } from "lucide-react"

interface BloqueImageCardProps {
  data: ImageCardBlock["datos"] 
  estilos?: StyleConfig | null
  className?: string
}

export function BloqueImageCard({ data, estilos, className }: BloqueImageCardProps) {
  const primaryColor = estilos?.colores?.primario || "#3b82f6"
  const userTextColor = estilos?.colores?.texto || "#0f172a"
  const cardTitleSize = "1.5rem"
  
  const titleStyle = { 
    color: userTextColor,
    fontSize: cardTitleSize,
    lineHeight: 1.2
  }
  
  const descriptionStyle = {
    color: userTextColor,
    opacity: 0.8,
    fontSize: "1rem",
  }

  return (
    <div className={cn("bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100/50 h-full w-full", className)}>
      
      {/* Imagen de Portada */}
      <div className="aspect-video overflow-hidden">
        {data.imagenUrl ? (
            <img 
                src={data.imagenUrl} 
                alt={data.altTexto || data.titulo} 
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-[1.03]" 
            />
        ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
                <Building2 className="w-8 h-8 mr-2"/> Imagen no disponible
            </div>
        )}
      </div>
      
      {/* Contenido de la Tarjeta */}
      <div className="p-6 md:p-8 space-y-4">
        
        {/* Etiqueta / Badge */}
        {data.etiqueta && (
            <div 
                className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-semibold"
                style={{ 
                    backgroundColor: primaryColor, 
                    color: "#ffffff"
                }}
            >
                <Building2 className="w-4 h-4" />
                <span className="text-base font-normal">
                    {data.etiqueta}
                </span>
            </div>
        )}
        
        {/* Título */}
        <h3 style={titleStyle} className="font-bold tracking-tight">
          {data.titulo}
        </h3>
        
        {/* Descripción */}
        <p style={descriptionStyle}>
          {data.descripcion}
        </p>
        
        {/* Link / Botón */}
        {data.linkTexto && data.linkUrl && (
            <Link 
                href={data.linkUrl} 
                className="flex items-center gap-2 font-semibold pt-2 transition-colors group text-base"
                style={{ color: primaryColor }}
            >
                {data.linkTexto}
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
        )}

      </div>
    </div>
  )
}