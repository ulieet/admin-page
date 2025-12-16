"use client"

import React from "react"
import type { TituloParrafosBlock } from "@/lib/types/blocks"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import ColorPicker from "@/components/admin/color-picker" 

interface TituloParrafosEditorProps {
  data: TituloParrafosBlock["datos"] & { variant?: string }
  onChange: (field: keyof TituloParrafosBlock["datos"] | "variant", value: any) => void
}

export function TituloParrafosEditor({ data, onChange }: TituloParrafosEditorProps) {
  const handleDataChange = (field: keyof TituloParrafosBlock["datos"], value: any) => {
    onChange(field, value);
  };

  // Valores por defecto seguros para evitar errores de "controlled vs uncontrolled"
  const alineacion = data.alineacion || "centrado";
  const colorFondo = data.colorFondo || "#ffffff";

  return (
    <div className="space-y-6 p-4">
      <h3 className="text-lg font-semibold border-b pb-2">Contenido de Título y Párrafos</h3>

      {/* Título Principal */}
      <div className="space-y-2">
        <Label htmlFor="titulo">Título Principal</Label>
        <Input
          id="titulo"
          value={data.titulo || ""}
          onChange={(e) => handleDataChange("titulo", e.target.value)}
          placeholder="Ej: Nuestra Filosofía"
        />
      </div>
      
      <Separator />

      {/* Alineación */}
      <div className="space-y-2">
        <Label htmlFor="alineacion">Diseño / Alineación</Label>
        <Select 
            value={alineacion} 
            onValueChange={(value) => handleDataChange("alineacion", value)}
        >
            <SelectTrigger id="alineacion" className="w-full md:w-[250px]">
                <SelectValue placeholder="Seleccionar diseño" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="centrado">Centrado (Un solo párrafo)</SelectItem>
                <SelectItem value="dividido">Dividido (Dos columnas)</SelectItem>
            </SelectContent>
        </Select>
        <p className="text-xs text-muted-foreground">
            'Dividido' mostrará el título a la izquierda y dos columnas de texto a la derecha.
        </p>
      </div>

      <Separator />

      {/* Párrafos */}
      <div className="space-y-4">
        <div className="space-y-2">
            <Label htmlFor="parrafoIzquierda">
                {alineacion === 'dividido' ? 'Párrafo Columna 1' : 'Párrafo Principal'}
            </Label>
            <Textarea
              id="parrafoIzquierda"
              value={data.parrafoIzquierda || ""}
              onChange={(e) => handleDataChange("parrafoIzquierda", e.target.value)}
              placeholder="Escribe aquí el contenido principal..."
              rows={4}
            />
        </div>
        
        {/* Mostramos el segundo campo SOLO si está en modo dividido */}
        {alineacion === 'dividido' && (
            <div className="space-y-2 bg-slate-50 p-3 rounded border">
                <Label htmlFor="parrafoDerecha" className="text-blue-700">Párrafo Columna 2</Label>
                <Textarea
                  id="parrafoDerecha"
                  value={data.parrafoDerecha || ""}
                  onChange={(e) => handleDataChange("parrafoDerecha", e.target.value)}
                  placeholder="Contenido de la segunda columna..."
                  rows={4}
                />
            </div>
        )}
      </div>
      
      <Separator />

      {/* Color de Fondo */}
      <div className="space-y-2">
        <Label>Color de Fondo de la Sección</Label>
        <ColorPicker 
          value={colorFondo}
          onChange={(color) => handleDataChange("colorFondo", color)}
        />
      </div>
      
    </div>
  );
}