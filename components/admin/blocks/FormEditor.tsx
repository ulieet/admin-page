"use client"

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { 
  CheckCircle2, LayoutTemplate, CreditCard, AlignJustify, 
  MapPin 
} from "lucide-react"

interface FormEditorProps {
  data: any
  onChange: (campo: string, valor: any) => void
}

export function FormEditor({ data, onChange }: FormEditorProps) {
  const estiloActual = data.variant || "default"

  const handleEstiloChange = (nuevoEstilo: string) => {
    onChange("variant", nuevoEstilo)
  }

  return (
    <div className="space-y-8 bg-white p-6 rounded-lg border shadow-sm">
      
      {/* 1. SELECCIÓN DE ESTILO */}
      <div className="space-y-4">
        <Label className="text-base font-semibold">Estilo del Formulario</Label>
        <div className="grid gap-3">
            {/* CLÁSICO */}
            <div onClick={() => handleEstiloChange("default")} className={`relative flex items-center gap-4 p-3 rounded-lg border-2 cursor-pointer transition-all hover:bg-slate-50 ${estiloActual === 'default' ? 'border-blue-600 bg-blue-50/20' : 'border-slate-200'}`}>
                <LayoutTemplate className="w-5 h-5 text-slate-500" />
                <div className="flex-1">
                    <p className="font-medium text-sm">Clásico (Bloques)</p>
                    <p className="text-xs text-muted-foreground">Info lateral en bloque gris y formulario rectangular.</p>
                </div>
                {estiloActual === 'default' && <CheckCircle2 className="w-4 h-4 text-blue-600" />}
            </div>

            {/* TARJETA */}
            <div onClick={() => handleEstiloChange("modern")} className={`relative flex items-center gap-4 p-3 rounded-lg border-2 cursor-pointer transition-all hover:bg-slate-50 ${estiloActual === 'modern' ? 'border-blue-600 bg-blue-50/20' : 'border-slate-200'}`}>
                <CreditCard className="w-5 h-5 text-slate-500" />
                <div className="flex-1">
                    <p className="font-medium text-sm">Tarjeta Flotante</p>
                    <p className="text-xs text-muted-foreground">Centrado en una tarjeta con sombra.</p>
                </div>
                {estiloActual === 'modern' && <CheckCircle2 className="w-4 h-4 text-blue-600" />}
            </div>

            {/* MINIMALISTA */}
            <div onClick={() => handleEstiloChange("minimal")} className={`relative flex items-center gap-4 p-3 rounded-lg border-2 cursor-pointer transition-all hover:bg-slate-50 ${estiloActual === 'minimal' ? 'border-blue-600 bg-blue-50/20' : 'border-slate-200'}`}>
                <AlignJustify className="w-5 h-5 text-slate-500" />
                <div className="flex-1">
                    <p className="font-medium text-sm">Minimalista</p>
                    <p className="text-xs text-muted-foreground">Limpio, una columna, sin bordes.</p>
                </div>
                {estiloActual === 'minimal' && <CheckCircle2 className="w-4 h-4 text-blue-600" />}
            </div>
        </div>
      </div>

      <Separator />

      {/* 2. TEXTOS PRINCIPALES */}
      <div className="space-y-4">
          <Label className="text-base font-semibold">Cabecera</Label>
          <div className="grid gap-4">
            <div>
                <Label className="text-xs text-muted-foreground">Título Principal</Label>
                <Input value={data.title || ""} onChange={(e) => onChange("title", e.target.value)} placeholder="Ej: CONTACTANOS" />
            </div>
            <div>
                <Label className="text-xs text-muted-foreground">Descripción / Bajada</Label>
                <Textarea value={data.description || ""} onChange={(e) => onChange("description", e.target.value)} rows={2} />
            </div>
          </div>
      </div>

      <Separator />

      {/* 3. INFORMACIÓN DE CONTACTO (SOLO SI ES CLÁSICO) */}
      {estiloActual === 'default' && (
          <>
            <div className="space-y-4 bg-slate-50 p-4 rounded-lg border animate-in fade-in slide-in-from-top-2 duration-300">
                <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-slate-500"/>
                    <Label className="text-base font-semibold">Información de Contacto</Label>
                </div>
                
                <div className="grid gap-3">
                    <div>
                        <Label className="text-xs text-muted-foreground">Dirección</Label>
                        <Input value={data.address || ""} onChange={(e) => onChange("address", e.target.value)} placeholder="Ej: Av. Principal 123" />
                    </div>
                    <div>
                        <Label className="text-xs text-muted-foreground">Horario</Label>
                        <Input value={data.hours || ""} onChange={(e) => onChange("hours", e.target.value)} />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <Label className="text-xs text-muted-foreground">Teléfono</Label>
                            <Input value={data.phone || ""} onChange={(e) => onChange("phone", e.target.value)} />
                        </div>
                        <div>
                            <Label className="text-xs text-muted-foreground">Email</Label>
                            <Input value={data.emailDisplay || ""} onChange={(e) => onChange("emailDisplay", e.target.value)} />
                        </div>
                    </div>
                </div>
            </div>
            <Separator />
          </>
      )}

      {/* 4. CONFIGURACIÓN */}
      <div className="space-y-4">
        <Label className="text-base font-semibold">Configuración</Label>
        <div className="grid grid-cols-2 gap-4">
            <div>
                <Label className="text-xs text-muted-foreground">Email receptor</Label>
                <Input value={data.receiverEmail || ""} onChange={(e) => onChange("receiverEmail", e.target.value)} placeholder="admin@sitio.com" />
            </div>
            <div>
                <Label className="text-xs text-muted-foreground">Texto del Botón</Label>
                <Input value={data.buttonText || "ENVIAR"} onChange={(e) => onChange("buttonText", e.target.value)} />
            </div>
        </div>
      </div>
    </div>
  )
}