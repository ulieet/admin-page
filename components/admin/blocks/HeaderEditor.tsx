"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Ghost, Trash2, Plus } from "lucide-react"
import { AlignmentControl } from "./AlignmentControl"
import { ImageUpload } from "../image-upload" 

interface HeaderEditorProps {
  data: any
  onChange: (campo: string, valor: any) => void
}

export function HeaderEditor({ data, onChange }: HeaderEditorProps) {
  return (
    <div className="space-y-6">
            <div className="space-y-2">
        <Label>Logo (Imagen)</Label>
        <ImageUpload
          value={data.logoImagen || ""}
          onChange={(value) => onChange("logoImagen", value)}
        />
      </div>

      <div className="space-y-2">
        <Label>Logo (texto alternativo)</Label>
        <Input
          value={data.logoTexto || ""}
          onChange={(e) => onChange("logoTexto", e.target.value)}
          placeholder="Ej: LOGO"
        />
      </div>
      
      <div className="space-y-2">
        <Label>Nombre de la Empresa</Label>
        <Input
          value={data.nombreEmpresa || ""}
          onChange={(e) => onChange("nombreEmpresa", e.target.value)}
        />
      </div>

      <div className="pt-4 border-t">
        <AlignmentControl 
          label="Posición de la Navegación"
          value={data.alineacion || "derecha"}
          onChange={(val) => onChange("alineacion", val)}
        />
      </div>

      <div className="flex items-center justify-between p-4 border rounded-lg bg-muted/20 mt-4">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <Ghost className="h-4 w-4 text-primary" />
            <Label className="text-base">Modo Transparente</Label>
          </div>
          <p className="text-sm text-muted-foreground">
            Fondo transparente que cambia al hacer scroll.
          </p>
        </div>
        <Switch
          checked={data.transparente || false}
          onCheckedChange={(checked) => onChange("transparente", checked)}
        />
      </div>

      <div className="space-y-2 pt-4 border-t">
        <Label>Navegación</Label>
        {(data.navegacion || []).map((item: any, index: number) => (
          <div key={index} className="flex gap-2">
            <Input
              placeholder="Nombre"
              value={item.nombre || ""}
              onChange={(e) => {
                const nuevaNav = [...(data.navegacion || [])]
                nuevaNav[index] = { ...item, nombre: e.target.value }
                onChange("navegacion", nuevaNav)
              }}
            />
            <Input
              placeholder="URL"
              value={item.url || ""}
              onChange={(e) => {
                const nuevaNav = [...(data.navegacion || [])]
                nuevaNav[index] = { ...item, url: e.target.value }
                onChange("navegacion", nuevaNav)
              }}
            />
            <Button
              type="button"
              variant="destructive"
              size="sm"
              onClick={() => {
                const nuevaNav = (data.navegacion || []).filter((_: any, i: number) => i !== index)
                onChange("navegacion", nuevaNav)
              }}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        ))}
        <Button
          type="button"
          size="sm"
          onClick={() => {
            const nuevaNav = [...(data.navegacion || []), { nombre: "", url: "#" }]
            onChange("navegacion", nuevaNav)
          }}
        >
          <Plus className="w-4 h-4 mr-2" />
          Agregar Enlace
        </Button>
      </div>

      <div className="space-y-2 pt-4 border-t">
        <Label>Texto del Botón CTA</Label>
        <Input value={data.botonTexto || ""} onChange={(e) => onChange("botonTexto", e.target.value)} />
      </div>
      <div className="space-y-2">
        <Label>URL del Botón CTA</Label>
        <Input value={data.botonUrl || ""} onChange={(e) => onChange("botonUrl", e.target.value)} />
      </div>
    </div>
  )
}