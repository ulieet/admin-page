// components/admin/blocks/TituloParrafosEditor.tsx

import React from "react"
import { TituloParrafosBlock } from "@/lib/types/blocks"
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

  return (
    <div className="space-y-6 p-4">
      <h3 className="text-lg font-semibold border-b pb-2">Contenido de Título y Párrafos</h3>

      {/* Título Principal */}
      <div className="space-y-2">
        <Label htmlFor="titulo">Título Principal</Label>
        <Input
          id="titulo"
          value={data.titulo}
          onChange={(e) => handleDataChange("titulo", e.target.value)}
          placeholder="Título que usa el color primario"
        />
      </div>
      
      <Separator />

      {/* Alineación */}
      <div className="space-y-2">
        <Label htmlFor="alineacion">Alineación del Contenido</Label>
        <Select 
            value={data.alineacion} 
            onValueChange={(value) => handleDataChange("alineacion", value as "centrado" | "dividido")}
        >
            <SelectTrigger id="alineacion" className="w-[200px]">
                <SelectValue placeholder="Seleccionar alineación" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="centrado">Centrado (Un solo párrafo)</SelectItem>
                <SelectItem value="dividido">Dividido (Dos columnas)</SelectItem>
            </SelectContent>
        </Select>
      </div>

      {/* Párrafos */}
      <div className="space-y-4">
        <div className="space-y-2">
            <Label htmlFor="parrafoIzquierda">Párrafo Principal / Izquierda</Label>
            <Textarea
              id="parrafoIzquierda"
              value={data.parrafoIzquierda}
              onChange={(e) => handleDataChange("parrafoIzquierda", e.target.value)}
              placeholder="Párrafo que se muestra siempre."
            />
        </div>
        
        {data.alineacion === 'dividido' && (
            <div className="space-y-2">
                <Label htmlFor="parrafoDerecha">Párrafo Derecho (Opcional)</Label>
                <Textarea
                  id="parrafoDerecha"
                  value={data.parrafoDerecha}
                  onChange={(e) => handleDataChange("parrafoDerecha", e.target.value)}
                  placeholder="Este párrafo solo se muestra en modo 'Dividido'."
                />
            </div>
        )}
      </div>
      
      <Separator />

      {/* Color de Fondo */}
      <div className="space-y-2">
        <Label>Color de Fondo de la Sección</Label>
        <ColorPicker 
          value={data.colorFondo}
          onChange={(color) => handleDataChange("colorFondo", color)}
        />
        <p className="text-xs text-muted-foreground">
            Define un color de fondo. Si seleccionas **#FFFFFF** (blanco), tomará el color de fondo global definido en Estilos.
        </p>
      </div>
      
    </div>
  );
}