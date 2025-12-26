"use client"

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { 
  CheckCircle2, CreditCard, LayoutGrid, MousePointerClick, 
  Shield, Zap, BarChart3, Users, Globe, Lock, Smartphone, Mail, Star, FileText 
} from "lucide-react"
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select"

interface CardsEditorProps {
  data: any
  onChange: (campo: string, valor: any) => void
}

const AVAILABLE_ICONS = [
  { value: "shield", label: "Seguridad", icon: Shield },
  { value: "zap", label: "Energía", icon: Zap },
  { value: "chart", label: "Gráfico", icon: BarChart3 },
  { value: "users", label: "Usuarios", icon: Users },
  { value: "globe", label: "Mundo", icon: Globe },
  { value: "lock", label: "Candado", icon: Lock },
  { value: "phone", label: "Móvil", icon: Smartphone },
  { value: "mail", label: "Email", icon: Mail },
  { value: "file", label: "Documento", icon: FileText },
  { value: "star", label: "Estrella", icon: Star },
]

export function Cards3Editor({ data, onChange }: CardsEditorProps) {
  const estiloActual = data.variant || "corporate"
  
  const items = data.items || [
    { title: "Atención Personalizada", description: "Valoramos a cada cliente...", icon: "users", link: "", buttonText: "Ver más" },
    { title: "Confidencialidad", description: "Integridad y confianza...", icon: "lock", link: "", buttonText: "Ver más" },
    { title: "Empresas", description: "Servicio excepcional...", icon: "file", link: "", buttonText: "Ver más" },
  ]

  const handleEstiloChange = (nuevoEstilo: string) => {
    onChange("variant", nuevoEstilo)
  }

  const handleItemChange = (index: number, field: string, value: string) => {
    const newItems = [...items]
    newItems[index] = { ...newItems[index], [field]: value }
    onChange("items", newItems)
  }

  return (
    <div className="space-y-8 bg-white p-6 rounded-lg border shadow-sm">
      
      <div className="space-y-4">
        <Label className="text-base font-semibold">Diseño Visual</Label>
        <div className="grid gap-3">
            <div onClick={() => handleEstiloChange("corporate")} className={`relative flex items-center gap-4 p-3 rounded-lg border-2 cursor-pointer transition-all hover:bg-slate-50 ${estiloActual === 'corporate' ? 'border-blue-600 bg-blue-50/20' : 'border-slate-200'}`}>
                <CreditCard className="w-5 h-5 text-slate-500" />
                <div className="flex-1"><p className="font-medium text-sm">Corporativo</p></div>
                {estiloActual === 'corporate' && <CheckCircle2 className="w-4 h-4 text-blue-600" />}
            </div>
            <div onClick={() => handleEstiloChange("minimal")} className={`relative flex items-center gap-4 p-3 rounded-lg border-2 cursor-pointer transition-all hover:bg-slate-50 ${estiloActual === 'minimal' ? 'border-blue-600 bg-blue-50/20' : 'border-slate-200'}`}>
                <LayoutGrid className="w-5 h-5 text-slate-500" />
                <div className="flex-1"><p className="font-medium text-sm">Minimalista</p></div>
                {estiloActual === 'minimal' && <CheckCircle2 className="w-4 h-4 text-blue-600" />}
            </div>
            <div onClick={() => handleEstiloChange("interactive")} className={`relative flex items-center gap-4 p-3 rounded-lg border-2 cursor-pointer transition-all hover:bg-slate-50 ${estiloActual === 'interactive' ? 'border-blue-600 bg-blue-50/20' : 'border-slate-200'}`}>
                <MousePointerClick className="w-5 h-5 text-slate-500" />
                <div className="flex-1"><p className="font-medium text-sm">Interactivo</p></div>
                {estiloActual === 'interactive' && <CheckCircle2 className="w-4 h-4 text-blue-600" />}
            </div>
        </div>
      </div>

      <Separator />

      <div className="space-y-4">
          <Label className="text-base font-semibold">Cabecera</Label>
          <div className="grid gap-4">
            <div>
                <Label className="text-xs text-muted-foreground">Título Principal</Label>
                <Input value={data.title || ""} onChange={(e) => onChange("title", e.target.value)} />
            </div>
            <div>
                <Label className="text-xs text-muted-foreground">Subtítulo</Label>
                <Textarea value={data.description || ""} onChange={(e) => onChange("description", e.target.value)} rows={2} />
            </div>
          </div>
      </div>

      <Separator />

      <div className="space-y-6">
        <Label className="text-base font-semibold">Tarjetas Individuales</Label>
        
        {items.map((item: any, index: number) => (
            <div key={index} className="p-4 rounded-lg border bg-slate-50 space-y-4">
                <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Tarjeta #{index + 1}</span>
                </div>
                
                <div className="grid grid-cols-[1fr_2fr] gap-3">
                    <div>
                        <Label className="text-xs mb-1.5 block">Icono</Label>
                        <Select value={item.icon || "star"} onValueChange={(val) => handleItemChange(index, "icon", val)}>
                            <SelectTrigger className="bg-white"><SelectValue /></SelectTrigger>
                            <SelectContent>
                                {AVAILABLE_ICONS.map((opt) => (
                                    <SelectItem key={opt.value} value={opt.value}>
                                        <div className="flex items-center gap-2"><opt.icon className="w-3 h-3"/> {opt.label}</div>
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <Label className="text-xs mb-1.5 block">Título</Label>
                        <Input value={item.title || ""} onChange={(e) => handleItemChange(index, "title", e.target.value)} className="bg-white" />
                    </div>
                </div>

                <div>
                    <Label className="text-xs mb-1.5 block">Descripción</Label>
                    <Textarea value={item.description || ""} onChange={(e) => handleItemChange(index, "description", e.target.value)} className="bg-white min-h-20" />
                </div>

                <div className="grid grid-cols-2 gap-3 p-3 bg-white rounded border border-slate-200">
                    <div>
                        <Label className="text-xs mb-1.5 block text-blue-600 font-semibold">Texto Botón</Label>
                        <Input 
                            value={item.buttonText || ""} 
                            onChange={(e) => handleItemChange(index, "buttonText", e.target.value)} 
                            placeholder="Ej: Ver más"
                            className="h-8 text-xs"
                        />
                    </div>
                    <div>
                        <Label className="text-xs mb-1.5 block text-blue-600 font-semibold">Enlace (Ruta)</Label>
                        <Input 
                            value={item.link || ""} 
                            onChange={(e) => handleItemChange(index, "link", e.target.value)} 
                            placeholder="Ej: /contacto"
                            className="h-8 text-xs font-mono"
                        />
                    </div>
                </div>
            </div>
        ))}
      </div>
    </div>
  )
}