"use client"

import React, { useState, useEffect, useCallback } from "react"
import { Type, Palette, Save } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner" 
import ColorPicker from "@/components/admin/color-picker" 
import type { StyleConfig } from "@/lib/types/blocks"

// Valores iniciales por defecto (LIMPIOS: solo primario, fondo y texto)
const DEFAULT_ESTILOS: StyleConfig = {
  colores: {
    primario: "#1e3a8a", // Azul oscuro fuerte
    fondo: "#f9fafb",    // Gris claro para fondo
    texto: "#1f2937",
  },
  tipografia: {
    fuente: "Inter, sans-serif",
    tamanoBase: "16px",
    tamanoTitulo: "3.5rem", 
    tamanoSubtitulo: "1.25rem", 
  }
}

interface EditorEstilosProps {
  estilos: StyleConfig
  onGuardar: (estilos: StyleConfig) => void
}

export function EditorEstilos({ estilos: estilosIniciales, onGuardar }: EditorEstilosProps) {
  // Inicializamos el estado local con los props recibidos o los defaults
  const [estilos, setEstilos] = useState<StyleConfig>(estilosIniciales || DEFAULT_ESTILOS)
  const [tieneCambios, setTieneCambios] = useState(false)

  // Sincronizar estado local si los props cambian (útil si se recarga la config externa)
  useEffect(() => {
    if (estilosIniciales) {
      setEstilos(estilosIniciales)
    }
  }, [estilosIniciales])

  const handleColorChange = useCallback((key: keyof StyleConfig["colores"], value: string) => {
    setEstilos((prevEstilos) => {
      const base = prevEstilos || DEFAULT_ESTILOS
      setTieneCambios(true)
      return {
        ...base,
        colores: {
          ...base.colores,
          [key]: value,
        },
      }
    })
  }, [])

  const handleTipografiaChange = useCallback((key: keyof StyleConfig["tipografia"], value: string) => {
    setEstilos((prevEstilos) => {
      const base = prevEstilos || DEFAULT_ESTILOS
      setTieneCambios(true)
      return {
        ...base,
        tipografia: {
          ...base.tipografia,
          [key]: value,
        },
      }
    })
  }, [])

  const handleGuardar = () => {
    if (estilos) {
      // Llamamos a la función del padre en lugar de guardar directamente
      onGuardar(estilos)
      setTieneCambios(false)
      toast.success("Estilos guardados correctamente.")
    }
  }

  if (!estilos) {
    return <div className="p-6 text-center text-muted-foreground">Cargando configuración de estilos...</div>
  }
  
  // Nombres descriptivos (SOLO LOS NECESARIOS)
  const colorLabels: Record<keyof StyleConfig["colores"], string> = {
    primario: "Color Principal (Título/Botones)",
    fondo: "Fondo Global del Sitio",
    texto: "Texto Principal",
  }
  
  const tipografiaLabels = {
    fuente: "Fuente Base (CSS)",
    tamanoBase: "Tamaño Base (HTML/rem)",
    tamanoTitulo: "Tamaño de Título (H1, H2)",
    tamanoSubtitulo: "Tamaño de Subtítulo/Lead",
  }

  return (
    <div className="flex flex-col bg-background border rounded-xl shadow-sm overflow-hidden w-full">
      
      {/* CABECERA */}
      <div className="p-6 border-b bg-slate-50/50 flex items-center justify-between">
        <div className="flex items-center gap-2">
            <h2 className="font-bold text-slate-800 text-xl">Configuración de Estilos Globales</h2>
        </div>
      </div>

      <div className="p-6 space-y-8">
        
        {/* SECCIÓN 1: PALETA DE COLORES */}
        <div>
          <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
            <Palette className="w-5 h-5 text-primary" /> Colores del Tema
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Iteramos sobre las claves conocidas para evitar campos viejos */}
            {(Object.keys(DEFAULT_ESTILOS.colores) as Array<keyof StyleConfig["colores"]>).map((key) => (
              <div key={key} className="space-y-2">
                <Label htmlFor={key}>{colorLabels[key]}</Label>
                <ColorPicker
                  value={estilos.colores[key]}
                  onChange={(color) => handleColorChange(key, color)}
                />
              </div>
            ))}
            <div className="lg:col-span-3 text-sm text-muted-foreground pt-2">
                *El **Color Principal** es usado para todos los títulos importantes.
            </div>
          </div>
        </div>

        <Separator />
        
        {/* SECCIÓN 2: TIPOGRAFÍA */}
        <div>
          <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
            <Type className="w-5 h-5 text-primary" /> Tipografía
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Campo Fuente */}
            <div className="space-y-2 lg:col-span-3">
              <Label htmlFor="fuente">{tipografiaLabels.fuente}</Label>
              <Input
                id="fuente"
                value={estilos.tipografia.fuente}
                onChange={(e) => handleTipografiaChange("fuente", e.target.value)}
                placeholder="Ej: Inter, sans-serif"
              />
              <p className="text-xs text-muted-foreground">Nombre de la fuente (debe estar cargada en globals.css)</p>
            </div>
            
            {/* Tamaño Base */}
            <div className="space-y-2">
              <Label htmlFor="tamanoBase">{tipografiaLabels.tamanoBase}</Label>
              <Input
                id="tamanoBase"
                value={estilos.tipografia.tamanoBase}
                onChange={(e) => handleTipografiaChange("tamanoBase", e.target.value)}
                placeholder="Ej: 16px"
              />
            </div>
            
            {/* Tamaño Título */}
            <div className="space-y-2">
              <Label htmlFor="tamanoTitulo">{tipografiaLabels.tamanoTitulo}</Label>
              <Input
                id="tamanoTitulo"
                value={estilos.tipografia.tamanoTitulo}
                onChange={(e) => handleTipografiaChange("tamanoTitulo", e.target.value)}
                placeholder="Ej: 3rem o 48px"
              />
            </div>
            
            {/* Tamaño Subtítulo */}
            <div className="space-y-2">
              <Label htmlFor="tamanoSubtitulo">{tipografiaLabels.tamanoSubtitulo}</Label>
              <Input
                id="tamanoSubtitulo"
                value={estilos.tipografia.tamanoSubtitulo}
                onChange={(e) => handleTipografiaChange("tamanoSubtitulo", e.target.value)}
                placeholder="Ej: 1.25rem o 20px"
              />
            </div>
            
          </div>
        </div>

      </div>

      {/* PIE DE PÁGINA */}
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
          <Button 
            onClick={handleGuardar} 
            disabled={!tieneCambios} 
            className="bg-slate-900 text-white hover:bg-slate-800"
          >
            <Save className="w-4 h-4 mr-2" />
            Guardar Cambios
          </Button>
        </div>
      </div>
    </div>
  )
}