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
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          {data.caracteristicas.map((caracteristica, index) => {
            const Icono = ICONOS[caracteristica.icono as keyof typeof ICONOS] || Award
            return (
              <div key={index} className="text-center space-y-4">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary text-primary-foreground">
                  <Icono className="h-10 w-10" />
                </div>
                <h3 className="text-xl font-semibold">{caracteristica.titulo}</h3>
                <p className="text-muted-foreground">{caracteristica.descripcion}</p>
                <Button className="bg-primary hover:bg-primary/90">{caracteristica.botonTexto}</Button>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
