"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Image as ImageIcon, X, Upload } from "lucide-react"
import Image from "next/image"

interface ImageUploadProps {
  label: string
  value: string
  onChange: (value: string) => void
}

export function ImageUpload({ label, value, onChange }: ImageUploadProps) {
  const [preview, setPreview] = useState(value)

  useEffect(() => {
    setPreview(value)
  }, [value])

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value
    setPreview(url)
    onChange(url)
  }

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      
      {/* Área de Previsualización */}
      <div className="relative flex flex-col gap-3">
        {preview ? (
          <div className="relative aspect-video w-full overflow-hidden rounded-lg border bg-muted group">
            {/* AQUÍ ESTÁ LA CLAVE: object-cover evita que se deforme */}
            <Image
              src={preview}
              alt="Preview"
              fill
              className="object-cover transition-transform group-hover:scale-105"
            />
            {/* Botón para quitar la imagen */}
            <Button
              type="button"
              variant="destructive"
              size="icon"
              className="absolute top-2 right-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => {
                setPreview("")
                onChange("")
              }}
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        ) : (
          <div className="flex aspect-video w-full items-center justify-center rounded-lg border border-dashed bg-muted/50 text-muted-foreground">
            <div className="flex flex-col items-center gap-2 text-xs">
              <ImageIcon className="h-8 w-8 opacity-50" />
              <span>Sin imagen</span>
            </div>
          </div>
        )}

        {/* Input para la URL */}
        <div className="flex gap-2">
          <Input
            placeholder="https://..."
            value={preview}
            onChange={handleUrlChange}
            className="flex-1"
          />
          {/* Aquí podrías conectar un selector de archivos real si tuvieras backend de carga */}
          <Button variant="outline" size="icon" title="Subir (Simulado)">
            <Upload className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}