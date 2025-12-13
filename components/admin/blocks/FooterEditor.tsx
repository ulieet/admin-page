"use client"

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { 
  AlignJustify, 
  Map, 
  LayoutTemplate, 
  PaintBucket,
  Linkedin,
  Facebook,
  Instagram,
  Twitter,
  MessageCircle
} from "lucide-react"

// Importamos ImageUpload (ajusta la ruta si es necesario)
import { ImageUpload } from "../image-upload"

interface FooterEditorProps {
  data: any
  onChange: (campo: string, valor: any) => void
}

export function FooterEditor({ data, onChange }: FooterEditorProps) {
  // Aseguramos que el objeto de personalización exista para evitar errores
  const personalizacion = data.personalizacion || { 
    tipoFondo: "default", 
    colorPersonalizado: "#000000", 
    textoOscuro: false 
  }

  return (
    <div className="space-y-6">
      
      {/* --- SELECTOR DE DISEÑO FOOTER --- */}
      <div className="space-y-3 p-4 border rounded-lg bg-muted/20">
        <Label>Diseño del Pie de Página</Label>
        <div className="grid grid-cols-3 gap-2">
          <Button
            variant={data.estiloVisual === "simple" ? "default" : "outline"}
            className="h-auto flex-col gap-2 p-3"
            onClick={() => onChange("estiloVisual", "simple")}
          >
            <AlignJustify className="h-6 w-6" />
            <span className="text-xs">Simple</span>
          </Button>
          <Button
            variant={data.estiloVisual === "con-mapa" ? "default" : "outline"}
            className="h-auto flex-col gap-2 p-3"
            onClick={() => onChange("estiloVisual", "con-mapa")}
          >
            <Map className="h-6 w-6" />
            <span className="text-xs">Con Mapa</span>
          </Button>
          <Button
            variant={(!data.estiloVisual || data.estiloVisual === "completo") ? "default" : "outline"}
            className="h-auto flex-col gap-2 p-3"
            onClick={() => onChange("estiloVisual", "completo")}
          >
            <LayoutTemplate className="h-6 w-6" />
            <span className="text-xs">Completo</span>
          </Button>
        </div>
      </div>

      {/* --- CONFIGURACIÓN DE FONDO --- */}
      <div className="space-y-4 p-4 border rounded-lg bg-muted/20">
        <Label className="flex items-center gap-2">
          <PaintBucket className="w-4 h-4" /> Personalización de Fondo
        </Label>
        
        <div className="grid grid-cols-3 gap-2">
          <Button
            size="sm"
            variant={personalizacion.tipoFondo === "default" ? "default" : "outline"}
            onClick={() => onChange("personalizacion", { ...personalizacion, tipoFondo: "default" })}
          >
            Por Defecto
          </Button>
          <Button
            size="sm"
            variant={personalizacion.tipoFondo === "custom" ? "default" : "outline"}
            onClick={() => onChange("personalizacion", { ...personalizacion, tipoFondo: "custom" })}
          >
            Color
          </Button>
          <Button
            size="sm"
            variant={personalizacion.tipoFondo === "transparente" ? "default" : "outline"}
            onClick={() => onChange("personalizacion", { ...personalizacion, tipoFondo: "transparente" })}
          >
            Transparente
          </Button>
        </div>

        {personalizacion.tipoFondo === "custom" && (
          <div className="flex flex-col gap-3 pt-2 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center gap-3">
              <Input 
                type="color" 
                value={personalizacion.colorPersonalizado || "#000000"}
                className="w-12 h-12 p-1 cursor-pointer"
                onChange={(e) => onChange("personalizacion", { ...personalizacion, colorPersonalizado: e.target.value })}
              />
              <div className="flex-1">
                <Label className="text-xs">Color Hexadecimal</Label>
                <Input 
                  value={personalizacion.colorPersonalizado || "#000000"}
                  onChange={(e) => onChange("personalizacion", { ...personalizacion, colorPersonalizado: e.target.value })}
                />
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Switch 
                checked={personalizacion.textoOscuro || false}
                onCheckedChange={(checked) => onChange("personalizacion", { ...personalizacion, textoOscuro: checked })}
              />
              <Label className="text-sm font-normal">Usar texto oscuro (para fondos claros)</Label>
            </div>
          </div>
        )}
        
        {personalizacion.tipoFondo === "transparente" && (
          <p className="text-xs text-muted-foreground mt-2">
            El pie de página no tendrá fondo. Ideal para diseños minimalistas donde el footer flota sobre el final de la página.
          </p>
        )}
      </div>

      {/* --- DATOS DE LA EMPRESA --- */}
      <div className="space-y-6 pt-4 border-t">
        <div className="space-y-2">
          <Label>Nombre de la Empresa</Label>
          <Input
            value={data.nombreEmpresa || ""}
            onChange={(e) => onChange("nombreEmpresa", e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label>Descripción</Label>
          <Textarea
            value={data.descripcion || ""}
            onChange={(e) => onChange("descripcion", e.target.value)}
            rows={2}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
           <div className="space-y-2">
            <Label>Email</Label>
            <Input type="email" value={data.email || ""} onChange={(e) => onChange("email", e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Teléfono</Label>
            <Input value={data.telefono || ""} onChange={(e) => onChange("telefono", e.target.value)} />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Dirección</Label>
          <Textarea
            value={data.direccion || ""}
            onChange={(e) => onChange("direccion", e.target.value)}
            rows={2}
          />
        </div>

        {data.estiloVisual === "con-mapa" && (
           <div className="p-3 bg-blue-50 border border-blue-100 rounded-md">
              <Label className="mb-2 block text-blue-900">Imagen del Mapa</Label>
              <ImageUpload
                value={data.imagenMapa || ""}
                onChange={(value) => onChange("imagenMapa", value)}
              />
           </div>
        )}
      </div>

      {/* --- REDES SOCIALES --- */}
      <div className="space-y-4 pt-4 border-t">
        <Label>Redes Sociales</Label>
        <div className="grid grid-cols-1 gap-4">
           <div className="flex gap-2 items-center">
            <Linkedin className="w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="LinkedIn URL"
              value={data.redesSociales?.linkedin || ""}
              onChange={(e) =>
                onChange("redesSociales", { ...(data.redesSociales || {}), linkedin: e.target.value })
              }
            />
          </div>
          <div className="flex gap-2 items-center">
            <Facebook className="w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Facebook URL"
              value={data.redesSociales?.facebook || ""}
              onChange={(e) =>
                onChange("redesSociales", { ...(data.redesSociales || {}), facebook: e.target.value })
              }
            />
          </div>
          <div className="flex gap-2 items-center">
            <Instagram className="w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Instagram URL"
              value={data.redesSociales?.instagram || ""}
              onChange={(e) =>
                onChange("redesSociales", { ...(data.redesSociales || {}), instagram: e.target.value })
              }
            />
          </div>
          <div className="flex gap-2 items-center">
            <Twitter className="w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Twitter (X) URL"
              value={data.redesSociales?.twitter || ""}
              onChange={(e) =>
                onChange("redesSociales", { ...(data.redesSociales || {}), twitter: e.target.value })
              }
            />
          </div>
          <div className="flex gap-2 items-center">
            <MessageCircle className="w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="WhatsApp Link (ej: https://wa.me/numero)"
              value={data.redesSociales?.whatsapp || ""}
              onChange={(e) =>
                onChange("redesSociales", { ...(data.redesSociales || {}), whatsapp: e.target.value })
              }
            />
          </div>
        </div>
      </div>
    </div>
  )
}