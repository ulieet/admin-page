"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation" 
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
  const pathname = usePathname() 
  const [animType, setAnimType] = useState<string>("none")
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    const config = cargarConfiguracion()
    const tipo = config?.tipoAnimacion || "none"
    
    console.log(`[Template] Ruta: ${pathname} | Animación: ${tipo}`)
    
    setAnimType(tipo)
    setIsMounted(true)
  }, [pathname]) 

  if (!isMounted) {
    return <>{children}</>
  }

  if (animType === "none") {
    return <div key={pathname}>{children}</div>
  }

  const selectedVariant = variants[animType as keyof typeof variants] || variants.fade

  return (
    <motion.div
      key={pathname} 
      initial={selectedVariant.initial}
      animate={selectedVariant.animate}
      transition={selectedVariant.transition}
      className="w-full"
    >
      {children}
    </motion.div>
  )
}