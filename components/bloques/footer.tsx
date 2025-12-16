"use client"

import type { FooterBlock } from "@/lib/types/blocks"
import { Facebook, Linkedin, Mail, MapPin, Phone, Instagram, Twitter, MessageCircle } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface BloqueFooterProps {
  data: FooterBlock["datos"]
  navLinks?: Array<{ nombre: string; url: string }>
}

export function BloqueFooter({ data, navLinks = [] }: BloqueFooterProps) {
  const estiloVisual = data.estiloVisual || "completo"
  const personalizacion = data.personalizacion || { tipoFondo: "default" }
  
  // Variables CSS directas
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
  let isDarkText = true

  if (personalizacion.tipoFondo === "custom") {
    // Si el usuario eligió fondo oscuro, forzamos texto blanco
    if (!personalizacion.textoOscuro) {
        finalTextColor = "#ffffff"
        isDarkText = false
    }
  }

  const borderClass = hasBorderTop ? "border-t border-black/5" : ""
  
  // Renderizado de iconos
  const renderSocialIcons = (iconClass: string = "h-5 w-5", containerClass?: string) => {
    // Si el texto es oscuro (fondo claro), usamos el color primario para los iconos.
    // Si el texto es blanco (fondo oscuro), usamos blanco (currentColor).
    const iconStyle = isDarkText ? { color: primaryVar } : { color: "currentColor" }
    
    const icons = []
    if (data.redesSociales?.linkedin) icons.push(<Link key="li" href={data.redesSociales.linkedin} target="_blank" className="hover:opacity-75 transition-opacity"><div className={containerClass}><Linkedin className={iconClass} style={iconStyle} /></div></Link>)
    if (data.redesSociales?.facebook) icons.push(<Link key="fb" href={data.redesSociales.facebook} target="_blank" className="hover:opacity-75 transition-opacity"><div className={containerClass}><Facebook className={iconClass} style={iconStyle} /></div></Link>)
    if (data.redesSociales?.instagram) icons.push(<Link key="ig" href={data.redesSociales.instagram} target="_blank" className="hover:opacity-75 transition-opacity"><div className={containerClass}><Instagram className={iconClass} style={iconStyle} /></div></Link>)
    if (data.redesSociales?.twitter) icons.push(<Link key="tw" href={data.redesSociales.twitter} target="_blank" className="hover:opacity-75 transition-opacity"><div className={containerClass}><Twitter className={iconClass} style={iconStyle} /></div></Link>)
    if (data.redesSociales?.whatsapp) icons.push(<Link key="wa" href={data.redesSociales.whatsapp} target="_blank" className="hover:opacity-75 transition-opacity"><div className={containerClass}><MessageCircle className={iconClass} style={iconStyle} /></div></Link>)
    
    return icons
  }

  // --- RENDERIZADO COMPLETO (Por defecto) ---
  return (
    <footer className={`${borderClass} pt-16 pb-8 transition-colors duration-300`} style={{ backgroundColor: finalBgColor, color: finalTextColor }}>
      <div className="container mx-auto px-4">
        
        {/* Variante Simple */}
        {estiloVisual === "simple" ? (
             <div className="flex flex-col items-center gap-6 text-center">
                <h3 className="text-2xl font-bold tracking-tight">{data.nombreEmpresa}</h3>
                <div className="flex gap-4 items-center">{renderSocialIcons()}</div>
                <p className="opacity-60 text-sm">© {new Date().getFullYear()} {data.nombreEmpresa}. Todos los derechos reservados.</p>
             </div>
        ) : (
            // Variante Completa o Con Mapa
            <>
                <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4 mb-12">
                <div className="space-y-4 col-span-1 lg:col-span-2">
                    <h3 className="text-2xl font-bold">{data.nombreEmpresa}</h3>
                    <p className="opacity-80 max-w-sm leading-relaxed">{data.descripcion}</p>
                    <div className="flex gap-4 pt-2">{renderSocialIcons("h-5 w-5")}</div>
                </div>
                
                <div className="space-y-4">
                    <h4 className="font-semibold text-lg">Contacto</h4>
                    <ul className="space-y-3 opacity-80 text-sm">
                        {data.telefono && <li className="flex items-center gap-2"><Phone className="h-4 w-4" /> <a href={`tel:${data.telefono}`} className="hover:underline">{data.telefono}</a></li>}
                        {data.email && <li className="flex items-center gap-2"><Mail className="h-4 w-4" /> <a href={`mailto:${data.email}`} className="hover:underline">{data.email}</a></li>}
                        {data.direccion && <li className="flex items-start gap-2"><MapPin className="h-4 w-4 mt-1" /> <span>{data.direccion}</span></li>}
                    </ul>
                </div>

                <div className="space-y-4">
                    <h4 className="font-semibold text-lg">Enlaces</h4>
                    <ul className="space-y-2 opacity-80 text-sm">
                    {navLinks.length > 0 ? navLinks.map((link, i) => (
                        <li key={i}><Link href={link.url} className="hover:underline">{link.nombre}</Link></li>
                    )) : (
                        <li><Link href="#" className="hover:underline">Inicio</Link></li>
                    )}
                    </ul>
                </div>
                </div>

                {/* Copyright */}
                <div className="pt-8 border-t text-center opacity-60 text-sm" style={{ borderColor: isDarkText ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.2)' }}>
                    <p>© {new Date().getFullYear()} {data.nombreEmpresa}.</p>
                </div>
            </>
        )}
      </div>
    </footer>
  )
}