"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import type { HeroBlock, BlockVariant, StyleConfig } from "@/lib/types/blocks"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react"
import { Geist } from "next/font/google"

const geistFont = Geist({ subsets: ["latin"] })

interface HeroProps {
  data: HeroBlock["datos"] & { 
    soloSlider?: boolean; 
    mostrarIndicadores?: boolean;
    alineacion?: "left" | "center" | "right"; 
  }
  variant?: BlockVariant
  estilos?: StyleConfig | null
}

export function BloqueHero({ data, variant = "default", estilos }: HeroProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const imagenes = data.imagenes || []
  const hasMultipleImages = imagenes.length > 1
  const showDots = data.mostrarIndicadores !== false
  const showContent = !data.soloSlider
  const alineacion = data.alineacion || "center"

  const nextImage = useCallback(() => {
    if (imagenes.length === 0) return
    setDirection(1)
    setCurrentImageIndex((prev) => (prev + 1) % imagenes.length)
  }, [imagenes.length])

  const prevImage = useCallback(() => {
    if (imagenes.length === 0) return
    setDirection(-1)
    setCurrentImageIndex((prev) => (prev - 1 + imagenes.length) % imagenes.length)
  }, [imagenes.length])

  const goToImage = useCallback((index: number) => {
    setDirection(index > currentImageIndex ? 1 : -1)
    setCurrentImageIndex(index)
  }, [currentImageIndex])

  useEffect(() => {
    if (isPaused || imagenes.length <= 1) return
    const interval = setInterval(nextImage, 5000)
    return () => clearInterval(interval)
  }, [isPaused, nextImage, imagenes.length])

  const slideVariants = {
    enter: (direction: number) => ({ x: direction > 0 ? 1000 : -1000, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (direction: number) => ({ x: direction < 0 ? 1000 : -1000, opacity: 0 }),
  }

  const primaryColor = "var(--color-primario)"
  const bgColor = "var(--color-fondo)"
  const textColor = "var(--color-texto)"

  const tituloSize = estilos?.tipografia.tamanoTitulo || "48px"
  const subtituloSize = estilos?.tipografia.tamanoSubtitulo || "20px"
  const currentImage = imagenes[currentImageIndex] || imagenes[0] || ""

  const Indicators = () => {
    if (!hasMultipleImages || !showDots) return null
    return (
      <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 gap-3 p-2 rounded-full bg-black/10 backdrop-blur-[2px]">
        {imagenes.map((_, index) => (
          <button key={index} onClick={() => goToImage(index)} className={`rounded-full transition-all duration-300 border border-white/20 ${index === currentImageIndex ? "w-3 h-3 bg-white scale-110 shadow-sm" : "w-3 h-3 bg-white/40 hover:bg-white/60"}`} />
        ))}
      </div>
    )
  }

  const getAlignmentClasses = (isFlex = false) => {
    if (alineacion === "left") return isFlex ? "items-start text-left" : "text-left"
    if (alineacion === "right") return isFlex ? "items-end text-right" : "text-right"
    return isFlex ? "items-center text-center" : "text-center" 
  }

  const getContainerJustify = () => {
    if (alineacion === "left") return "justify-start md:pl-20" 
    if (alineacion === "right") return "justify-end md:pr-20"
    return "justify-center"
  }

  if (variant === "modern" && showContent) {
    return (
      <section className="py-20 px-4" style={{ backgroundColor: bgColor }}>
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className={`space-y-6 flex flex-col ${getAlignmentClasses(true)}`}>
              <h1 className="font-bold text-balance" style={{ fontSize: tituloSize, color: textColor }}>{data.titulo}</h1>
              <p className="text-balance opacity-80" style={{ fontSize: subtituloSize, color: textColor }}>{data.subtitulo}</p>
              <div className="flex gap-4">
                {data.botonPrimarioTexto && <Button size="lg" asChild style={{ backgroundColor: primaryColor }}><a href={data.botonPrimarioUrl}>{data.botonPrimarioTexto}</a></Button>}
                {data.botonSecundarioTexto && <Button size="lg" variant="outline" asChild style={{ borderColor: primaryColor, color: primaryColor }}><a href={data.botonSecundarioUrl}>{data.botonSecundarioTexto}</a></Button>}
              </div>
            </div>
            <div className="relative h-128 rounded-2xl overflow-hidden shadow-2xl" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
              <AnimatePresence initial={false} custom={direction}>
                <motion.div key={currentImageIndex} custom={direction} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ x: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.2 } }} className="absolute w-full h-full">
                  <Image src={currentImage || "/placeholder.svg"} alt={data.titulo || "Hero"} fill className="object-cover" priority={currentImageIndex === 0} />
                </motion.div>
              </AnimatePresence>
              {hasMultipleImages && (
                <>
                   <button onClick={prevImage} className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-black/20 hover:bg-black/40 text-white p-1 rounded-full"><ChevronLeft/></button>
                   <button onClick={nextImage} className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-black/20 hover:bg-black/40 text-white p-1 rounded-full"><ChevronRight/></button>
                   <Indicators />
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (variant === "minimal" && showContent) {
    return (
      <section className="relative py-32 px-4" style={{ background: `linear-gradient(135deg, ${primaryColor}15, var(--color-fondo), transparent)` }}>
        <div className="container mx-auto max-w-5xl text-center">
          <h1 className="font-bold mb-8 text-balance" style={{ fontSize: `calc(${tituloSize} * 1.2)`, color: primaryColor }}>{data.titulo}</h1>
          <p className="mb-12 text-balance opacity-80" style={{ fontSize: `calc(${subtituloSize} * 1.3)`, color: textColor }}>{data.subtitulo}</p>
          <div className="flex gap-4 justify-center">
            {data.botonPrimarioTexto && <Button size="lg" asChild className="text-lg px-8 py-6" style={{ backgroundColor: primaryColor }}><a href={data.botonPrimarioUrl}>{data.botonPrimarioTexto}</a></Button>}
            {data.botonSecundarioTexto && <Button size="lg" variant="outline" asChild className="text-lg px-8 py-6 bg-transparent" style={{ borderColor: primaryColor, color: primaryColor }}><a href={data.botonSecundarioUrl}>{data.botonSecundarioTexto}</a></Button>}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section 
      className={`relative h-96 md:h-128 w-full flex items-center overflow-hidden ${geistFont.className} ${getContainerJustify()}`} 
      onMouseEnter={() => setIsPaused(true)} 
      onMouseLeave={() => setIsPaused(false)}
    >
      <AnimatePresence initial={false} custom={direction}>
        <motion.div 
            key={currentImageIndex} 
            custom={direction} 
            variants={slideVariants} 
            initial="enter" 
            animate="center" 
            exit="exit" 
            transition={{ x: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.2 } }} 
            className="absolute w-full h-full"
        >
          <Image 
            src={currentImage || "/placeholder.svg"} 
            alt={data.titulo || "Hero"} 
            fill 
            className="object-cover" 
            priority={currentImageIndex === 0} 
          />
          {showContent && <div className="absolute inset-0 bg-black/40" />}
        </motion.div>
      </AnimatePresence>

      {hasMultipleImages && (
        <>
          <button onClick={prevImage} className="absolute left-4 top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/30 text-white hover:bg-black/50 transition-colors"><ChevronLeft className="h-5 w-5" /></button>
          <button onClick={nextImage} className="absolute right-4 top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/30 text-white hover:bg-black/50 transition-colors"><ChevronRight className="h-5 w-5" /></button>
        </>
      )}

      <Indicators />

      {showContent && (
        <div className="relative z-10 container mx-auto px-6 h-full flex items-center w-full">
            
            <div className={`w-full max-w-3xl text-white flex flex-col ${getAlignmentClasses(true)} ${alineacion === "center" ? "mx-auto" : ""} ${alineacion === "right" ? "ml-auto" : ""}`}>
                <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                    {data.titulo}
                </h1>
                <p className="text-lg md:text-xl mb-8 text-gray-100">
                    {data.subtitulo}
                </p>
                <div className={`flex flex-col sm:flex-row gap-4 ${alineacion === "center" ? "justify-center" : alineacion === "right" ? "justify-end" : "justify-start"}`}>
                    {data.botonPrimarioTexto && (
                        <Link href={data.botonPrimarioUrl || "#"}>
                            <button 
                                className="px-8 py-3 text-white font-medium rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2 justify-center w-full sm:w-auto"
                                style={{ backgroundColor: primaryColor }}
                            >
                                {data.botonPrimarioTexto}
                                <ArrowRight className="h-4 w-4" />
                            </button>
                        </Link>
                    )}
                    {data.botonSecundarioTexto && (
                        <Link href={data.botonSecundarioUrl || "#"}>
                            <button className="px-8 py-3 border-2 border-white text-white font-medium rounded-lg hover:bg-white/10 transition-colors w-full sm:w-auto">
                                {data.botonSecundarioTexto}
                            </button>
                        </Link>
                    )}
                </div>
            </div>
        </div>
      )}
    </section>
  )
}