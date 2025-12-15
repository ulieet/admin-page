"use client"

import type { Block } from "@/lib/types/blocks"
import { Button } from "@/components/ui/button"
import { Save } from "lucide-react"
import { useState, useEffect, useCallback } from "react"

// Importamos todos los editores
import { HeaderEditor } from "./blocks/HeaderEditor"
import { HeroEditor } from "./blocks/HeroEditor"
import { FooterEditor } from "./blocks/FooterEditor"
import { BannerEditor } from "./blocks/BannerEditor"
import { FormEditor } from "./blocks/FormEditor"
import { Cards3Editor } from "./blocks/Cards3Editor"
import { TextImageEditor } from "./blocks/TextImageEditor"
import { AboutEditor } from "./blocks/AboutEditor"
import { ServicesEditor } from "./blocks/ServicesEditor"
import { FeaturesEditor } from "./blocks/FeaturesEditor"
import { ClientsEditor } from "./blocks/ClientsEditor"
import { CtaEditor } from "./blocks/CTAEditor"
import { ContactFormEditor } from "./blocks/ContactFormEditor"
import { StatsEditor } from "./blocks/StatsEditor"
import { GalleryEditor } from "./blocks/GalleryEditor"
import { ImageCardEditor } from "./blocks/ImageCardEditor" 
import { ImageCardListEditor } from "./blocks/ImageCardListEditor"
import { TituloParrafosEditor } from "./blocks/TitulosParrafosEditor" // Importación que debe existir

const BLOCK_EDITORS: Record<string, React.ComponentType<any>> = {
  header: HeaderEditor,
  hero: HeroEditor,
  footer: FooterEditor,
  banner: BannerEditor,
  form: FormEditor,
  "cards-3": Cards3Editor,
  "text-image": TextImageEditor,
  about: AboutEditor,
  services: ServicesEditor,
  features: FeaturesEditor,
  clients: ClientsEditor,
  cta: CtaEditor,
  "contact-form": ContactFormEditor,
  stats: StatsEditor,
  gallery: GalleryEditor,
  "logo-marquee": ClientsEditor,
  "image-card": ImageCardEditor,
  "image-card-list": ImageCardListEditor,
  "titulo-parrafos": TituloParrafosEditor, // Mapeo Correcto
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
  }

  const EditorComponent = BLOCK_EDITORS[bloqueEditado.tipo]

  return (
    <div className="flex flex-col bg-background border rounded-xl shadow-sm overflow-hidden">
      
      {/* CABECERA */}
      <div className="p-6 border-b bg-slate-50/50 flex items-center justify-between">
        <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-100 text-blue-700 px-2 py-1 rounded border border-blue-200">
                {bloqueEditado.tipo.replace("-", " ")}
            </span>
            <h2 className="font-semibold text-slate-800">Editando Bloque</h2>
        </div>
      </div>

      {/* ÁREA DE EDICIÓN */}
      <div className="p-6 min-h-[300px]">
        <div className="space-y-6">
          {EditorComponent ? (
            <EditorComponent 
              data={{ ...bloqueEditado.datos, variant: bloqueEditado.variant }} 
              onChange={handleEditorChange} 
            />
          ) : (
            <div className="p-8 border-2 border-dashed border-slate-200 rounded-xl text-slate-400 text-center bg-slate-50">
              <p>No se encontró un editor configurado para el tipo <strong>{bloqueEditado.tipo}</strong></p>
            </div>
          )}
        </div>
      </div>

      {/* PIE DE PÁGINA (BOTONES) */}
      <div className="border-t p-4 bg-slate-50/50 flex items-center justify-between">
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
          <Button onClick={handleGuardarCambios} disabled={!tieneCambios} className="bg-slate-900 text-white hover:bg-slate-800">
            <Save className="w-4 h-4 mr-2" />
            Guardar
          </Button>
        </div>
      </div>
    </div>
  )
}