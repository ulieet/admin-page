import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle2, ArrowRight } from "lucide-react"
import type { StyleConfig } from "@/lib/types/blocks"

interface BloqueTextImageProps {
  data: any
  variant?: string
  estilos?: StyleConfig | null
}

export function BloqueTextImage({ data, variant = "default", estilos }: BloqueTextImageProps) {
  const title = data.title || "Título de la sección"
  const description = data.description || "Agrega una descripción interesante aquí que acompañe a tu imagen."
  const image = data.image || "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80" // Fallback image
  const buttonText = data.buttonText
  const buttonUrl = data.buttonUrl || "#"
  // CORRECCIÓN: features vacío por defecto
  const features = data.features || [] 

  const primaryColor = estilos?.colores?.primario || "#3b82f6"

  // --- DISEÑO: MINIMAL (SUPERPUESTO / OVERLAY) ---
  if (variant === "minimal") {
    return (
      <section className="relative py-24 px-4 overflow-hidden bg-slate-900">
        {/* Imagen de fondo con overlay */}
        <div className="absolute inset-0 z-0">
            <img src={image} alt={title} className="w-full h-full object-cover opacity-40" />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent" />
        </div>

        <div className="container mx-auto max-w-6xl relative z-10">
            <div className="max-w-2xl text-white">
                <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">{title}</h2>
                <p className="text-xl text-slate-200 mb-8 leading-relaxed">{description}</p>
                
                {/* Lista de puntos (Solo si existen) */}
                {features.length > 0 && (
                    <ul className="space-y-3 mb-8">
                        {features.map((item: string, idx: number) => (
                            <li key={idx} className="flex items-center gap-3 text-slate-200">
                                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                )}

                {buttonText && (
                    <Button asChild size="lg" className="text-base font-semibold" style={{ backgroundColor: primaryColor }}>
                        <Link href={buttonUrl}>{buttonText}</Link>
                    </Button>
                )}
            </div>
        </div>
      </section>
    )
  }

  // --- DISEÑO: MODERN (60/40 TEXTO AMPLIO) ---
  // Layout asimétrico
  if (variant === "modern") {
    return (
        <section className="py-24 px-4 bg-white">
          <div className="container mx-auto max-w-6xl">
            <div className="grid md:grid-cols-[1.2fr_0.8fr] gap-12 items-center">
               {/* Columna Texto (Izquierda) */}
               <div className="order-2 md:order-1">
                  <h2 className="text-4xl font-bold text-slate-900 mb-6">{title}</h2>
                  <p className="text-lg text-slate-600 mb-8 leading-relaxed whitespace-pre-line">
                      {description}
                  </p>

                  {features.length > 0 && (
                      <div className="grid sm:grid-cols-2 gap-4 mb-8">
                          {features.map((item: string, idx: number) => (
                              <div key={idx} className="flex items-center gap-2 text-slate-700 font-medium bg-slate-50 p-3 rounded-lg">
                                  <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: primaryColor }} />
                                  <span>{item}</span>
                              </div>
                          ))}
                      </div>
                  )}

                  {buttonText && (
                      <Button asChild variant="outline" className="border-2 font-bold hover:bg-slate-50">
                          <Link href={buttonUrl}>
                              {buttonText} <ArrowRight className="w-4 h-4 ml-2"/>
                          </Link>
                      </Button>
                  )}
               </div>

               {/* Columna Imagen (Derecha) */}
               <div className="order-1 md:order-2 relative h-[400px] rounded-2xl overflow-hidden shadow-2xl">
                   <img src={image} alt={title} className="w-full h-full object-cover" />
               </div>
            </div>
          </div>
        </section>
    )
  }

  // --- DISEÑO: DEFAULT (50/50 CLÁSICO) ---
  return (
    <section className="py-20 px-4 bg-slate-50/50">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          
          {/* Imagen */}
          <div className="relative rounded-2xl overflow-hidden shadow-lg h-[300px] md:h-[500px]">
             <img src={image} alt={title} className="w-full h-full object-cover" />
          </div>

          {/* Texto */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">{title}</h2>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                {description}
            </p>

            {/* Lista: Solo se renderiza si features tiene algo */}
            {features.length > 0 && (
                <ul className="space-y-4 mb-8">
                    {features.map((item: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-3">
                            <CheckCircle2 className="w-6 h-6 shrink-0 mt-0.5" style={{ color: primaryColor }} />
                            <span className="text-slate-700">{item}</span>
                        </li>
                    ))}
                </ul>
            )}

            {buttonText && (
                <Button asChild size="lg" style={{ backgroundColor: primaryColor }}>
                    <Link href={buttonUrl}>{buttonText}</Link>
                </Button>
            )}
          </div>

        </div>
      </div>
    </section>
  )
}