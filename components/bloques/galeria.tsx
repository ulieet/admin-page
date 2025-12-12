import type { GaleriaBlock, StyleConfig } from "@/lib/types/blocks"
import Image from "next/image"

interface GaleriaProps {
  data: GaleriaBlock["datos"]
  estilos?: StyleConfig | null
}

export function BloqueGaleria({ data, estilos }: GaleriaProps) {
  const textColor = estilos?.colores.texto || "#1f2937"
  // </CHANGE>

  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-balance" style={{ color: textColor }}>
          {data.titulo}
        </h2>
        {/* </CHANGE> */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.imagenes.map((imagen, index) => (
            <div key={index} className="group relative aspect-[4/3] rounded-lg overflow-hidden">
              <Image
                src={imagen.url || "/placeholder.svg"}
                alt={imagen.alt}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
              />
              {imagen.descripcion && (
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
                  <p className="text-white text-center">{imagen.descripcion}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
