"use client"

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Palette } from "lucide-react"

// Importamos el componente compartido
import { AlignmentControl } from "./AlignmentControl"

interface FormEditorProps {
  data: any
  onChange: (campo: string, valor: any) => void
}

export function FormEditor({ data, onChange }: FormEditorProps) {
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
        <Label>Descripción</Label>
        <Textarea
          value={data.descripcion || ""}
          onChange={(e) => onChange("descripcion", e.target.value)}
          rows={2}
        />
      </div>
      
      <div className="space-y-2">
        <Label>Texto del Botón</Label>
        <Input 
          value={data.botonTexto || ""} 
          onChange={(e) => onChange("botonTexto", e.target.value)} 
        />
      </div>

      <div className="space-y-6 pt-4 border-t">
        <div className="grid grid-cols-2 gap-4">
          
          {/* Selector de Estilo */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Palette className="w-4 h-4" /> Estilo Visual
            </Label>
            <Select 
              value={data.estiloVisual || "clasico"} 
              onValueChange={(val) => onChange("estiloVisual", val)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecciona un estilo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="clasico">Clásico (Borde)</SelectItem>
                <SelectItem value="tarjeta">Tarjeta (Sombra)</SelectItem>
                <SelectItem value="minimal">Minimalista (Lineal)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Alineación */}
          <div>
             <AlignmentControl 
               value={data.alineacion || "centro"}
               onChange={(val) => onChange("alineacion", val)}
             />
          </div>
        </div>
      </div>

      {/* Información de Contacto Anidada */}
      <div className="border-t pt-4 space-y-4">
        <h4 className="font-semibold text-sm">Información de Contacto</h4>
        
        <div className="space-y-2">
          <Label>Email</Label>
          <Input
            type="email"
            value={data.infoContacto?.email || ""}
            onChange={(e) =>
              onChange("infoContacto", { ...(data.infoContacto || {}), email: e.target.value })
            }
          />
        </div>
        
        <div className="space-y-2">
          <Label>Teléfono</Label>
          <Input
            value={data.infoContacto?.telefono || ""}
            onChange={(e) =>
              onChange("infoContacto", { ...(data.infoContacto || {}), telefono: e.target.value })
            }
          />
        </div>
        
        <div className="space-y-2">
          <Label>Horario</Label>
          <Input
            value={data.infoContacto?.horario || ""}
            onChange={(e) =>
              onChange("infoContacto", { ...(data.infoContacto || {}), horario: e.target.value })
            }
          />
        </div>
      </div>
    </div>
  )
}