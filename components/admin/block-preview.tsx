"use client"

import { getBlockMetadata } from "@/lib/block-metadata"
import Image from "next/image"
import { Info } from "lucide-react"

interface BlockPreviewProps {
  blockType: string
}

export function BlockPreview({ blockType }: BlockPreviewProps) {
  const metadata = getBlockMetadata(blockType)

  if (!metadata) {
    return null
  }

  return (
    <div className="space-y-3 p-4 bg-muted/30 rounded-lg border">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
          <Info className="w-5 h-5 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-sm mb-1">{metadata.name}</h3>
          <p className="text-xs text-muted-foreground leading-relaxed">{metadata.description}</p>
        </div>
      </div>

      <div className="relative w-full h-32 rounded-md overflow-hidden bg-background">
        <Image
          src={metadata.previewImage || "/placeholder.svg"}
          alt={metadata.name}
          fill
          className="object-cover"
          sizes="400px"
        />
      </div>
    </div>
  )
}
