import type { Cards3Block, StyleConfig } from "@/lib/types/blocks"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Award, Users, Building, Shield, Target, TrendingUp, Cog, BarChart, type LucideIcon } from "lucide-react"

interface BloqueCards3Props {
  data: Cards3Block["datos"]
  estilos?: StyleConfig | null
}

const iconMap: Record<string, LucideIcon> = {
  award: Award,
  users: Users,
  building: Building,
  shield: Shield,
  target: Target,
  "trending-up": TrendingUp,
  cog: Cog,
  "bar-chart": BarChart,
}

export function BloqueCards3({ data, estilos }: BloqueCards3Props) {
  const primaryColor = estilos?.colores.primario || "#3b82f6"
  const textColor = estilos?.colores.texto || "#1f2937"

  return (
    <section className="py-20 px-4 bg-background">
      <div className="container mx-auto">
        {data.titulo && (
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12" style={{ color: textColor }}>
            {data.titulo}
          </h2>
        )}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {data.items.map((item, index) => {
            const Icon = iconMap[item.icono] || Award
            return (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div
                    className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: `${primaryColor}15` }}
                  >
                    {item.icono.startsWith("data:") ? (
                      <img
                        src={item.icono || "/placeholder.svg"}
                        alt={item.titulo}
                        className="w-10 h-10 object-contain"
                      />
                    ) : (
                      <Icon className="w-8 h-8" style={{ color: primaryColor }} />
                    )}
                  </div>
                  <CardTitle style={{ color: textColor }}>{item.titulo}</CardTitle>
                  <CardDescription>{item.descripcion}</CardDescription>
                </CardHeader>
                {item.botonTexto && (
                  <CardContent>
                    <Button asChild variant="outline" style={{ borderColor: primaryColor, color: primaryColor }}>
                      <Link href={item.botonUrl || "#"}>{item.botonTexto}</Link>
                    </Button>
                  </CardContent>
                )}
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
