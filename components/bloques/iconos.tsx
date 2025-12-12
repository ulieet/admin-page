import type React from "react"
import type { IconosBlock, StyleConfig } from "@/lib/types/blocks"
import { Award, Briefcase, Users, Star, CheckCircle, Shield } from "lucide-react"

interface IconosProps {
  data: IconosBlock["datos"]
  estilos?: StyleConfig | null
}

const iconMap: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
  briefcase: Briefcase,
  users: Users,
  award: Award,
  star: Star,
  check: CheckCircle,
  shield: Shield,
}

export function BloqueIconos({ data, estilos }: IconosProps) {
  const primaryColor = estilos?.colores.primario || "#1e40af"
  const textColor = estilos?.colores.texto || "#1f2937"
  // </CHANGE>

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-balance" style={{ color: textColor }}>
          {data.titulo}
        </h2>
        {/* </CHANGE> */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {data.items.map((item, index) => {
            const Icon = iconMap[item.icono] || Briefcase
            return (
              <div key={index} className="text-center p-6 rounded-lg border bg-card hover:shadow-lg transition-shadow">
                <div
                  className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4"
                  style={{ backgroundColor: `${primaryColor}15` }}
                >
                  <Icon className="w-8 h-8" style={{ color: primaryColor }} />
                  {/* </CHANGE> */}
                </div>
                <h3 className="text-xl font-semibold mb-2" style={{ color: textColor }}>
                  {item.titulo}
                </h3>
                {/* </CHANGE> */}
                <p className="text-muted-foreground">{item.descripcion}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
