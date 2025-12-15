"use client"

import Image from "next/image"
import { motion } from "framer-motion"

interface ClientsData {
  titulo?: string
  subtitulo?: string
  empresas: Array<{
    nombre: string
    logo: string
  }>
}

export function BloqueLogoMarquee({ data }: { data: ClientsData }) {
  if (!data.empresas || data.empresas.length === 0) return null

  // Duplicamos los elementos para el efecto infinito
  const logos = data.empresas.length < 6
    ? [...data.empresas, ...data.empresas, ...data.empresas, ...data.empresas]
    : [...data.empresas, ...data.empresas]

  return (
    <section className="py-16 bg-background overflow-hidden border-y">
      <div className="container mx-auto px-4 mb-10 text-center">
        {(data.titulo) && (
          <h2 className="text-3xl font-bold mb-3">{data.titulo}</h2>
        )}
        {(data.subtitulo) && (
          <p className="text-muted-foreground text-lg">{data.subtitulo}</p>
        )}
      </div>

      <div className="relative w-full overflow-hidden">
        {/* Sombras laterales más anchas para que el fade sea más suave con logos grandes */}
        <div className="absolute left-0 top-0 z-10 h-full w-32 bg-gradient-to-r from-background to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 z-10 h-full w-32 bg-gradient-to-l from-background to-transparent pointer-events-none" />

        <div className="flex">
          <motion.div
            className="flex flex-nowrap items-center gap-20 pr-20" // Aumenté el gap para dar más aire
            animate={{
              x: ["0%", "-50%"],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 40,
                ease: "linear",
              },
            }}
          >
            {logos.map((empresa, index) => (
              <div
                key={index}
                // CAMBIO AQUÍ: Aumenté h-12 w-32 a h-24 w-52
                className="relative h-24 w-52 flex-shrink-0 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100"
              >
                {empresa.logo ? (
                  <Image
                    src={empresa.logo}
                    alt={empresa.nombre}
                    fill
                    className="object-contain"
                  />
                ) : (
                  <span className="text-2xl font-bold text-muted-foreground whitespace-nowrap">
                    {empresa.nombre}
                  </span>
                )}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}