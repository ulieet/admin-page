import type { FormBlock, StyleConfig } from "@/lib/types/blocks"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label" // <--- IMPORT AGREGADO PARA CORREGIR EL ERROR
import { Mail, Phone, Clock, Send } from "lucide-react"
import { cn } from "@/lib/utils"

interface BloqueFormProps {
  data: FormBlock["datos"]
  estilos?: StyleConfig | null
}

export function BloqueForm({ data, estilos }: BloqueFormProps) {
  const alineacion = data.alineacion || "centro"
  const estiloVisual = data.estiloVisual || "clasico"

  const primaryColor = estilos?.colores.primario || "#1e40af"
  const textColor = estilos?.colores.texto || "#1f2937"

  // Clases del contenedor principal
  const containerClasses = cn(
    "w-full max-w-6xl mx-auto px-4 py-16",
    "flex flex-col gap-12",
    // Izquierda: Texto a la izq, Form a la derecha (orden normal)
    alineacion === "izquierda" && "lg:flex-row",
    // Derecha: Texto a la derecha, Form a la izq (orden invertido)
    alineacion === "derecha" && "lg:flex-row-reverse",
    // Centro: Todo centrado verticalmente
    alineacion === "centro" && "items-center text-center"
  )

  // Clases del formulario según el estilo
  const formCardClasses = cn(
    "w-full max-w-md space-y-6 transition-all duration-300",
    
    // Estilo 1: Tarjeta (Sombra fuerte y borde suave)
    estiloVisual === "tarjeta" && "bg-white p-8 rounded-xl shadow-lg border border-gray-100",
    
    // Estilo 2: Clásico (AHORA CON CONTORNO/BORDE y fondo blanco, sin sombra)
    estiloVisual === "clasico" && "bg-white p-8 rounded-xl border border-neutral-300",
    
    // Estilo 3: Minimal (Sin fondo, sin borde contenedor, inputs flotantes)
    estiloVisual === "minimal" && "bg-transparent p-0"
  )

  // Clases para los inputs según estilo
  const inputClasses = cn(
    estiloVisual === "minimal" 
      ? "rounded-none border-x-0 border-t-0 border-b-2 border-gray-300 px-0 focus-visible:ring-0 focus-visible:border-primary bg-transparent shadow-none placeholder:text-gray-400" 
      : "bg-white border-gray-200 focus-visible:ring-offset-0"
  )

  return (
    <section className="bg-slate-50/50">
      <div className={containerClasses}>
        
        {/* LADO A: TEXTO E INFORMACIÓN */}
        <div className={cn("flex-1 space-y-6", alineacion === "centro" && "max-w-2xl")}>
          <div className="space-y-4">
            <h2 
              className="text-3xl font-bold tracking-tighter sm:text-4xl"
              style={{ color: textColor }}
            >
              {data.titulo}
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              {data.descripcion}
            </p>
          </div>

          {data.infoContacto && (
            <div className={cn(
              "grid gap-4 mt-8", 
              alineacion === "centro" ? "justify-center sm:flex sm:flex-wrap" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-1"
            )}>
              {data.infoContacto.email && (
                <div className="flex items-center gap-3 text-sm font-medium p-3 bg-white rounded-lg border w-fit shadow-sm">
                  <Mail className="w-5 h-5" style={{ color: primaryColor }} />
                  <span>{data.infoContacto.email}</span>
                </div>
              )}
              {data.infoContacto.telefono && (
                <div className="flex items-center gap-3 text-sm font-medium p-3 bg-white rounded-lg border w-fit shadow-sm">
                  <Phone className="w-5 h-5" style={{ color: primaryColor }} />
                  <span>{data.infoContacto.telefono}</span>
                </div>
              )}
              {data.infoContacto.horario && (
                <div className="flex items-center gap-3 text-sm font-medium p-3 bg-white rounded-lg border w-fit shadow-sm">
                  <Clock className="w-5 h-5" style={{ color: primaryColor }} />
                  <span>{data.infoContacto.horario}</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* LADO B: FORMULARIO */}
        <div className={cn("w-full max-w-md flex-shrink-0 mx-auto lg:mx-0", alineacion === "centro" && "mt-4")}>
          <div className={formCardClasses}>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                {estiloVisual !== "minimal" && <Label>Nombre</Label>}
                <Input placeholder="Tu nombre" className={inputClasses} />
              </div>
              <div className="space-y-2">
                {estiloVisual !== "minimal" && <Label>Apellido</Label>}
                <Input placeholder="Tu apellido" className={inputClasses} />
              </div>
            </div>
            <div className="space-y-2">
              {estiloVisual !== "minimal" && <Label>Email</Label>}
              <Input type="email" placeholder="tu@email.com" className={inputClasses} />
            </div>
            <div className="space-y-2">
              {estiloVisual !== "minimal" && <Label>Mensaje</Label>}
              <Textarea placeholder="¿En qué podemos ayudarte?" className={cn("min-h-[120px]", inputClasses)} />
            </div>
            
            <Button 
              className={cn("w-full font-medium text-white shadow-sm hover:opacity-90", estiloVisual === "minimal" ? "rounded-none" : "rounded-lg")}
              size="lg"
              style={{ backgroundColor: primaryColor }}
            >
              <Send className="w-4 h-4 mr-2" />
              {data.botonTexto || "Enviar Mensaje"}
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}