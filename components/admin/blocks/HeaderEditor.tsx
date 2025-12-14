"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Ghost, Trash2, Plus, AlertTriangle, AlertCircle } from "lucide-react"
import { AlignmentControl } from "./AlignmentControl"
import { ImageUpload } from "../image-upload" 

interface HeaderEditorProps {
  data: any
  onChange: (campo: string, valor: any) => void
}

export function HeaderEditor({ data, onChange }: HeaderEditorProps) {
  
  const hasImage = !!data.logoImagen && data.logoImagen !== ""
  const hasText = !!data.logoTexto && data.logoTexto.trim() !== ""
  const isConflict = hasImage && hasText
  const blockImage = hasText && !isConflict
  const blockText = hasImage && !isConflict

  return (
    <div className="space-y-6">
      
      {isConflict && (
        <div className="p-3 bg-amber-100 border border-amber-200 rounded-md flex gap-2 text-amber-800 text-sm items-start">
           <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" />
           <div>
             <strong>Conflicto detectado:</strong> Tienes Imagen y Texto a la vez. 
             Por favor, borra uno de los dos.
           </div>
        </div>
      )}

      {/* SECCIÓN LOGO IMAGEN */}
      <div className={`space-y-2 p-3 rounded-lg border transition-all ${blockImage ? "opacity-50 bg-muted/30" : "bg-transparent"}`}>
        <div className="flex items-center justify-between">
            <Label className={blockImage ? "text-muted-foreground" : ""}>Logo (Imagen)</Label>
            {blockImage && (
                <span className="text-[10px] flex items-center gap-1 text-amber-600 font-medium">
                    <AlertCircle className="w-3 h-3" /> Bloqueado por Texto
                </span>
            )}
        </div>
        
        <div className="flex gap-2 items-start">
            <div className="relative flex-1">
                <ImageUpload
                  value={data.logoImagen ?? ""}
                  onChange={(value) => onChange("logoImagen", value)}
                />
                {blockImage && <div className="absolute inset-0 bg-background/50 cursor-not-allowed z-10" />}
            </div>
            {hasImage && (
              <Button 
                variant="destructive" 
                size="icon" 
                className="shrink-0"
                onClick={() => onChange("logoImagen", "")}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            )}
        </div>
        
        {/* NUEVO CAMPO: TAMAÑO DE LOGO (Solo visible si hay imagen) */}
        {hasImage && (
           <div className="pt-2 mt-2 border-t border-dashed">
              <Label className="text-xs mb-1.5 block">Tamaño Logo (Altura)</Label>
              <div className="flex gap-2 items-center">
                 <Input 
                   className="h-8 text-xs" 
                   placeholder="Ej: 40px" 
                   value={data.tamanoLogo ?? ""}
                   onChange={(e) => onChange("tamanoLogo", e.target.value)}
                 />
                 <span className="text-[10px] text-muted-foreground shrink-0">Default: 40px</span>
              </div>
           </div>
        )}

        {blockImage && (
            <p className="text-[10px] text-muted-foreground">
                Borra el "Logo (Texto)" de abajo para subir una imagen.
            </p>
        )}
      </div>

      {/* SECCIÓN LOGO TEXTO */}
      <div className={`space-y-2 p-3 rounded-lg border transition-all ${blockText ? "opacity-50 bg-muted/30" : "bg-transparent"}`}>
        <div className="flex items-center justify-between">
             <Label className={blockText ? "text-muted-foreground" : ""}>Logo (Texto)</Label>
             {blockText && (
                <span className="text-[10px] flex items-center gap-1 text-amber-600 font-medium">
                    <AlertCircle className="w-3 h-3" /> Bloqueado por Imagen
                </span>
            )}
        </div>
        
        <div className="flex gap-2">
            <Input
              value={data.logoTexto ?? ""}
              onChange={(e) => onChange("logoTexto", e.target.value)}
              placeholder={blockText ? "Elimina la imagen para editar" : "Ej: MI MARCA"}
              disabled={blockText}
              className="flex-1"
            />
             {hasText && (
              <Button 
                variant="destructive" 
                size="icon" 
                className="shrink-0"
                onClick={() => onChange("logoTexto", "")}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            )}
        </div>
      </div>
      
      <div className="space-y-2 pt-2 border-t mt-4">
        <Label>Nombre de la Empresa (Meta / SEO)</Label>
        <Input
          value={data.nombreEmpresa ?? ""}
          onChange={(e) => onChange("nombreEmpresa", e.target.value)}
          placeholder="Nombre interno o para SEO"
        />
      </div>

      <div className="grid grid-cols-2 gap-4 pt-4 border-t">
        <div className="space-y-2">
           <AlignmentControl 
             label="Posición Navegación"
             value={data.alineacion || "derecha"}
             onChange={(val) => onChange("alineacion", val)}
           />
        </div>
        
        <div className="space-y-2">
           <Label>Tamaño Texto Navbar</Label>
           <Input 
             placeholder="16px" 
             value={data.tamanoTexto ?? ""} 
             onChange={(e) => onChange("tamanoTexto", e.target.value)}
           />
        </div>
      </div>

      <div className="flex items-center justify-between p-4 border rounded-lg bg-muted/20 mt-4">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <Ghost className="h-4 w-4 text-primary" />
            <Label className="text-base">Modo Transparente</Label>
          </div>
          <p className="text-sm text-muted-foreground">
            Fondo transparente que cambia al hacer scroll.
          </p>
        </div>
        <Switch
          checked={data.transparente || false}
          onCheckedChange={(checked) => onChange("transparente", checked)}
        />
      </div>

      <div className="space-y-2 pt-4 border-t">
        <Label>Navegación</Label>
        {(data.navegacion || []).map((item: any, index: number) => (
          <div key={index} className="flex gap-2">
            <Input
              placeholder="Nombre"
              value={item.nombre ?? ""}
              onChange={(e) => {
                const nuevaNav = [...(data.navegacion || [])]
                nuevaNav[index] = { ...item, nombre: e.target.value }
                onChange("navegacion", nuevaNav)
              }}
            />
            <Input
              placeholder="URL"
              value={item.url ?? ""}
              onChange={(e) => {
                const nuevaNav = [...(data.navegacion || [])]
                nuevaNav[index] = { ...item, url: e.target.value }
                onChange("navegacion", nuevaNav)
              }}
            />
            <Button
              type="button"
              variant="destructive"
              size="sm"
              onClick={() => {
                const nuevaNav = (data.navegacion || []).filter((_: any, i: number) => i !== index)
                onChange("navegacion", nuevaNav)
              }}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        ))}
        <Button
          type="button"
          size="sm"
          onClick={() => {
            const nuevaNav = [...(data.navegacion || []), { nombre: "", url: "#" }]
            onChange("navegacion", nuevaNav)
          }}
        >
          <Plus className="w-4 h-4 mr-2" />
          Agregar Enlace
        </Button>
      </div>

      <div className="space-y-2 pt-4 border-t">
        <Label>Texto del Botón CTA</Label>
        <Input value={data.botonTexto ?? ""} onChange={(e) => onChange("botonTexto", e.target.value)} />
      </div>
      <div className="space-y-2">
        <Label>URL del Botón CTA</Label>
        <Input value={data.botonUrl ?? ""} onChange={(e) => onChange("botonUrl", e.target.value)} />
      </div>
    </div>
  )
}