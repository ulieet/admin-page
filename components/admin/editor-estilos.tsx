"use client"

import { useState, useEffect } from "react"
import type { StyleConfig } from "@/lib/types/blocks"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface EditorEstilosProps {
  estilos: StyleConfig
  onGuardar: (estilos: StyleConfig) => void
}

// Valores por defecto para evitar caídas si la prop viene vacía
const defaultEstilos: StyleConfig = {
  colores: {
    primario: "#1e40af",
    secundario: "#1e3a8a",
    fondo: "#ffffff",
    texto: "#1f2937",
    acento: "#3b82f6",
  },
  tipografia: {
    fuente: "Inter",
    tamanoBase: "16px",
    tamanoTitulo: "48px",
    tamanoSubtitulo: "20px",
  },
}

export function EditorEstilos({ estilos, onGuardar }: EditorEstilosProps) {
  // Inicializamos con los estilos recibidos o los defaults si es null/undefined
  const [estilosEditados, setEstilosEditados] = useState<StyleConfig>(estilos || defaultEstilos)
  const [tieneCambios, setTieneCambios] = useState(false)

  useEffect(() => {
    if (estilos) {
      setEstilosEditados(estilos)
    }
    setTieneCambios(false)
  }, [estilos])

  const actualizar = (categoria: keyof StyleConfig, campo: string, valor: string) => {
    setEstilosEditados((prev) => {
      // Aseguramos que la categoría existe antes de expandirla
      const categoriaActual = prev[categoria] || defaultEstilos[categoria]
      
      return {
        ...prev,
        [categoria]: {
          ...categoriaActual,
          [campo]: valor,
        },
      }
    })
    setTieneCambios(true)
  }

  const handleGuardar = () => {
    onGuardar(estilosEditados)
    setTieneCambios(false)
  }

  // Si algo falla catastróficamente y estilosEditados es null, mostramos un fallback
  if (!estilosEditados || !estilosEditados.colores || !estilosEditados.tipografia) {
    return <div className="p-4 text-red-500">Error: No se pudieron cargar los estilos.</div>
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Colores del Sitio</CardTitle>
          <CardDescription>Define la paleta de colores de tu página</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Color Primario</Label>
              <div className="flex gap-2">
                <Input
                  type="color"
                  value={estilosEditados.colores.primario || "#000000"}
                  onChange={(e) => actualizar("colores", "primario", e.target.value)}
                  className="w-20 h-10 p-1 cursor-pointer"
                />
                <Input
                  type="text"
                  value={estilosEditados.colores.primario || ""}
                  onChange={(e) => actualizar("colores", "primario", e.target.value)}
                  placeholder="#1e40af"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Color Secundario</Label>
              <div className="flex gap-2">
                <Input
                  type="color"
                  value={estilosEditados.colores.secundario || "#000000"}
                  onChange={(e) => actualizar("colores", "secundario", e.target.value)}
                  className="w-20 h-10 p-1 cursor-pointer"
                />
                <Input
                  type="text"
                  value={estilosEditados.colores.secundario || ""}
                  onChange={(e) => actualizar("colores", "secundario", e.target.value)}
                  placeholder="#1e3a8a"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Color de Fondo</Label>
              <div className="flex gap-2">
                <Input
                  type="color"
                  value={estilosEditados.colores.fondo || "#ffffff"}
                  onChange={(e) => actualizar("colores", "fondo", e.target.value)}
                  className="w-20 h-10 p-1 cursor-pointer"
                />
                <Input
                  type="text"
                  value={estilosEditados.colores.fondo || ""}
                  onChange={(e) => actualizar("colores", "fondo", e.target.value)}
                  placeholder="#ffffff"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Color de Texto</Label>
              <div className="flex gap-2">
                <Input
                  type="color"
                  value={estilosEditados.colores.texto || "#000000"}
                  onChange={(e) => actualizar("colores", "texto", e.target.value)}
                  className="w-20 h-10 p-1 cursor-pointer"
                />
                <Input
                  type="text"
                  value={estilosEditados.colores.texto || ""}
                  onChange={(e) => actualizar("colores", "texto", e.target.value)}
                  placeholder="#1f2937"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Color de Acento</Label>
              <div className="flex gap-2">
                <Input
                  type="color"
                  value={estilosEditados.colores.acento || "#000000"}
                  onChange={(e) => actualizar("colores", "acento", e.target.value)}
                  className="w-20 h-10 p-1 cursor-pointer"
                />
                <Input
                  type="text"
                  value={estilosEditados.colores.acento || ""}
                  onChange={(e) => actualizar("colores", "acento", e.target.value)}
                  placeholder="#3b82f6"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Tipografía</CardTitle>
          <CardDescription>Configura las fuentes y tamaños de texto</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Fuente Principal</Label>
            <Select
              value={estilosEditados.tipografia.fuente || "Inter"}
              onValueChange={(value) => actualizar("tipografia", "fuente", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar fuente" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Inter">Inter</SelectItem>
                <SelectItem value="Roboto">Roboto</SelectItem>
                <SelectItem value="Open Sans">Open Sans</SelectItem>
                <SelectItem value="Lato">Lato</SelectItem>
                <SelectItem value="Montserrat">Montserrat</SelectItem>
                <SelectItem value="Poppins">Poppins</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Tamaño Base</Label>
              <Input
                type="text"
                value={estilosEditados.tipografia.tamanoBase || ""}
                onChange={(e) => actualizar("tipografia", "tamanoBase", e.target.value)}
                placeholder="16px"
              />
            </div>
            <div className="space-y-2">
              <Label>Tamaño Título</Label>
              <Input
                type="text"
                value={estilosEditados.tipografia.tamanoTitulo || ""}
                onChange={(e) => actualizar("tipografia", "tamanoTitulo", e.target.value)}
                placeholder="48px"
              />
            </div>
            <div className="space-y-2">
              <Label>Tamaño Subtítulo</Label>
              <Input
                type="text"
                value={estilosEditados.tipografia.tamanoSubtitulo || ""}
                onChange={(e) => actualizar("tipografia", "tamanoSubtitulo", e.target.value)}
                placeholder="20px"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-3">
        <Button onClick={handleGuardar} disabled={!tieneCambios} size="lg">
          Guardar Estilos
        </Button>
      </div>
    </div>
  )
}