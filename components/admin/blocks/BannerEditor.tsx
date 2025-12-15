"use client"

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { AlertCircle } from "lucide-react"
import { ImageUpload } from "../image-upload"
import { AlignmentControl } from "./AlignmentControl"

interface BannerEditorProps {
  data: any
  variant?: string
  onChange: (campo: string, valor: any) => void
}

export function BannerEditor({ data, variant, onChange }: BannerEditorProps) {
  
  const estiloActual = variant || data.variant || data.estilo || "default"
  const isFlat = estiloActual.toLowerCase() === "flat"

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label>Título</Label>
        <Input 
          value={data.titulo || ""} 
          onChange={(e) => onChange("titulo", e.target.value)} 
          placeholder="Título del banner"
        />
      </div>
      
      <div className="space-y-2">
        <Label>Subtítulo</Label>
        <Textarea
          value={data.subtitulo || ""}
          onChange={(e) => onChange("subtitulo", e.target.value)}
          rows={2}
          placeholder="Descripción corta o subtítulo"
        />
      </div>

      {/* BLOQUE DE IMAGEN - Se bloquea si es Flat */}
      <div 
        className={`space-y-3 p-3 rounded-lg border transition-all ${
          isFlat 
            ? "bg-muted/30 border-dashed border-muted-foreground/20 opacity-75" 
            : "bg-transparent border-transparent p-0"
        }`}
      >
        <div className="flex items-center justify-between mb-1">
            <Label className={isFlat ? "text-muted-foreground" : ""}>Imagen de Fondo</Label>
            {isFlat && (
                <span className="text-[10px] flex items-center gap-1 text-amber-600 font-medium bg-amber-50 px-2 py-0.5 rounded-full border border-amber-100">
                    <AlertCircle className="w-3 h-3" /> No disponible en Flat
                </span>
            )}
        </div>

        {/* Contenedor del upload: deshabilitado visual y funcionalmente */}
        <div className={isFlat ? "pointer-events-none opacity-50 grayscale" : ""}>
            <ImageUpload
               value={data.imagen || ""}
               onChange={(value) => onChange("imagen", value)}
            />
        </div>
        
        {isFlat && (
            <p className="text-[11px] text-muted-foreground mt-2 flex gap-1.5 items-start">
                <AlertCircle className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                El estilo "Flat" utiliza un color sólido de fondo. Cambia a "Estándar" o "Card" para usar una imagen.
            </p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
            <Label>Texto del Botón</Label>
            <Input 
            value={data.botonTexto || ""} 
            onChange={(e) => onChange("botonTexto", e.target.value)} 
            placeholder="Ej: Ver más"
            />
        </div>
        
        <div className="space-y-2">
            <Label>URL del Botón</Label>
            <Input 
            value={data.botonUrl || ""} 
            onChange={(e) => onChange("botonUrl", e.target.value)} 
            placeholder="#"
            />
        </div>
      </div>
      
      <div className="pt-4 border-t">
        <AlignmentControl 
          value={data.alineacion || "centro"}
          onChange={(val) => onChange("alineacion", val)}
        />
      </div>
    </div>
  )
}