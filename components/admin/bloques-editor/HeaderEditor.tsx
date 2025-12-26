"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Trash2, Layout, MousePointerClick, AlignCenter, AlignLeft, AlignRight, Type, Bold } from "lucide-react"
import { ImageUpload } from "@/components/admin/image-upload" 
import { cn } from "@/lib/utils"

interface HeaderEditorProps {
  data: any
  onChange: (key: string, value: any) => void
  variant?: string 
  onVariantChange?: (variant: string) => void
}

export function HeaderEditor({ data, onChange, variant = "default", onVariantChange }: HeaderEditorProps) {
  
  const headerVariants = [
    { value: "default", label: "Clásico", description: "Logo izquierda, Menú configurable", icon: Layout },
    { value: "modern", label: "Moderno", description: "Flotante tipo píldora", icon: MousePointerClick },
    { value: "centered", label: "Editorial", description: "Logo centrado, menú abajo", icon: AlignCenter },
  ]

  const alineacionMenu = data.alineacionMenu || "right"
  const fuenteActual = data.fuente || "geist" 

  const updateNavLink = (index: number, field: string, value: string) => {
    const newNav = [...(data.navegacion || [])]
    newNav[index] = { ...newNav[index], [field]: value }
    onChange("navegacion", newNav)
  }

  const addNavLink = () => {
    const newNav = [...(data.navegacion || []), { nombre: "Nuevo Link", url: "#" }]
    onChange("navegacion", newNav)
  }

  const removeNavLink = (index: number) => {
    const newNav = [...(data.navegacion || [])].filter((_, i) => i !== index)
    onChange("navegacion", newNav)
  }

  return (
    <div className="space-y-8">
      
      {onVariantChange ? (
        <div className="space-y-4">
            <Label className="text-base font-semibold">Diseño del Encabezado</Label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {headerVariants.map((item) => {
                    const Icon = item.icon
                    const isSelected = variant === item.value
                    return (
                        <div 
                            key={item.value}
                            onClick={() => onVariantChange(item.value)}
                            className={cn(
                                "cursor-pointer rounded-xl border-2 p-4 transition-all hover:border-primary/50 flex flex-col gap-2",
                                isSelected ? "border-primary bg-primary/5" : "border-muted bg-white"
                            )}
                        >
                            <div className="flex items-center gap-2">
                                <div className={cn("p-2 rounded-lg", isSelected ? "bg-primary text-white" : "bg-muted text-muted-foreground")}>
                                    <Icon className="w-5 h-5" />
                                </div>
                                <span className={cn("font-semibold text-sm", isSelected ? "text-primary" : "text-foreground")}>
                                    {item.label}
                                </span>
                            </div>
                            <p className="text-xs text-muted-foreground leading-tight">
                                {item.description}
                            </p>
                        </div>
                    )
                })}
            </div>
        </div>
      ) : (
        <div className="p-4 bg-red-50 text-red-600 rounded text-sm border border-red-200">
              Error: Falta la función "onVariantChange" en AdminPage.tsx
        </div>
      )}

      <div className="h-px bg-border my-6" />

      <div className="grid gap-6">
        
        <div className="space-y-3">
          <Label>Logo del Sitio</Label>
          <div className="p-1 border rounded-lg bg-slate-50">
             <ImageUpload 
                value={data.logoImagen || ""} 
                onChange={(url) => onChange("logoImagen", url)} 
             />
          </div>
        </div>

        <div className="space-y-4 p-4 border rounded-lg bg-slate-50">
            <h3 className="font-medium flex items-center gap-2"><Type className="w-4 h-4"/> Tipografía del Menú</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label>Fuente</Label>
                    <Select value={fuenteActual} onValueChange={(val) => onChange("fuente", val)}>
                        <SelectTrigger className="bg-white">
                            <SelectValue placeholder="Seleccionar fuente" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="global">Global del Sitio</SelectItem>
                            <SelectItem value="geist">Geist </SelectItem>
                            <SelectItem value="inter">Inter (Estándar)</SelectItem>
                            <SelectItem value="montserrat">Montserrat (Moderna)</SelectItem>
                            <SelectItem value="lato">Lato (Limpia)</SelectItem>
                            <SelectItem value="open_sans">Open Sans (Legible)</SelectItem>
                            <SelectItem value="roboto">Roboto (Geométrica)</SelectItem>
                            <SelectItem value="playfair">Playfair (Serif / Elegante)</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2 flex flex-col justify-end">
                    <div className="flex items-center justify-between p-2 bg-white rounded border h-10">
                        <Label className="cursor-pointer flex items-center gap-2 text-sm font-normal">
                            <Bold className="w-4 h-4 text-muted-foreground"/> Texto en Negrita
                        </Label>
                        <Switch 
                            checked={data.isBold || false} 
                            onCheckedChange={(val) => onChange("isBold", val)}
                        />
                    </div>
                </div>
            </div>
        </div>

        {variant !== "centered" && (
            <div className="space-y-3 p-4 border rounded-lg bg-slate-50">
               <Label className="text-sm font-medium">Alineación del Menú</Label>
               <div className="flex items-center gap-2 bg-white p-1 rounded border w-fit shadow-sm">
                  <Button type="button" variant={alineacionMenu === "left" ? "default" : "ghost"} size="sm" onClick={() => onChange("alineacionMenu", "left")}><AlignLeft className="h-4 w-4 mr-2" /> Izquierda</Button>
                  <Button type="button" variant={alineacionMenu === "center" ? "default" : "ghost"} size="sm" onClick={() => onChange("alineacionMenu", "center")}><AlignCenter className="h-4 w-4 mr-2" /> Centro</Button>
                  <Button type="button" variant={alineacionMenu === "right" ? "default" : "ghost"} size="sm" onClick={() => onChange("alineacionMenu", "right")}><AlignRight className="h-4 w-4 mr-2" /> Derecha</Button>
               </div>
            </div>
        )}

        <div className="flex items-center justify-between rounded-lg border p-4 bg-muted/20">
          <div className="space-y-0.5">
            <Label className="text-base">Fondo Transparente</Label>
            <p className="text-xs text-muted-foreground">El header será transparente al inicio (ideal sobre fotos oscuras).</p>
          </div>
          <Switch checked={data.transparente} onCheckedChange={(checked) => onChange("transparente", checked)} />
        </div>

        <div className="space-y-3 pt-2">
            <div className="flex justify-between items-center">
                <Label>Enlaces del Menú</Label>
                <Button variant="outline" size="sm" onClick={addNavLink} className="h-8"><Plus className="w-3 h-3 mr-2" /> Agregar</Button>
            </div>
            <div className="space-y-2">
                {data.navegacion?.map((link: any, i: number) => (
                    <div key={i} className="flex gap-2 items-center bg-card p-2 rounded border shadow-sm">
                        <Input value={link.nombre} onChange={(e) => updateNavLink(i, "nombre", e.target.value)} className="flex-1 h-9" placeholder="Nombre"/>
                        <Input value={link.url} onChange={(e) => updateNavLink(i, "url", e.target.value)} className="flex-1 h-9 font-mono text-xs text-muted-foreground" placeholder="URL"/>
                        <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground hover:text-red-500" onClick={() => removeNavLink(i)}><Trash2 className="w-4 h-4" /></Button>
                    </div>
                ))}
            </div>
        </div>

        <div className="grid grid-cols-2 gap-4 border-t pt-4">
            <div className="space-y-2">
                <Label>Texto Botón</Label>
                <Input value={data.botonTexto || ""} onChange={(e) => onChange("botonTexto", e.target.value)} />
            </div>
            <div className="space-y-2">
                <Label>URL Botón</Label>
                <Input value={data.botonUrl || ""} onChange={(e) => onChange("botonUrl", e.target.value)} />
            </div>
        </div>
      </div>
    </div>
  )
}