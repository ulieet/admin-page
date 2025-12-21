"use client"

import { useEffect } from "react"
import { cargarConfiguracion } from "@/lib/blocks-storage"

export default function DynamicFavicon() {
  useEffect(() => {
    const config = cargarConfiguracion()

    // CORRECCIÓN: Ahora accedemos directamente al header global
    // ya no hace falta buscarlo en un array de bloques.
    const logo = config?.header?.datos?.logoImagen

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