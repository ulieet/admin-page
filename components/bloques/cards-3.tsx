import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowRight, Shield, Zap, BarChart3, Users, Globe, Lock, Smartphone, Mail, Star, FileText } from "lucide-react"
import Link from "next/link"
import type { StyleConfig } from "@/lib/types/blocks"

const ICON_MAP: Record<string, any> = {
  shield: Shield, zap: Zap, chart: BarChart3, users: Users, globe: Globe,
  lock: Lock, phone: Smartphone, mail: Mail, file: FileText, star: Star,
}

const DEMO_ITEMS = [
  { icon: "users", title: "Atención", description: "Atención personalizada.", link: "#", buttonText: "Ver más" },
  { icon: "lock", title: "Seguridad", description: "Confidencialidad total.", link: "#", buttonText: "Ver más" },
  { icon: "file", title: "Empresas", description: "Servicios integrales.", link: "#", buttonText: "Ver más" },
]

interface BloqueCards3Props {
  data: any
  variant?: string
  estilos?: StyleConfig | null
}

export function BloqueCards3({ data, variant = "corporate", estilos }: BloqueCards3Props) {
  const title = data.title || "Nuestros Servicios"
  const subtitle = data.description || "Soluciones profesionales para tu crecimiento."
  const rawItems = data.items?.length > 0 ? data.items : DEMO_ITEMS
  const primaryColor = estilos?.colores?.primario || "#1e3a8a" 

  const renderIcon = (item: any, className: string) => {
    const IconComponent = (typeof item.icon === 'string' ? ICON_MAP[item.icon] : item.icon) || Star
    return <IconComponent className={className} />
  }

  // Helper para asegurar que el link no rompa si viene vacío
  const getLink = (link?: string) => link && link.trim() !== "" ? link : "#"

  // --- MINIMALISTA (COMPACTO) ---
  if (variant === "minimal") {
    return (
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-5xl"> {/* Ancho máximo reducido un poco */}
          <div className="mb-12 max-w-2xl">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">{title}</h2>
            <p className="text-lg text-slate-500">{subtitle}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8"> {/* Gap reducido de 12 a 8 */}
            {rawItems.map((item: any, idx: number) => (
              <div key={idx} className="group flex flex-col items-start gap-3 h-full">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-1" style={{ backgroundColor: `${primaryColor}15`, color: primaryColor }}>
                  {renderIcon(item, "w-5 h-5")}
                </div>
                <h3 className="text-lg font-bold text-slate-900">{item.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{item.description}</p>
                <div className="mt-auto pt-2">
                  <Button asChild variant="link" className="p-0 h-auto text-sm font-semibold group-hover:translate-x-1 transition-transform" style={{ color: primaryColor }}>
                    <Link href={getLink(item.link)}>
                      {item.buttonText || "Saber más"} <ArrowRight className="w-3 h-3 ml-2" />
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  // --- INTERACTIVO (COMPACTO) ---
  if (variant === "interactive") {
    return (
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-5xl text-center mb-12">
            <h2 className="text-3xl font-black text-slate-900 mb-4">{title}</h2>
            <p className="text-base text-slate-500 max-w-2xl mx-auto">{subtitle}</p>
        </div>
        <div className="container mx-auto max-w-5xl grid md:grid-cols-3 gap-5">
          {rawItems.map((item: any, idx: number) => (
            <Link href={getLink(item.link)} key={idx} className="group relative p-6 rounded-2xl bg-slate-50 hover:bg-white border hover:border-slate-200 hover:shadow-lg transition-all duration-300 flex flex-col h-full text-left">
              <div className="mb-4 inline-block p-2.5 rounded-xl bg-white shadow-sm group-hover:scale-105 transition-transform duration-300 w-fit">
                 {renderIcon(item, "w-6 h-6 text-slate-700")}
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
              <p className="text-slate-500 text-sm mb-6">{item.description}</p>
              <div className="mt-auto w-full h-1 bg-slate-200 rounded-full overflow-hidden">
                <div className="h-full w-0 group-hover:w-full transition-all duration-500 ease-out" style={{ backgroundColor: primaryColor }} />
              </div>
            </Link>
          ))}
        </div>
      </section>
    )
  }

  // --- CORPORATIVO (COMPACTO + BOTÓN AZUL) ---
  return (
    <section className="py-16 px-4 bg-slate-50/30">
      <div className="container mx-auto max-w-5xl text-center mb-12">
        <h2 className="text-3xl font-bold text-slate-900 mb-3">{title}</h2>
        <p className="text-lg text-slate-500 max-w-2xl mx-auto">{subtitle}</p>
      </div>

      <div className="container mx-auto max-w-5xl grid md:grid-cols-3 gap-6">
        {rawItems.map((item: any, idx: number) => (
          // CAMBIOS: p-6 (antes p-8), shadow-md (menos agresiva)
          <Card key={idx} className="bg-white border-none shadow-md hover:shadow-lg transition-all duration-300 p-6 flex flex-col items-center text-center rounded-xl h-full">
            
            {/* CAMBIOS: w-12 h-12 (antes w-16 h-16) */}
            <div 
              className="w-12 h-12 rounded-full flex items-center justify-center mb-4 text-white shadow-sm shrink-0"
              style={{ backgroundColor: primaryColor }}
            >
              {renderIcon(item, "w-6 h-6")}
            </div>
            
            {/* CAMBIOS: text-lg (antes xl) */}
            <h3 className="text-lg font-bold text-blue-900 mb-2">{item.title}</h3>
            
            {/* CAMBIOS: text-sm (antes base) y mb-6 */}
            <p className="text-slate-600 mb-6 leading-relaxed text-sm">
              {item.description}
            </p>

            {/* CAMBIOS: Botón más compacto (h-10, text-xs) */}
            <Button 
              asChild 
              className="mt-auto rounded-full px-6 h-10 font-bold text-xs tracking-wide shadow hover:shadow-md hover:-translate-y-0.5 transition-all"
              style={{ backgroundColor: primaryColor }}
            >
              <Link href={getLink(item.link)}>
                {(item.buttonText || "ASESORÍA CONTABLE").toUpperCase()}
              </Link>
            </Button>
          </Card>
        ))}
      </div>
    </section>
  )
}