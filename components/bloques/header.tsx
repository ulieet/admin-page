"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import type { HeaderBlock, StyleConfig } from "@/lib/types/blocks"
import Image from "next/image"

interface HeaderProps {
  data: HeaderBlock["datos"]
  estilos?: StyleConfig | null
}

export function BloqueHeader({ data, estilos }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const primaryColor = estilos?.colores.primario || "#1e40af"
  const textColor = estilos?.colores.texto || "#1f2937"

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2">
          {data.logoImagen ? (
            <div className="relative h-10 w-auto">
              <Image
                src={data.logoImagen || "/placeholder.svg"}
                alt={data.nombreEmpresa}
                width={120}
                height={40}
                className="h-10 w-auto object-contain"
              />
            </div>
          ) : (
            <div
              className="flex h-10 w-10 items-center justify-center rounded-lg font-bold text-white"
              style={{ backgroundColor: primaryColor }}
            >
              {data.logoTexto || "LOGO"}
            </div>
          )}
          <span className="text-xl font-bold" style={{ color: textColor }}>
            {data.nombreEmpresa}
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {data.navegacion.map((item) => (
            <Link
              key={item.nombre}
              href={item.url}
              className="text-sm transition-colors"
              style={{ color: `${textColor}B3` }}
            >
              {item.nombre}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-4">
          <button
            className="px-4 py-2 text-sm font-medium text-white rounded-lg hover:opacity-90 transition-opacity"
            style={{ backgroundColor: primaryColor }}
          >
            {data.botonTexto}
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-neutral-200 bg-white">
          <div className="px-6 py-4 space-y-4">
            {data.navegacion.map((item) => (
              <Link
                key={item.nombre}
                href={item.url}
                className="block text-sm transition-colors"
                style={{ color: `${textColor}B3` }}
              >
                {item.nombre}
              </Link>
            ))}
            <button
              className="w-full px-4 py-2 text-sm font-medium text-white rounded-lg"
              style={{ backgroundColor: primaryColor }}
            >
              {data.botonTexto}
            </button>
          </div>
        </div>
      )}
    </header>
  )
}
