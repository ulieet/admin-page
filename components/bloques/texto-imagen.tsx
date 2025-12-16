"use client"

import type { TextoImagenBlock } from "@/lib/types/blocks"
import Image from "next/image"
import { Check } from "lucide-react"

interface TextoImagenProps {
  data: TextoImagenBlock["datos"]
  // Ya no necesitamos 'estilos' explícito, usamos variables
}

export function BloqueTextoImagen({ data }: TextoImagenProps) {
  // Usamos las variables CSS globales para mantener la consistencia automática
  const primaryColor = "var(--color-primario)"
  const textColor = "var(--color-texto)"

  return (
    <section className="py-16 md:py-24 bg-[var(--color-fondo)]">
      <div className="container mx-auto px-4">
        <div className={`grid md:grid-cols-2 gap-12 items-center ${data.imagenDerecha ? "" : "md:flex-row-reverse"}`}>
          
          {/* Columna de Texto */}
          <div className={data.imagenDerecha ? "md:order-1" : "md:order-2"}>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-balance" style={{ color: textColor }}>
              {data.titulo}
            </h2>
            
            <p className="text-lg leading-relaxed text-pretty mb-6 opacity-90" style={{ color: textColor }}>
              {data.texto}
            </p>
            
            {/* Lista de Puntos con Checks (Restaurada) */}
            {data.puntos && data.puntos.length > 0 && (
              <ul className="space-y-3">
                {data.puntos.map((punto, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Check className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: primaryColor }} />
                    <span style={{ color: textColor }}>{punto}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
          
          {/* Columna de Imagen */}
          <div className={data.imagenDerecha ? "md:order-2" : "md:order-1"}>
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-lg">
              <Image 
                src={data.imagen || "/placeholder.svg"} 
                alt={data.titulo} 
                fill 
                className="object-cover" 
              />
            </div>
          </div>
          
        </div>
      </div>
    </section>
  )
}