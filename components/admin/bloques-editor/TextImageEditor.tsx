// components/admin/blocks/TextImageEditor.tsx

"use client"

import React from "react"
import type { TextImageBlock } from "@/lib/types/blocks"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { ImageUpload } from "@/components/admin/image-upload" 
import { Separator } from "@/components/ui/separator"
import { Plus, Trash2, CheckCircle2 } from "lucide-react"

interface TextImageEditorProps {
  data: TextImageBlock["datos"] & { variant?: string }
  onChange: (field: keyof TextImageBlock["datos"] | "variant", value: any) => void
}

export function TextImageEditor({ data, onChange }: TextImageEditorProps) {
  const handleDataChange = (field: keyof TextImageBlock["datos"], value: any) => {
    onChange(field, value);
  };

  const puntos = Array.isArray(data.puntos) ? data.puntos : [];

  const handlePuntoChange = (index: number, value: string) => {
    const nuevosPuntos = [...puntos];
    nuevosPuntos[index] = value;
    handleDataChange("puntos", nuevosPuntos);
  };

  const handleAddPunto = () => {
    handleDataChange("puntos", [...puntos, ""]);
  };

  const handleRemovePunto = (index: number) => {
    const nuevosPuntos = puntos.filter((_, i) => i !== index);
    handleDataChange("puntos", nuevosPuntos);
  };

  return (
    <div className="space-y-6 p-4">
      <h3 className="text-lg font-semibold border-b pb-2">Editor Texto + Imagen</h3>

      <div className="space-y-2">
        <Label htmlFor="titulo">Título Principal</Label>
        <Input
          id="titulo"
          value={data.titulo || ""}
          onChange={(e) => handleDataChange("titulo", e.target.value)}
          placeholder="Ej: Sobre Nosotros"
        />
      </div>

      <div className="space-y-2">
        <Label>Imagen Destacada</Label>
        <div className="bg-slate-50 p-4 rounded-lg border border-dashed">
            <ImageUpload 
                value={data.imagen || ""} 
                onChange={(url) => handleDataChange("imagen", url)}
            />
        </div>
      </div>

      <div className="flex items-center justify-between border p-4 rounded-lg bg-white shadow-sm">
        <div className="space-y-0.5">
          <Label>Posición de la Imagen</Label>
          <p className="text-xs text-muted-foreground">
            {data.imagenDerecha ? "La imagen se muestra a la DERECHA" : "La imagen se muestra a la IZQUIERDA"}
          </p>
        </div>
        <Switch
          checked={!!data.imagenDerecha} 
          onCheckedChange={(checked) => handleDataChange("imagenDerecha", checked)}
        />
      </div>

      <Separator />

      <div className="space-y-2">
        <Label htmlFor="texto">Contenido de Texto</Label>
        <Textarea
          id="texto"
          value={data.texto || ""}
          onChange={(e) => handleDataChange("texto", e.target.value)}
          placeholder="Escribe aquí el contenido..."
          rows={6}
        />
      </div>

      <Separator />

      <div className="space-y-3">
        <div className="flex items-center justify-between">
            <Label className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                Puntos Destacados / Beneficios
            </Label>
            <span className="text-xs text-muted-foreground bg-slate-100 px-2 py-1 rounded-full">
                {puntos.length} ítems
            </span>
        </div>
        
        <div className="space-y-2">
            {puntos.length === 0 && (
                <div className="text-sm text-muted-foreground text-center py-4 border-2 border-dashed rounded-lg">
                    No hay puntos agregados.
                </div>
            )}
            
            {puntos.map((punto, index) => (
                <div key={index} className="flex gap-2 items-center group">
                    <div className="shrink-0 text-xs text-slate-400 font-mono w-4">
                        {index + 1}.
                    </div>
                    <Input 
                        value={punto} 
                        onChange={(e) => handlePuntoChange(index, e.target.value)}
                        placeholder="Escribe una característica..."
                        className="flex-1"
                    />
                    <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => handleRemovePunto(index)}
                        className="opacity-50 hover:opacity-100 hover:bg-red-50 hover:text-red-600 transition-all"
                        title="Eliminar punto"
                    >
                        <Trash2 className="w-4 h-4" />
                    </Button>
                </div>
            ))}
        </div>

        <Button 
            type="button" 
            variant="outline" 
            size="sm" 
            onClick={handleAddPunto}
            className="w-full mt-2 border-dashed border-2 hover:border-solid hover:bg-slate-50"
        >
            <Plus className="w-4 h-4 mr-2" /> Agregar Punto
        </Button>
      </div>
      
    </div>
  );
}