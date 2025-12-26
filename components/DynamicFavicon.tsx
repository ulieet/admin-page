"use client"

import { useEffect } from "react"
import { cargarConfiguracion } from "@/lib/blocks-storage"

const FAVICON_ID = "dynamic-favicon"
const APPLE_ID = "dynamic-apple-icon"

export default function DynamicFavicon() {
  useEffect(() => {
    const updateFavicon = () => {
      const config = cargarConfiguracion()
      const logoUrl = config?.header?.datos?.logoImagen

      if (!logoUrl) return

      const version = Date.now()
      const separator = logoUrl.includes("?") ? "&" : "?"
      const href = `${logoUrl}${separator}v=${version}`

      let icon = document.getElementById(FAVICON_ID) as HTMLLinkElement | null
      let apple = document.getElementById(APPLE_ID) as HTMLLinkElement | null

      if (!icon) {
        icon = document.createElement("link")
        icon.id = FAVICON_ID
        icon.rel = "icon"
        icon.sizes = "32x32"
        icon.type = "image/png"
        document.head.appendChild(icon)
      }

      if (!apple) {
        apple = document.createElement("link")
        apple.id = APPLE_ID
        apple.rel = "apple-touch-icon"
        document.head.appendChild(apple)
      }

      icon.href = href
      apple.href = href
    }

    updateFavicon()

    window.addEventListener("storage-update", updateFavicon)

    window.addEventListener("storage", (e) => {
      if (e.key === "site-builder-config-v3") {
        updateFavicon()
      }
    })

    return () => {
      window.removeEventListener("storage-update", updateFavicon)
    }
  }, [])

  return null
}
