"use client"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Check } from "lucide-react"
import { getBlockMetadata } from "@/lib/block-metadata"
import type { BlockVariant } from "@/lib/types/blocks"
import Image from "next/image"

interface VariantSelectorProps {
  blockType: string
  currentVariant: BlockVariant
  onSelectVariant: (variant: BlockVariant) => void
}

export function VariantSelector({ blockType, currentVariant, onSelectVariant }: VariantSelectorProps) {
  const metadata = getBlockMetadata(blockType)

  if (!metadata || metadata.variants.length === 0) {
    return null
  }

  return (
    <div className="space-y-4">
      <div>
        <h3 className="font-semibold text-sm mb-2">Estilo del Componente</h3>
        <p className="text-xs text-muted-foreground mb-4">Selecciona el estilo visual para este bloque</p>
      </div>

      <div className="grid gap-3">
        {metadata.variants.map((variant) => {
          const isSelected = currentVariant === variant.id

          return (
            <Card
              key={variant.id}
              className={cn(
                "cursor-pointer transition-all hover:shadow-md",
                isSelected && "ring-2 ring-primary bg-primary/5",
              )}
              onClick={() => onSelectVariant(variant.id as BlockVariant)}
            >
              <div className="p-3">
                <div className="flex gap-3">
                  <div className="relative w-32 h-20 rounded-md overflow-hidden bg-muted ">
                    <Image
                      src={variant.previewImage || "/placeholder.svg"}
                      alt={variant.name}
                      fill
                      className="object-cover"
                      sizes="128px"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h4 className="font-semibold text-sm">{variant.name}</h4>
                      {isSelected && (
                        <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center ">
                          <Check className="w-3 h-3 text-white" />
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">{variant.description}</p>
                  </div>
                </div>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
