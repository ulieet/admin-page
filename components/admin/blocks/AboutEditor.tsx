"use client"

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Trash2, Plus } from "lucide-react"

// Importamos el componente compartido
import { ImageUpload } from "../image-upload"

interface AboutEditorProps {
  data: any
  onChange: (campo: string, valor: any) => void
}

export function AboutEditor({ data, onChange }: AboutEditorProps) {
  // Helpers para actualizar las secciones anidadas sin repetir código
  const updateSeccion1 = (field: string, value: any) => {
    onChange("seccion1", { ...(data.seccion1 || {}), [field]: value })
  }

  const updateSeccion2 = (field: string, value: any) => {
    onChange("seccion2", { ...(data.seccion2 || {}), [field]: value })
  }

  return (
    <div className="space-y-6">
      
      {/* --- SECCIÓN 1 --- */}
      <div className="p-4 border rounded-lg space-y-4 bg-muted/30">
        <h4 className="font-semibold text-base border-b pb-2">Sección 1 (Principal)</h4>
        
        <div className="space-y-2">
          <Label>Título</Label>
          <Input
            value={data.seccion1?.titulo || ""}
            onChange={(e) => updateSeccion1("titulo", e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label>Párrafo 1</Label>
          <Textarea
            value={data.seccion1?.parrafo1 || ""}
            onChange={(e) => updateSeccion1("parrafo1", e.target.value)}
            rows={3}
          />
        </div>
        
        <div className="space-y-2">
          <Label>Párrafo 2</Label>
          <Textarea
            value={data.seccion1?.parrafo2 || ""}
            onChange={(e) => updateSeccion1("parrafo2", e.target.value)}
            rows={3}
          />
        </div>

        <div className="space-y-2">
          <Label>Imagen</Label>
          <ImageUpload
            value={data.seccion1?.imagen || ""}
            onChange={(value) => updateSeccion1("imagen", value)}
          />
        </div>

        {/* Puntos Destacados Sección 1 */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <Label>Puntos Destacados</Label>
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={() => {
                const nuevosPuntos = [...(data.seccion1?.puntos || []), "Nuevo punto"]
                updateSeccion1("puntos", nuevosPuntos)
              }}
            >
              <Plus className="w-4 h-4 mr-2" />
              Agregar Punto
            </Button>
          </div>

          {(data.seccion1?.puntos || []).map((punto: string, index: number) => (
            <div key={index} className="flex gap-2">
              <Input
                value={punto || ""}
                onChange={(e) => {
                  const nuevosPuntos = [...(data.seccion1?.puntos || [])]
                  nuevosPuntos[index] = e.target.value
                  updateSeccion1("puntos", nuevosPuntos)
                }}
              />
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={() => {
                  const nuevosPuntos = (data.seccion1?.puntos || []).filter((_: string, i: number) => i !== index)
                  updateSeccion1("puntos", nuevosPuntos)
                }}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* --- SECCIÓN 2 --- */}
      <div className="p-4 border rounded-lg space-y-4 bg-muted/30">
        <h4 className="font-semibold text-base border-b pb-2">Sección 2 (Secundaria)</h4>
        
        <div className="space-y-2">
          <Label>Título</Label>
          <Input
            value={data.seccion2?.titulo || ""}
            onChange={(e) => updateSeccion2("titulo", e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label>Párrafo 1</Label>
          <Textarea
            value={data.seccion2?.parrafo1 || ""}
            onChange={(e) => updateSeccion2("parrafo1", e.target.value)}
            rows={3}
          />
        </div>
        
        <div className="space-y-2">
          <Label>Párrafo 2</Label>
          <Textarea
            value={data.seccion2?.parrafo2 || ""}
            onChange={(e) => updateSeccion2("parrafo2", e.target.value)}
            rows={3}
          />
        </div>

        <div className="space-y-2">
          <Label>Imagen</Label>
          <ImageUpload
            value={data.seccion2?.imagen || ""}
            onChange={(value) => updateSeccion2("imagen", value)}
          />
        </div>
      </div>
    </div>
  )
}