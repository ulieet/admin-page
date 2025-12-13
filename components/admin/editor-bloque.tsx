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
import { 
  Plus, 
  Trash2, 
  Save, 
  AlignLeft, 
  AlignCenter, 
  AlignRight, 
  Ghost, 
  Palette, 
  LayoutTemplate, 
  Map, 
  AlignJustify,
  Instagram,
  Twitter,
  Facebook,
  Linkedin,
  MessageCircle,
  PaintBucket,
  Link as LinkIcon
} from "lucide-react"
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

      case "hero": {
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
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Imágenes (Carrusel)</Label>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    const currentImages = data.imagenes || []
                    actualizarDatos("imagenes", [...currentImages, ""])
                  }}
                >
                  + Agregar Imagen
                </Button>
              </div>
              {(data.imagenes || []).map((imagen: string, index: number) => (
                <div key={index} className="flex gap-2">
                  <div className="flex-1">
                    <ImageUpload
                      label={`Imagen ${index + 1}`}
                      value={imagen}
                      onChange={(value) => {
                        const newImages = [...(data.imagenes || [])]
                        newImages[index] = value
                        actualizarDatos("imagenes", newImages)
                      }}
                    />
                  </div>
                  {(data.imagenes || []).length > 1 && (
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => {
                        const newImages = (data.imagenes || []).filter((_: string, i: number) => i !== index)
                        actualizarDatos("imagenes", newImages)
                      }}
                    >
                      Eliminar
                    </Button>
                  )}
                </div>
              ))}
              {(!data.imagenes || data.imagenes.length === 0) && (
                <ImageUpload
                  label="Imagen 1"
                  value=""
                  onChange={(value) => {
                    actualizarDatos("imagenes", [value])
                  }}
                />
              )}
            </div>
            <div className="space-y-2">
              <Label>Texto Botón Primario</Label>
              <Input
                value={data.botonPrimarioTexto || ""}
                onChange={(e) => actualizarDatos("botonPrimarioTexto", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>URL Botón Primario</Label>
              <Input
                value={data.botonPrimarioUrl || ""}
                onChange={(e) => actualizarDatos("botonPrimarioUrl", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Texto Botón Secundario</Label>
              <Input
                value={data.botonSecundarioTexto || ""}
                onChange={(e) => actualizarDatos("botonSecundarioTexto", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>URL Botón Secundario</Label>
              <Input
                value={data.botonSecundarioUrl || ""}
                onChange={(e) => actualizarDatos("botonSecundarioUrl", e.target.value)}
              />
            </div>
          </div>
        )
      }

      case "footer": {
        const data = bloqueEditado.datos
        const personalizacion = data.personalizacion || { tipoFondo: "default", colorPersonalizado: "#000000", textoOscuro: false }

        return (
          <div className="space-y-6">
            
            {/* SELECTOR DE DISEÑO FOOTER */}
            <div className="space-y-3 p-4 border rounded-lg bg-muted/20">
              <Label>Diseño del Pie de Página</Label>
              <div className="grid grid-cols-3 gap-2">
                <Button
                  variant={data.estiloVisual === "simple" ? "default" : "outline"}
                  className="h-auto flex-col gap-2 p-3"
                  onClick={() => actualizarDatos("estiloVisual", "simple")}
                >
                  <AlignJustify className="h-6 w-6" />
                  <span className="text-xs">Simple</span>
                </Button>
                <Button
                  variant={data.estiloVisual === "con-mapa" ? "default" : "outline"}
                  className="h-auto flex-col gap-2 p-3"
                  onClick={() => actualizarDatos("estiloVisual", "con-mapa")}
                >
                  <Map className="h-6 w-6" />
                  <span className="text-xs">Con Mapa</span>
                </Button>
                <Button
                  variant={(!data.estiloVisual || data.estiloVisual === "completo") ? "default" : "outline"}
                  className="h-auto flex-col gap-2 p-3"
                  onClick={() => actualizarDatos("estiloVisual", "completo")}
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
                  onClick={() => actualizarDatos("personalizacion", { ...personalizacion, tipoFondo: "default" })}
                >
                  Por Defecto
                </Button>
                <Button
                  size="sm"
                  variant={personalizacion.tipoFondo === "custom" ? "default" : "outline"}
                  onClick={() => actualizarDatos("personalizacion", { ...personalizacion, tipoFondo: "custom" })}
                >
                  Color
                </Button>
                <Button
                  size="sm"
                  variant={personalizacion.tipoFondo === "transparente" ? "default" : "outline"}
                  onClick={() => actualizarDatos("personalizacion", { ...personalizacion, tipoFondo: "transparente" })}
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
                      onChange={(e) => actualizarDatos("personalizacion", { ...personalizacion, colorPersonalizado: e.target.value })}
                    />
                    <div className="flex-1">
                      <Label className="text-xs">Color Hexadecimal</Label>
                      <Input 
                        value={personalizacion.colorPersonalizado || "#000000"}
                        onChange={(e) => actualizarDatos("personalizacion", { ...personalizacion, colorPersonalizado: e.target.value })}
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Switch 
                      checked={personalizacion.textoOscuro || false}
                      onCheckedChange={(checked) => actualizarDatos("personalizacion", { ...personalizacion, textoOscuro: checked })}
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
            {/* ----------------------------- */}

            <div className="space-y-2">
              <Label>Nombre de la Empresa</Label>
              <Input
                value={data.nombreEmpresa || ""}
                onChange={(e) => actualizarDatos("nombreEmpresa", e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label>Descripción</Label>
              <Textarea
                value={data.descripcion || ""}
                onChange={(e) => actualizarDatos("descripcion", e.target.value)}
                rows={2}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
               <div className="space-y-2">
                <Label>Email</Label>
                <Input type="email" value={data.email || ""} onChange={(e) => actualizarDatos("email", e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Teléfono</Label>
                <Input value={data.telefono || ""} onChange={(e) => actualizarDatos("telefono", e.target.value)} />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Dirección</Label>
              <Textarea
                value={data.direccion || ""}
                onChange={(e) => actualizarDatos("direccion", e.target.value)}
                rows={2}
              />
            </div>

            {data.estiloVisual === "con-mapa" && (
               <div className="p-3 bg-blue-50 border border-blue-100 rounded-md">
                  <ImageUpload
                    label="Imagen del Mapa (Requerido para estilo Mapa)"
                    value={data.imagenMapa || ""}
                    onChange={(value) => actualizarDatos("imagenMapa", value)}
                  />
               </div>
            )}

            <div className="space-y-4 pt-4 border-t">
              <Label>Redes Sociales</Label>
              <div className="grid grid-cols-1 gap-4">
                 <div className="flex gap-2 items-center">
                  <Linkedin className="w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="LinkedIn URL"
                    value={data.redesSociales?.linkedin || ""}
                    onChange={(e) =>
                      actualizarDatos("redesSociales", { ...(data.redesSociales || {}), linkedin: e.target.value })
                    }
                  />
                </div>
                <div className="flex gap-2 items-center">
                  <Facebook className="w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Facebook URL"
                    value={data.redesSociales?.facebook || ""}
                    onChange={(e) =>
                      actualizarDatos("redesSociales", { ...(data.redesSociales || {}), facebook: e.target.value })
                    }
                  />
                </div>
                <div className="flex gap-2 items-center">
                  <Instagram className="w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Instagram URL"
                    value={data.redesSociales?.instagram || ""}
                    onChange={(e) =>
                      actualizarDatos("redesSociales", { ...(data.redesSociales || {}), instagram: e.target.value })
                    }
                  />
                </div>
                <div className="flex gap-2 items-center">
                  <Twitter className="w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Twitter (X) URL"
                    value={data.redesSociales?.twitter || ""}
                    onChange={(e) =>
                      actualizarDatos("redesSociales", { ...(data.redesSociales || {}), twitter: e.target.value })
                    }
                  />
                </div>
                <div className="flex gap-2 items-center">
                  <MessageCircle className="w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="WhatsApp Link (ej: https://wa.me/numero)"
                    value={data.redesSociales?.whatsapp || ""}
                    onChange={(e) =>
                      actualizarDatos("redesSociales", { ...(data.redesSociales || {}), whatsapp: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        )
      }

      case "banner": {
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
              label="Imagen de Fondo"
              value={data.imagen || ""}
              onChange={(value) => actualizarDatos("imagen", value)}
            />
            <div className="space-y-2">
              <Label>Texto del Botón</Label>
              <Input value={data.botonTexto || ""} onChange={(e) => actualizarDatos("botonTexto", e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>URL del Botón</Label>
              <Input value={data.botonUrl || ""} onChange={(e) => actualizarDatos("botonUrl", e.target.value)} />
            </div>
            
            <div className="pt-4 border-t">
              <AlignmentControl 
                value={data.alineacion || "centro"}
                onChange={(val) => actualizarDatos("alineacion", val)}
              />
            </div>
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

            <div className="space-y-6 pt-4 border-t">
              <div className="grid grid-cols-2 gap-4">
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
                      <SelectItem value="clasico">Clásico (Borde)</SelectItem>
                      <SelectItem value="tarjeta">Tarjeta (Sombra)</SelectItem>
                      <SelectItem value="minimal">Minimalista (Lineal)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                   <AlignmentControl 
                      value={data.alineacion || "centro"}
                      onChange={(val) => actualizarDatos("alineacion", val)}
                    />
                </div>
              </div>
            </div>

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
              <div className="space-y-2">
                <Label>Horario</Label>
                <Input
                  value={data.infoContacto?.horario || ""}
                  onChange={(e) =>
                    actualizarDatos("infoContacto", { ...(data.infoContacto || {}), horario: e.target.value })
                  }
                />
              </div>
            </div>
          </div>
        )
      }

      case "cards-3": {
        const data = bloqueEditado.datos
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label>Título de la Sección (opcional)</Label>
              <Input value={data.titulo || ""} onChange={(e) => actualizarDatos("titulo", e.target.value)} />
            </div>
            <div className="space-y-4">
              <Label>Tarjetas</Label>
              {(data.items || []).map((item: any, index: number) => (
                <div key={index} className="border p-4 rounded-lg space-y-3 bg-muted/30">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Tarjeta {index + 1}</span>
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={() => {
                        const nuevosItems = (data.items || []).filter((_: any, i: number) => i !== index)
                        actualizarDatos("items", nuevosItems)
                      }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs">Icono o Imagen</Label>
                    <select
                      className="w-full px-3 py-2 border rounded-md bg-background"
                      value={item.icono || ""}
                      onChange={(e) => {
                        const nuevosItems = [...(data.items || [])]
                        nuevosItems[index] = { ...item, icono: e.target.value }
                        actualizarDatos("items", nuevosItems)
                      }}
                    >
                      <option value="award">Premio</option>
                      <option value="users">Usuarios</option>
                      <option value="building">Edificio</option>
                      <option value="shield">Escudo</option>
                      <option value="target">Objetivo</option>
                      <option value="trending-up">Tendencia</option>
                      <option value="cog">Engranaje</option>
                      <option value="bar-chart">Gráfico</option>
                    </select>
                  </div>
                  <Input
                    placeholder="Título"
                    value={item.titulo || ""}
                    onChange={(e) => {
                      const nuevosItems = [...(data.items || [])]
                      nuevosItems[index] = { ...item, titulo: e.target.value }
                      actualizarDatos("items", nuevosItems)
                    }}
                  />
                  <Textarea
                    placeholder="Descripción"
                    value={item.descripcion || ""}
                    onChange={(e) => {
                      const nuevosItems = [...(data.items || [])]
                      nuevosItems[index] = { ...item, descripcion: e.target.value }
                      actualizarDatos("items", nuevosItems)
                    }}
                    rows={2}
                  />
                  <Input
                    placeholder="Texto del botón (opcional)"
                    value={item.botonTexto || ""}
                    onChange={(e) => {
                      const nuevosItems = [...(data.items || [])]
                      nuevosItems[index] = { ...item, botonTexto: e.target.value }
                      actualizarDatos("items", nuevosItems)
                    }}
                  />
                  <Input
                    placeholder="URL del botón (opcional)"
                    value={item.botonUrl || ""}
                    onChange={(e) => {
                      const nuevosItems = [...(data.items || [])]
                      nuevosItems[index] = { ...item, botonUrl: e.target.value }
                      actualizarDatos("items", nuevosItems)
                    }}
                  />
                </div>
              ))}
              <Button
                type="button"
                size="sm"
                onClick={() => {
                  const nuevosItems = [
                    ...(data.items || []),
                    { icono: "award", titulo: "", descripcion: "", botonTexto: "", botonUrl: "" },
                  ]
                  actualizarDatos("items", nuevosItems)
                }}
              >
                <Plus className="w-4 h-4 mr-2" />
                Agregar Tarjeta
              </Button>
            </div>
          </div>
        )
      }

      case "text-image": {
        const data = bloqueEditado.datos
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label>Título</Label>
              <Input value={data.titulo || ""} onChange={(e) => actualizarDatos("titulo", e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Primer Párrafo</Label>
              <Textarea
                value={data.parrafo1 || ""}
                onChange={(e) => actualizarDatos("parrafo1", e.target.value)}
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label>Segundo Párrafo</Label>
              <Textarea
                value={data.parrafo2 || ""}
                onChange={(e) => actualizarDatos("parrafo2", e.target.value)}
                rows={3}
              />
            </div>
            <ImageUpload
              label="Imagen"
              value={data.imagen || ""}
              onChange={(value) => actualizarDatos("imagen", value)}
            />
            <div className="space-y-2">
              <Label>Posición de la Imagen</Label>
              <select
                className="w-full px-3 py-2 border rounded-md bg-background"
                value={data.posicionImagen || "derecha"}
                onChange={(e) => actualizarDatos("posicionImagen", e.target.value)}
              >
                <option value="izquierda">Izquierda</option>
                <option value="derecha">Derecha</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label>Puntos Destacados (opcional)</Label>
              {(data.puntos || []).map((punto: string, index: number) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={punto || ""}
                    onChange={(e) => {
                      const nuevosPuntos = [...(data.puntos || [])]
                      nuevosPuntos[index] = e.target.value
                      actualizarDatos("puntos", nuevosPuntos)
                    }}
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={() => {
                      const nuevosPuntos = (data.puntos || []).filter((_: string, i: number) => i !== index)
                      actualizarDatos("puntos", nuevosPuntos)
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
                  const nuevosPuntos = [...(data.puntos || []), "Nuevo punto"]
                  actualizarDatos("puntos", nuevosPuntos)
                }}
              >
                <Plus className="w-4 h-4 mr-2" />
                Agregar Punto
              </Button>
            </div>
          </div>
        )
      }

      case "about": {
        const data = bloqueEditado.datos
        return (
          <div className="space-y-6">
            <div className="p-4 border rounded-lg space-y-4 bg-muted/30">
              <h4 className="font-semibold">Sección 1</h4>
              <div className="space-y-2">
                <Label>Título</Label>
                <Input
                  value={data.seccion1.titulo || ""}
                  onChange={(e) => actualizarDatos("seccion1", { ...data.seccion1, titulo: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Párrafo 1</Label>
                <Textarea
                  value={data.seccion1.parrafo1 || ""}
                  onChange={(e) => actualizarDatos("seccion1", { ...data.seccion1, parrafo1: e.target.value })}
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label>Párrafo 2</Label>
                <Textarea
                  value={data.seccion1.parrafo2 || ""}
                  onChange={(e) => actualizarDatos("seccion1", { ...data.seccion1, parrafo2: e.target.value })}
                  rows={3}
                />
              </div>
              <ImageUpload
                label="Imagen"
                value={data.seccion1.imagen || ""}
                onChange={(value) => actualizarDatos("seccion1", { ...data.seccion1, imagen: value })}
              />
              <div className="space-y-2">
                <Label>Puntos Destacados</Label>
                {(data.seccion1.puntos || []).map((punto: string, index: number) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={punto || ""}
                      onChange={(e) => {
                        const nuevosPuntos = [...(data.seccion1.puntos || [])]
                        nuevosPuntos[index] = e.target.value
                        actualizarDatos("seccion1", { ...data.seccion1, puntos: nuevosPuntos })
                      }}
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={() => {
                        const nuevosPuntos = (data.seccion1.puntos || []).filter((_: string, i: number) => i !== index)
                        actualizarDatos("seccion1", { ...data.seccion1, puntos: nuevosPuntos })
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
                    const nuevosPuntos = [...(data.seccion1.puntos || []), "Nuevo punto"]
                    actualizarDatos("seccion1", { ...data.seccion1, puntos: nuevosPuntos })
                  }}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Agregar Punto
                </Button>
              </div>
            </div>

            <div className="p-4 border rounded-lg space-y-4 bg-muted/30">
              <h4 className="font-semibold">Sección 2</h4>
              <div className="space-y-2">
                <Label>Título</Label>
                <Input
                  value={data.seccion2.titulo || ""}
                  onChange={(e) => actualizarDatos("seccion2", { ...data.seccion2, titulo: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Párrafo 1</Label>
                <Textarea
                  value={data.seccion2.parrafo1 || ""}
                  onChange={(e) => actualizarDatos("seccion2", { ...data.seccion2, parrafo1: e.target.value })}
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label>Párrafo 2</Label>
                <Textarea
                  value={data.seccion2.parrafo2 || ""}
                  onChange={(e) => actualizarDatos("seccion2", { ...data.seccion2, parrafo2: e.target.value })}
                  rows={3}
                />
              </div>
              <ImageUpload
                label="Imagen"
                value={data.seccion2.imagen || ""}
                onChange={(value) => actualizarDatos("seccion2", { ...data.seccion2, imagen: value })}
              />
            </div>
          </div>
        )
      }

      case "services": {
        const data = bloqueEditado.datos
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label>Título</Label>
              <Input value={data.titulo || ""} onChange={(e) => actualizarDatos("titulo", e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Subtítulo</Label>
              <Input value={data.subtitulo || ""} onChange={(e) => actualizarDatos("subtitulo", e.target.value)} />
            </div>
            <div className="space-y-4">
              <Label>Servicios</Label>
              {(data.servicios || []).map((servicio: any, index: number) => (
                <div key={index} className="border p-4 rounded-lg space-y-3 bg-muted/30">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Servicio {index + 1}</span>
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={() => {
                        const nuevosServicios = (data.servicios || []).filter((_: any, i: number) => i !== index)
                        actualizarDatos("servicios", nuevosServicios)
                      }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs">Icono</Label>
                    <select
                      className="w-full px-3 py-2 border rounded-md bg-background"
                      value={servicio.icono || ""}
                      onChange={(e) => {
                        const nuevosServicios = [...(data.servicios || [])]
                        nuevosServicios[index] = { ...servicio, icono: e.target.value }
                        actualizarDatos("servicios", nuevosServicios)
                      }}
                    >
                      <option value="bar-chart">Gráfico de Barras</option>
                      <option value="target">Objetivo</option>
                      <option value="trending-up">Tendencia</option>
                      <option value="cog">Engranaje</option>
                    </select>
                  </div>
                  <Input
                    placeholder="Título"
                    value={servicio.titulo || ""}
                    onChange={(e) => {
                      const nuevosServicios = [...(data.servicios || [])]
                      nuevosServicios[index] = { ...servicio, titulo: e.target.value }
                      actualizarDatos("servicios", nuevosServicios)
                    }}
                  />
                  <Textarea
                    placeholder="Descripción"
                    value={servicio.descripcion || ""}
                    onChange={(e) => {
                      const nuevosServicios = [...(data.servicios || [])]
                      nuevosServicios[index] = { ...servicio, descripcion: e.target.value }
                      actualizarDatos("servicios", nuevosServicios)
                    }}
                    rows={2}
                  />
                </div>
              ))}
              <Button
                type="button"
                size="sm"
                onClick={() => {
                  const nuevosServicios = [
                    ...(data.servicios || []),
                    { icono: "bar-chart", titulo: "", descripcion: "" },
                  ]
                  actualizarDatos("servicios", nuevosServicios)
                }}
              >
                <Plus className="w-4 h-4 mr-2" />
                Agregar Servicio
              </Button>
            </div>
          </div>
        )
      }

      case "features": {
        const data = bloqueEditado.datos
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <Label>Características</Label>
              {(data.caracteristicas || []).map((caracteristica: any, index: number) => (
                <div key={index} className="border p-4 rounded-lg space-y-3 bg-muted/30">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Característica {index + 1}</span>
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={() => {
                        const nuevasCaracteristicas = (data.caracteristicas || []).filter(
                          (_: any, i: number) => i !== index,
                        )
                        actualizarDatos("caracteristicas", nuevasCaracteristicas)
                      }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs">Icono</Label>
                    <select
                      className="w-full px-3 py-2 border rounded-md bg-background"
                      value={caracteristica.icono || ""}
                      onChange={(e) => {
                        const nuevasCaracteristicas = [...(data.caracteristicas || [])]
                        nuevasCaracteristicas[index] = { ...caracteristica, icono: e.target.value }
                        actualizarDatos("caracteristicas", nuevasCaracteristicas)
                      }}
                    >
                      <option value="award">Premio</option>
                      <option value="users">Usuarios</option>
                      <option value="building">Edificio</option>
                      <option value="shield">Escudo</option>
                    </select>
                  </div>
                  <Input
                    placeholder="Título"
                    value={caracteristica.titulo || ""}
                    onChange={(e) => {
                      const nuevasCaracteristicas = [...(data.caracteristicas || [])]
                      nuevasCaracteristicas[index] = { ...caracteristica, titulo: e.target.value }
                      actualizarDatos("caracteristicas", nuevasCaracteristicas)
                    }}
                  />
                  <Textarea
                    placeholder="Descripción"
                    value={caracteristica.descripcion || ""}
                    onChange={(e) => {
                      const nuevasCaracteristicas = [...(data.caracteristicas || [])]
                      nuevasCaracteristicas[index] = { ...caracteristica, descripcion: e.target.value }
                      actualizarDatos("caracteristicas", nuevasCaracteristicas)
                    }}
                    rows={2}
                  />
                  <Input
                    placeholder="Texto del Botón"
                    value={caracteristica.botonTexto || ""}
                    onChange={(e) => {
                      const nuevasCaracteristicas = [...(data.caracteristicas || [])]
                      nuevasCaracteristicas[index] = { ...caracteristica, botonTexto: e.target.value }
                      actualizarDatos("caracteristicas", nuevasCaracteristicas)
                    }}
                  />
                </div>
              ))}
              <Button
                type="button"
                size="sm"
                onClick={() => {
                  const nuevasCaracteristicas = [
                    ...(data.caracteristicas || []),
                    { icono: "award", titulo: "", descripcion: "", botonTexto: "" },
                  ]
                  actualizarDatos("caracteristicas", nuevasCaracteristicas)
                }}
              >
                <Plus className="w-4 h-4 mr-2" />
                Agregar Característica
              </Button>
            </div>
          </div>
        )
      }

      case "clients": {
        const data = bloqueEditado.datos
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label>Título</Label>
              <Input value={data.titulo || ""} onChange={(e) => actualizarDatos("titulo", e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Subtítulo</Label>
              <Input value={data.subtitulo || ""} onChange={(e) => actualizarDatos("subtitulo", e.target.value)} />
            </div>
            <div className="space-y-4">
              <Label>Empresas</Label>
              {(data.empresas || []).map((empresa: any, index: number) => (
                <div key={index} className="border p-4 rounded-lg space-y-3 bg-muted/30">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Empresa {index + 1}</span>
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={() => {
                        const nuevasEmpresas = (data.empresas || []).filter((_: any, i: number) => i !== index)
                        actualizarDatos("empresas", nuevasEmpresas)
                      }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  <Input
                    placeholder="Nombre de la Empresa"
                    value={empresa.nombre || ""}
                    onChange={(e) => {
                      const nuevasEmpresas = [...(data.empresas || [])]
                      nuevasEmpresas[index] = { ...empresa, nombre: e.target.value }
                      actualizarDatos("empresas", nuevasEmpresas)
                    }}
                  />
                  <ImageUpload
                    label="Logo (opcional)"
                    value={empresa.logo || ""}
                    onChange={(value) => {
                      const nuevasEmpresas = [...(data.empresas || [])]
                      nuevasEmpresas[index] = { ...empresa, logo: value }
                      actualizarDatos("empresas", nuevasEmpresas)
                    }}
                  />
                </div>
              ))}
              <Button
                type="button"
                size="sm"
                onClick={() => {
                  const nuevasEmpresas = [...(data.empresas || []), { nombre: "", logo: "" }]
                  actualizarDatos("empresas", nuevasEmpresas)
                }}
              >
                <Plus className="w-4 h-4 mr-2" />
                Agregar Empresa
              </Button>
            </div>
          </div>
        )
      }

      case "cta": {
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
            <div className="space-y-2">
              <Label>Texto Botón Primario</Label>
              <Input
                value={data.botonPrimarioTexto || ""}
                onChange={(e) => actualizarDatos("botonPrimarioTexto", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>URL Botón Primario</Label>
              <Input
                value={data.botonPrimarioUrl || ""}
                onChange={(e) => actualizarDatos("botonPrimarioUrl", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Texto Botón Secundario</Label>
              <Input
                value={data.botonSecundarioTexto || ""}
                onChange={(e) => actualizarDatos("botonSecundarioTexto", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>URL Botón Secundario</Label>
              <Input
                value={data.botonSecundarioUrl || ""}
                onChange={(e) => actualizarDatos("botonSecundarioUrl", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Texto Inferior</Label>
              <Input
                value={data.textoInferior || ""}
                onChange={(e) => actualizarDatos("textoInferior", e.target.value)}
              />
            </div>
          </div>
        )
      }

      case "contact-form": {
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
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label>Teléfono</Label>
              <Input value={data.telefono || ""} onChange={(e) => actualizarDatos("telefono", e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input type="email" value={data.email || ""} onChange={(e) => actualizarDatos("email", e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Horario</Label>
              <Input value={data.horario || ""} onChange={(e) => actualizarDatos("horario", e.target.value)} />
            </div>
          </div>
        )
      }

      case "stats": {
        const data = bloqueEditado.datos
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label>Fondo Oscuro</Label>
              <select
                className="w-full px-3 py-2 border rounded-md bg-background"
                value={data.fondoOscuro ? "true" : "false"}
                onChange={(e) => actualizarDatos("fondoOscuro", e.target.value === "true")}
              >
                <option value="false">Fondo Claro</option>
                <option value="true">Fondo Oscuro</option>
              </select>
            </div>
            <div className="space-y-4">
              <Label>Estadísticas</Label>
              {(data.estadisticas || []).map((stat: any, index: number) => (
                <div key={index} className="border p-4 rounded-lg space-y-3 bg-muted/30">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Estadística {index + 1}</span>
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={() => {
                        const nuevasEstadisticas = (data.estadisticas || []).filter((_: any, i: number) => i !== index)
                        actualizarDatos("estadisticas", nuevasEstadisticas)
                      }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  <Input
                    placeholder="Número (ej: 15+)"
                    value={stat.numero || ""}
                    onChange={(e) => {
                      const nuevasEstadisticas = [...(data.estadisticas || [])]
                      nuevasEstadisticas[index] = { ...stat, numero: e.target.value }
                      actualizarDatos("estadisticas", nuevasEstadisticas)
                    }}
                  />
                  <Input
                    placeholder="Etiqueta (ej: Años de experiencia)"
                    value={stat.label || ""}
                    onChange={(e) => {
                      const nuevasEstadisticas = [...(data.estadisticas || [])]
                      nuevasEstadisticas[index] = { ...stat, label: e.target.value }
                      actualizarDatos("estadisticas", nuevasEstadisticas)
                    }}
                  />
                  <div className="space-y-2">
                    <Label className="text-xs">Icono (opcional)</Label>
                    <select
                      className="w-full px-3 py-2 border rounded-md bg-background"
                      value={stat.icono || ""}
                      onChange={(e) => {
                        const nuevasEstadisticas = [...(data.estadisticas || [])]
                        nuevasEstadisticas[index] = { ...stat, icono: e.target.value }
                        actualizarDatos("estadisticas", nuevasEstadisticas)
                      }}
                    >
                      <option value="">Sin icono</option>
                      <option value="award">Premio</option>
                      <option value="users">Usuarios</option>
                      <option value="check-circle">Check</option>
                      <option value="trending-up">Tendencia</option>
                      <option value="star">Estrella</option>
                    </select>
                  </div>
                </div>
              ))}
              <Button
                type="button"
                size="sm"
                onClick={() => {
                  const nuevasEstadisticas = [...(data.estadisticas || []), { numero: "", label: "", icono: "" }]
                  actualizarDatos("estadisticas", nuevasEstadisticas)
                }}
              >
                <Plus className="w-4 h-4 mr-2" />
                Agregar Estadística
              </Button>
            </div>
          </div>
        )
      }

      case "gallery": {
        const data = bloqueEditado.datos
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label>Título (opcional)</Label>
              <Input value={data.titulo || ""} onChange={(e) => actualizarDatos("titulo", e.target.value)} />
            </div>
            
            {/* SELECTOR DE TAMAÑO DE IMÁGENES (COLUMNAS) */}
            <div className="space-y-2">
              <Label>Tamaño de las Imágenes</Label>
              <Select
                value={String(data.columnas || 3)}
                onValueChange={(val) => actualizarDatos("columnas", Number.parseInt(val))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2">Grandes (2 por fila)</SelectItem>
                  <SelectItem value="3">Medianas (3 por fila)</SelectItem>
                  <SelectItem value="4">Pequeñas (4 por fila)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              <Label>Imágenes</Label>
              {(data.imagenes || []).map((imagen: any, index: number) => (
                <div key={index} className="border p-4 rounded-lg space-y-3 bg-muted/30">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Imagen {index + 1}</span>
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={() => {
                        const nuevasImagenes = (data.imagenes || []).filter((_: any, i: number) => i !== index)
                        actualizarDatos("imagenes", nuevasImagenes)
                      }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <ImageUpload
                    label="Archivo de imagen"
                    value={imagen.url || ""}
                    onChange={(value) => {
                      const nuevasImagenes = [...(data.imagenes || [])]
                      nuevasImagenes[index] = { ...imagen, url: value }
                      actualizarDatos("imagenes", nuevasImagenes)
                    }}
                  />
                  
                  {/* CAMPO DE LINK EN LUGAR DE TEXTO ALTERNATIVO */}
                  <div className="space-y-1">
                    <Label className="text-xs">Enlace de redirección (opcional)</Label>
                    <div className="flex items-center gap-2">
                        <LinkIcon className="h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="https://... o #seccion"
                            value={imagen.link || ""}
                            onChange={(e) => {
                            const nuevasImagenes = [...(data.imagenes || [])]
                            nuevasImagenes[index] = { ...imagen, link: e.target.value }
                            actualizarDatos("imagenes", nuevasImagenes)
                            }}
                        />
                    </div>
                    <p className="text-[10px] text-muted-foreground">Si se deja vacío, la imagen no tendrá enlace.</p>
                  </div>
                </div>
              ))}
              
              <Button
                type="button"
                size="sm"
                onClick={() => {
                  const nuevasImagenes = [...(data.imagenes || []), { url: "", alt: "Imagen de galería", link: "" }]
                  actualizarDatos("imagenes", nuevasImagenes)
                }}
              >
                <Plus className="w-4 h-4 mr-2" />
                Agregar Imagen
              </Button>
            </div>
          </div>
        )
      }

      default:
        return <div className="text-muted-foreground">Editor no disponible para este tipo de bloque</div>
    }
  }

  return (
    <div className="h-full flex flex-col">
      <div className="p-6 border-b">
        <BlockPreview blockType={bloqueEditado.tipo} />
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        <div className="space-y-6">
          
          {/* Ocultamos selector de variantes para bloques personalizados */}
          {bloqueEditado.tipo !== "header" && bloqueEditado.tipo !== "form" && bloqueEditado.tipo !== "footer" && bloqueEditado.tipo !== "gallery" && (
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