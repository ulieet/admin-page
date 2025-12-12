import type { BannerBlock, BlockVariant, StyleConfig } from "@/lib/types/blocks"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"

interface BloqueBannerProps {
  data: BannerBlock["datos"]
  variant?: BlockVariant
  estilos?: StyleConfig | null
}

export function BloqueBanner({ data, variant = "default", estilos }: BloqueBannerProps) {
  const primaryColor = estilos?.colores.primario || "#3b82f6"
  const textColor = estilos?.colores.texto || "#1f2937"

  const alignClass = {
    izquierda: "text-left items-start",
    centro: "text-center items-center",
    derecha: "text-right items-end",
  }[data.alineacion]

  if (variant === "modern") {
    return (
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-5xl">
          <Card className="overflow-hidden shadow-xl">
            <div className="grid md:grid-cols-2">
              <div
                className="h-64 md:h-auto bg-cover bg-center"
                style={{
                  backgroundImage: data.imagen ? `url(${data.imagen})` : "none",
                  backgroundColor: data.imagen ? "transparent" : "#e5e7eb",
                }}
              />
              <div className={`p-8 md:p-12 flex flex-col justify-center gap-4 ${alignClass}`}>
                <h2 className="text-3xl md:text-4xl font-bold" style={{ color: textColor }}>
                  {data.titulo}
                </h2>
                <p className="text-lg" style={{ color: `${textColor}CC` }}>
                  {data.subtitulo}
                </p>
                {data.botonTexto && (
                  <Button asChild size="lg" className="mt-2" style={{ backgroundColor: primaryColor }}>
                    <Link href={data.botonUrl}>{data.botonTexto}</Link>
                  </Button>
                )}
              </div>
            </div>
          </Card>
        </div>
      </section>
    )
  }

  if (variant === "minimal") {
    return (
      <section className="py-20 px-4" style={{ backgroundColor: primaryColor }}>
        <div className={`container mx-auto max-w-4xl flex flex-col gap-6 ${alignClass}`}>
          <h2 className="text-4xl md:text-5xl font-bold text-white">{data.titulo}</h2>
          <p className="text-xl text-white/90 max-w-2xl">{data.subtitulo}</p>
          {data.botonTexto && (
            <Button asChild size="lg" variant="secondary">
              <Link href={data.botonUrl}>{data.botonTexto}</Link>
            </Button>
          )}
        </div>
      </section>
    )
  }

  // Default: background image with overlay
  return (
    <section
      className="relative py-24 px-4 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: data.imagen ? `url(${data.imagen})` : "none",
        backgroundColor: data.imagen ? "transparent" : "#f3f4f6",
      }}
    >
      <div className="absolute inset-0 bg-black/40" />
      <div className={`relative container mx-auto max-w-4xl flex flex-col gap-6 ${alignClass}`}>
        <h2 className="text-4xl md:text-5xl font-bold text-white">{data.titulo}</h2>
        <p className="text-xl text-white/90 max-w-2xl">{data.subtitulo}</p>
        {data.botonTexto && (
          <Button asChild size="lg" style={{ backgroundColor: primaryColor }}>
            <Link href={data.botonUrl}>{data.botonTexto}</Link>
          </Button>
        )}
      </div>
    </section>
  )
}
