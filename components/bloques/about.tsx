"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface AboutData {
  titulo: string
  subtitulo?: string
  descripcion: string
  imagen?: string
  botonTexto?: string
  botonUrl?: string
}

export function BloqueAbout({ data }: { data: AboutData }) {
  return (
    <section className="py-20 bg-[var(--color-fondo)] text-[var(--color-texto)] overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center -mx-4">
          
          {/* IMAGEN */}
          <div className="w-full lg:w-1/2 px-4 mb-12 lg:mb-0">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/3] group">
              {data.imagen ? (
                <Image 
                  src={data.imagen} 
                  alt={data.titulo} 
                  fill 
                  className="object-cover transition-transform duration-700 group-hover:scale-105" 
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-slate-100 text-slate-400">
                  <span className="font-medium">Sin imagen</span>
                </div>
              )}
              {/* Overlay decorativo con color primario */}
              <div className="absolute inset-0 opacity-10 mix-blend-multiply transition-opacity group-hover:opacity-0" 
                   style={{ backgroundColor: "var(--color-primario)" }} />
            </div>
          </div>

          {/* TEXTO */}
          <div className="w-full lg:w-1/2 px-4">
            <div className="max-w-xl lg:ml-auto">
              {data.subtitulo && (
                <span className="text-sm font-bold uppercase tracking-widest mb-2 block opacity-70" 
                      style={{ color: "var(--color-primario)" }}>
                  {data.subtitulo}
                </span>
              )}
              
              <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
                {data.titulo}
              </h2>
              
              <div className="prose prose-lg opacity-80 mb-8 text-[var(--color-texto)] leading-relaxed">
                 <p>{data.descripcion}</p>
              </div>

              {data.botonTexto && (
                <Button 
                  asChild 
                  size="lg" 
                  className="text-white shadow-md hover:shadow-lg transition-all hover:-translate-y-1"
                  style={{ backgroundColor: "var(--color-primario)" }}
                >
                  <Link href={data.botonUrl || "#"}>
                    {data.botonTexto}
                  </Link>
                </Button>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}