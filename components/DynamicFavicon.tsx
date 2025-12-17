"use client"

import { useEffect } from "react"
import { cargarConfiguracion } from "@/lib/blocks-storage"
import type { HeaderBlock } from "@/lib/types/blocks"

export default function DynamicFavicon() {
  useEffect(() => {
    const config = cargarConfiguracion()

    const header = config.bloques.find(
      (b): b is HeaderBlock => b.tipo === "header"
    )

    const logo = header?.datos?.logoImagen

    if (!logo) return

    let link = document.querySelector(
      "link[rel='icon']"
    ) as HTMLLinkElement | null

    if (!link) {
      link = document.createElement("link")
      link.rel = "icon"
      document.head.appendChild(link)
    }

    link.href = logo
  }, [])

  return null
}
