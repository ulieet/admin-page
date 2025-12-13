"use client"

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Trash2, Plus } from "lucide-react"

// Importamos el componente compartido
import { ImageUpload } from "../image-upload"

interface TextImageEditorProps {
  data: any
  onChange: (campo: string, valor: any) => void
}

export function TextImageEditor({ data, onChange }: TextImageEditorProps) {
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
        <Label>Primer Párrafo</Label>
        <Textarea
          value={data.parrafo1 || ""}
          onChange={(e) => onChange("parrafo1", e.target.value)}
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <Label>Segundo Párrafo</Label>
        <Textarea
          value={data.parrafo2 || ""}
          onChange={(e) => onChange("parrafo2", e.target.value)}
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <Label>Imagen</Label>
        <ImageUpload
          value={data.imagen || ""}
          onChange={(value) => onChange("imagen", value)}
        />
      </div>

      <div className="space-y-2">
        <Label>Posición de la Imagen</Label>
        <select
          className="w-full px-3 py-2 border rounded-md bg-background text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          value={data.posicionImagen || "derecha"}
          onChange={(e) => onChange("posicionImagen", e.target.value)}
        >
          <option value="izquierda">Izquierda</option>
          <option value="derecha">Derecha</option>
        </select>
      </div>

      <div className="space-y-4 border-t pt-4">
        <div className="flex items-center justify-between">
          <Label>Puntos Destacados (opcional)</Label>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => {
              const nuevosPuntos = [...(data.puntos || []), "Nuevo punto"]
              onChange("puntos", nuevosPuntos)
            }}
          >
            <Plus className="w-4 h-4 mr-2" />
            Agregar Punto
          </Button>
        </div>

        {(data.puntos || []).map((punto: string, index: number) => (
          <div key={index} className="flex gap-2">
            <Input
              value={punto || ""}
              onChange={(e) => {
                const nuevosPuntos = [...(data.puntos || [])]
                nuevosPuntos[index] = e.target.value
                onChange("puntos", nuevosPuntos)
              }}
            />
            <Button
              type="button"
              variant="destructive"
              size="sm"
              onClick={() => {
                const nuevosPuntos = (data.puntos || []).filter((_: string, i: number) => i !== index)
                onChange("puntos", nuevosPuntos)
              }}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}