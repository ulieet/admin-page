"use client"

import Image from "next/image"
import { Check } from "lucide-react"

interface AboutData {
  seccion1: {
    titulo: string
    parrafo1: string
    parrafo2: string
    imagen: string
    puntos: string[]
  }
  seccion2: {
    titulo: string
    parrafo1: string
    parrafo2: string
    imagen: string
  }
}

export function BloqueAbout({ data }: { data: AboutData }) {
  return (
    <section className="py-16 bg-background" id="nosotros">
      <div className="container mx-auto px-4">
        {/* Sección 1 */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
          <div className="space-y-6">
            <h2 className="text-4xl font-bold">{data.seccion1.titulo}</h2>
            <p className="text-muted-foreground leading-relaxed">{data.seccion1.parrafo1}</p>
            <p className="text-muted-foreground leading-relaxed">{data.seccion1.parrafo2}</p>
            <ul className="space-y-3">
              {data.seccion1.puntos.map((punto, index) => (
                <li key={index} className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>{punto}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative h-[400px] rounded-lg overflow-hidden">
            {data.seccion1.imagen ? (
              <Image
                src={data.seccion1.imagen || "/placeholder.svg"}
                alt={data.seccion1.titulo}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full bg-muted flex items-center justify-center">
                <span className="text-muted-foreground">Imagen {data.seccion1.titulo}</span>
              </div>
            )}
          </div>
        </div>

        {/* Sección 2 */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative h-[400px] rounded-lg overflow-hidden order-2 md:order-1">
            {data.seccion2.imagen ? (
              <Image
                src={data.seccion2.imagen || "/placeholder.svg"}
                alt={data.seccion2.titulo}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full bg-muted flex items-center justify-center">
                <span className="text-muted-foreground">Imagen {data.seccion2.titulo}</span>
              </div>
            )}
          </div>
          <div className="space-y-6 order-1 md:order-2">
            <h2 className="text-4xl font-bold">{data.seccion2.titulo}</h2>
            <p className="text-muted-foreground leading-relaxed">{data.seccion2.parrafo1}</p>
            <p className="text-muted-foreground leading-relaxed">{data.seccion2.parrafo2}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
