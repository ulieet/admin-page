"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import type { StyleConfig } from "@/lib/types/blocks"
import { Menu, X } from "lucide-react"

// --- COMPONENTE INTERNO: ENLACE DE NAVEGACIÓN ---
const NavItem = ({ 
  href, 
  children, 
  baseColor, 
  hoverColor, 
  className,
  variant = "default",
  onClick 
}: { 
  href: string
  children: React.ReactNode
  baseColor: string
  hoverColor: string
  className?: string
  variant?: "default" | "modern" | "centered"
  onClick?: () => void
}) => {
  const [isHovered, setIsHovered] = useState(false)
  const isModern = variant === "modern"
  
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "transition-all duration-200 flex items-center",
        // Moderno: Tipo botón/píldora
        isModern ? "px-5 py-2.5 rounded-full font-medium text-sm" : "text-base font-medium",
        className
      )}
      style={{ 
        color: isHovered ? hoverColor : baseColor,
        // Moderno: Fondo suave al hover
        backgroundColor: isModern && isHovered ? `${hoverColor}15` : "transparent", 
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

  // Datos
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
  
  // Efecto Scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Lógica de transparencia
  const isTransparentState = esTransparente && !scrolled

  // Clases del contenedor principal (Header)
  const headerClass = cn(
    "fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full",
    // Sombra suave al scrollear
    !isTransparentState && "shadow-sm backdrop-blur-md",
    // AJUSTE DE TAMAÑO: Más alto (py-4) para recuperar la presencia del estilo clásico
    isTransparentState ? "py-6" : "py-4 md:py-5", 
    // Variante Editorial puede ser un poco más alta aún
    variant === "centered" && !isTransparentState && "py-5" 
  )

  // Estilos inline para colores (fondo y texto)
  const containerStyle = {
    backgroundColor: isTransparentState ? "transparent" : (variant === "modern" ? `${userBgColor}F5` : userBgColor),
    color: userTextColor,
    borderBottom: (!isTransparentState && variant === "centered") ? "1px solid rgba(0,0,0,0.05)" : "none"
  }

  // Renderizado del Logo (Común)
  const renderLogo = (sizeClass = "h-10 md:h-12") => (
    <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight hover:opacity-80 transition-opacity shrink-0">
      {logoImagen ? (
        <img src={logoImagen} alt={nombreEmpresa} className={cn("w-auto object-contain", sizeClass)} />
      ) : (
        <span style={{ color: userTextColor }}>{nombreEmpresa}</span>
      )}
    </Link>
  )

  // ==========================================
  // ESTILO 3: EDITORIAL (CENTRADO)
  // ==========================================
  if (variant === "centered") {
    return (
      <header className={headerClass} style={containerStyle}>
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center gap-4">
            
            {/* Fila Superior: Mobile Toggle + Logo + Botón */}
            <div className="w-full flex justify-between items-center relative">
              <div className="md:hidden">
                 <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} style={{ color: userTextColor }}>
                    {mobileMenuOpen ? <X /> : <Menu />}
                 </Button>
              </div>
              
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                 {renderLogo("h-12 md:h-14")}
              </div>

              <div className="w-10 md:hidden" />

              <div className="hidden md:block ml-auto">
                {botonTexto && (
                   <Button asChild size="sm" className="rounded-none px-8 uppercase tracking-wider text-xs font-bold h-10" style={{ backgroundColor: primaryColor, color: "#ffffff" }}>
                      <Link href={botonUrl}>{botonTexto}</Link>
                   </Button>
                )}
              </div>
            </div>

            {/* Fila Inferior: Navegación */}
            <div className="hidden md:block w-full border-t border-black/5 pt-4 mt-1">
              <nav className="flex items-center justify-center gap-12">
                {navegacion.map((item: any, idx: number) => (
                  <NavItem 
                    key={idx} 
                    href={item.url}
                    baseColor={userTextColor}
                    hoverColor={primaryColor}
                    className="uppercase text-xs tracking-[0.15em] font-bold"
                    variant="centered"
                  >
                    {item.nombre}
                  </NavItem>
                ))}
              </nav>
            </div>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden fixed inset-0 z-40 bg-white pt-24 px-8 flex flex-col items-center gap-6" style={{ backgroundColor: userBgColor }}>
             {navegacion.map((item: any, idx: number) => (
                <NavItem 
                  key={idx} 
                  href={item.url} 
                  baseColor={userTextColor}
                  hoverColor={primaryColor}
                  className="text-2xl font-light"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.nombre}
                </NavItem>
             ))}
             {botonTexto && (
                 <Button asChild size="lg" className="mt-4 w-full" style={{ backgroundColor: primaryColor, color: "#ffffff" }}>
                    <Link href={botonUrl}>{botonTexto}</Link>
                 </Button>
             )}
          </div>
        )}
      </header>
    )
  }

  // ==========================================
  // ESTILOS 1 & 2: DEFAULT (CLÁSICO) & MODERN (PÍLDORA)
  // ==========================================
  const isModern = variant === "modern"

  return (
    <header className={headerClass} style={containerStyle}>
      <div className="container mx-auto px-4 md:px-8 flex items-center justify-between h-full">
        
        {/* LOGO */}
        <div className="flex items-center shrink-0">
            {renderLogo(isModern ? "h-9 md:h-10" : "h-10 md:h-12")}
        </div>

        {/* NAVEGACIÓN DESKTOP */}
        <nav className={cn(
            "hidden md:flex items-center", 
            isModern ? "gap-2" : "gap-8",
            alineacion === "centro" 
                ? "mx-auto" 
                : (alineacion === "izquierda" ? "ml-10 mr-auto" : "ml-auto mr-8")
        )}>
            {navegacion.map((item: any, idx: number) => (
                <NavItem 
                    key={idx} 
                    href={item.url} 
                    baseColor={userTextColor}
                    hoverColor={primaryColor}
                    variant={isModern ? "modern" : "default"}
                >
                    {item.nombre}
                </NavItem>
            ))}
        </nav>

        {/* BOTÓN Y HAMBURGUESA */}
        <div className={cn(
            "flex items-center gap-4 shrink-0", 
            alineacion === "centro" ? "ml-0" : "ml-0"
        )}>
            {botonTexto && (
                <Button 
                    asChild 
                    className={cn(
                        "hidden md:inline-flex font-semibold shadow-sm",
                        isModern ? "rounded-full px-6 h-10" : "rounded-md h-11 px-6"
                    )}
                    style={{ backgroundColor: primaryColor, color: "#ffffff" }}
                >
                    <Link href={botonUrl}>{botonTexto}</Link>
                </Button>
            )}
            
            <div className="md:hidden">
                <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} style={{ color: userTextColor }}>
                    {mobileMenuOpen ? <X /> : <Menu />}
                </Button>
            </div>
        </div>
      </div>

      {/* MENÚ MÓVIL */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 border-t shadow-xl p-4 flex flex-col gap-2" style={{ backgroundColor: userBgColor }}>
            {navegacion.map((item: any, idx: number) => (
                <NavItem 
                  key={idx} 
                  href={item.url} 
                  baseColor={userTextColor}
                  hoverColor={primaryColor}
                  className="font-medium py-3 px-2 border-b border-black/5 last:border-0"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.nombre}
                </NavItem>
            ))}
            {botonTexto && (
                <Button asChild className="w-full mt-4 h-12 text-base" style={{ backgroundColor: primaryColor, color: "#ffffff" }}>
                   <Link href={botonUrl}>{botonTexto}</Link>
                </Button>
            )}
        </div>
      )}
    </header>
  )
}