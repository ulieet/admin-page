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
    <section className="py-20 bg-[var(--color-fondo)] text-[var(--color-texto)] transition-colors duration-300" id="servicios">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 tracking-tight" style={{ color: "var(--color-primario)" }}>
            {data.titulo}
          </h2>
          <p className="opacity-80 max-w-2xl mx-auto text-lg">
            {data.subtitulo}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {data.servicios.map((servicio, index) => {
            const Icono = ICONOS[servicio.icono as keyof typeof ICONOS] || BarChart
            
            return (
              <div
                key={index}
                className="group p-6 rounded-2xl border transition-all duration-300 hover:shadow-lg"
                style={{ borderColor: "rgba(0,0,0,0.1)" }} // Borde sutil
              >
                {/* Ícono con color primario */}
                <div className="mb-6 inline-block p-3 rounded-lg bg-opacity-10 transition-colors"
                     style={{ backgroundColor: "var(--color-primario)", color: "white" }}>
                   <div className="bg-white/20 p-2 rounded-md"> 
                      <Icono className="h-8 w-8 text-white" />
                   </div>
                </div>

                <h3 className="text-xl font-bold mb-3">
                    {servicio.titulo}
                </h3>
                
                <p className="opacity-70 leading-relaxed">
                    {servicio.descripcion}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}