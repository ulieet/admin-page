"use client"

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { ImageUpload } from "../image-upload"

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
          placeholder="Título principal"
        />
      </div>
      
      <div className="space-y-2">
        <Label>Descripción</Label>
        <Textarea
          value={data.descripcion || data.subtitulo || ""}
          onChange={(e) => onChange("descripcion", e.target.value)}
          placeholder="Texto secundario"
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <Label>Imagen de Fondo</Label>
        <ImageUpload
            value={data.imagenFondo || data.imagen || ""}
            onChange={(val) => onChange("imagenFondo", val)}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
            <Label>Texto Botón</Label>
            <Input 
              value={data.botonTexto || ""} 
              onChange={(e) => onChange("botonTexto", e.target.value)} 
              placeholder="Ej: Ver más"
            />
        </div>
        <div className="space-y-2">
            <Label>Enlace Botón</Label>
            <Input 
              value={data.botonUrl || ""} 
              onChange={(e) => onChange("botonUrl", e.target.value)} 
              placeholder="#"
            />
        </div>
      </div>
    </div>
  )
}