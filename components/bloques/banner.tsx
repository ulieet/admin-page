"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"

interface BannerData {
  titulo: string
  descripcion?: string
  imagenFondo?: string
  botonTexto?: string
  botonUrl?: string
}

export function BloqueBanner({ data }: { data: BannerData }) {
  return (
    <section className="relative h-128 flex items-center justify-center text-center text-white overflow-hidden">
      
      <div className="absolute inset-0 z-0">
        {data.imagenFondo ? (
          <img 
            src={data.imagenFondo} 
            alt="Banner" 
            className="w-full h-full object-cover" 
          />
        ) : (
          <div className="w-full h-full bg-slate-900" />
        )}
        
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <div className="relative z-10 container px-4 mx-auto max-w-4xl">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
          {data.titulo}
        </h2>
        
        {data.descripcion && (
          <p className="text-lg md:text-xl opacity-90 mb-8 max-w-2xl mx-auto leading-relaxed">
            {data.descripcion}
          </p>
        )}

        {data.botonTexto && (
          <Button 
            asChild 
            size="lg" 
            className="bg-white text-black hover:bg-slate-200 border-0 font-semibold px-8"
          >
            <Link href={data.botonUrl || "#"}>
              {data.botonTexto}
            </Link>
          </Button>
        )}
      </div>
    </section>
  )
}