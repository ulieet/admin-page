"use client"

import { useEffect } from "react"
import { cargarConfiguracion } from "@/lib/blocks-storage"

export default function DynamicFontLoader() {
  useEffect(() => {
    const config = cargarConfiguracion()
    const fuente = config.estilos?.tipografia?.fuente

    if (!fuente || fuente === "Inter") return

    // Evitamos duplicados
    if (document.getElementById("dynamic-font-loader")) return

    const link = document.createElement("link")
    link.id = "dynamic-font-loader"
    link.rel = "stylesheet"
    // Truco: Pedimos la fuente a Google Fonts dinámicamente
    link.href = `https://fonts.googleapis.com/css2?family=${fuente.replace(/ /g, "+")}:wght@300;400;600;700&display=swap`
    
    document.head.appendChild(link)
  }, [])

  return null
}