"use client"

import { cn } from "@/lib/utils"
import type { TituloParrafosBlock } from "@/lib/types/blocks" 

interface BloqueTituloParrafosProps {
  data: TituloParrafosBlock["datos"]
  className?: string
}

export function BloqueTituloParrafos({ data, className }: BloqueTituloParrafosProps) {
  // Aseguramos valores por defecto
  const alineacion = data.alineacion || "centrado";
  const isWhiteBg = !data.colorFondo || data.colorFondo === '#ffffff' || data.colorFondo === '#FFFFFF';
  
  return (
    <section 
        className={cn("py-16 md:py-24 transition-colors duration-300", className)} 
        style={{ 
            backgroundColor: isWhiteBg ? "var(--color-fondo)" : data.colorFondo,
            color: "var(--color-texto)"
        }}
    >
      <div className="container mx-auto px-4">
        
        <div className={cn(
            "grid gap-8 items-start", 
            // Si es 'dividido', usamos 12 columnas. Si no, 1 sola.
            alineacion === 'dividido' ? "grid-cols-1 lg:grid-cols-12" : "grid-cols-1"
        )}>
          
          {/* TÍTULO */}
          <div className={alineacion === 'dividido' ? "lg:col-span-4" : "lg:col-span-full"}>
            <h2 
                className={cn(
                    "text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.1]", 
                    alineacion === 'dividido' ? "text-left" : "text-center max-w-4xl mx-auto"
                )}
                style={{ color: "var(--color-primario)" }}
            >
                {data.titulo}
            </h2>
          </div>
          
          {/* CONTENIDO (Párrafos) */}
          <div className={alineacion === 'dividido' ? "lg:col-span-8" : "lg:col-span-full"}>
            
            {alineacion === 'dividido' ? (
              // MODO DIVIDIDO: Grid de 2 columnas para los textos
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-lg opacity-90 leading-relaxed">
                <div className="prose-p:mb-4">
                    <p>{data.parrafoIzquierda}</p>
                </div>
                <div className="prose-p:mb-4">
                    <p>{data.parrafoDerecha}</p>
                </div>
              </div>
            ) : (
              // MODO CENTRADO: Un solo bloque centrado
              <div className="max-w-3xl mx-auto text-center text-lg md:text-xl opacity-90 leading-relaxed">
                <p>{data.parrafoIzquierda}</p>
              </div>
            )}
            
          </div>
        </div>
      </div>
    </section>
  )
}