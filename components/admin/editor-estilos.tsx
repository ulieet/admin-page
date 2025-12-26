"use client"

import { useState, useEffect } from "react"
import type { SiteConfig } from "@/lib/types/blocks"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Save, Undo } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const FUENTES_DISPONIBLES = [
  "Inter",           
  "Roboto",         
  "Open Sans",       
  "Lato",            
  "Montserrat",     
  "Poppins",         
  "Source Sans 3",   
  
  
  "Playfair Display",
  "Merriweather",    
  "Lora",            
  "Libre Baskerville",
]

interface EditorEstilosProps {
  estilos: SiteConfig["estilos"]
  onGuardar: (nuevosEstilos: SiteConfig["estilos"]) => void
}

export function EditorEstilos({ estilos, onGuardar }: EditorEstilosProps) {
  const [localEstilos, setLocalEstilos] = useState(estilos)
  const [hasChanges, setHasChanges] = useState(false)

  useEffect(() => {
    setLocalEstilos(estilos)
    setHasChanges(false)
  }, [estilos])

  const handleChange = (categoria: keyof typeof estilos, clave: string, valor: string) => {
    const nuevos = {
      ...localEstilos,
      [categoria]: {
        ...localEstilos[categoria as keyof typeof localEstilos],
        [clave]: valor,
      },
    }
    setLocalEstilos(nuevos)
    setHasChanges(true)
  }

  const handleSave = () => {
    onGuardar(localEstilos)
    setHasChanges(false)
  }

  const handleReset = () => {
    setLocalEstilos(estilos)
    setHasChanges(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-end gap-2 mb-4">
        {hasChanges && (
          <Button variant="ghost" onClick={handleReset} size="sm">
            <Undo className="w-4 h-4 mr-2" /> Deshacer
          </Button>
        )}
        <Button onClick={handleSave} disabled={!hasChanges} className="bg-green-600 hover:bg-green-700">
          <Save className="w-4 h-4 mr-2" /> Guardar Estilos
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* COLORES */}
        <Card>
          <CardHeader>
            <CardTitle>Paleta de Colores</CardTitle>
            <CardDescription>Define la identidad visual.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label>Color Primario (Marca)</Label>
              <div className="flex gap-2">
                <Input
                  type="color"
                  className="w-12 p-1 cursor-pointer h-10"
                  value={localEstilos.colores.primario}
                  onChange={(e) => handleChange("colores", "primario", e.target.value)}
                />
                <Input
                  value={localEstilos.colores.primario}
                  onChange={(e) => handleChange("colores", "primario", e.target.value)}
                  className="font-mono"
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label>Color de Fondo</Label>
              <div className="flex gap-2">
                <Input
                  type="color"
                  className="w-12 p-1 cursor-pointer h-10"
                  value={localEstilos.colores.fondo}
                  onChange={(e) => handleChange("colores", "fondo", e.target.value)}
                />
                <Input
                  value={localEstilos.colores.fondo}
                  onChange={(e) => handleChange("colores", "fondo", e.target.value)}
                  className="font-mono"
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label>Color de Texto</Label>
              <div className="flex gap-2">
                <Input
                  type="color"
                  className="w-12 p-1 cursor-pointer h-10"
                  value={localEstilos.colores.texto}
                  onChange={(e) => handleChange("colores", "texto", e.target.value)}
                />
                <Input
                  value={localEstilos.colores.texto}
                  onChange={(e) => handleChange("colores", "texto", e.target.value)}
                  className="font-mono"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tipografía</CardTitle>
            <CardDescription>Fuentes profesionales de Google Fonts.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            
            <div className="grid gap-2">
              <Label>Fuente Principal</Label>
              <Select 
                value={localEstilos.tipografia.fuente} 
                onValueChange={(val) => handleChange("tipografia", "fuente", val)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecciona una fuente" />
                </SelectTrigger>
                <SelectContent>
                   {FUENTES_DISPONIBLES.map((font) => (
                    <SelectItem key={font} value={font}>
                      <span style={{ fontFamily: font }}>{font}</span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-[10px] text-muted-foreground mt-1">
                * La vista previa de la fuente se aplicará al guardar y recargar.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>Tamaño Base</Label>
                <Input
                  value={localEstilos.tipografia.tamanoBase}
                  onChange={(e) => handleChange("tipografia", "tamanoBase", e.target.value)}
                  placeholder="16px"
                />
              </div>
              <div className="grid gap-2">
                <Label>Títulos (H1)</Label>
                <Input
                  value={localEstilos.tipografia.tamanoTitulo}
                  onChange={(e) => handleChange("tipografia", "tamanoTitulo", e.target.value)}
                  placeholder="2.5rem"
                />
              </div>
            </div>
            
            <div className="grid gap-2">
                <Label>Subtítulos (H2/H3)</Label>
                <Input
                  value={localEstilos.tipografia.tamanoSubtitulo}
                  onChange={(e) => handleChange("tipografia", "tamanoSubtitulo", e.target.value)}
                  placeholder="1.5rem"
                />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}