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

export function BannerEditor({ data, variant = "default", onChange }: BannerEditorProps) {
  
  // Aseguramos que la comparación sea insensible a mayúsculas/minúsculas
  const isFlat = (variant || "default").toLowerCase() === "flat"

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label>Título</Label>
        <Input 
          value={data.titulo || ""} 
          onChange={(e) => onChange("titulo", e.target.value)} 
        />
      </div>
      
      <div className="space-y-2">
        <Label>Subtítulo</Label>
        <Textarea
          value={data.subtitulo || ""}
          onChange={(e) => onChange("subtitulo", e.target.value)}
          rows={2}
        />
      </div>

      {/* BLOQUE DE IMAGEN */}
      <div 
        className={`space-y-2 p-3 rounded-lg border transition-all ${
          isFlat ? "bg-muted/50 opacity-50 pointer-events-none grayscale" : "bg-transparent border-transparent p-0"
        }`}
      >
        <div className="flex items-center justify-between mb-2">
            <Label className={isFlat ? "text-muted-foreground" : ""}>Imagen de Fondo</Label>
            {isFlat && (
                <span className="text-[10px] flex items-center gap-1 text-amber-600 font-medium bg-amber-50 px-2 py-0.5 rounded-full border border-amber-100">
                    <AlertCircle className="w-3 h-3" /> Bloqueado en Flat
                </span>
            )}
        </div>

        <ImageUpload
           value={data.imagen || ""}
           onChange={(value) => onChange("imagen", value)}
        />
        
        {isFlat && (
            <p className="text-[10px] text-muted-foreground mt-2">
                Cambia la variante a "Default" para poder subir una imagen.
            </p>
        )}
      </div>

      <div className="space-y-2">
        <Label>Texto del Botón</Label>
        <Input 
          value={data.botonTexto || ""} 
          onChange={(e) => onChange("botonTexto", e.target.value)} 
        />
      </div>
      
      <div className="space-y-2">
        <Label>URL del Botón</Label>
        <Input 
          value={data.botonUrl || ""} 
          onChange={(e) => onChange("botonUrl", e.target.value)} 
        />
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