"use client"
import type { Block, BlockVariant } from "@/lib/types/blocks"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState, useEffect } from "react"
import { Plus, Trash2, Save, AlignLeft, AlignCenter, AlignRight, Ghost, Palette } from "lucide-react"
import { ImageUpload } from "./image-upload"
import { VariantSelector } from "./variant-selector"
import { BlockPreview } from "./block-preview"
import { Separator } from "@/components/ui/separator"

// --- COMPONENTE REUTILIZABLE DE ALINEACIÓN ---
interface AlignmentControlProps {
  value: string
  onChange: (value: string) => void
  label?: string
}

function AlignmentControl({ value, onChange, label = "Alineación" }: AlignmentControlProps) {
  return (
    <div className="space-y-3">
      <Label>{label}</Label>
      <ToggleGroup 
        type="single" 
        value={value || "centro"}
        onValueChange={(val) => val && onChange(val)}
        className="justify-start"
      >
        <ToggleGroupItem value="izquierda" aria-label="Izquierda">
          <AlignLeft className="h-4 w-4 mr-2" />
          Izquierda
        </ToggleGroupItem>
        <ToggleGroupItem value="centro" aria-label="Centro">
          <AlignCenter className="h-4 w-4 mr-2" />
          Centro
        </ToggleGroupItem>
        <ToggleGroupItem value="derecha" aria-label="Derecha">
          <AlignRight className="h-4 w-4 mr-2" />
          Derecha
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  )
}
// ---------------------------------------------

interface EditorBloqueProps {
  bloque: Block
  onGuardar: (bloque: Block) => void
  onCancelar: () => void
}

