"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import type { StyleConfig } from "@/lib/types/blocks"
import { Menu } from "lucide-react"

// --- COMPONENTE INTERNO PARA ENLACES CON HOVER DINÁMICO ---
const NavItem = ({ 
  href, 
  children, 
  baseColor, 
  hoverColor, 
  className,
  onClick 
}: { 
  href: string
  children: React.ReactNode
  baseColor: string
  hoverColor: string
  className?: string
  onClick?: () => void
}) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Link
      href={href}
      onClick={onClick}
      className={className}
      style={{ 
        color: isHovered ? hoverColor : baseColor,
        transition: "color 0.2s ease-in-out" 
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
    </Link>
  )
}

interface BloqueHeaderProps {
  data: any
  variant?: string
  estilos?: StyleConfig | null
}

export function BloqueHeader({ data, variant = "default", estilos }: BloqueHeaderProps) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Datos por defecto
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
  const alineacion = data.alineacion || "derecha" // izquierda, centro, derecha

  // Colores dinámicos
  const primaryColor = estilos?.colores?.primario || "#3b82f6"
  const userBgColor = estilos?.colores?.fondo || "#ffffff"
  const userTextColor = estilos?.colores?.texto || "#0f172a"
  
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const isTransparentState = esTransparente && !scrolled

  const headerClass = cn(
    "fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full shadow-sm",
    isTransparentState ? "py-6 shadow-none" : "py-4"
  )

  const containerStyle = {
    backgroundColor: isTransparentState ? "transparent" : userBgColor,
    color: userTextColor,
    // ✅ CORREGIDO: Eliminamos el fontSize forzado aquí, confiando en la corrección de globals.css
  }

  const renderLogo = () => (
    <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight hover:opacity-80 transition-opacity shrink-0">
      {logoImagen ? (
        <img src={logoImagen} alt={nombreEmpresa} className="h-10 w-auto object-contain" />
      ) : (
        <span style={{ color: userTextColor }}>{nombreEmpresa}</span>
      )}
    </Link>
  )

  // ==========================================
  // VARIANTE CENTERED (EDITORIAL)
  // ==========================================
  if (variant === "centered") {
    return (
      <header className={headerClass} style={containerStyle}>
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center gap-4 md:gap-6">
            
            <div className="w-full flex justify-between md:justify-center items-center relative">
              <div className="md:hidden">
                 <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} style={{ color: userTextColor }}>
                    <Menu className="w-6 h-6" />
                 </Button>
              </div>
              
              {renderLogo()}
              
              <div className="w-10 md:hidden" />
            </div>

            <div className="hidden md:grid grid-cols-[1fr_auto_1fr] items-center w-full">
              
              <div />

              <nav className="flex items-center gap-8 justify-self-center">
                {navegacion.map((item: any, idx: number) => (
                  <NavItem 
                    key={idx} 
                    href={item.url}
                    baseColor={userTextColor}
                    hoverColor={primaryColor}
                    className="font-medium" 
                  >
                    {item.nombre}
                  </NavItem>
                ))}
              </nav>

              <div className="justify-self-end">
                {botonTexto && (
                   <Button asChild size="sm" style={{ backgroundColor: primaryColor, color: "#ffffff" }}>
                      <Link href={botonUrl}>{botonTexto}</Link>
                   </Button>
                )}
              </div>
            </div>

          </div>
        </div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 border-t pt-4 space-y-3 px-4 pb-4 bg-inherit">
             {navegacion.map((item: any, idx: number) => (
                <NavItem 
                  key={idx} 
                  href={item.url} 
                  baseColor={userTextColor}
                  hoverColor={primaryColor}
                  className="block py-2 font-medium"
                >
                  {item.nombre}
                </NavItem>
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

  // ==========================================
  // VARIANTE STANDARD / MODERN (Lógica Normal)
  // ==========================================
  const isCentered = alineacion === "centro"

  return (
    <header className={headerClass} style={containerStyle}>
      <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
        
        <div className={cn("flex items-center shrink-0", isCentered && "flex-1")}>
            {renderLogo()}
        </div>

        {/* NAVEGACIÓN */}
        <nav className={cn(
            "hidden md:flex items-center gap-8",
            isCentered 
                ? "mx-auto" 
                : (alineacion === "izquierda" ? "ml-10 mr-auto" : "ml-auto mr-8")
        )}>
            {navegacion.map((item: any, idx: number) => (
                <NavItem 
                    key={idx} 
                    href={item.url} 
                    baseColor={userTextColor}
                    hoverColor={primaryColor}
                    className={cn(
                        "font-medium whitespace-nowrap", 
                        variant === "modern" && "px-4 py-2 rounded-full hover:bg-slate-100/50"
                    )}
                >
                    {item.nombre}
                </NavItem>
            ))}
        </nav>

        {/* BOTÓN Y MENU */}
        <div className={cn(
            "flex items-center gap-4 shrink-0", 
            isCentered ? "flex-1 justify-end" : "ml-0"
        )}>
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

      {/* MENÚ MÓVIL */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 border-t shadow-lg p-4 flex flex-col gap-4" style={{ backgroundColor: userBgColor }}>
            {navegacion.map((item: any, idx: number) => (
                <NavItem 
                  key={idx} 
                  href={item.url} 
                  baseColor={userTextColor}
                  hoverColor={primaryColor}
                  className="font-medium py-2 border-b last:border-0"
                >
                  {item.nombre}
                </NavItem>
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