"use client"

import { Award, Users, Building } from "lucide-react"
import { Button } from "@/components/ui/button"

interface FeaturesData {
  caracteristicas: Array<{
    icono: string
    titulo: string
    descripcion: string
    botonTexto: string
  }>
}

const ICONOS = {
  award: Award,
  users: Users,
  building: Building,
}

export function BloqueFeatures({ data }: { data: FeaturesData }) {
  // Ahora usamos las variables globales que inyecta RenderBlocks
  return (
    <section className="py-20 bg-[var(--color-fondo)] text-[var(--color-texto)]">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          {data.caracteristicas.map((caracteristica, index) => {
            const Icono = ICONOS[caracteristica.icono as keyof typeof ICONOS] || Award
            
            return (
              <div key={index} className="flex flex-col items-center text-center space-y-4 p-6 rounded-xl border border-transparent hover:border-slate-100 transition-colors">
                
                {/* Ícono: Fondo primario, icono blanco */}
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full text-white shadow-sm"
                     style={{ backgroundColor: "var(--color-primario)" }}>
                  <Icono className="h-8 w-8" />
                </div>
                
                <h3 className="text-xl font-bold">
                    {caracteristica.titulo}
                </h3>
                
                <p className="opacity-80 leading-relaxed max-w-sm">
                    {caracteristica.descripcion}
                </p>
                
                {caracteristica.botonTexto && (
                  <Button 
                    className="mt-4 text-white hover:opacity-90 transition-opacity"
                    style={{ backgroundColor: "var(--color-primario)" }}
                  >
                    {caracteristica.botonTexto}
                  </Button>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}