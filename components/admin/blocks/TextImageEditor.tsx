"use client"

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { 
  CheckCircle2, AlignLeft, Columns as ColumnsIcon, Layers, 
  Plus, Trash2, ImageIcon 
} from "lucide-react"
import { ImageUpload } from "../image-upload" 

interface TextImageEditorProps {
  data: any
  onChange: (campo: string, valor: any) => void
}

export function TextImageEditor({ data, onChange }: TextImageEditorProps) {
  const estiloActual = data.variant || "default"
  
  // CORRECCIÓN: features inicia como array vacío [] en lugar de traer 3 ejemplos.
  const features = data.features || [] 

  const handleEstiloChange = (nuevoEstilo: string) => {
    onChange("variant", nuevoEstilo)
  }

  // Manejo de la lista de puntos (Agregar/Borrar/Editar)
  const addFeature = () => {
    const newFeatures = [...features, "Nuevo punto destacable"]
    onChange("features", newFeatures)
  }

  const removeFeature = (index: number) => {
    const newFeatures = features.filter((_: any, i: number) => i !== index)
    onChange("features", newFeatures)
  }

  const updateFeature = (index: number, value: string) => {
    const newFeatures = [...features]
    newFeatures[index] = value
    onChange("features", newFeatures)
  }

  return (
    <div className="space-y-8 bg-white p-6 rounded-lg border shadow-sm">
      
      {/* 1. ESTILO VISUAL */}
      <div className="space-y-4">
        <Label className="text-base font-semibold">Diseño Visual</Label>
        <div className="grid gap-3">
            {/* 50/50 */}
            <div onClick={() => handleEstiloChange("default")} className={`relative flex items-center gap-4 p-3 rounded-lg border-2 cursor-pointer transition-all hover:bg-slate-50 ${estiloActual === 'default' ? 'border-blue-600 bg-blue-50/20' : 'border-slate-200'}`}>
                <div className="flex gap-1 items-center"><AlignLeft className="w-4 h-4"/><ImageIcon className="w-4 h-4"/></div>
                <div className="flex-1"><p className="font-medium text-sm">50/50 Clásico</p></div>
                {estiloActual === 'default' && <CheckCircle2 className="w-4 h-4 text-blue-600" />}
            </div>
            {/* 60/40 */}
            <div onClick={() => handleEstiloChange("modern")} className={`relative flex items-center gap-4 p-3 rounded-lg border-2 cursor-pointer transition-all hover:bg-slate-50 ${estiloActual === 'modern' ? 'border-blue-600 bg-blue-50/20' : 'border-slate-200'}`}>
                <div className="flex gap-1 items-center"><AlignLeft className="w-5 h-5"/><ImageIcon className="w-3 h-3"/></div>
                <div className="flex-1"><p className="font-medium text-sm">60/40 Texto Amplio</p></div>
                {estiloActual === 'modern' && <CheckCircle2 className="w-4 h-4 text-blue-600" />}
            </div>
            {/* SUPERPUESTO */}
            <div onClick={() => handleEstiloChange("minimal")} className={`relative flex items-center gap-4 p-3 rounded-lg border-2 cursor-pointer transition-all hover:bg-slate-50 ${estiloActual === 'minimal' ? 'border-blue-600 bg-blue-50/20' : 'border-slate-200'}`}>
                <Layers className="w-5 h-5 text-slate-500" />
                <div className="flex-1"><p className="font-medium text-sm">Superpuesto</p></div>
                {estiloActual === 'minimal' && <CheckCircle2 className="w-4 h-4 text-blue-600" />}
            </div>
        </div>
      </div>

      <Separator />

      {/* 2. CONTENIDO PRINCIPAL */}
      <div className="space-y-4">
          <Label className="text-base font-semibold">Contenido</Label>
          
          <div className="space-y-3">
            <div>
                <Label className="text-xs mb-1.5 block">Título</Label>
                <Input value={data.title || ""} onChange={(e) => onChange("title", e.target.value)} placeholder="Título de la sección" />
            </div>
            <div>
                <Label className="text-xs mb-1.5 block">Descripción</Label>
                <Textarea value={data.description || ""} onChange={(e) => onChange("description", e.target.value)} rows={4} placeholder="Escribe aquí el texto principal..." />
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <Label className="text-xs mb-1.5 block">Imagen</Label>
            <ImageUpload 
                value={data.image || ""} 
                onChange={(val) => onChange("image", val)} 
            />
          </div>
      </div>

      <Separator />

      {/* 3. LISTA DE PUNTOS (FEATURES) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
            <Label className="text-base font-semibold">Lista de Puntos (Opcional)</Label>
            <Button variant="outline" size="sm" onClick={addFeature} className="text-xs h-8">
                <Plus className="w-3 h-3 mr-1" /> Agregar Punto
            </Button>
        </div>
        
        {features.length === 0 ? (
            <div className="text-center p-4 border border-dashed rounded-lg bg-slate-50 text-slate-400 text-sm">
                No hay puntos agregados.
            </div>
        ) : (
            <div className="space-y-2">
                {features.map((feature: string, index: number) => (
                    <div key={index} className="flex gap-2">
                        <Input 
                            value={feature} 
                            onChange={(e) => updateFeature(index, e.target.value)}
                            className="flex-1 h-9 text-sm"
                        />
                        <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-9 w-9 text-red-500 hover:text-red-700 hover:bg-red-50"
                            onClick={() => removeFeature(index)}
                        >
                            <Trash2 className="w-4 h-4" />
                        </Button>
                    </div>
                ))}
            </div>
        )}
      </div>

      <Separator />

      {/* 4. BOTÓN CTA */}
      <div className="grid grid-cols-2 gap-4">
        <div>
            <Label className="text-xs mb-1.5 block">Texto Botón</Label>
            <Input value={data.buttonText || ""} onChange={(e) => onChange("buttonText", e.target.value)} placeholder="Ej: Ver más" />
        </div>
        <div>
            <Label className="text-xs mb-1.5 block">Enlace</Label>
            <Input value={data.buttonUrl || ""} onChange={(e) => onChange("buttonUrl", e.target.value)} placeholder="#" />
        </div>
      </div>

    </div>
  )
}