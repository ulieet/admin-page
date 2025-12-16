"use client"

import React from "react"
import { ImageCardBlock } from "@/lib/types/blocks"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
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
    <div className="space-y-4 p-2">
      <div className="space-y-2">
        <Label>Imagen</Label>
        <ImageUpload 
            value={data.imagenUrl || ""} 
            onChange={(url) => handleDataChange("imagenUrl", url)} 
            placeholder="URL imagen"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
            <Label>Título</Label>
            <Input value={data.titulo || ""} onChange={(e) => handleDataChange("titulo", e.target.value)} />
        </div>
        <div className="space-y-2">
            <Label>Etiqueta</Label>
            <Input value={data.etiqueta || ""} onChange={(e) => handleDataChange("etiqueta", e.target.value)} />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Descripción</Label>
        <Textarea value={data.descripcion || ""} onChange={(e) => handleDataChange("descripcion", e.target.value)} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
           <Label>Texto Link</Label>
           <Input value={data.linkTexto || ""} onChange={(e) => handleDataChange("linkTexto", e.target.value)} />
        </div>
        <div className="space-y-2">
           <Label>URL Link</Label>
           <Input value={data.linkUrl || ""} onChange={(e) => handleDataChange("linkUrl", e.target.value)} />
        </div>
      </div>
    </div>
  )
}