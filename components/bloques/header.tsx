"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Image from "next/image"

// Helper para convertir Hex a Rgba
function hexToRgba(hex: string, alpha: number) {
  let c: any;
  if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
      c= hex.substring(1).split('');
      if(c.length== 3){
          c= [c[0], c[0], c[1], c[1], c[2], c[2]];
      }
      c= '0x'+c.join('');
      return 'rgba('+[(c>>16)&255, (c>>8)&255, c&255].join(',')+','+alpha+')';
  }
  return hex;
}

interface HeaderProps {
  data: any
  estilos?: any 
  variant?: string
  navLinks?: any[]
}

export function BloqueHeader({ data, estilos }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("")

  const getSize = (size?: string) => {
    if (!size) return undefined;
    const value = size.trim();
    if (/^\d+$/.test(value)) return `${value}px`;
    return value;
  };

  const fontSizeStyle = getSize(data.tamanoTexto);
  const logoHeightStyle = getSize(data.tamanoLogo); 
  
  const bgColorHex = estilos?.colores?.fondo || "#ffffff";
  const bgRgbaScroll = hexToRgba(bgColorHex, 0.95);

  // Lógica para detectar si se ha hecho scroll y cambiar el fondo
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll, { passive: true })
    // Check inicial
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // --- LÓGICA DE SCROLL SPY CORREGIDA (DETECTA INICIO POR DEFECTO) ---
  useEffect(() => {
    const handleScrollSpy = () => {
      const navItems = data.navegacion || [];
      if (navItems.length === 0) return;

      let currentSection = "";

      // 1. ZONA SUPERIOR (INICIO):
      // Si estamos muy cerca del top (ej. menos de 100px de scroll),
      // asumimos que estamos en la primera sección ("Inicio").
      if (window.scrollY < 100) {
         currentSection = navItems[0].url;
      } 
      // 2. ZONA DE SCROLL (BUSCAR SECCIONES):
      // Si ya bajamos, buscamos qué ID está en pantalla.
      else {
        const sectionsIds = navItems.map((item: any) => item.url.replace("#", "")).filter(Boolean);
        for (const id of sectionsIds) {
          const element = document.getElementById(id);
          if (element) {
            const rect = element.getBoundingClientRect();
            // Usamos un offset de 150px. Si el elemento pasa esa línea imaginaria cerca del header, se activa.
            if (rect.top <= 150 && rect.bottom >= 150) {
               currentSection = `#${id}`;
               // Importante: break para quedarnos con la sección más alta visible.
               break;
            }
          }
        }
      }

      // Si encontramos una sección válida, actualizamos el estado.
      // Si no encontramos nada (ej. scroll intermedio raro), no desmarcamos la última activa.
      if (currentSection) {
        setActiveSection(prev => (prev !== currentSection ? currentSection : prev));
      }
    }

    window.addEventListener("scroll", handleScrollSpy, { passive: true });

    // IMPORTANTE: Ejecutar al montar (con un pequeño delay para asegurar que el DOM existe)
    // Esto fuerza a que se marque "Inicio" apenas carga la página.
    const timeoutId = setTimeout(handleScrollSpy, 100);

    return () => {
      window.removeEventListener("scroll", handleScrollSpy);
      clearTimeout(timeoutId);
    }
  }, [data.navegacion]); // Se re-ejecuta si cambian los enlaces

  const alineacion = data.alineacion || "derecha"
  const navPositionClass = {
    izquierda: "justify-start", centro: "justify-center", derecha: "justify-end",
  }[alineacion as "izquierda" | "centro" | "derecha"]

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 h-16 md:h-20 flex items-center",
        data.transparente && !isScrolled
          ? "py-4 border-b border-transparent"
          : "py-2 shadow-sm border-b border-black/5"
      )}
      style={{
        backgroundColor: data.transparente && !isScrolled ? "transparent" : bgRgbaScroll,
        backdropFilter: data.transparente && !isScrolled ? "none" : "blur(8px)"
      }}
    >
      <div className="container mx-auto px-4 flex items-center justify-between relative h-full">
        <Link href="/" className={cn("flex items-center gap-2 z-50 md:order-none h-full py-2", alineacion === "izquierda" ? "order-2 mx-auto" : "order-1 mr-auto")}>
          {data.logoImagen ? (
             <div className="relative w-auto flex items-center" style={{ height: '100%', maxHeight: logoHeightStyle || '100%' }}>
                <Image src={data.logoImagen} alt={data.logoTexto || "Logo"} width={300} height={100} className="w-auto h-full object-contain" priority />
             </div>
          ) : (
            <span className="text-2xl font-bold text-[var(--color-primario)]">{data.logoTexto || data.nombreEmpresa || "LOGO"}</span>
          )}
        </Link>
        <div className={cn("hidden md:flex items-center flex-1 px-8 md:order-none h-full", navPositionClass)}>
          <nav className="flex items-center gap-8">
            {(data.navegacion || []).map((item: any, index: number) => {
              const isActive = activeSection === item.url
              return (
                <Link 
                  key={index} 
                  href={item.url} 
                  style={{ fontSize: fontSizeStyle }} 
                  className={cn(
                    "transition-all duration-200 text-[var(--color-primario)]", 
                    !fontSizeStyle && "text-sm", 
                    isActive 
                      ? "font-bold underline decoration-2 underline-offset-4 opacity-100" 
                      : "font-medium opacity-70 hover:opacity-100"
                  )} 
                  onClick={(e) => { 
                    if (item.url.startsWith("#")) { 
                      e.preventDefault(); 
                      const id = item.url.replace("#", "")
                      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); 
                      // Actualizamos manualmente al hacer click para feedback instantáneo
                      setActiveSection(item.url) 
                    } 
                  }}
                >
                  {item.nombre}
                </Link>
              )
            })}
          </nav>
        </div>
        <div className="hidden md:flex items-center gap-4 md:order-none">
          {data.botonTexto && <Button asChild style={{ backgroundColor: 'var(--color-primario)', color: '#fff' }}><Link href={data.botonUrl || "#"}>{data.botonTexto}</Link></Button>}
        </div>
        <button className={cn("md:hidden p-2 text-[var(--color-primario)] hover:bg-black/5 rounded-md transition-colors z-50", alineacion === "izquierda" ? "order-1 mr-auto" : alineacion === "centro" ? "order-2 mx-auto" : "order-3 ml-auto")} onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 border-b shadow-lg md:hidden p-4 flex flex-col gap-4 animate-in slide-in-from-top-5" style={{ backgroundColor: bgRgbaScroll }}>
          <nav className="flex flex-col gap-2">
            {(data.navegacion || []).map((item: any, index: number) => (
              <Link 
                key={index} 
                href={item.url} 
                style={{ fontSize: fontSizeStyle }} 
                className={cn(
                  "block p-3 rounded-md transition-colors text-[var(--color-primario)]", 
                  activeSection === item.url 
                    ? "bg-black/5 font-bold border-l-4 border-[var(--color-primario)]" 
                    : "hover:bg-black/5 font-medium"
                )} 
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.nombre}
              </Link>
            ))}
          </nav>
          {data.botonTexto && <Button className="w-full" asChild style={{ backgroundColor: 'var(--color-primario)', color: '#fff' }}><Link href={data.botonUrl || "#"}>{data.botonTexto}</Link></Button>}
        </div>
      )}
    </header>
  )
}