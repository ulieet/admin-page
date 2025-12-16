"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"

interface BannerData {
  titulo: string
  descripcion?: string
  imagenFondo?: string
  botonTexto?: string
  botonUrl?: string
  altura?: "pequeno" | "medio" | "grande"
}

export function BloqueBanner({ data }: { data: BannerData }) {
  // Alturas configurables
  const heightClass = {
    pequeno: "py-24",
    medio: "py-32 md:py-40",
    grande: "py-48 md:py-64"
  }[data.altura || "medio"]

  return (
    <section className={`relative ${heightClass} flex items-center justify-center text-center overflow-hidden`}>
      
      {/* IMAGEN DE FONDO */}
      <div className="absolute inset-0 z-0">
        {data.imagenFondo ? (
          <img 
            src={data.imagenFondo} 
            alt="Fondo" 
            className="w-full h-full object-cover" 
          />
        ) : (
          <div className="w-full h-full bg-slate-900" />
        )}
        {/* Overlay degradado usando el color primario */}
        <div className="absolute inset-0 opacity-90 mix-blend-multiply" 
             style={{ 
               background: `linear-gradient(to bottom right, var(--color-primario), #000)` 
             }} 
        />
      </div>

      {/* CONTENIDO */}
      <div className="relative z-10 container px-4 mx-auto text-white">
        <h2 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight text-balance">
          {data.titulo}
        </h2>
        
        {data.descripcion && (
          <p className="text-xl md:text-2xl opacity-90 max-w-2xl mx-auto mb-10 text-balance font-light">
            {data.descripcion}
          </p>
        )}

        {data.botonTexto && (
          <Button 
            asChild 
            size="lg" 
            className="bg-white text-black hover:bg-white/90 border-0 font-bold px-8 py-6 text-lg shadow-xl"
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