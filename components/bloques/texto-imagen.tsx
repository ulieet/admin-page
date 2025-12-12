import type { TextoImagenBlock, StyleConfig } from "@/lib/types/blocks"
import Image from "next/image"
import { Check } from "lucide-react"

interface TextoImagenProps {
  data: TextoImagenBlock["datos"]
  estilos?: StyleConfig | null
}

export function BloqueTextoImagen({ data, estilos }: TextoImagenProps) {
  const primaryColor = estilos?.colores.primario || "#3b82f6"
  const textColor = estilos?.colores.texto || "#1f2937"

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className={`grid md:grid-cols-2 gap-12 items-center ${data.imagenDerecha ? "" : "md:flex-row-reverse"}`}>
          <div className={data.imagenDerecha ? "md:order-1" : "md:order-2"}>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-balance" style={{ color: textColor }}>
              {data.titulo}
            </h2>
            <p className="text-lg leading-relaxed text-pretty mb-6" style={{ color: `${textColor}DD` }}>
              {data.texto}
            </p>
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
          <div className={data.imagenDerecha ? "md:order-2" : "md:order-1"}>
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
              <Image src={data.imagen || "/placeholder.svg"} alt={data.titulo} fill className="object-cover" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
