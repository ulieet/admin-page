"use client"

import { cn } from "@/lib/utils"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface TextImageData {
  titulo: string
  texto: string
  imagen: string
  posicionImagen: "izquierda" | "derecha"
  botonTexto?: string
  botonUrl?: string
}

export function BloqueTextImage({ data }: { data: TextImageData }) {
  const isImageRight = data.posicionImagen === "derecha"

  return (
    <section className="py-20 bg-[var(--color-fondo)] text-[var(--color-texto)]">
      <div className="container mx-auto px-4">
        <div className={cn(
          "flex flex-col lg:flex-row items-center gap-12 lg:gap-20",
          isImageRight ? "" : "lg:flex-row-reverse" // Si es izquierda, invertimos el orden visual
        )}>
          
          {/* CONTENIDO TEXTO */}
          <div className="w-full lg:w-1/2 space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold leading-tight" style={{ color: "var(--color-primario)" }}>
              {data.titulo}
            </h2>
            <div className="prose prose-lg opacity-80 text-[var(--color-texto)]">
               {/* Renderizado simple de párrafos por saltos de línea */}
               {data.texto.split('\n').map((paragraph, i) => (
                 <p key={i} className="mb-4">{paragraph}</p>
               ))}
            </div>
            
            {data.botonTexto && (
              <Button asChild className="mt-4 text-white" style={{ backgroundColor: "var(--color-primario)" }}>
                <Link href={data.botonUrl || "#"}>{data.botonTexto}</Link>
              </Button>
            )}
          </div>

          {/* IMAGEN */}
          <div className="w-full lg:w-1/2">
            <div className="relative aspect-square md:aspect-video lg:aspect-square rounded-2xl overflow-hidden shadow-lg border-8 border-white/50">
              {data.imagen ? (
                <Image src={data.imagen} alt={data.titulo} fill className="object-cover" />
              ) : (
                <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-400">Sin Imagen</div>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}