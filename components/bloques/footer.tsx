"use client"

import type { FooterBlock, StyleConfig } from "@/lib/types/blocks"
import { Facebook, Linkedin, Mail, MapPin, Phone, Instagram, Twitter, MessageCircle } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface BloqueFooterProps {
  data: FooterBlock["datos"]
  estilos?: StyleConfig | null
  navLinks?: Array<{ nombre: string; url: string }>
}

export function BloqueFooter({ data, estilos, navLinks = [] }: BloqueFooterProps) {
  const estiloVisual = data.estiloVisual || "completo"
  const personalizacion = data.personalizacion || { tipoFondo: "default" }
  
  // VARIABLES CSS
  const primaryVar = "var(--color-primario)"
  const bgVar = "var(--color-fondo)"
  const textVar = "var(--color-texto)"

  // 1. CALCULAR FONDO
  let finalBgColor = bgVar 
  let hasBorderTop = true

  if (personalizacion.tipoFondo === "transparente") {
    finalBgColor = "transparent"
    hasBorderTop = false
  } else if (personalizacion.tipoFondo === "custom" && personalizacion.colorPersonalizado) {
    finalBgColor = personalizacion.colorPersonalizado
  } 

  // 2. CALCULAR COLOR TEXTO
  let finalTextColor = textVar
  
  if (personalizacion.tipoFondo === "transparente") {
    finalTextColor = textVar 
  } else if (personalizacion.tipoFondo === "custom") {
    finalTextColor = personalizacion.textoOscuro ? textVar : "#ffffff"
  } else {
    finalTextColor = textVar
  }

  const isDarkText = finalTextColor === textVar
  const borderClass = hasBorderTop ? "border-t border-[var(--color-texto)]/10" : ""
  
  // Renderizado de iconos
  const renderSocialIcons = (iconClass: string = "h-5 w-5", containerClass?: string) => {
    const iconStyle = isDarkText ? { color: primaryVar } : { color: "currentColor" }
    
    const icons = []
    if (data.redesSociales?.linkedin) icons.push(<Link key="li" href={data.redesSociales.linkedin} target="_blank" className="hover:opacity-75 transition-opacity"><div className={containerClass}><Linkedin className={iconClass} style={iconStyle} /></div></Link>)
    if (data.redesSociales?.facebook) icons.push(<Link key="fb" href={data.redesSociales.facebook} target="_blank" className="hover:opacity-75 transition-opacity"><div className={containerClass}><Facebook className={iconClass} style={iconStyle} /></div></Link>)
    if (data.redesSociales?.instagram) icons.push(<Link key="ig" href={data.redesSociales.instagram} target="_blank" className="hover:opacity-75 transition-opacity"><div className={containerClass}><Instagram className={iconClass} style={iconStyle} /></div></Link>)
    if (data.redesSociales?.twitter) icons.push(<Link key="tw" href={data.redesSociales.twitter} target="_blank" className="hover:opacity-75 transition-opacity"><div className={containerClass}><Twitter className={iconClass} style={iconStyle} /></div></Link>)
    if (data.redesSociales?.whatsapp) icons.push(<Link key="wa" href={data.redesSociales.whatsapp} target="_blank" className="hover:opacity-75 transition-opacity"><div className={containerClass}><MessageCircle className={iconClass} style={iconStyle} /></div></Link>)
    
    return icons
  }

  // --- RENDERIZADO ---

  if (estiloVisual === "simple") {
    return (
      // CAMBIO: pt-12 (arriba) pb-4 (abajo mínimo)
      <footer className={`${borderClass} pt-12 pb-6 transition-colors duration-300`} style={{ backgroundColor: finalBgColor, color: finalTextColor }}>
        <div className="container mx-auto px-4 flex flex-col items-center gap-6 text-center">
          <h3 className="text-2xl font-bold tracking-tight">{data.nombreEmpresa}</h3>
          <div className="flex gap-4 items-center">
            {renderSocialIcons()}
          </div>
          <p className="text-sm opacity-80">
            © {new Date().getFullYear()} {data.nombreEmpresa}. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    )
  }

  if (estiloVisual === "con-mapa") {
    return (
      <footer className={`${borderClass} transition-colors duration-300`} style={{ backgroundColor: finalBgColor, color: finalTextColor }}>
        {/* CAMBIO: pt-16 (arriba) pb-4 (abajo mínimo) */}
        <div className="container mx-auto px-4 pt-16 pb-4">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h3 className="text-3xl font-bold" style={{ color: isDarkText ? primaryVar : 'inherit' }}>
                  {data.nombreEmpresa}
                </h3>
                <p className="opacity-80 max-w-md text-lg">
                  {data.descripcion}
                </p>
              </div>
              <div className="space-y-4">
                {data.direccion && (
                  <div className="flex items-start gap-3">
                    <MapPin className="h-6 w-6 mt-1 shrink-0" style={isDarkText ? { color: primaryVar } : {}} />
                    <span className="opacity-80">{data.direccion}</span>
                  </div>
                )}
                 {data.email && (
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 shrink-0" style={isDarkText ? { color: primaryVar } : {}} />
                    <a href={`mailto:${data.email}`} className="hover:underline opacity-80 hover:opacity-100">{data.email}</a>
                  </div>
                )}
                {data.telefono && (
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 shrink-0" style={isDarkText ? { color: primaryVar } : {}} />
                    <a href={`tel:${data.telefono}`} className="hover:underline opacity-80 hover:opacity-100">{data.telefono}</a>
                  </div>
                )}
              </div>
              <div className="flex gap-4">
                {renderSocialIcons("h-5 w-5")}
              </div>
            </div>
            <div className="relative aspect-video w-full overflow-hidden rounded-xl border shadow-lg" style={{ borderColor: isDarkText ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.2)' }}>
              {data.imagenMapa ? (
                <Image src={data.imagenMapa} alt="Ubicación" fill className="object-cover" />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-slate-200 text-slate-400">
                  <span className="flex items-center gap-2"><MapPin className="h-8 w-8" /> Sin imagen de mapa</span>
                </div>
              )}
            </div>
          </div>
          {/* Copyright Section - Ajustado margen superior */}
          <div className="mt-12 border-t pt-4 text-center text-sm opacity-60" style={{ borderColor: isDarkText ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.2)' }}>
            <p>© {new Date().getFullYear()} {data.nombreEmpresa}. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    )
  }

  // COMPLETO
  return (
    // CAMBIO: pt-16 (arriba) pb-4 (abajo mínimo) en lugar de py-16
    <footer className="pt-16 pb-4 transition-colors duration-300" style={{ backgroundColor: finalBgColor, color: finalTextColor }}>
      <div className="container mx-auto px-4">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4 col-span-1 lg:col-span-2">
            <h3 className="text-2xl font-bold">{data.nombreEmpresa}</h3>
            <p className="opacity-80 max-w-sm leading-relaxed">{data.descripcion}</p>
            <div className="flex gap-4 pt-2">{renderSocialIcons("h-6 w-6")}</div>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Contacto</h4>
            <ul className="space-y-3 text-sm opacity-80">
               {data.telefono && <li className="flex items-center gap-2"><Phone className="h-4 w-4" /> <a href={`tel:${data.telefono}`} className="hover:underline">{data.telefono}</a></li>}
               {data.email && <li className="flex items-center gap-2"><Mail className="h-4 w-4" /> <a href={`mailto:${data.email}`} className="hover:underline">{data.email}</a></li>}
               {data.direccion && <li className="flex items-start gap-2"><MapPin className="h-4 w-4 mt-1" /> <span>{data.direccion}</span></li>}
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Empresa</h4>
            <ul className="space-y-2 text-sm opacity-80">
              {navLinks.length > 0 ? navLinks.map((link, i) => (
                <li key={i}><Link href={link.url} className="hover:underline">{link.nombre}</Link></li>
              )) : (
                <li><Link href="#" className="hover:underline">Inicio</Link></li>
              )}
            </ul>
          </div>
        </div>
        {/* Copyright Section - Ajustado margen superior y padding top */}
        <div className="mt-12 pt-4 border-t text-center text-sm opacity-60" style={{ borderColor: isDarkText ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.2)' }}>
          <p>© {new Date().getFullYear()} {data.nombreEmpresa}. Creado con Page Builder.</p>
        </div>
      </div>
    </footer>
  )
}