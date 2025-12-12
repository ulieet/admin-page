"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import type { HeaderBlock, StyleConfig } from "@/lib/types/blocks"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface HeaderProps {
  data: HeaderBlock["datos"]
  estilos?: StyleConfig | null
}

export function BloqueHeader({ data, estilos }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Valores de estilo con fallback
  const primaryColor = estilos?.colores.primario || "#1e40af"
  const textColor = estilos?.colores.texto || "#1f2937"
  const bgColor = estilos?.colores.fondo || "#ffffff"
  
  // Lógica de alineación
  // izquierda: Logo | Nav...... | Boton
  // centro: Logo | ...Nav... | Boton
  // derecha: Logo | ......Nav | Boton
  const alineacion = data.alineacion || "derecha"
  
  const navClasses = cn(
    "hidden md:flex items-center gap-8 flex-1",
    alineacion === "izquierda" && "justify-start pl-10",
    alineacion === "centro" && "justify-center",
    alineacion === "derecha" && "justify-end pr-10"
  )

  // Lógica de transparencia
  // Si es transparente: absoluto (flota sobre el contenido), fondo transparente, hover sólido
  const esTransparente = data.transparente
  
  return (
    <header 
      className={cn(
        "w-full z-50 transition-all duration-300 group",
        esTransparente ? "absolute top-0 border-b-0" : "sticky top-0 border-b border-neutral-200"
      )}
      style={{
        // Si es transparente, el fondo inicial es transparente, si no, usa el del tema
        backgroundColor: esTransparente ? "transparent" : bgColor,
      }}
    >
      {/* Fondo sólido que aparece al hacer hover si es transparente */}
      <div 
        className={cn(
          "absolute inset-0 -z-10 transition-opacity duration-300 pointer-events-none",
          esTransparente ? "opacity-0 group-hover:opacity-100" : "opacity-100"
        )}
        style={{ backgroundColor: bgColor, borderBottom: `1px solid ${estilos?.colores.texto}1A` }}
      />

      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 relative">
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2 flex-shrink-0 z-10">
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
              className="flex h-10 w-10 items-center justify-center rounded-lg font-bold text-white shadow-sm"
              style={{ backgroundColor: primaryColor }}
            >
              {data.logoTexto || "LOGO"}
            </div>
          )}
          <span 
            className="text-xl font-bold transition-colors" 
            style={{ color: esTransparente ? undefined : textColor }} // Si es transparente, hereda o usa blanco? Por simplicidad usamos textColor siempre visible
          >
            {data.nombreEmpresa}
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className={navClasses}>
          {data.navegacion.map((item) => (
            <Link
              key={item.nombre}
              href={item.url}
              className={cn(
                "text-sm font-medium transition-colors hover:opacity-100 opacity-80",
                // Si es transparente y NO estamos en hover, podríamos forzar texto blanco/oscuro, 
                // pero asumiremos que el usuario gestiona el contraste con el fondo del Hero.
                // Aquí agregamos un sutil efecto de hover.
              )}
              style={{ color: textColor }}
            >
              {item.nombre}
            </Link>
          ))}
        </div>

        {/* CTA Button */}
        <div className="hidden md:flex items-center gap-4 flex-shrink-0 z-10">
          <Link
            href={data.botonUrl}
            className="px-4 py-2 text-sm font-medium text-white rounded-lg hover:brightness-110 transition-all shadow-sm"
            style={{ backgroundColor: primaryColor }}
          >
            {data.botonTexto}
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden z-10 p-1 rounded-md hover:bg-black/5" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{ color: textColor }}
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div 
          className="md:hidden border-t absolute w-full left-0 bg-white shadow-lg animate-in slide-in-from-top-5"
          style={{ 
            backgroundColor: bgColor,
            borderColor: `${textColor}1A`
           }}
        >
          <div className="px-6 py-4 space-y-4">
            {data.navegacion.map((item) => (
              <Link
                key={item.nombre}
                href={item.url}
                className="block text-sm font-medium py-2"
                style={{ color: textColor }}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.nombre}
              </Link>
            ))}
            <Link
              href={data.botonUrl}
              className="block w-full text-center px-4 py-3 text-sm font-medium text-white rounded-lg mt-4"
              style={{ backgroundColor: primaryColor }}
              onClick={() => setMobileMenuOpen(false)}
            >
              {data.botonTexto}
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}