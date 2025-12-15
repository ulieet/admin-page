// components/admin/blocks/ImageCardEditor.tsx

import React from "react"
import { ImageCardBlock } from "@/lib/types/blocks"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
// Asumiendo que esta importación es correcta para tu proyecto
import { ImageUpload } from "@/components/admin/image-upload" 

interface ImageCardEditorProps {
  data: ImageCardBlock["datos"] & { variant?: string }
  onChange: (field: keyof ImageCardBlock["datos"] | "variant", value: any) => void
}

export function ImageCardEditor({ data, onChange }: ImageCardEditorProps) {
  const handleDataChange = (field: keyof ImageCardBlock["datos"], value: any) => {
    onChange(field, value)
  }

  return (
    <div className="space-y-6 p-4">
      <h3 className="text-lg font-semibold border-b pb-2">Contenido de la Tarjeta</h3>

      {/* Imagen */}
      <div className="space-y-2">
        <Label htmlFor="imagenUrl">Imagen de la Tarjeta (URL)</Label>
        {/* Usamos el componente ImageUpload para la imagen principal */}
        <ImageUpload 
            id="imagenUrl"
            value={data.imagenUrl} 
            onChange={(url) => handleDataChange("imagenUrl", url)} 
            placeholder="URL de la imagen"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="altTexto">Texto Alternativo (Alt)</Label>
        <Input
            id="altTexto"
            value={data.altTexto || ""}
            onChange={(e) => handleDataChange("altTexto", e.target.value)}
            placeholder="Texto descriptivo para accesibilidad"
        />
      </div>

      {/* Etiqueta */}
      <div className="space-y-2">
        <Label htmlFor="etiqueta">Etiqueta/Badge</Label>
        <Input
          id="etiqueta"
          value={data.etiqueta}
          onChange={(e) => handleDataChange("etiqueta", e.target.value)}
          placeholder="Ej: Residencial Ecológico"
        />
      </div>

      {/* Título */}
      <div className="space-y-2">
        <Label htmlFor="titulo">Título Principal</Label>
        <Input
          id="titulo"
          value={data.titulo}
          onChange={(e) => handleDataChange("titulo", e.target.value)}
          placeholder="Ej: Hogares Veres"
        />
      </div>

      {/* Descripción */}
      <div className="space-y-2">
        <Label htmlFor="descripcion">Descripción</Label>
        <Textarea
          id="descripcion"
          value={data.descripcion}
          onChange={(e) => handleDataChange("descripcion", e.target.value)}
          placeholder="Texto descriptivo de la tarjeta"
        />
      </div>

      {/* Botón/Link */}
      <div className="grid grid-cols-2 gap-4 border-t pt-4">
        <div className="space-y-2">
          <Label htmlFor="linkTexto">Texto del Enlace</Label>
          <Input
            id="linkTexto"
            value={data.linkTexto}
            onChange={(e) => handleDataChange("linkTexto", e.target.value)}
            placeholder="Ej: Explorar proyectos"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="linkUrl">URL del Enlace</Label>
          <Input
            id="linkUrl"
            value={data.linkUrl}
            onChange={(e) => handleDataChange("linkUrl", e.target.value)}
            placeholder="/proyectos"
          />
        </div>
      </div>
    </div>
  )
}