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

  // Duplicamos los elementos para el loop infinito
  const multiplier = data.empresas.length < 5 ? 4 : 2
  const logos = Array(multiplier).fill(data.empresas).flat()

  return (
    // FORZADO: bg-white para que siempre sea blanco limpio
    <section className="py-16 overflow-hidden border-y border-gray-100 bg-white text-slate-800">
      <div className="container mx-auto px-4 mb-10 text-center">
        {data.titulo && (
          <h2 className="text-3xl font-bold mb-3 tracking-tight" style={{ color: "var(--color-primario)" }}>
            {data.titulo}
          </h2>
        )}
        {data.subtitulo && (
          <p className="opacity-70 text-lg leading-relaxed text-slate-600">
            {data.subtitulo}
          </p>
        )}
      </div>

      <div className="relative w-full overflow-hidden">
        {/* Máscaras laterales BLANCAS para que coincidan con el fondo */}
        <div 
            className="absolute left-0 top-0 z-10 h-full w-24 md:w-32 pointer-events-none" 
            style={{ background: "linear-gradient(to right, #ffffff, transparent)" }} 
        />
        <div 
            className="absolute right-0 top-0 z-10 h-full w-24 md:w-32 pointer-events-none" 
            style={{ background: "linear-gradient(to left, #ffffff, transparent)" }} 
        />

        <div className="flex">
          <motion.div
            className="flex flex-nowrap items-center gap-16 md:gap-24 pr-16"
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
                className="relative h-20 w-40 md:h-24 md:w-52 flex-shrink-0 flex items-center justify-center opacity-60 hover:opacity-100 grayscale hover:grayscale-0 transition-all duration-500"
              >
                {empresa.logo ? (
                  <Image
                    src={empresa.logo}
                    alt={empresa.nombre}
                    fill
                    className="object-contain"
                  />
                ) : (
                  <span className="text-xl font-bold opacity-50 whitespace-nowrap text-slate-400">
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