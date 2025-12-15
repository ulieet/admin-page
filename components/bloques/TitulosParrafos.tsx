"use client"

import { cn } from "@/lib/utils"
import type { StyleConfig, TituloParrafosBlock } from "@/lib/types/blocks" 

interface BloqueTituloParrafosProps {
  data: TituloParrafosBlock["datos"]
  estilos?: StyleConfig | null
  className?: string
}

export function BloqueTituloParrafos({ data, estilos, className }: BloqueTituloParrafosProps) {
  // Estilos globales
  const primaryColor = estilos?.colores?.primario || "#3b82f6" 
  const globalBackgroundColor = estilos?.colores?.fondo || "#ffffff" 
  const userTextColor = estilos?.colores?.texto || "#0f172a"
  
  // ✅ Usamos los tamaños definidos en el administrador
  const userTitleSize = estilos?.tipografia?.tamanoTitulo || "3rem" // Forzamos un valor grande por si el config es bajo
  const userSubtitleSize = estilos?.tipografia?.tamanoSubtitulo || "1.25rem"
  
  // Lógica para determinar el color de fondo (si es blanco, usa el color de fondo global)
  const effectiveBackgroundColor = data.colorFondo === '#ffffff' || data.colorFondo === '#FFFFFF'
    ? globalBackgroundColor
    : data.colorFondo;
    
  // Estilos de la Sección
  const sectionStyle: React.CSSProperties = {
    backgroundColor: effectiveBackgroundColor,
    color: userTextColor,
    // La fuente base se hereda del body/html
  };
  
  // ✅ ESTILOS DEL TÍTULO (Grande y Primario)
  const titleStyle: React.CSSProperties = {
    color: primaryColor, // Color principal
    fontSize: userTitleSize, // Tamaño grande
    lineHeight: 1.1,
    // Aseguramos que los párrafos y el subtítulo sean más pequeños que el título
  };

  // ✅ ESTILOS DE LOS PÁRRAFOS (Usando tamaño de subtítulo o más pequeño para contraste)
  const paragraphStyle: React.CSSProperties = {
    color: userTextColor,
    fontSize: userSubtitleSize, // Usa tamaño de subtítulo para buen impacto
    lineHeight: 1.6,
  };

  // Clases de alineación
  const isDividido = data.alineacion === 'dividido';
  const titleAlignmentClass = isDividido ? "text-left" : "text-center";
  const textAlignmentClass = isDividido ? "text-left" : "text-center mx-auto";


  return (
    <section className={cn("py-16 md:py-24", className)} style={sectionStyle}>
      <div className="container mx-auto px-4">
        
        <div className={cn(
            "grid gap-8", 
            isDividido ? "grid-cols-1 lg:grid-cols-12" : "grid-cols-1"
        )}>
          
          {/* TÍTULO */}
          <div className={isDividido ? "lg:col-span-4" : "lg:col-span-full"}>
            <h2 
                style={titleStyle} 
                className={cn("font-extrabold tracking-tight", titleAlignmentClass, isDividido ? "max-w-md" : "max-w-4xl mx-auto")}
            >
                {data.titulo}
            </h2>
          </div>
          
          {/* CONTENIDO (PÁRRAFOS) */}
          <div className={isDividido ? "lg:col-span-8" : "lg:col-span-full"}>
            
            {isDividido ? (
              // Modo Dividido (2 columnas de texto a la derecha)
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <p style={paragraphStyle}>
                    {data.parrafoIzquierda}
                  </p>
                </div>
                {data.parrafoDerecha && (
                    <div>
                        <p style={paragraphStyle}>
                            {data.parrafoDerecha}
                        </p>
                    </div>
                )}
              </div>
              
            ) : (
              // Modo Centrado (Texto único centrado)
              <div className={cn("max-w-3xl", textAlignmentClass)}>
                <p style={paragraphStyle}>
                  {data.parrafoIzquierda}
                </p>
              </div>
            )}
            
          </div>
          
        </div>
        
      </div>
    </section>
  )
}