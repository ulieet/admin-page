"use client"

import React, { useState, useEffect, useCallback } from "react"
import { Type, Palette, Save } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner" // Asumo que usas Sonner para notificaciones
import ColorPicker from "@/components/admin/color-picker" 
import type { StyleConfig } from "@/lib/types/blocks"
import { cargarConfiguracion, actualizarEstilos } from "@/lib/blocks-storage"

// Valores iniciales por defecto si no hay configuración guardada
const DEFAULT_ESTILOS: StyleConfig = {
    colores: {
        primario: "#1e3a8a", // Azul oscuro fuerte
        secundario: "#3b82f6",
        fondo: "#f9fafb", // Gris claro para fondo
        texto: "#1f2937",
        acento: "#f59e0b",
    },
    tipografia: {
        fuente: "Inter, sans-serif",
        tamanoBase: "16px",
        tamanoTitulo: "3.5rem", // ✅ VALOR GRANDE FORZADO (56px)
        tamanoSubtitulo: "1.25rem", // Subtítulo grande (20px)
    }
}


interface EditorEstilosProps {
  // Función para forzar la actualización del padre si es necesario
  onStylesUpdated?: () => void 
}

export function EditorEstilos({ onStylesUpdated }: EditorEstilosProps) {
  const [estilos, setEstilos] = useState<StyleConfig | null>(null)
  const [tieneCambios, setTieneCambios] = useState(false)

  // 1. Cargar estilos al inicio
  useEffect(() => {
    const config = cargarConfiguracion()
    // Si la configuración de estilos está vacía o incompleta, usamos los valores por defecto.
    const initialStyles = config.estilos || DEFAULT_ESTILOS;
    setEstilos(initialStyles);
  }, [])

  // 2. Manejar cambios de datos
  const handleColorChange = useCallback((key: keyof StyleConfig["colores"], value: string) => {
    setEstilos((prevEstilos) => {
      if (!prevEstilos) return null
      setTieneCambios(true)
      return {
        ...prevEstilos,
        colores: {
          ...prevEstilos.colores,
          [key]: value,
        },
      }
    })
  }, [])

  const handleTipografiaChange = useCallback((key: keyof StyleConfig["tipografia"], value: string) => {
    setEstilos((prevEstilos) => {
      if (!prevEstilos) return null
      setTieneCambios(true)
      return {
        ...prevEstilos,
        tipografia: {
          ...prevEstilos.tipografia,
          [key]: value,
        },
      }
    })
  }, [])

  // 3. Guardar cambios
  const handleGuardar = () => {
    if (estilos) {
      actualizarEstilos(estilos)
      setTieneCambios(false)
      toast.success("Estilos guardados correctamente.")
      if (onStylesUpdated) {
        onStylesUpdated()
      }
    }
  }

  if (!estilos) {
    return <div className="p-6 text-center text-muted-foreground">Cargando configuración de estilos...</div>
  }
  
  // Nombres descriptivos para la interfaz
  const colorLabels = {
    primario: "Color Principal (Título/Botones)",
    secundario: "Color Secundario",
    fondo: "Fondo Global del Sitio",
    texto: "Texto Principal",
    acento: "Color de Acento",
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
            {Object.entries(estilos.colores).map(([key, value]) => (
              <div key={key} className="space-y-2">
                <Label htmlFor={key}>{colorLabels[key as keyof StyleConfig["colores"]]}</Label>
                <ColorPicker
                  value={value}
                  onChange={(color) => handleColorChange(key as keyof StyleConfig["colores"], color)}
                />
              </div>
            ))}
            <div className="lg:col-span-3 text-sm text-muted-foreground pt-2">
                *El **Color Principal** es usado para todos los títulos importantes, incluyendo el nuevo bloque "Título y Párrafos".
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
                placeholder="Ej: 16px (Define el tamaño de 1rem)"
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
              <p className="text-xs text-muted-foreground">**Importante:** Ajusta este valor para hacer los títulos grandes.</p>
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