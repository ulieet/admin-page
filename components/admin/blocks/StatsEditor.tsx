"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Trash2, Plus } from "lucide-react"

interface StatsEditorProps {
  data: any
  onChange: (campo: string, valor: any) => void
}

export function StatsEditor({ data, onChange }: StatsEditorProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label>Fondo de la Sección</Label>
        <select
          className="w-full px-3 py-2 border rounded-md bg-background text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          value={data.fondoOscuro ? "true" : "false"}
          onChange={(e) => onChange("fondoOscuro", e.target.value === "true")}
        >
          <option value="false">Fondo Claro</option>
          <option value="true">Fondo Oscuro</option>
        </select>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label>Estadísticas</Label>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => {
              const nuevasEstadisticas = [
                ...(data.estadisticas || []),
                { numero: "", label: "", icono: "" },
              ]
              onChange("estadisticas", nuevasEstadisticas)
            }}
          >
            <Plus className="w-4 h-4 mr-2" />
            Agregar Estadística
          </Button>
        </div>

        {(data.estadisticas || []).map((stat: any, index: number) => (
          <div key={index} className="border p-4 rounded-lg space-y-3 bg-muted/30">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Estadística {index + 1}</span>
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={() => {
                  const nuevasEstadisticas = (data.estadisticas || []).filter(
                    (_: any, i: number) => i !== index,
                  )
                  onChange("estadisticas", nuevasEstadisticas)
                }}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>

            <div className="space-y-2">
              <Label>Número (ej: 15+)</Label>
              <Input
                value={stat.numero || ""}
                onChange={(e) => {
                  const nuevasEstadisticas = [...(data.estadisticas || [])]
                  nuevasEstadisticas[index] = { ...stat, numero: e.target.value }
                  onChange("estadisticas", nuevasEstadisticas)
                }}
              />
            </div>

            <div className="space-y-2">
              <Label>Etiqueta (ej: Años de experiencia)</Label>
              <Input
                value={stat.label || ""}
                onChange={(e) => {
                  const nuevasEstadisticas = [...(data.estadisticas || [])]
                  nuevasEstadisticas[index] = { ...stat, label: e.target.value }
                  onChange("estadisticas", nuevasEstadisticas)
                }}
              />
            </div>

            <div className="space-y-2">
              <Label className="text-xs">Icono (opcional)</Label>
              <select
                className="w-full px-3 py-2 border rounded-md bg-background text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                value={stat.icono || ""}
                onChange={(e) => {
                  const nuevasEstadisticas = [...(data.estadisticas || [])]
                  nuevasEstadisticas[index] = { ...stat, icono: e.target.value }
                  onChange("estadisticas", nuevasEstadisticas)
                }}
              >
                <option value="">Sin icono</option>
                <option value="award">Premio</option>
                <option value="users">Usuarios</option>
                <option value="check-circle">Check</option>
                <option value="trending-up">Tendencia</option>
                <option value="star">Estrella</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}