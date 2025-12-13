"use client"

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Trash2, Plus } from "lucide-react"

interface Cards3EditorProps {
  data: any
  onChange: (campo: string, valor: any) => void
}

export function Cards3Editor({ data, onChange }: Cards3EditorProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label>Título de la Sección (opcional)</Label>
        <Input 
          value={data.titulo || ""} 
          onChange={(e) => onChange("titulo", e.target.value)} 
        />
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label>Tarjetas</Label>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => {
              const nuevosItems = [
                ...(data.items || []),
                { icono: "award", titulo: "", descripcion: "", botonTexto: "", botonUrl: "" },
              ]
              onChange("items", nuevosItems)
            }}
          >
            <Plus className="w-4 h-4 mr-2" />
            Agregar Tarjeta
          </Button>
        </div>

        {(data.items || []).map((item: any, index: number) => (
          <div key={index} className="border p-4 rounded-lg space-y-3 bg-muted/30">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Tarjeta {index + 1}</span>
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={() => {
                  const nuevosItems = (data.items || []).filter((_: any, i: number) => i !== index)
                  onChange("items", nuevosItems)
                }}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>

            <div className="space-y-2">
              <Label className="text-xs">Icono o Imagen</Label>
              {/* Mantenemos el select nativo para simplicidad con las opciones existentes */}
              <select
                className="w-full px-3 py-2 border rounded-md bg-background text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                value={item.icono || ""}
                onChange={(e) => {
                  const nuevosItems = [...(data.items || [])]
                  nuevosItems[index] = { ...item, icono: e.target.value }
                  onChange("items", nuevosItems)
                }}
              >
                <option value="award">Premio</option>
                <option value="users">Usuarios</option>
                <option value="building">Edificio</option>
                <option value="shield">Escudo</option>
                <option value="target">Objetivo</option>
                <option value="trending-up">Tendencia</option>
                <option value="cog">Engranaje</option>
                <option value="bar-chart">Gráfico</option>
              </select>
            </div>

            <Input
              placeholder="Título"
              value={item.titulo || ""}
              onChange={(e) => {
                const nuevosItems = [...(data.items || [])]
                nuevosItems[index] = { ...item, titulo: e.target.value }
                onChange("items", nuevosItems)
              }}
            />

            <Textarea
              placeholder="Descripción"
              value={item.descripcion || ""}
              onChange={(e) => {
                const nuevosItems = [...(data.items || [])]
                nuevosItems[index] = { ...item, descripcion: e.target.value }
                onChange("items", nuevosItems)
              }}
              rows={2}
            />

            <div className="grid grid-cols-2 gap-2">
              <Input
                placeholder="Texto del botón"
                value={item.botonTexto || ""}
                onChange={(e) => {
                  const nuevosItems = [...(data.items || [])]
                  nuevosItems[index] = { ...item, botonTexto: e.target.value }
                  onChange("items", nuevosItems)
                }}
              />
              <Input
                placeholder="URL del botón"
                value={item.botonUrl || ""}
                onChange={(e) => {
                  const nuevosItems = [...(data.items || [])]
                  nuevosItems[index] = { ...item, botonUrl: e.target.value }
                  onChange("items", nuevosItems)
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}