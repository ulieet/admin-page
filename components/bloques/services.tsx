"use client"

import { BarChart, Target, TrendingUp, Cog } from "lucide-react"

interface ServicesData {
  titulo: string
  subtitulo: string
  servicios: Array<{
    icono: string
    titulo: string
    descripcion: string
  }>
}

const ICONOS = {
  "bar-chart": BarChart,
  target: Target,
  "trending-up": TrendingUp,
  cog: Cog,
}

export function BloqueServices({ data }: { data: ServicesData }) {
  return (
    <section className="py-16 bg-slate-900 text-white" id="servicios">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">{data.titulo}</h2>
          <p className="text-slate-300 max-w-2xl mx-auto">{data.subtitulo}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {data.servicios.map((servicio, index) => {
            const Icono = ICONOS[servicio.icono as keyof typeof ICONOS] || BarChart
            return (
              <div
                key={index}
                className="border border-slate-700 rounded-lg p-6 hover:border-slate-500 transition-colors"
              >
                <Icono className="h-12 w-12 mb-4" />
                <h3 className="text-xl font-semibold mb-3">{servicio.titulo}</h3>
                <p className="text-slate-300">{servicio.descripcion}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
