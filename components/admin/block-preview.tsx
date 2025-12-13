"use client"

import { getBlockMetadata } from "@/lib/block-metadata"
import { useState, useEffect } from "react"
import { Info, ImageOff } from "lucide-react"
import { cn } from "@/lib/utils"

interface BlockPreviewProps {
  blockType: string
}

export function BlockPreview({ blockType }: BlockPreviewProps) {
  // 1. Recuperamos la metadata usando el ID del bloque (ej: "header")
  const metadata = getBlockMetadata(blockType)
  const [imgError, setImgError] = useState(false)

  // Reseteamos el error si cambiamos de bloque
  useEffect(() => {
    setImgError(false)
  }, [blockType])

  if (!metadata) {
    return <div className="p-4 text-sm text-red-500">Bloque no encontrado: {blockType}</div>
  }

  return (
    <div className="space-y-3 p-4 bg-muted/30 rounded-lg border">
      {/* Encabezado con Icono y Descripción */}
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
          <Info className="w-5 h-5 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-sm mb-1">{metadata.name}</h3>
          <p className="text-xs text-muted-foreground leading-relaxed">{metadata.description}</p>
        </div>
      </div>

      {/* Área de la Imagen */}
      <div className="relative w-full h-40 rounded-md overflow-hidden bg-background border border-border/50 flex items-center justify-center">
        {metadata.previewImage && !imgError ? (
          <img
            src={metadata.previewImage}
            alt={metadata.name}
            onError={() => setImgError(true)}
            // CLAVE: 'object-contain' asegura que la imagen alargada (header) entre completa
            // sin recortarse.
            className="h-full w-full object-contain p-2" 
          />
        ) : (
          <div className="flex flex-col gap-2 items-center justify-center text-muted-foreground/50">
            <ImageOff className="h-8 w-8" />
            <span className="text-xs font-medium">
              {imgError ? "No se encontró la imagen" : "Sin imagen previa"}
            </span>
            {imgError && (
              <span className="text-[10px] text-red-400 px-2 text-center">
                Verifica: {metadata.previewImage}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  )
}