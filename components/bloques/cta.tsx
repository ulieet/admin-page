"use client"

import { Button } from "@/components/ui/button"

interface CTAData {
  titulo: string
  subtitulo: string
  botonPrimarioTexto: string
  botonPrimarioUrl: string
  botonSecundarioTexto: string
  botonSecundarioUrl: string
  textoInferior: string
}

export function BloqueCTA({ data }: { data: CTAData }) {
  return (
    <section className="py-20 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-4">{data.titulo}</h2>
        <p className="text-xl mb-8 opacity-90">{data.subtitulo}</p>
        <div className="flex flex-wrap gap-4 justify-center mb-6">
          <Button asChild size="lg" variant="secondary">
            <a href={data.botonPrimarioUrl}>{data.botonPrimarioTexto}</a>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="bg-transparent border-white text-white hover:bg-white/10"
          >
            <a href={data.botonSecundarioUrl}>{data.botonSecundarioTexto}</a>
          </Button>
        </div>
        <p className="text-sm opacity-75">{data.textoInferior}</p>
      </div>
    </section>
  )
}
