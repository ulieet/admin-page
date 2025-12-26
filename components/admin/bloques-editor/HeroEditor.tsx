"use client"

import { useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Trash2, ImageIcon, Circle, AlertCircle } from "lucide-react"
import { ImageUpload } from "../image-upload"

interface HeroEditorProps {
  data: any
  variant?: string 
  onChange: (campo: string, valor: any) => void
}

export function HeroEditor({ data, variant = "default", onChange }: HeroEditorProps) {
  
  const isMinimal = variant === "minimal"
  const isRestrictedVariant = variant === "minimal" || variant === "modern"

  useEffect(() => {
    if (isRestrictedVariant) {
      if (data.soloSlider === true) onChange("soloSlider", false)
      if (data.mostrarIndicadores === true) onChange("mostrarIndicadores", false)
    }
  }, [variant, isRestrictedVariant, data.soloSlider, data.mostrarIndicadores, onChange])

  return (
    <div className="space-y-6">
      
      {!isMinimal ? (
        <div className="space-y-4 border-b pb-6">
          <div className="flex items-center justify-between">
            <Label>Imágenes (Carrusel)</Label>
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                const currentImages = data.imagenes || []
                onChange("imagenes", [...currentImages, ""])
              }}
            >
              + Agregar Imagen
            </Button>
          </div>

          {(data.imagenes || []).map((imagen: string, index: number) => (
            <div key={index} className="flex gap-2 flex-col p-3 border rounded-md bg-muted/10">
              <div className="flex justify-between items-center mb-2">
                <Label className="text-xs text-muted-foreground">Imagen {index + 1}</Label>
                {(data.imagenes || []).length > 1 && (
                  <Button
                    size="sm"
                    variant="destructive"
                    className="h-6 px-2"
                    onClick={() => {
                      const newImages = (data.imagenes || []).filter((_: string, i: number) => i !== index)
                      onChange("imagenes", newImages)
                    }}
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                )}
              </div>
              
              <ImageUpload
                value={imagen}
                onChange={(value) => {
                  const newImages = [...(data.imagenes || [])]
                  newImages[index] = value
                  onChange("imagenes", newImages)
                }}
              />
            </div>
          ))}

          {(!data.imagenes || data.imagenes.length === 0) && (
            <div className="space-y-2">
              <Label>Imagen 1</Label>
              <ImageUpload
                value=""
                onChange={(value) => onChange("imagenes", [value])}
              />
            </div>
          )}
        </div>
      ) : (
        <div className="p-4 bg-blue-50 text-blue-800 rounded-md border border-blue-200 text-sm mb-6 flex gap-2">
           <AlertCircle className="w-4 h-4" />
           <span>La variante <strong>Minimal (Gradiente)</strong> no utiliza imágenes de fondo, solo color sólido o degradado definido en estilos.</span>
        </div>
      )}

      <div className={data.soloSlider ? "opacity-50 pointer-events-none" : ""}>
        <div className="space-y-2">
          <Label>Título</Label>
          <Input 
            value={data.titulo || ""} 
            onChange={(e) => onChange("titulo", e.target.value)} 
          />
        </div>
        
        <div className="space-y-2 mt-4">
          <Label>Subtítulo</Label>
          <Textarea
            value={data.subtitulo || ""}
            onChange={(e) => onChange("subtitulo", e.target.value)}
            rows={2}
          />
        </div>

        <div className="space-y-2 border-t pt-4 mt-4">
          <Label className="text-base font-semibold">Botón Primario</Label>
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

        <div className="space-y-2 border-t pt-4">
          <Label className="text-base font-semibold">Botón Secundario</Label>
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
      </div>

      <div className="space-y-4 border-t pt-6">
        <Label className="text-base font-semibold">Configuración de Visualización</Label>
        
        {isRestrictedVariant && (
          <div className="flex items-center gap-2 p-2 bg-yellow-50 text-yellow-800 rounded-md text-xs mb-2">
            <AlertCircle className="w-4 h-4" />
            Estas opciones solo están disponibles en la variante "Default".
          </div>
        )}

        <div className={`flex items-center justify-between p-3 border rounded-lg ${isRestrictedVariant ? "opacity-50" : "bg-muted/20"}`}>
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <ImageIcon className="h-4 w-4 text-primary" />
              <Label className="text-base cursor-pointer" htmlFor="switch-slider">Modo Solo Slider</Label>
            </div>
            <p className="text-xs text-muted-foreground">Oculta textos. Solo imágenes.</p>
          </div>
          <Switch
            id="switch-slider"
            checked={data.soloSlider || false}
            onCheckedChange={(checked) => onChange("soloSlider", checked)}
            disabled={isRestrictedVariant} 
          />
        </div>

        <div className={`flex items-center justify-between p-3 border rounded-lg ${isRestrictedVariant ? "opacity-50" : "bg-muted/20"}`}>
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <Circle className="h-4 w-4 text-primary" />
              <Label className="text-base cursor-pointer" htmlFor="switch-dots">Mostrar Indicadores</Label>
            </div>
            <p className="text-xs text-muted-foreground">Puntos de navegación inferiores.</p>
          </div>
          <Switch
            id="switch-dots"
            checked={data.mostrarIndicadores !== false} 
            onCheckedChange={(checked) => onChange("mostrarIndicadores", checked)}
            disabled={isRestrictedVariant} 
          />
        </div>
      </div>
    </div>
  )
}