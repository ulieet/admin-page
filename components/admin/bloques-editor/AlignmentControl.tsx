"use client"

import { AlignLeft, AlignCenter, AlignRight } from "lucide-react"
import { Label } from "@/components/ui/label"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

interface AlignmentControlProps {
  value: string
  onChange: (value: string) => void
  label?: string
}

export function AlignmentControl({ value, onChange, label = "Alineación" }: AlignmentControlProps) {
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