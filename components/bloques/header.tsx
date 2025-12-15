"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import type { StyleConfig } from "@/lib/types/blocks"
import { Menu } from "lucide-react"

interface BloqueHeaderProps {
  data: any
  variant?: string
  estilos?: StyleConfig | null
}

export function BloqueHeader({ data, variant = "default", estilos }: BloqueHeaderProps) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Datos por defecto para evitar errores
  const nombreEmpresa = data.nombreEmpresa || "Mi Empresa"
  const logoImagen = data.logoImagen
  const navegacion = data.navegacion || [
    { nombre: "Inicio", url: "/" },
    { nombre: "Servicios", url: "#servicios" },
    { nombre: "Contacto", url: "#contacto" },
  ]
  const botonTexto = data.botonTexto
  const botonUrl = data.botonUrl || "#"
  const esTransparente = data.transparente || false
  const alineacion = data.alineacion || "derecha" // "izquierda", "centro", "derecha"

  const primaryColor = estilos?.colores?.primario || "#3b82f6"
  const userBgColor = estilos?.colores?.fondo || "#ffffff"
  const userTextColor = estilos?.colores?.texto || "#0f172a"

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const isTransparentState = esTransparente && !scrolled

  // Clase base del contenedor principal
  const headerClass = cn(
    "fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full shadow-sm",
    isTransparentState ? "py-6 shadow-none" : "py-4"
  )

  const containerStyle = {
    backgroundColor: isTransparentState ? "transparent" : userBgColor,
    color: userTextColor,
  }

  const renderLogo = () => (
    <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight hover:opacity-80 transition-opacity shrink-0">
      {logoImagen ? <img src={logoImagen} alt={nombreEmpresa} className="h-10 w-auto object-contain" /> : <span>{nombreEmpresa}</span>}
    </Link>
  )

  // ==========================================
  // VARIANTE CENTERED (EDITORIAL / STACKED)
  // Diseño vertical: Logo arriba, Menú abajo.
  // ==========================================
  if (variant === "centered") {
    return (
      <header className={headerClass} style={containerStyle}>
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center gap-4 md:gap-6">
            
            {/* Fila 1: Logo y Toggle Mobile */}
            <div className="w-full flex justify-between md:justify-center items-center relative">
              <div className="md:hidden">
                 <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} style={{ color: userTextColor }}>
                    <Menu className="w-6 h-6" />
                 </Button>
              </div>
              
              {renderLogo()}
              
              {/* Espaciador invisible para equilibrar el toggle en mobile */}
              <div className="w-10 md:hidden" />
            </div>

            {/* Fila 2: Navegación y Botón (Desktop) */}
            <div className="hidden md:flex items-center gap-8">
              <nav className="flex items-center gap-6">
                {navegacion.map((item: any, idx: number) => (
                  <Link 
                    key={idx} 
                    href={item.url} 
                    className="text-sm font-medium hover:text-[var(--color-primario)] transition-colors"
                    style={{ color: userTextColor }}
                  >
                    {item.nombre}
                  </Link>
                ))}
              </nav>
              
              {botonTexto && (
                 <Button asChild size="sm" style={{ backgroundColor: primaryColor, color: "#ffffff" }}>
                    <Link href={botonUrl}>{botonTexto}</Link>
                 </Button>
              )}
            </div>
          </div>
        </div>
        
        {/* Mobile Menu Overlay */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 border-t pt-4 space-y-3 px-4 pb-4 bg-inherit">
             {navegacion.map((item: any, idx: number) => (
                <Link key={idx} href={item.url} className="block py-2 font-medium" style={{ color: userTextColor }}>{item.nombre}</Link>
             ))}
          </div>
        )}
      </header>
    )
  }

  // ==========================================
  // VARIANTE STANDARD / MODERN (ROW LAYOUT)
  // Aquí es donde simplificamos la lógica de alineación
  // ==========================================

  // Definir clases de margen según alineación
  let navContainerClass = "hidden md:flex items-center gap-8"
  
  if (alineacion === "izquierda") {
    // Pegado al logo (margin-left fijo) y empuja al botón (margin-right auto)
    navContainerClass += " ml-10 mr-auto"
  } else if (alineacion === "centro") {
    // Centrado absoluto en el espacio disponible
    navContainerClass += " mx-auto"
  } else {
    // (Por defecto Derecha) Empuja desde el logo (margin-left auto)
    navContainerClass += " ml-auto"
  }

  return (
    <header className={headerClass} style={containerStyle}>
      {/* IMPORTANTE: 'gap-6'. Esto asegura que NUNCA se toquen.
         Si la pantalla se achica, el flexbox respetará este espacio mínimo.
      */}
      <div className="container mx-auto px-4 md:px-8 flex items-center gap-6">
        
        {/* 1. LOGO */}
        {renderLogo()}

        {/* 2. NAVEGACIÓN */}
        <nav className={navContainerClass}>
            {navegacion.map((item: any, idx: number) => (
                <Link 
                    key={idx} 
                    href={item.url} 
                    className={cn(
                        "text-sm font-medium transition-all whitespace-nowrap", // whitespace-nowrap evita que los textos se rompan en 2 líneas
                        variant === "modern" 
                           ? "px-4 py-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800" 
                           : "hover:text-blue-600" 
                    )}
                    style={{ 
                      color: userTextColor,
                      // Si es modern, aplicamos color primario en hover via estilo inline si es necesario, 
                      // pero clases de tailwind suelen ser mejores para hovers complejos.
                    }}
                >
                    {item.nombre}
                </Link>
            ))}
        </nav>

        {/* 3. ACCIONES (Botón + Mobile) */}
        {/* shrink-0 evita que el botón se aplaste */}
        <div className="flex items-center gap-4 shrink-0 ml-auto md:ml-0">
            {botonTexto && (
                <Button 
                    asChild 
                    className="hidden md:inline-flex"
                    style={{ backgroundColor: primaryColor, color: "#ffffff" }}
                >
                    <Link href={botonUrl}>{botonTexto}</Link>
                </Button>
            )}
            
            <div className="md:hidden">
                <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} style={{ color: userTextColor }}>
                    <Menu className="w-6 h-6" />
                </Button>
            </div>
        </div>

      </div>

      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 border-t shadow-lg p-4 flex flex-col gap-4" style={{ backgroundColor: userBgColor }}>
            {navegacion.map((item: any, idx: number) => (
                <Link key={idx} href={item.url} className="text-base font-medium py-2 border-b last:border-0" style={{ color: userTextColor }}>{item.nombre}</Link>
            ))}
            {botonTexto && (
                <Button asChild className="w-full mt-2" style={{ backgroundColor: primaryColor, color: "#ffffff" }}>
                   <Link href={botonUrl}>{botonTexto}</Link>
                </Button>
            )}
        </div>
      )}
    </header>
  )
}