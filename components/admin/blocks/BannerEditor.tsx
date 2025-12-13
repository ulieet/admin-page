"use client"

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

// Importamos los componentes compartidos
import { ImageUpload } from "../image-upload"
import { AlignmentControl } from "./AlignmentControl"

interface BannerEditorProps {
  data: any
  onChange: (campo: string, valor: any) => void
}

export function BannerEditor({ data, onChange }: BannerEditorProps) {
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

      <div className="space-y-2">
        <Label>Imagen de Fondo</Label>
        <ImageUpload
          value={data.imagen || ""}
          onChange={(value) => onChange("imagen", value)}
        />
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