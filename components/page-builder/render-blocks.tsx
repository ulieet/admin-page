"use client"

import type { Block } from "@/lib/types/blocks"
import { BloqueHero } from "@/components/bloques/hero"
import { BloqueBanner } from "@/components/bloques/banner"
import { BloqueFeatures } from "@/components/bloques/features"
import { BloqueTituloParrafos } from "@/components/bloques/TitulosParrafos"
import { BloqueGallery } from "@/components/bloques/gallery"
import { BloqueCTA } from "@/components/bloques/cta"
import { BloqueStats } from "@/components/bloques/stats"
import { BloqueImageCardList } from "@/components/bloques/ImageCardList"
import { BloqueCards3 } from "@/components/bloques/cards-3"
import { BloqueForm } from "@/components/bloques/form"
import { BloqueLogoMarquee } from "@/components/bloques/logo-marquee"
import { BloqueTextoImagen } from "@/components/bloques/texto-imagen"
import { BloqueFaq } from "@/components/bloques/faq"
import { BloqueAnnouncement } from "@/components/bloques/announcement"

interface RenderBlocksProps {
  blocks: Block[]
}

export function RenderBlocks({ blocks }: RenderBlocksProps) {
  if (!Array.isArray(blocks) || blocks.length === 0) return null

  return (
    <div className="flex flex-col w-full">
      {blocks
        .filter(block => block && block.activo !== false)
        .sort((a, b) => (a.orden ?? 0) - (b.orden ?? 0))
        .map((block) => {
          const key = block.id

          switch (block.tipo) {
            case "hero": return <BloqueHero key={key} data={block.datos} variant={block.variant} />
            case "banner": return <BloqueBanner key={key} data={block.datos} />
            case "features": return <BloqueFeatures key={key} data={block.datos} />
            case "titulo-parrafos": return <BloqueTituloParrafos key={key} data={block.datos} />
            case "image-card-list": return <BloqueImageCardList key={key} data={block.datos} />
            case "cards-3": return <BloqueCards3 key={key} data={block.datos} />
            case "gallery": return <BloqueGallery key={key} data={block.datos} />
            case "logo-marquee": return <BloqueLogoMarquee key={key} data={block.datos} />
            case "stats": return <BloqueStats key={key} data={block.datos} />
            case "cta": return <BloqueCTA key={key} data={block.datos} />
            case "form": return <BloqueForm key={key} data={block.datos} />
            case "text-image": return <BloqueTextoImagen key={key} data={block.datos} />
            case "faq": return <BloqueFaq key={key} data={block.datos} />
            case "announcement": return <BloqueAnnouncement key={key} data={block.datos} />
            default: return null
          }
        })}
    </div>
  )
}