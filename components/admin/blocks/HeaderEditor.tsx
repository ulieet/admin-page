"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { 
  Plus, Trash2, CheckCircle2, 
  LayoutList, MousePointer2, AlignCenter,
  AlignLeft, AlignRight, AlignJustify
} from "lucide-react"
import { ImageUpload } from "../image-upload"

interface HeaderEditorProps {
  data: any
  onChange: (campo: string, valor: any) => void
}

export function HeaderEditor({ data, onChange }: HeaderEditorProps) {
  const estiloActual = data.variant || "default"
  // Recuperamos la alineación (por defecto 'derecha' que es lo más común)
  const alineacion = data.alineacion || "derecha"
  const navegacion = data.navegacion || []

  const handleEstiloChange = (nuevoEstilo: string) => {
    onChange("variant", nuevoEstilo)
  }

  // Gestión de enlaces
  const addLink = () => {
    const newNav = [...navegacion, { nombre: "Link", url: "#" }]
    onChange("navegacion", newNav)
  }

  const removeLink = (index: number) => {
    const newNav = navegacion.filter((_: any, i: number) => i !== index)
    onChange("navegacion", newNav)
  }

  const updateLink = (index: number, field: string, value: string) => {
    const newNav = [...navegacion]
    newNav[index] = { ...newNav[index], [field]: value }
    onChange("navegacion", newNav)
  }

  return (
    <div className="space-y-8 bg-white p-6 rounded-lg border shadow-sm">
      
      {/* 1. SELECCIÓN DE ESTILO */}
      <div className="space-y-4">
        <Label className="text-base font-semibold">Diseño Visual</Label>
        <div className="grid gap-3">
            <div onClick={() => handleEstiloChange("default")} className={`relative flex items-center gap-4 p-3 rounded-lg border-2 cursor-pointer transition-all hover:bg-slate-50 ${estiloActual === 'default' ? 'border-blue-600 bg-blue-50/20' : 'border-slate-200'}`}>
                <LayoutList className="w-5 h-5 text-slate-500" />
                <div className="flex-1"><p className="font-medium text-sm">Clásico (Línea)</p></div>
                {estiloActual === 'default' && <CheckCircle2 className="w-4 h-4 text-blue-600" />}
            </div>

            <div onClick={() => handleEstiloChange("modern")} className={`relative flex items-center gap-4 p-3 rounded-lg border-2 cursor-pointer transition-all hover:bg-slate-50 ${estiloActual === 'modern' ? 'border-blue-600 bg-blue-50/20' : 'border-slate-200'}`}>
                <MousePointer2 className="w-5 h-5 text-slate-500" />
                <div className="flex-1"><p className="font-medium text-sm">Moderno (Píldora)</p></div>
                {estiloActual === 'modern' && <CheckCircle2 className="w-4 h-4 text-blue-600" />}
            </div>

            <div onClick={() => handleEstiloChange("centered")} className={`relative flex items-center gap-4 p-3 rounded-lg border-2 cursor-pointer transition-all hover:bg-slate-50 ${estiloActual === 'centered' ? 'border-blue-600 bg-blue-50/20' : 'border-slate-200'}`}>
                <AlignCenter className="w-5 h-5 text-slate-500" />
                <div className="flex-1"><p className="font-medium text-sm">Editorial (Centrado)</p></div>
                {estiloActual === 'centered' && <CheckCircle2 className="w-4 h-4 text-blue-600" />}
            </div>
        </div>
      </div>

      <Separator />

      {/* 2. ALINEACIÓN DEL MENÚ (RECUPERADO) */}
      {/* Solo mostramos esto si NO es el estilo centrado (que ya está centrado por defecto) */}
      {estiloActual !== "centered" && (
        <div className="space-y-4">
            <Label className="text-base font-semibold">Posición del Menú</Label>
            <div className="flex gap-2">
                <Button 
                    variant={alineacion === "izquierda" ? "default" : "outline"} 
                    className="flex-1"
                    onClick={() => onChange("alineacion", "izquierda")}
                >
                    <AlignLeft className="w-4 h-4 mr-2" /> Izquierda
                </Button>
                <Button 
                    variant={alineacion === "centro" ? "default" : "outline"} 
                    className="flex-1"
                    onClick={() => onChange("alineacion", "centro")}
                >
                    <AlignJustify className="w-4 h-4 mr-2" /> Centro
                </Button>
                <Button 
                    variant={alineacion === "derecha" ? "default" : "outline"} 
                    className="flex-1"
                    onClick={() => onChange("alineacion", "derecha")}
                >
                    <AlignRight className="w-4 h-4 mr-2" /> Derecha
                </Button>
            </div>
            <Separator />
        </div>
      )}

      {/* 3. LOGO */}
      <div className="space-y-4">
        <Label className="text-base font-semibold">Identidad</Label>
        <div className="grid gap-4">
            <div>
                <Label className="text-xs mb-1.5 block">Nombre</Label>
                <Input value={data.nombreEmpresa || ""} onChange={(e) => onChange("nombreEmpresa", e.target.value)} />
            </div>
            <div>
                <Label className="text-xs mb-1.5 block">Logo</Label>
                <ImageUpload value={data.logoImagen || ""} onChange={(val) => onChange("logoImagen", val)} />
            </div>
        </div>
      </div>

      <Separator />

      {/* 4. MENÚ */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
            <Label className="text-base font-semibold">Enlaces</Label>
            <Button variant="outline" size="sm" onClick={addLink} className="text-xs h-8"><Plus className="w-3 h-3 mr-1" /> Agregar</Button>
        </div>
        
        <div className="space-y-2">
            {navegacion.map((link: any, index: number) => (
                <div key={index} className="flex gap-2 items-center bg-slate-50 p-2 rounded border">
                    <Input value={link.nombre} onChange={(e) => updateLink(index, "nombre", e.target.value)} className="h-8 text-xs bg-white flex-1" placeholder="Nombre" />
                    <Input value={link.url} onChange={(e) => updateLink(index, "url", e.target.value)} className="h-8 text-xs bg-white w-1/3 font-mono" placeholder="#" />
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-red-500" onClick={() => removeLink(index)}><Trash2 className="w-3 h-3" /></Button>
                </div>
            ))}
        </div>
      </div>

      <Separator />

      {/* 5. CTA Y FONDO */}
      <div className="space-y-4">
        <Label className="text-base font-semibold">Opciones Extra</Label>
        <div className="grid grid-cols-2 gap-4">
            <div><Label className="text-xs mb-1.5 block">Texto Botón</Label><Input value={data.botonTexto || ""} onChange={(e) => onChange("botonTexto", e.target.value)} /></div>
            <div><Label className="text-xs mb-1.5 block">URL Botón</Label><Input value={data.botonUrl || ""} onChange={(e) => onChange("botonUrl", e.target.value)} /></div>
        </div>
         <div className="flex items-center justify-between p-3 border rounded-lg bg-slate-50 mt-2">
            <div className="space-y-0.5">
                <Label className="text-sm">Fondo Transparente</Label>
                <p className="text-xs text-muted-foreground">Header sobre el Hero.</p>
            </div>
            <Switch checked={data.transparente || false} onCheckedChange={(val) => onChange("transparente", val)} />
         </div>
      </div>
    </div>
  )
}