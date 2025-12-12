import type { StatsBlock, StyleConfig } from "@/lib/types/blocks"
import { Award, Users, CheckCircle, TrendingUp, Star, type LucideIcon } from "lucide-react"

interface BloqueStatsProps {
  data: StatsBlock["datos"]
  estilos?: StyleConfig | null
}

const iconMap: Record<string, LucideIcon> = {
  award: Award,
  users: Users,
  "check-circle": CheckCircle,
  "trending-up": TrendingUp,
  star: Star,
}

export function BloqueStats({ data, estilos }: BloqueStatsProps) {
  const primaryColor = estilos?.colores.primario || "#1e40af"
  const textColor = estilos?.colores.texto || "#1f2937"
  // </CHANGE>

  return (
    <section className={`py-20 px-4 ${data.fondoOscuro ? "bg-gray-900 text-white" : "bg-background"}`}>
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {data.estadisticas.map((stat, index) => {
            const Icon = stat.icono ? iconMap[stat.icono] : null
            return (
              <div key={index} className="text-center space-y-2">
                {Icon && (
                  <div className="flex justify-center mb-4">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center"
                      style={{
                        backgroundColor: data.fondoOscuro ? "rgba(255,255,255,0.1)" : `${primaryColor}15`,
                      }}
                    >
                      <Icon className="w-6 h-6" style={{ color: data.fondoOscuro ? "white" : primaryColor }} />
                      {/* </CHANGE> */}
                    </div>
                  </div>
                )}
                <p className="text-4xl md:text-5xl font-bold" style={{ color: data.fondoOscuro ? "white" : textColor }}>
                  {stat.numero}
                </p>
                {/* </CHANGE> */}
                <p className={`text-lg ${data.fondoOscuro ? "text-white/80" : "text-muted-foreground"}`}>
                  {stat.label}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