export function EditorBloque({ bloque, onGuardar, onCancelar }: EditorBloqueProps) {
  const [bloqueEditado, setBloqueEditado] = useState<Block>(bloque)
  const [tieneCambios, setTieneCambios] = useState(false)

  useEffect(() => {
    setBloqueEditado(bloque)
    setTieneCambios(false)
  }, [bloque])

  const actualizarDatos = (campo: string, valor: any) => {
    setBloqueEditado((prev) => ({
      ...prev,
      datos: { ...prev.datos, [campo]: valor },
    }))
    setTieneCambios(true)
  }

  const actualizarVariant = (variant: BlockVariant) => {
    setBloqueEditado((prev) => ({
      ...prev,
      variant,
    }))
    setTieneCambios(true)
  }

  const handleGuardarCambios = () => {
    onGuardar(bloqueEditado)
    setTieneCambios(false)
  }

  const renderEditor = () => {
    switch (bloqueEditado.tipo) {
      case "header": {
        const data = bloqueEditado.datos
        return (
          <div className="space-y-6">
            <ImageUpload
              label="Logo (Imagen)"
              value={data.logoImagen || ""}
              onChange={(value) => actualizarDatos("logoImagen", value)}
            />
            <div className="space-y-2">
              <Label>Logo (texto alternativo)</Label>
              <Input
                value={data.logoTexto || ""}
                onChange={(e) => actualizarDatos("logoTexto", e.target.value)}
                placeholder="Ej: LOGO"
              />
            </div>
            
            <div className="space-y-2">
              <Label>Nombre de la Empresa</Label>
              <Input
                value={data.nombreEmpresa || ""}
                onChange={(e) => actualizarDatos("nombreEmpresa", e.target.value)}
              />
            </div>

            {/* USANDO EL COMPONENTE REUTILIZABLE */}
            <div className="pt-4 border-t">
              <AlignmentControl 
                label="Posición de la Navegación"
                value={data.alineacion || "derecha"}
                onChange={(val) => actualizarDatos("alineacion", val)}
              />
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
                onCheckedChange={(checked) => actualizarDatos("transparente", checked)}
              />
            </div>

            <div className="space-y-2 pt-4 border-t">
              <Label>Navegación</Label>
              {(data.navegacion || []).map((item: any, index: number) => (
                <div key={index} className="flex gap-2">
                  <Input
                    placeholder="Nombre"
                    value={item.nombre || ""}
                    onChange={(e) => {
                      const nuevaNav = [...(data.navegacion || [])]
                      nuevaNav[index] = { ...item, nombre: e.target.value }
                      actualizarDatos("navegacion", nuevaNav)
                    }}
                  />
                  <Input
                    placeholder="URL"
                    value={item.url || ""}
                    onChange={(e) => {
                      const nuevaNav = [...(data.navegacion || [])]
                      nuevaNav[index] = { ...item, url: e.target.value }
                      actualizarDatos("navegacion", nuevaNav)
                    }}
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={() => {
                      const nuevaNav = (data.navegacion || []).filter((_: any, i: number) => i !== index)
                      actualizarDatos("navegacion", nuevaNav)
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
                  actualizarDatos("navegacion", nuevaNav)
                }}
              >
                <Plus className="w-4 h-4 mr-2" />
                Agregar Enlace
              </Button>
            </div>

            <div className="space-y-2 pt-4 border-t">
              <Label>Texto del Botón CTA</Label>
              <Input value={data.botonTexto || ""} onChange={(e) => actualizarDatos("botonTexto", e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>URL del Botón CTA</Label>
              <Input value={data.botonUrl || ""} onChange={(e) => actualizarDatos("botonUrl", e.target.value)} />
            </div>
          </div>
        )
      }

      // ... (Resto de casos: hero, about, services, features, clients, cta se quedan igual)

      case "hero": {
        // ... (Tu código existente del Hero)
        const data = bloqueEditado.datos
        return (
          <div className="space-y-6">
             <div className="space-y-2">
              <Label>Título</Label>
              <Input value={data.titulo || ""} onChange={(e) => actualizarDatos("titulo", e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Subtítulo</Label>
              <Textarea
                value={data.subtitulo || ""}
                onChange={(e) => actualizarDatos("subtitulo", e.target.value)}
                rows={2}
              />
            </div>
             <ImageUpload
                  label="Imagen 1"
                  value={data.imagenes?.[0] || ""}
                  onChange={(value) => {
                    actualizarDatos("imagenes", [value])
                  }}
                />
          </div>
        )
      }

      // ... (Agrega aquí los bloques intermedios si los necesitas, para simplificar te muestro el Form y Banner actualizados)

      case "banner": {
        const data = bloqueEditado.datos
        return (
          <div className="space-y-6">
             <div className="space-y-2">
              <Label>Título</Label>
              <Input value={data.titulo || ""} onChange={(e) => actualizarDatos("titulo", e.target.value)} />
            </div>
            {/* ... inputs banner ... */}
            
            {/* USANDO EL COMPONENTE REUTILIZABLE */}
            <AlignmentControl 
               value={data.alineacion || "centro"}
               onChange={(val) => actualizarDatos("alineacion", val)}
            />
          </div>
        )
      }

      case "form": {
        const data = bloqueEditado.datos
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label>Título</Label>
              <Input value={data.titulo || ""} onChange={(e) => actualizarDatos("titulo", e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Descripción</Label>
              <Textarea
                value={data.descripcion || ""}
                onChange={(e) => actualizarDatos("descripcion", e.target.value)}
                rows={2}
              />
            </div>
            <div className="space-y-2">
              <Label>Texto del Botón</Label>
              <Input value={data.botonTexto || ""} onChange={(e) => actualizarDatos("botonTexto", e.target.value)} />
            </div>

            {/* --- NUEVOS CONTROLES PARA EL FORMULARIO --- */}
            <div className="space-y-6 pt-4 border-t">
              <div className="grid grid-cols-2 gap-4">
                {/* 1. Selector de Estilo Visual */}
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Palette className="w-4 h-4" /> Estilo Visual
                  </Label>
                  <Select 
                    value={data.estiloVisual || "clasico"} 
                    onValueChange={(val) => actualizarDatos("estiloVisual", val)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona un estilo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="clasico">Clásico (Simple)</SelectItem>
                      <SelectItem value="tarjeta">Tarjeta (Sombreado)</SelectItem>
                      <SelectItem value="minimal">Minimalista (Lineal)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* 2. Control de Alineación Reutilizado */}
                <div>
                   <AlignmentControl 
                      value={data.alineacion || "centro"}
                      onChange={(val) => actualizarDatos("alineacion", val)}
                    />
                </div>
              </div>
            </div>
            {/* ------------------------------------------- */}

            <div className="border-t pt-4 space-y-4">
              <h4 className="font-semibold">Información de Contacto</h4>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input
                  type="email"
                  value={data.infoContacto?.email || ""}
                  onChange={(e) =>
                    actualizarDatos("infoContacto", { ...(data.infoContacto || {}), email: e.target.value })
                  }
                />
              </div>
               <div className="space-y-2">
                <Label>Teléfono</Label>
                <Input
                  value={data.infoContacto?.telefono || ""}
                  onChange={(e) =>
                    actualizarDatos("infoContacto", { ...(data.infoContacto || {}), telefono: e.target.value })
                  }
                />
              </div>
            </div>
          </div>
        )
      }

      default:
        // Fallback genérico para otros bloques si no los expandiste arriba
        // Asegúrate de incluir los 'case' de los otros bloques (about, services, etc) tal cual los tenías
        // o copia el contenido del archivo anterior para esos bloques.
        return (
            <div className="space-y-4">
               {/* Contenido genérico o de los otros bloques */}
               <div className="text-muted-foreground">Edición básica activada para {bloqueEditado.tipo}</div>
               {/* Puedes agregar inputs genéricos aquí si quieres */}
            </div>
        )
    }
  }

  return (
    <div className="h-full flex flex-col">
      <div className="p-6 border-b">
        <BlockPreview blockType={bloqueEditado.tipo} />
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        <div className="space-y-6">
          
          {/* OCULTAMOS EL SELECTOR DE VARIANTES PARA FORM Y HEADER */}
          {bloqueEditado.tipo !== "header" && bloqueEditado.tipo !== "form" && (
            <>
              <VariantSelector
                blockType={bloqueEditado.tipo}
                currentVariant={bloqueEditado.variant || "default"}
                onSelectVariant={actualizarVariant}
              />
              <Separator />
            </>
          )}

          <div>
            <h3 className="font-semibold text-sm mb-4">Contenido del Bloque</h3>
            {renderEditor()}
          </div>
        </div>
      </div>

      <div className="border-t p-4 bg-background flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          {tieneCambios ? "Hay cambios sin guardar" : "Sin cambios"}
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={onCancelar} disabled={!tieneCambios}>
            Descartar
          </Button>
          <Button onClick={handleGuardarCambios} disabled={!tieneCambios}>
            <Save className="w-4 h-4 mr-2" />
            Guardar
          </Button>
        </div>
      </div>
    </div>
  )
}