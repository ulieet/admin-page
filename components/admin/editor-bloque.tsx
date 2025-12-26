"use client"

import type { Block } from "@/lib/types/blocks"
import { Button } from "@/components/ui/button"
import { Save } from "lucide-react"
import { useState, useEffect, useCallback } from "react"
import { toast } from "sonner"
import { HeaderEditor } from "./bloques-editor/HeaderEditor"
import { HeroEditor } from "./bloques-editor/HeroEditor"
import { FooterEditor } from "./bloques-editor/FooterEditor"
import { BannerEditor } from "./bloques-editor/BannerEditor"
import { FormEditor } from "./bloques-editor/FormEditor"
import { Cards3Editor } from "./bloques-editor/Cards3Editor"
import { TextImageEditor } from "./bloques-editor/TextImageEditor"
import { FeaturesEditor } from "./bloques-editor/FeaturesEditor"
import { ClientsEditor } from "./bloques-editor/LogoMarqueeEditor"
import { CtaEditor } from "./bloques-editor/CTAEditor"
import { StatsEditor } from "./bloques-editor/StatsEditor"
import { GalleryEditor } from "./bloques-editor/GalleryEditor"
import { ImageCardListEditor } from "./bloques-editor/ImageCardListEditor"
import { TituloParrafosEditor } from "./bloques-editor/TitulosParrafosEditor"
import FaqEditor from "./bloques-editor/FaqEditor"
import AnnouncementEditor from "./bloques-editor/AnnouncementEditor" 

const BLOCK_EDITORS: Record<string, React.ComponentType<any>> = {
  header: HeaderEditor,
  hero: HeroEditor,
  footer: FooterEditor,
  banner: BannerEditor,
  "text-image": TextImageEditor,
  "titulo-parrafos": TituloParrafosEditor,
  stats: StatsEditor,
  "cards-3": Cards3Editor,
  features: FeaturesEditor,
  "image-card-list": ImageCardListEditor,
  form: FormEditor,
  cta: CtaEditor,
  gallery: GalleryEditor,
  "logo-marquee": ClientsEditor,
  faq: FaqEditor,
  announcement: AnnouncementEditor, 
}

const NOMBRES_BLOQUES: Record<string, string> = {
  header: "Encabezado Principal",
  footer: "Pie de Página",
  hero: "Portada / Héroe",
  banner: "Banner Promocional",
  "cards-3": "Tarjetas de Servicios",
  "text-image": "Texto + Imagen",
  form: "Formulario de Contacto",
  gallery: "Galería de Imágenes",
  "logo-marquee": "Carrusel de Logos",
  "image-card-list": "Lista Tarjetas Destacadas",
  "titulo-parrafos": "Título y Párrafos",
  stats: "Estadísticas",
  cta: "Llamada a la Acción",
  features: "Características",
  iconos: "Íconos con Texto",
  faq: "Preguntas Frecuentes (FAQ)",
  announcement: "Barra de Anuncios (Top Bar)" 
}

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

  const handleEditorChange = useCallback((campo: string, valor: any) => {
    setBloqueEditado((prev) => {
      if (campo === "variant") {
        return { ...prev, variant: valor } as Block
      }
      return {
        ...prev,
        datos: { ...prev.datos, [campo]: valor },
      } as Block
    })
    setTieneCambios(true)
  }, [])

  const handleGuardarCambios = () => {
    onGuardar(bloqueEditado)
    setTieneCambios(false)
    toast.success("Bloque guardado correctamente")
  }

  const EditorComponent = BLOCK_EDITORS[bloqueEditado.tipo]

  return (
    <div className="flex flex-col bg-background border rounded-xl shadow-sm overflow-hidden h-full">
      
      <div className="p-6 border-b bg-slate-50/50 flex items-center justify-between">
        <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-100 text-blue-700 px-2 py-1 rounded border border-blue-200">
                {NOMBRES_BLOQUES[bloqueEditado.tipo] || bloqueEditado.tipo}
            </span>
            <h2 className="font-semibold text-slate-800">Editando Bloque</h2>
        </div>
      </div>

      <div className="p-6 overflow-y-auto flex-1">
        <div className="space-y-6">
          {EditorComponent ? (
            <EditorComponent 
              data={{ ...bloqueEditado.datos, variant: bloqueEditado.variant }} 
              onChange={handleEditorChange} 
            />
          ) : (
            <div className="p-8 border-2 border-dashed border-slate-200 rounded-xl text-slate-400 text-center bg-slate-50">
              <p>No se encontró un editor configurado para <strong>{bloqueEditado.tipo}</strong></p>
            </div>
          )}
        </div>
      </div>

      <div className="border-t p-4 bg-slate-50/50 flex items-center justify-between sticky bottom-0 z-10">
        <div className="text-sm font-medium">
          {tieneCambios ? (
            <span className="text-amber-600 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"/>
              Cambios sin guardar
            </span>
          ) : (
            <span className="text-slate-400">Sin cambios pendientes</span>
          )}
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" onClick={onCancelar}>
            Cancelar
          </Button>
          
          <Button 
            onClick={handleGuardarCambios} 
            className="bg-slate-900 text-white hover:bg-slate-800"
          >
            <Save className="w-4 h-4 mr-2" />
            Guardar
          </Button>
        </div>
      </div>
    </div>
  )
}