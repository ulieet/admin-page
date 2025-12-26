"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"

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
    <section className="py-24 text-white text-center" style={{ backgroundColor: "var(--color-primario)" }}>
      <div className="container mx-auto px-4">
        
        <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight text-balance">
            {data.titulo}
        </h2>
        
        <p className="text-xl md:text-2xl mb-10 opacity-90 max-w-2xl mx-auto text-balance">
            {data.subtitulo}
        </p>
        
        <div className="flex flex-wrap gap-4 justify-center mb-8">
          {data.botonPrimarioTexto && (
             <Button asChild size="lg" className="bg-white text-black hover:bg-white/90 font-semibold border-none">
                <Link href={data.botonPrimarioUrl || "#"}>{data.botonPrimarioTexto}</Link>
             </Button>
          )}
          
          {data.botonSecundarioTexto && (
            <Button
                asChild
                size="lg"
                variant="outline"
                className="bg-transparent border-white text-white hover:bg-white/10"
            >
                <Link href={data.botonSecundarioUrl || "#"}>{data.botonSecundarioTexto}</Link>
            </Button>
          )}
        </div>

        {data.textoInferior && (
            <p className="text-sm opacity-70 mt-8">
                {data.textoInferior}
            </p>
        )}
      </div>
    </section>
  )
}