"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { Menu, X } from "lucide-react"

// --- COMPONENTE INTERNO: ENLACE ---
const NavItem = ({ href, children, baseColor, hoverColor, className, variant = "default", onClick }: any) => {
  const [isHovered, setIsHovered] = useState(false)
  const isModern = variant === "modern"
  
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "transition-all duration-200 flex items-center",
        isModern ? "px-5 py-2.5 rounded-full font-medium text-sm" : "text-base font-medium",
        className
      )}
      style={{ 
        color: isHovered ? hoverColor : baseColor,
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
  navLinks?: Array<{ nombre: string; url: string }>
  variant?: "default" | "modern" | "centered"
}

export function BloqueHeader({ data, navLinks, variant = "default" }: BloqueHeaderProps) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  
  const [estilosGlobales, setEstilosGlobales] = useState({
    primario: "#3b82f6", fondo: "#ffffff", texto: "#0f172a"
  })

  useEffect(() => {
    if (typeof window !== "undefined") {
        const style = getComputedStyle(document.documentElement)
        const primario = style.getPropertyValue('--color-primario').trim()
        const fondo = style.getPropertyValue('--color-fondo').trim()
        const texto = style.getPropertyValue('--color-texto').trim()
        if (primario) setEstilosGlobales({ primario, fondo, texto })
    }
  }, [])

  const nombreEmpresa = data.nombreEmpresa || "Mi Empresa"
  const logoImagen = data.logoImagen
  const navegacion = navLinks || data.navegacion || []
  const botonTexto = data.botonTexto
  const botonUrl = data.botonUrl || "#"
  const esTransparente = data.transparente || false
  const primaryColor = estilosGlobales.primario
  const userBgColor = estilosGlobales.fondo
  const userTextColor = estilosGlobales.texto
  
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const isTransparentState = esTransparente && !scrolled

  // AJUSTE: Altura más compacta (py-2 o py-3) pero permitiendo logo grande
  const headerClass = cn(
    "fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full",
    !isTransparentState && "shadow-sm backdrop-blur-md",
    isTransparentState ? "py-4" : "py-2", // Altura reducida al hacer scroll
    variant === "centered" && "py-4" 
  )

  const containerStyle = {
    backgroundColor: isTransparentState ? "transparent" : (variant === "modern" ? `${userBgColor}F5` : userBgColor),
    color: userTextColor,
    borderBottom: (!isTransparentState && variant === "centered") ? "1px solid rgba(0,0,0,0.05)" : "none"
  }

  // LOGO: Grande (h-12 / h-16) pero contenido en la caja
  const renderLogo = () => (
    <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight hover:opacity-80 transition-opacity shrink-0">
      {logoImagen ? (
        <img 
            src={logoImagen} 
            alt={nombreEmpresa} 
            // Ajuste clave: max-h para que no fuerce la altura del contenedor padre
            className="h-auto max-h-12 md:max-h-16 w-auto object-contain" 
        />
      ) : (
        <span className="text-xl md:text-2xl" style={{ color: userTextColor }}>{nombreEmpresa}</span>
      )}
    </Link>
  )

  // --- MODO EDITORIAL (CENTRADO) ---
  if (variant === "centered") {
    return (
      <header className={headerClass} style={containerStyle}>
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center gap-4">
            <div className="w-full flex justify-between items-center relative">
              <div className="md:hidden">
                 <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} style={{ color: userTextColor }}><Menu /></Button>
              </div>
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                 {renderLogo()}
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
            <div className="hidden md:block w-full border-t border-black/5 pt-4 mt-1">
              <nav className="flex items-center justify-center gap-12">
                {navegacion.map((item: any, idx: number) => (
                  <NavItem key={idx} href={item.url} baseColor={userTextColor} hoverColor={primaryColor} className="uppercase text-xs tracking-[0.15em] font-bold" variant="centered">
                    {item.nombre}
                  </NavItem>
                ))}
              </nav>
            </div>
          </div>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden fixed inset-0 z-40 bg-white pt-24 px-8 flex flex-col items-center gap-6" style={{ backgroundColor: userBgColor }}>
             <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)} className="absolute top-6 left-4" style={{ color: userTextColor }}><X /></Button>
             {navegacion.map((item: any, idx: number) => (
                <NavItem key={idx} href={item.url} baseColor={userTextColor} hoverColor={primaryColor} className="text-2xl font-light" onClick={() => setMobileMenuOpen(false)}>{item.nombre}</NavItem>
             ))}
          </div>
        )}
      </header>
    )
  }

  // --- MODO DEFAULT / MODERN ---
  const isModern = variant === "modern"
  return (
    <header className={headerClass} style={containerStyle}>
      <div className="container mx-auto px-4 md:px-8 flex items-center justify-between h-full">
        <div className="flex items-center shrink-0">{renderLogo()}</div>
        <nav className={cn("hidden md:flex items-center", isModern ? "gap-2" : "gap-8")}>
            {navegacion.map((item: any, idx: number) => (
                <NavItem key={idx} href={item.url} baseColor={userTextColor} hoverColor={primaryColor} variant={isModern ? "modern" : "default"}>{item.nombre}</NavItem>
            ))}
        </nav>
        <div className={cn("flex items-center gap-4 shrink-0")}>
            {botonTexto && (
                <Button asChild className={cn("hidden md:inline-flex font-semibold shadow-sm", isModern ? "rounded-full px-6 h-10" : "rounded-md h-11 px-6")} style={{ backgroundColor: primaryColor, color: "#ffffff" }}>
                    <Link href={botonUrl}>{botonTexto}</Link>
                </Button>
            )}
            <div className="md:hidden">
                <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} style={{ color: userTextColor }}><Menu /></Button>
            </div>
        </div>
      </div>
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 border-t shadow-xl p-4 flex flex-col gap-2" style={{ backgroundColor: userBgColor }}>
            <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)} className="absolute top-6 right-4" style={{ color: userTextColor }}><X /></Button>
            {navegacion.map((item: any, idx: number) => (
                <Link key={idx} href={item.url} className="font-medium py-3 px-2 border-b border-black/5" style={{ color: userTextColor }}>{item.nombre}</Link>
            ))}
        </div>
      )}
    </header>
  )
}