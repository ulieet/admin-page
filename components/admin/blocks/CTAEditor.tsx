"use client"

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

interface CtaEditorProps {
  data: any
  onChange: (campo: string, valor: any) => void
}

export function CtaEditor({ data, onChange }: CtaEditorProps) {
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
        <Textarea
          value={data.subtitulo || ""}
          onChange={(e) => onChange("subtitulo", e.target.value)}
          rows={2}
        />
      </div>

      {/* Botón Primario */}
      <div className="space-y-2 border-t pt-4">
        <Label className="font-semibold text-sm">Botón Primario</Label>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Texto</Label>
            <Input
              value={data.botonPrimarioTexto || ""}
              onChange={(e) => onChange("botonPrimarioTexto", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>URL</Label>
            <Input
              value={data.botonPrimarioUrl || ""}
              onChange={(e) => onChange("botonPrimarioUrl", e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Botón Secundario */}
      <div className="space-y-2 border-t pt-4">
        <Label className="font-semibold text-sm">Botón Secundario</Label>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
             <Label>Texto</Label>
            <Input
              value={data.botonSecundarioTexto || ""}
              onChange={(e) => onChange("botonSecundarioTexto", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>URL</Label>
            <Input
              value={data.botonSecundarioUrl || ""}
              onChange={(e) => onChange("botonSecundarioUrl", e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="space-y-2 border-t pt-4">
        <Label>Texto Inferior (disclaimer o nota)</Label>
        <Input
          value={data.textoInferior || ""}
          onChange={(e) => onChange("textoInferior", e.target.value)}
        />
      </div>
    </div>
  )
}