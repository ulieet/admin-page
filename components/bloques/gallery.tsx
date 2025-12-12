import type { GalleryBlock } from "@/lib/types/blocks"

interface BloqueGalleryProps {
  data: GalleryBlock["datos"]
}

export function BloqueGallery({ data }: BloqueGalleryProps) {
  const gridClass = {
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
  }[data.columnas]

  return (
    <section className="py-20 px-4 bg-background">
      <div className="container mx-auto">
        {data.titulo && <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">{data.titulo}</h2>}
        <div className={`grid ${gridClass} gap-6`}>
          {data.imagenes.map((imagen, index) =>
            imagen.url ? (
              <div
                key={index}
                className="relative aspect-square overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow"
              >
                <img
                  src={imagen.url || "/placeholder.svg"}
                  alt={imagen.alt}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            ) : (
              <div
                key={index}
                className="relative aspect-square overflow-hidden rounded-lg bg-muted flex items-center justify-center"
              >
                <span className="text-muted-foreground">{imagen.alt || "Imagen"}</span>
              </div>
            ),
          )}
        </div>
      </div>
    </section>
  )
}
