"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import type { HeroBlock, BlockVariant, StyleConfig } from "@/lib/types/blocks"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface HeroProps {
  data: HeroBlock["datos"]
  variant?: BlockVariant
  estilos?: StyleConfig | null
}

export function BloqueHero({ data, variant = "default", estilos }: HeroProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const imagenes = data.imagenes || []
  const hasMultipleImages = imagenes.length > 1

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

  const goToImage = useCallback(
    (index: number) => {
      setDirection(index > currentImageIndex ? 1 : -1)
      setCurrentImageIndex(index)
    },
    [currentImageIndex],
  )

  useEffect(() => {
    if (isPaused || imagenes.length <= 1) return
    const interval = setInterval(nextImage, 5000)
    return () => clearInterval(interval)
  }, [isPaused, nextImage, imagenes.length])

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  }

  const primaryColor = estilos?.colores.primario || "#1e40af"
  const accentColor = estilos?.colores.acento || "#3b82f6"
  const textColor = estilos?.colores.texto || "#1f2937"
  const tituloSize = estilos?.tipografia.tamanoTitulo || "48px"
  const subtituloSize = estilos?.tipografia.tamanoSubtitulo || "20px"

  const currentImage = imagenes[currentImageIndex] || imagenes[0] || ""

  if (variant === "modern") {
    return (
      <section className="py-20 px-4 bg-background">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="font-bold text-balance" style={{ fontSize: tituloSize, color: textColor }}>
                {data.titulo}
              </h1>
              <p className="text-balance" style={{ fontSize: subtituloSize, color: `${textColor}CC` }}>
                {data.subtitulo}
              </p>
              <div className="flex gap-4">
                {data.botonPrimarioTexto && data.botonPrimarioUrl && (
                  <Button size="lg" asChild style={{ backgroundColor: primaryColor }}>
                    <a href={data.botonPrimarioUrl}>{data.botonPrimarioTexto}</a>
                  </Button>
                )}
                {data.botonSecundarioTexto && data.botonSecundarioUrl && (
                  <Button
                    size="lg"
                    variant="outline"
                    asChild
                    style={{ borderColor: primaryColor, color: primaryColor }}
                  >
                    <a href={data.botonSecundarioUrl}>{data.botonSecundarioTexto}</a>
                  </Button>
                )}
              </div>
            </div>
            <div
              className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl"
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
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 },
                  }}
                  className="absolute w-full h-full"
                >
                  <Image
                    src={currentImage || "/placeholder.svg"}
                    alt={data.titulo}
                    fill
                    className="object-cover"
                    priority={currentImageIndex === 0}
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </motion.div>
              </AnimatePresence>

              {hasMultipleImages && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-all hover:scale-110 backdrop-blur-sm border border-white/20"
                    aria-label="Imagen anterior"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-all hover:scale-110 backdrop-blur-sm border border-white/20"
                    aria-label="Siguiente imagen"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2">
                    {imagenes.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => goToImage(idx)}
                        className={`rounded-full transition-all ${
                          idx === currentImageIndex ? "w-8 h-2 bg-white" : "w-2 h-2 bg-white/60 hover:bg-white/80"
                        }`}
                        aria-label={`Ir a imagen ${idx + 1}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (variant === "minimal") {
    return (
      <section
        className="relative py-32 px-4"
        style={{ background: `linear-gradient(135deg, ${primaryColor}15, ${accentColor}10, transparent)` }}
      >
        <div className="container mx-auto max-w-5xl text-center">
          <h1
            className="font-bold mb-8 text-balance"
            style={{
              fontSize: `calc(${tituloSize} * 1.2)`,
              background: `linear-gradient(to right, ${primaryColor}, ${accentColor})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {data.titulo}
          </h1>
          <p
            className="mb-12 text-balance"
            style={{ fontSize: `calc(${subtituloSize} * 1.3)`, color: `${textColor}DD` }}
          >
            {data.subtitulo}
          </p>
          <div className="flex gap-4 justify-center">
            {data.botonPrimarioTexto && data.botonPrimarioUrl && (
              <Button size="lg" asChild className="text-lg px-8 py-6" style={{ backgroundColor: primaryColor }}>
                <a href={data.botonPrimarioUrl}>{data.botonPrimarioTexto}</a>
              </Button>
            )}
            {data.botonSecundarioTexto && data.botonSecundarioUrl && (
              <Button
                size="lg"
                variant="outline"
                asChild
                className="text-lg px-8 py-6 bg-transparent"
                style={{ borderColor: primaryColor, color: primaryColor }}
              >
                <a href={data.botonSecundarioUrl}>{data.botonSecundarioTexto}</a>
              </Button>
            )}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section
      className="relative h-[600px] flex items-center justify-center overflow-hidden"
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
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          className="absolute w-full h-full"
        >
          <Image
            src={currentImage || "/placeholder.svg"}
            alt={data.titulo}
            fill
            className="object-cover"
            priority={currentImageIndex === 0}
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/50" />
        </motion.div>
      </AnimatePresence>

      {hasMultipleImages && (
        <>
          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/30 text-white backdrop-blur-sm transition-all hover:scale-110 hover:bg-black/50 lg:h-12 lg:w-12"
            aria-label="Imagen anterior"
          >
            <ChevronLeft className="h-5 w-5 lg:h-6 lg:w-6" />
          </button>
          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/30 text-white backdrop-blur-sm transition-all hover:scale-110 hover:bg-black/50 lg:h-12 lg:w-12"
            aria-label="Siguiente imagen"
          >
            <ChevronRight className="h-5 w-5 lg:h-6 lg:w-6" />
          </button>
        </>
      )}

      {hasMultipleImages && (
        <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2">
          {imagenes.map((_, index) => (
            <button
              key={index}
              onClick={() => goToImage(index)}
              className={`rounded-full transition-all ${
                index === currentImageIndex ? "w-8 h-2 bg-white" : "w-2 h-2 bg-white/60 hover:bg-white/80"
              }`}
              aria-label={`Ir a imagen ${index + 1}`}
            />
          ))}
        </div>
      )}

      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <h1 className="font-bold mb-6 text-balance" style={{ fontSize: tituloSize }}>
          {data.titulo}
        </h1>
        <p className="mb-8 text-balance max-w-2xl mx-auto" style={{ fontSize: subtituloSize }}>
          {data.subtitulo}
        </p>
        <div className="flex gap-4 justify-center">
          {data.botonPrimarioTexto && data.botonPrimarioUrl && (
            <Button size="lg" asChild style={{ backgroundColor: primaryColor }}>
              <a href={data.botonPrimarioUrl}>{data.botonPrimarioTexto}</a>
            </Button>
          )}
          {data.botonSecundarioTexto && data.botonSecundarioUrl && (
            <Button
              size="lg"
              variant="outline"
              asChild
              className="bg-white/10 hover:bg-white/20 text-white border-white"
            >
              <a href={data.botonSecundarioUrl}>{data.botonSecundarioTexto}</a>
            </Button>
          )}
        </div>
      </div>
    </section>
  )
}
