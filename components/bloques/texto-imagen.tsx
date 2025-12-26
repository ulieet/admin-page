"use client"

import Image from "next/image"
import { cn } from "@/lib/utils"
import { Check } from "lucide-react"
import type { TextImageBlock } from "@/lib/types/blocks"

interface BloqueTextoImagenProps {
  data: TextImageBlock["datos"]
}

export function BloqueTextoImagen({ data }: BloqueTextoImagenProps) {
  const primaryColor = "var(--color-primario)"
  const isImageRight = !!data.imagenDerecha

  return (
    <section 
        className="py-16 md:py-24"
        style={{ backgroundColor: "var(--color-fondo)" }}
    >
      <div className="container mx-auto px-4">
        <div className={cn(
          "grid gap-12 lg:gap-16 items-center",
          "grid-cols-1 lg:grid-cols-2"
        )}>
          
          <div className={cn(
             "space-y-6 order-2", 
             isImageRight ? "lg:order-1" : "lg:order-2"
          )}>
            
            {data.titulo && (
                <h2 
                    className="text-3xl md:text-4xl font-bold tracking-tight"
                    style={{ color: "var(--color-texto)" }}
                >
                    {data.titulo}
                </h2>
            )}

            {data.texto && (
                <div 
                    className="prose prose-lg leading-relaxed opacity-90"
                    style={{ color: "var(--color-texto)" }}
                >
                    <p>{data.texto}</p>
                </div>
            )}

            {data.puntos && data.puntos.length > 0 && (
                <ul className="space-y-3 pt-4">
                    {(data.puntos || []).map((punto: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-3">
                            <Check 
                                className="w-5 h-5 mt-1 shrink-0" 
                                style={{ color: primaryColor }} 
                            />
                            <span style={{ color: "var(--color-texto)" }} className="opacity-85">
                                {punto}
                            </span>
                        </li>
                    ))}
                </ul>
            )}
          </div>
          <div className={cn(
              "order-1", 
              isImageRight ? "lg:order-2" : "lg:order-1"
          )}>
             <div 
                className="relative rounded-2xl overflow-hidden shadow-xl"
                style={{ aspectRatio: "4/3" }}
             >
                {data.imagen ? (
                    <Image
                        src={data.imagen}
                        alt={data.titulo || "Imagen descriptiva"}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-700"
                    />
                ) : (
                    <div className="w-full h-full bg-slate-200 flex items-center justify-center">
                        <span className="text-slate-400">Sin imagen</span>
                    </div>
                )}
             </div>
          </div>

        </div>
      </div>
    </section>
  )
}