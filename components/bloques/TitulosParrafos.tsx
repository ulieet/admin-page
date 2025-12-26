"use client"

import { cn } from "@/lib/utils"
import type { TituloParrafosBlock } from "@/lib/types/blocks" 

interface BloqueTituloParrafosProps {
  data: TituloParrafosBlock["datos"]
  className?: string
}

export function BloqueTituloParrafos({ data, className }: BloqueTituloParrafosProps) {
  const alineacion = data.alineacion || "centrado";
  const isWhiteBg = !data.colorFondo || data.colorFondo === '#ffffff' || data.colorFondo === '#FFFFFF';
  const primaryColor = "var(--color-primario)";

  return (
    <section 
        className={cn("py-20 md:py-28 transition-colors duration-300", className)} 
        style={{ 
            backgroundColor: isWhiteBg ? "var(--color-fondo)" : data.colorFondo,
            color: "var(--color-texto)"
        }}
    >
      <div className="container mx-auto px-4 max-w-7xl">
        
        
        {alineacion === 'dividido' && (
            <div className="flex flex-col gap-10 md:gap-16">
                
                <div className="max-w-4xl">
                    <h2 
                        className="text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.1]"
                        style={{ color: primaryColor }}
                    >
                        {data.titulo}
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-start border-t border-black/5 pt-10">
                    <div className="text-lg md:text-xl leading-relaxed opacity-90 font-medium prose-p:mb-4">
                        <p>{data.parrafoIzquierda}</p>
                    </div>
                    <div className="text-lg md:text-xl leading-relaxed opacity-70 font-light prose-p:mb-4">
                        <p>{data.parrafoDerecha}</p>
                    </div>
                </div>

            </div>
        )}

        {alineacion === 'centrado' && (
            <div className="text-center max-w-4xl mx-auto space-y-8">
                {data.titulo && (
                    <h2 
                        className="text-3xl md:text-5xl font-bold tracking-tight mb-6"
                        style={{ color: primaryColor }}
                    >
                        {data.titulo}
                    </h2>
                )}
                
                <div className="max-w-3xl mx-auto text-lg md:text-xl opacity-90 leading-relaxed font-light space-y-6">
                    {data.parrafoIzquierda && <p>{data.parrafoIzquierda}</p>}
                    {data.parrafoDerecha && <p>{data.parrafoDerecha}</p>}
                </div>
            </div>
        )}

      </div>
    </section>
  )
}