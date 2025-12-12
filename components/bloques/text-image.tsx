import type { TextImageBlock } from "@/lib/types/blocks"
import { Check } from "lucide-react"

interface BloqueTextImageProps {
  data: TextImageBlock["datos"]
}

export function BloqueTextImage({ data }: BloqueTextImageProps) {
  const isImageLeft = data.posicionImagen === "izquierda"

  return (
    <section className="py-20 px-4 bg-background">
      <div className="container mx-auto">
        <div
          className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${isImageLeft ? "lg:flex-row-reverse" : ""}`}
        >
          <div className={`space-y-6 ${isImageLeft ? "lg:order-2" : ""}`}>
            <h2 className="text-3xl md:text-4xl font-bold">{data.titulo}</h2>
            <p className="text-lg text-muted-foreground">{data.parrafo1}</p>
            {data.parrafo2 && <p className="text-lg text-muted-foreground">{data.parrafo2}</p>}
            {data.puntos && data.puntos.length > 0 && (
              <ul className="space-y-3">
                {data.puntos.map((punto, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <span>{punto}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className={isImageLeft ? "lg:order-1" : ""}>
            {data.imagen ? (
              <img
                src={data.imagen || "/placeholder.svg"}
                alt={data.titulo}
                className="w-full h-auto rounded-lg shadow-lg"
              />
            ) : (
              <div className="w-full aspect-video bg-muted rounded-lg flex items-center justify-center">
                <span className="text-muted-foreground">Imagen</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
