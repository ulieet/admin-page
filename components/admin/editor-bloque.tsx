"use client"

import type { Block, BlockVariant } from "@/lib/types/blocks"
import { Button } from "@/components/ui/button"
import { Save } from "lucide-react"
import { useState, useEffect } from "react"
import { VariantSelector } from "./variant-selector"
import { BlockPreview } from "./block-preview"
import { Separator } from "@/components/ui/separator"

// --- IMPORTACIÓN DE EDITORES DE BLOQUES ---
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

// Mapeo de tipos de bloque a sus componentes editores
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
}

interface EditorBloqueProps {
  bloque: Block
  onGuardar: (bloque: Block) => void
  onCancelar: () => void
}

export function EditorBloque({ bloque, onGuardar, onCancelar }: EditorBloqueProps) {
  const [bloqueEditado, setBloqueEditado] = useState<Block>(bloque)
  const [tieneCambios, setTieneCambios] = useState(false)

  // Sincronizar estado si cambian las props
  useEffect(() => {
    setBloqueEditado(bloque)
    setTieneCambios(false)
  }, [bloque])

  // Función unificada para actualizar datos (se pasa a los hijos)
const actualizarDatos = (campo: string, valor: any) => {
    setBloqueEditado((prev) => ({
      ...prev,
      datos: { ...prev.datos, [campo]: valor },
    } as Block)) // <--- AGREGAMOS ESTO: "as Block"
    setTieneCambios(true)
  }
  // Función para actualizar variante
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

  // Seleccionamos el componente correcto basado en el tipo
  const EditorComponent = BLOCK_EDITORS[bloqueEditado.tipo]

  // Bloques que NO muestran selector de variantes (según tu lógica original)
  const hideVariantSelector = ["header", "form", "footer", "gallery"].includes(bloqueEditado.tipo)

  return (
    <div className="h-full flex flex-col bg-background">
      {/* 1. Vista Previa */}
      <div className="p-6 border-b">
        <BlockPreview blockType={bloqueEditado.tipo} />
      </div>

      {/* 2. Área de Edición (Scrollable) */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="space-y-6">
          
          {/* Selector de Variantes (Condicional) */}
          {!hideVariantSelector && (
            <>
              <VariantSelector
                blockType={bloqueEditado.tipo}
                currentVariant={bloqueEditado.variant || "default"}
                onSelectVariant={actualizarVariant}
              />
              <Separator />
            </>
          )}

          {/* Renderizado Dinámico del Editor Específico */}
          <div>
            <h3 className="font-semibold text-sm mb-4 capitalize">
              Editando: {bloqueEditado.tipo.replace("-", " ")}
            </h3>
            
            {EditorComponent ? (
              <EditorComponent 
                data={bloqueEditado.datos} 
                onChange={actualizarDatos} 
              />
            ) : (
              <div className="p-4 border border-dashed rounded text-muted-foreground text-center">
                No hay un editor configurado para el bloque "{bloqueEditado.tipo}"
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 3. Barra de Acciones (Footer Fijo) */}
      <div className="border-t p-4 bg-background flex items-center justify-between sticky bottom-0 z-10">
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