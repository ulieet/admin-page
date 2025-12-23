"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { Menu, X } from "lucide-react"
import { Geist, Inter, Montserrat, Lato, Open_Sans, Roboto, Playfair_Display } from "next/font/google"

// --- FUENTES ---
const geist = Geist({ subsets: ["latin"] })
const inter = Inter({ subsets: ["latin"] })
const montserrat = Montserrat({ subsets: ["latin"] })
const lato = Lato({ weight: ["300", "400", "700"], subsets: ["latin"] })
const openSans = Open_Sans({ subsets: ["latin"] })
const roboto = Roboto({ weight: ["300", "400", "500", "700"], subsets: ["latin"] })
const playfair = Playfair_Display({ subsets: ["latin"] })

// --- NAV ITEM ---
const NavItem = ({ href, children, className, variant = "default", onClick, fontClass, isBold }: any) => {
  const [isHovered, setIsHovered] = useState(false)
  const isModern = variant === "modern"
  const weightClass = isBold ? "font-bold" : (isModern ? "font-medium" : "font-medium")

  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "transition-all duration-200 flex items-center",
        isModern ? "px-5 py-2.5 rounded-full text-sm" : "text-base",
        fontClass,
        weightClass,
        className
      )}
      style={{ 
        // CORRECCIÓN: Usamos var(--) directas
        color: isHovered ? "var(--color-primario)" : "var(--color-texto)",
        // Para la transparencia del hover usamos color-mix (moderno y compatible)
        backgroundColor: isModern && isHovered ? "color-mix(in srgb, var(--color-primario), transparent 90%)" : "transparent", 
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
  
  // ELIMINADO: Ya no usamos useEffect para leer estilos. 
  // Usamos CSS variables directas para evitar el "flash" blanco.

  const nombreEmpresa = data.nombreEmpresa || "Mi Empresa"
  const logoImagen = data.logoImagen
  const navegacion = navLinks || data.navegacion || []
  const botonTexto = data.botonTexto
  const botonUrl = data.botonUrl || "#"
  const esTransparente = data.transparente || false
  
  const menuAlign = data.alineacionMenu || "right"
  const isBold = data.isBold || false
  
  const selectedFont = data.fuente || "geist" 
  
  const getFontClassName = () => {
      switch (selectedFont) {
          case "geist": return geist.className
          case "inter": return inter.className
          case "montserrat": return montserrat.className
          case "lato": return lato.className
          case "open_sans": return openSans.className
          case "roboto": return roboto.className
          case "playfair": return playfair.className
          default: return ""
      }
  }
  const fontClassName = getFontClassName()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const isTransparentState = esTransparente && !scrolled

  const headerClass = cn(
    "fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full",
    !isTransparentState && "shadow-sm backdrop-blur-md",
    isTransparentState ? "py-4" : "py-2",
    variant === "centered" && "py-4"
  )

  // CORRECCIÓN CLAVE: Estilos con variables CSS directas
  const containerStyle = {
    // Si no es transparente, usa el color de fondo personalizado directamente
    backgroundColor: isTransparentState 
        ? "transparent" 
        : (variant === "modern" 
            ? "color-mix(in srgb, var(--color-fondo), transparent 5%)" // Efecto "vidrio" para moderno
            : "var(--color-fondo)" // Color sólido normal
          ),
    color: "var(--color-texto)",
    borderBottom: (!isTransparentState && variant === "centered") ? "1px solid rgba(0,0,0,0.05)" : "none"
  }

  const renderLogo = () => (
    <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight hover:opacity-80 transition-opacity shrink-0">
      {logoImagen ? (
        <img 
            src={logoImagen} 
            alt={nombreEmpresa} 
            className="h-auto max-h-12 md:max-h-16 w-auto object-contain" 
        />
      ) : (
        <span className={`text-xl md:text-2xl ${fontClassName} ${isBold ? 'font-bold' : 'font-semibold'}`} style={{ color: "var(--color-texto)" }}>
            {nombreEmpresa}
        </span>
      )}
    </Link>
  )

  const getNavContainerClass = () => {
    if (menuAlign === "center") return "flex-1 flex justify-center"
    if (menuAlign === "left") return "flex justify-start ml-8 mr-auto"
    return "flex-1 flex justify-end mr-8"
  }

  // --- MODO EDITORIAL (CENTRADO) ---
  if (variant === "centered") {
    return (
      <header className={headerClass} style={containerStyle}>
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center gap-4">
            <div className="w-full flex justify-between items-center relative">
              <div className="md:hidden">
                 <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} style={{ color: "var(--color-texto)" }}><Menu /></Button>
              </div>
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                 {renderLogo()}
              </div>
              <div className="w-10 md:hidden" />
              <div className="hidden md:block ml-auto">
                {botonTexto && (
                   <Button asChild size="sm" className={`rounded-none px-8 uppercase tracking-wider text-xs h-10 ${fontClassName} ${isBold ? 'font-bold' : 'font-semibold'}`} style={{ backgroundColor: "var(--color-primario)", color: "#ffffff" }}>
                      <Link href={botonUrl}>{botonTexto}</Link>
                   </Button>
                )}
              </div>
            </div>
            <div className="hidden md:block w-full border-t border-black/5 pt-4 mt-1">
              <nav className="flex items-center justify-center gap-12">
                {navegacion.map((item: any, idx: number) => (
                  <NavItem key={idx} href={item.url} className="uppercase text-xs tracking-[0.15em]" variant="centered" fontClass={fontClassName} isBold={isBold}>
                    {item.nombre}
                  </NavItem>
                ))}
              </nav>
            </div>
          </div>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden fixed inset-0 z-40 pt-24 px-8 flex flex-col items-center gap-6" style={{ backgroundColor: "var(--color-fondo)" }}>
             <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)} className="absolute top-6 left-4" style={{ color: "var(--color-texto)" }}><X /></Button>
             {navegacion.map((item: any, idx: number) => (
                <NavItem key={idx} href={item.url} className="text-2xl" onClick={() => setMobileMenuOpen(false)} fontClass={fontClassName} isBold={isBold}>{item.nombre}</NavItem>
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
        
        <div className={`hidden md:flex ${getNavContainerClass()}`}>
            <nav className={cn("flex items-center", isModern ? "gap-2" : "gap-8")}>
                {navegacion.map((item: any, idx: number) => (
                    <NavItem key={idx} href={item.url} variant={isModern ? "modern" : "default"} fontClass={fontClassName} isBold={isBold}>{item.nombre}</NavItem>
                ))}
            </nav>
        </div>

        <div className={cn("flex items-center gap-4 shrink-0")}>
            {botonTexto && (
                <Button asChild className={cn("hidden md:inline-flex shadow-sm", isModern ? "rounded-full px-6 h-10" : "rounded-md h-11 px-6", fontClassName, isBold ? 'font-bold' : 'font-semibold')} style={{ backgroundColor: "var(--color-primario)", color: "#ffffff" }}>
                    <Link href={botonUrl}>{botonTexto}</Link>
                </Button>
            )}
            <div className="md:hidden">
                <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} style={{ color: "var(--color-texto)" }}><Menu /></Button>
            </div>
        </div>
      </div>
      
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 border-t shadow-xl p-4 flex flex-col gap-2" style={{ backgroundColor: "var(--color-fondo)" }}>
            <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)} className="absolute top-6 right-4" style={{ color: "var(--color-texto)" }}><X /></Button>
            {navegacion.map((item: any, idx: number) => (
                <Link key={idx} href={item.url} className={`py-3 px-2 border-b border-black/5 ${fontClassName} ${isBold ? 'font-bold' : 'font-medium'}`} style={{ color: "var(--color-texto)" }}>{item.nombre}</Link>
            ))}
        </div>
      )}
    </header>
  )
}