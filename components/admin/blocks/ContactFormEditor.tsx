"use client"

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

interface ContactFormEditorProps {
  data: any
  onChange: (campo: string, valor: any) => void
}

export function ContactFormEditor({ data, onChange }: ContactFormEditorProps) {
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
          rows={3}
        />
      </div>
      
      <div className="space-y-2">
        <Label>Teléfono</Label>
        <Input 
          value={data.telefono || ""} 
          onChange={(e) => onChange("telefono", e.target.value)} 
        />
      </div>
      
      <div className="space-y-2">
        <Label>Email</Label>
        <Input 
          type="email" 
          value={data.email || ""} 
          onChange={(e) => onChange("email", e.target.value)} 
        />
      </div>
      
      <div className="space-y-2">
        <Label>Horario</Label>
        <Input 
          value={data.horario || ""} 
          onChange={(e) => onChange("horario", e.target.value)} 
        />
      </div>
    </div>
  )
}