"use client"

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import { ImageUpload } from "../image-upload"

interface HeroEditorProps {
  data: any
  onChange: (campo: string, valor: any) => void
}

export function HeroEditor({ data, onChange }: HeroEditorProps) {
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

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label>Imágenes (Carrusel)</Label>
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              const currentImages = data.imagenes || []
              onChange("imagenes", [...currentImages, ""])
            }}
          >
            + Agregar Imagen
          </Button>
        </div>

        {/* Lógica de Lista de Imágenes */}
        {(data.imagenes || []).map((imagen: string, index: number) => (
          <div key={index} className="flex gap-2 flex-col p-3 border rounded-md bg-muted/10">
            <div className="flex justify-between items-center mb-2">
              <Label className="text-xs text-muted-foreground">Imagen {index + 1}</Label>
              {(data.imagenes || []).length > 1 && (
                <Button
                  size="sm"
                  variant="destructive"
                  className="h-6 px-2"
                  onClick={() => {
                    const newImages = (data.imagenes || []).filter((_: string, i: number) => i !== index)
                    onChange("imagenes", newImages)
                  }}
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              )}
            </div>
            
            <ImageUpload
              value={imagen}
              onChange={(value) => {
                const newImages = [...(data.imagenes || [])]
                newImages[index] = value
                onChange("imagenes", newImages)
              }}
            />
          </div>
        ))}

        {/* Estado vacío por seguridad: siempre mostrar al menos 1 input si no hay nada */}
        {(!data.imagenes || data.imagenes.length === 0) && (
          <div className="space-y-2">
            <Label>Imagen 1</Label>
            <ImageUpload
              value=""
              onChange={(value) => {
                onChange("imagenes", [value])
              }}
            />
          </div>
        )}
      </div>

      <div className="space-y-2 border-t pt-4">
        <Label className="text-base font-semibold">Botón Primario</Label>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Texto</Label>
            <Input
              value={data.botonPrimarioTexto || ""}
              onChange={(e) => onChange("botonPrimarioTexto", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>URL</Label>
            <Input
              value={data.botonPrimarioUrl || ""}
              onChange={(e) => onChange("botonPrimarioUrl", e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="space-y-2 border-t pt-4">
        <Label className="text-base font-semibold">Botón Secundario</Label>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Texto</Label>
            <Input
              value={data.botonSecundarioTexto || ""}
              onChange={(e) => onChange("botonSecundarioTexto", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>URL</Label>
            <Input
              value={data.botonSecundarioUrl || ""}
              onChange={(e) => onChange("botonSecundarioUrl", e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  )
}