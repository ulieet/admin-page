"use client"

import { cn } from "@/lib/utils"
import Link from "next/link"
import { ArrowRight, Building2 } from "lucide-react"
import type { ImageCardListBlock } from "@/lib/types/blocks" 

type SingleCardData = NonNullable<ImageCardListBlock["datos"]["cards"]>[number];

interface BloqueImageCardProps {
  data: SingleCardData 
  className?: string
}

export function BloqueImageCard({ data, className }: BloqueImageCardProps) {
  const primaryColor = "var(--color-primario)"
  
  return (
    <div className={cn(
        "bg-white text-slate-900 rounded-xl shadow-md overflow-hidden border border-slate-100 h-full w-full flex flex-col group transition-all duration-300 hover:shadow-xl hover:-translate-y-1", 
        className
    )}>
      
      <div className="aspect-video overflow-hidden relative bg-slate-100">
        {data.imagenUrl ? (
            <img 
                src={data.imagenUrl} 
                alt={data.altTexto || data.titulo} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
            />
        ) : (
            <div className="w-full h-full flex items-center justify-center text-slate-300">
                <Building2 className="w-12 h-12 opacity-50"/> 
            </div>
        )}
        
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
      </div>
      
      <div className="p-6 md:p-8 space-y-4 flex flex-col flex-1">
        
        {data.etiqueta && (
            <div 
                className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider w-fit shadow-sm"
                style={{ 
                    backgroundColor: primaryColor, 
                    color: "#ffffff"
                }}
            >
                {data.etiqueta}
            </div>
        )}
        
        <h3 className="text-xl md:text-2xl font-bold tracking-tight text-slate-900">
          {data.titulo}
        </h3>
        
        {data.descripcion && (
            <p className="text-base text-slate-600 flex-1 leading-relaxed">
            {data.descripcion}
            </p>
        )}
        
        {data.linkTexto && data.linkUrl && (
            <Link 
                href={data.linkUrl} 
                className="flex items-center gap-2 font-bold pt-4 mt-auto transition-opacity hover:opacity-80"
                style={{ color: primaryColor }}
            >
                {data.linkTexto}
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
        )}

      </div>
    </div>
  )
}