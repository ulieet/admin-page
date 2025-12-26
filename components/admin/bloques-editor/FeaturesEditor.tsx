"use client"

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Trash2, Plus } from "lucide-react"

interface FeaturesEditorProps {
  data: any
  onChange: (campo: string, valor: any) => void
}

export function FeaturesEditor({ data, onChange }: FeaturesEditorProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label>Características</Label>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => {
              const nuevasCaracteristicas = [
                ...(data.caracteristicas || []),
                { icono: "award", titulo: "", descripcion: "", botonTexto: "" },
              ]
              onChange("caracteristicas", nuevasCaracteristicas)
            }}
          >
            <Plus className="w-4 h-4 mr-2" />
            Agregar Característica
          </Button>
        </div>

        {(data.caracteristicas || []).map((caracteristica: any, index: number) => (
          <div key={index} className="border p-4 rounded-lg space-y-3 bg-muted/30">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Característica {index + 1}</span>
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={() => {
                  const nuevasCaracteristicas = (data.caracteristicas || []).filter(
                    (_: any, i: number) => i !== index,
                  )
                  onChange("caracteristicas", nuevasCaracteristicas)
                }}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>

            <div className="space-y-2">
              <Label className="text-xs">Icono</Label>
              <select
                className="w-full px-3 py-2 border rounded-md bg-background text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                value={caracteristica.icono || ""}
                onChange={(e) => {
                  const nuevasCaracteristicas = [...(data.caracteristicas || [])]
                  nuevasCaracteristicas[index] = { ...caracteristica, icono: e.target.value }
                  onChange("caracteristicas", nuevasCaracteristicas)
                }}
              >
                <option value="award">Premio</option>
                <option value="users">Usuarios</option>
                <option value="building">Edificio</option>
                <option value="shield">Escudo</option>
              </select>
            </div>

            <Input
              placeholder="Título"
              value={caracteristica.titulo || ""}
              onChange={(e) => {
                const nuevasCaracteristicas = [...(data.caracteristicas || [])]
                nuevasCaracteristicas[index] = { ...caracteristica, titulo: e.target.value }
                onChange("caracteristicas", nuevasCaracteristicas)
              }}
            />

            <Textarea
              placeholder="Descripción"
              value={caracteristica.descripcion || ""}
              onChange={(e) => {
                const nuevasCaracteristicas = [...(data.caracteristicas || [])]
                nuevasCaracteristicas[index] = { ...caracteristica, descripcion: e.target.value }
                onChange("caracteristicas", nuevasCaracteristicas)
              }}
              rows={2}
            />

            <Input
              placeholder="Texto del Botón"
              value={caracteristica.botonTexto || ""}
              onChange={(e) => {
                const nuevasCaracteristicas = [...(data.caracteristicas || [])]
                nuevasCaracteristicas[index] = { ...caracteristica, botonTexto: e.target.value }
                onChange("caracteristicas", nuevasCaracteristicas)
              }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}