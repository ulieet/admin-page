"use client"

import { useEffect } from "react"
import { cargarConfiguracion } from "@/lib/blocks-storage"

export default function DynamicFavicon() {
  useEffect(() => {
    const updateFavicon = () => {
      if (typeof window === "undefined") return

      const config = cargarConfiguracion()
      const logoUrl = config?.header?.datos?.logoImagen

      if (!logoUrl) return

      try {
        // 1. Eliminar CUALQUIER etiqueta de icono previa para evitar conflictos
        const existingIcons = document.querySelectorAll("link[rel*='icon']")
        existingIcons.forEach(icon => icon.parentNode?.removeChild(icon))

        // 2. Crear el nuevo tag link
        const link = document.createElement("link")
        link.rel = "icon"
        
        // 3. FORZAR REFRESCO DE CACHÉ con un timestamp único
        const version = Date.now()
        const separator = logoUrl.includes('?') ? '&' : '?'
        link.href = `${logoUrl}${separator}v=${version}`

        // 4. Asignar tipo de contenido según la extensión
        if (logoUrl.toLowerCase().endsWith(".svg")) {
          link.type = "image/svg+xml"
        } else if (logoUrl.toLowerCase().endsWith(".png")) {
          link.type = "image/png"
        } else {
          link.type = "image/x-icon"
        }

        // 5. Inyectar en el head
        document.head.appendChild(link)

      } catch (error) {
        console.error("Error al actualizar DynamicFavicon:", error)
      }
    }

    // Ejecución inicial
    updateFavicon()

    // Escuchar el evento manual de storage-update (misma pestaña)
    window.addEventListener("storage-update", updateFavicon)
    
    // Escuchar el evento nativo storage (otras pestañas)
    window.addEventListener("storage", (e) => {
      if (e.key === "site-builder-config-v3") updateFavicon()
    })

    return () => {
      window.removeEventListener("storage-update", updateFavicon)
    }
  }, [])

  return null
}