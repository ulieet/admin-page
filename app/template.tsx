"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation" // Importamos pathname
import { cargarConfiguracion } from "@/lib/blocks-storage"

const variants = {
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.4, ease: "easeOut" }
  },
  slide: {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: "easeOut" }
  },
  scale: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.4, ease: "easeOut" }
  }
}

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() // Detectamos cambio de ruta
  const [animType, setAnimType] = useState<string>("none")
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    // 1. Leemos la configuración fresca
    const config = cargarConfiguracion()
    const tipo = config?.tipoAnimacion || "none"
    
    // Debug: Puedes ver esto en la consola del navegador (F12)
    console.log(`[Template] Ruta: ${pathname} | Animación: ${tipo}`)
    
    setAnimType(tipo)
    setIsMounted(true)
  }, [pathname]) // Se ejecuta cada vez que cambia la ruta

  // Evitamos flash de contenido
  if (!isMounted) {
    return <>{children}</>
  }

  // SI ES "NONE", DEVOLVEMOS EL CONTENIDO PURO (SIN MOTION)
  if (animType === "none") {
    return <div key={pathname}>{children}</div>
  }

  // SI TIENE ANIMACIÓN
  const selectedVariant = variants[animType as keyof typeof variants] || variants.fade

  return (
    <motion.div
      key={pathname} // Forzamos a React a destruir y recrear el componente
      initial={selectedVariant.initial}
      animate={selectedVariant.animate}
      transition={selectedVariant.transition}
      className="w-full"
    >
      {children}
    </motion.div>
  )
}