"use client"

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Trash2, Plus } from "lucide-react"

interface ServicesEditorProps {
  data: any
  onChange: (campo: string, valor: any) => void
}

export function ServicesEditor({ data, onChange }: ServicesEditorProps) {
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
        <Input 
          value={data.subtitulo || ""} 
          onChange={(e) => onChange("subtitulo", e.target.value)} 
        />
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label>Servicios</Label>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => {
              const nuevosServicios = [
                ...(data.servicios || []),
                { icono: "bar-chart", titulo: "", descripcion: "" },
              ]
              onChange("servicios", nuevosServicios)
            }}
          >
            <Plus className="w-4 h-4 mr-2" />
            Agregar Servicio
          </Button>
        </div>

        {(data.servicios || []).map((servicio: any, index: number) => (
          <div key={index} className="border p-4 rounded-lg space-y-3 bg-muted/30">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Servicio {index + 1}</span>
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={() => {
                  const nuevosServicios = (data.servicios || []).filter((_: any, i: number) => i !== index)
                  onChange("servicios", nuevosServicios)
                }}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>

            <div className="space-y-2">
              <Label className="text-xs">Icono</Label>
              <select
                className="w-full px-3 py-2 border rounded-md bg-background text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                value={servicio.icono || ""}
                onChange={(e) => {
                  const nuevosServicios = [...(data.servicios || [])]
                  nuevosServicios[index] = { ...servicio, icono: e.target.value }
                  onChange("servicios", nuevosServicios)
                }}
              >
                <option value="bar-chart">Gráfico de Barras</option>
                <option value="target">Objetivo</option>
                <option value="trending-up">Tendencia</option>
                <option value="cog">Engranaje</option>
              </select>
            </div>

            <Input
              placeholder="Título"
              value={servicio.titulo || ""}
              onChange={(e) => {
                const nuevosServicios = [...(data.servicios || [])]
                nuevosServicios[index] = { ...servicio, titulo: e.target.value }
                onChange("servicios", nuevosServicios)
              }}
            />

            <Textarea
              placeholder="Descripción"
              value={servicio.descripcion || ""}
              onChange={(e) => {
                const nuevosServicios = [...(data.servicios || [])]
                nuevosServicios[index] = { ...servicio, descripcion: e.target.value }
                onChange("servicios", nuevosServicios)
              }}
              rows={2}
            />
          </div>
        ))}
      </div>
    </div>
  )
}