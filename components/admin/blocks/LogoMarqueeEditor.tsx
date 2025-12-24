"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Trash2, Plus } from "lucide-react"

// Importamos el componente compartido
import { ImageUpload } from "../image-upload"

interface ClientsEditorProps {
  data: any
  onChange: (campo: string, valor: any) => void
}

export function ClientsEditor({ data, onChange }: ClientsEditorProps) {
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
          <Label>Empresas</Label>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => {
              const nuevasEmpresas = [...(data.empresas || []), { nombre: "", logo: "" }]
              onChange("empresas", nuevasEmpresas)
            }}
          >
            <Plus className="w-4 h-4 mr-2" />
            Agregar Empresa
          </Button>
        </div>

        {(data.empresas || []).map((empresa: any, index: number) => (
          <div key={index} className="border p-4 rounded-lg space-y-3 bg-muted/30">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Empresa {index + 1}</span>
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={() => {
                  const nuevasEmpresas = (data.empresas || []).filter((_: any, i: number) => i !== index)
                  onChange("empresas", nuevasEmpresas)
                }}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>

            <div className="space-y-2">
              <Label>Nombre</Label>
              <Input
                placeholder="Nombre de la Empresa"
                value={empresa.nombre || ""}
                onChange={(e) => {
                  const nuevasEmpresas = [...(data.empresas || [])]
                  nuevasEmpresas[index] = { ...empresa, nombre: e.target.value }
                  onChange("empresas", nuevasEmpresas)
                }}
              />
            </div>

            <div className="space-y-2">
              <Label>Logo (opcional)</Label>
              <ImageUpload
                value={empresa.logo || ""}
                onChange={(value) => {
                  const nuevasEmpresas = [...(data.empresas || [])]
                  nuevasEmpresas[index] = { ...empresa, logo: value }
                  onChange("empresas", nuevasEmpresas)
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}