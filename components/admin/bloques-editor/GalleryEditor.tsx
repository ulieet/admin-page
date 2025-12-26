"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Trash2, Plus, Link as LinkIcon } from "lucide-react"
import { ImageUpload } from "../image-upload"

interface GalleryEditorProps {
  data: any
  onChange: (campo: string, valor: any) => void
}

export function GalleryEditor({ data, onChange }: GalleryEditorProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label>Título (opcional)</Label>
        <Input 
          value={data.titulo || ""} 
          onChange={(e) => onChange("titulo", e.target.value)} 
        />
      </div>
      
      <div className="space-y-2">
        <Label>Tamaño de las Imágenes</Label>
        <Select
          value={String(data.columnas || 3)}
          onValueChange={(val) => onChange("columnas", Number.parseInt(val))}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="2">Grandes (2 por fila)</SelectItem>
            <SelectItem value="3">Medianas (3 por fila)</SelectItem>
            <SelectItem value="4">Pequeñas (4 por fila)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label>Imágenes</Label>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => {
              const nuevasImagenes = [...(data.imagenes || []), { url: "", alt: "Imagen de galería", link: "" }]
              onChange("imagenes", nuevasImagenes)
            }}
          >
            <Plus className="w-4 h-4 mr-2" />
            Agregar Imagen
          </Button>
        </div>

        {(data.imagenes || []).map((imagen: any, index: number) => (
          <div key={index} className="border p-4 rounded-lg space-y-3 bg-muted/30">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Imagen {index + 1}</span>
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={() => {
                  const nuevasImagenes = (data.imagenes || []).filter((_: any, i: number) => i !== index)
                  onChange("imagenes", nuevasImagenes)
                }}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="space-y-2">
              <Label className="text-xs">Archivo de imagen</Label>
              <ImageUpload
                value={imagen.url || ""}
                onChange={(value) => {
                  const nuevasImagenes = [...(data.imagenes || [])]
                  nuevasImagenes[index] = { ...imagen, url: value }
                  onChange("imagenes", nuevasImagenes)
                }}
              />
            </div>
            
            <div className="space-y-1">
              <Label className="text-xs">Enlace de redirección (opcional)</Label>
              <div className="flex items-center gap-2">
                  <LinkIcon className="h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="https://... o #seccion"
                    value={imagen.link || ""}
                    onChange={(e) => {
                      const nuevasImagenes = [...(data.imagenes || [])]
                      nuevasImagenes[index] = { ...imagen, link: e.target.value }
                      onChange("imagenes", nuevasImagenes)
                    }}
                  />
              </div>
              <p className="text-[10px] text-muted-foreground">Si se deja vacío, la imagen no tendrá enlace.</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}