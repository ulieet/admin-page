import type { FooterBlock, StyleConfig } from "@/lib/types/blocks"
import { Facebook, Linkedin, Mail, MapPin, Phone, Instagram, Twitter, MessageCircle } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface BloqueFooterProps {
  data: FooterBlock["datos"]
  estilos?: StyleConfig | null
  navLinks?: Array<{ nombre: string; url: string }>
}

export function BloqueFooter({ data, estilos, navLinks = [] }: BloqueFooterProps) {
  const estiloVisual = data.estiloVisual || "completo"
  const personalizacion = data.personalizacion || { tipoFondo: "default" }
  
  const primaryColor = estilos?.colores.primario || "#1e40af"
  const bgColor = estilos?.colores.fondo || "#ffffff"
  const siteTextColor = estilos?.colores.texto || "#1f2937"

  // 1. CALCULAR FONDO
  let finalBgColor = bgColor 
  let hasBorderTop = true

  if (personalizacion.tipoFondo === "transparente") {
    finalBgColor = "transparent"
    hasBorderTop = false // Sin borde para que se integre
  } else if (personalizacion.tipoFondo === "custom" && personalizacion.colorPersonalizado) {
    finalBgColor = personalizacion.colorPersonalizado
  } else {
    // Default logic
    if (estiloVisual === "simple") finalBgColor = bgColor
    else if (estiloVisual === "con-mapa") finalBgColor = "#f8fafc"
    else if (estiloVisual === "completo") finalBgColor = primaryColor
  }

  // 2. CALCULAR COLOR TEXTO
  let finalTextColor = siteTextColor
  
  if (personalizacion.tipoFondo === "transparente") {
    // En transparente asumimos texto oscuro por defecto, salvo que el usuario cambie algo más.
    finalTextColor = siteTextColor 
  } else if (personalizacion.tipoFondo === "custom") {
    finalTextColor = personalizacion.textoOscuro ? siteTextColor : "#ffffff"
  } else {
    // Default logic
    if (estiloVisual === "completo") finalTextColor = "#ffffff"
    else finalTextColor = siteTextColor
  }

  // Detectar si el texto es "oscuro" (para iconos y bordes sutiles)
  const isDarkText = finalTextColor === siteTextColor
  
  // Estilos auxiliares
  const borderClass = hasBorderTop ? "border-t" : ""
  const mutedTextClass = isDarkText ? "text-muted-foreground" : "opacity-80"
  
  // Renderizado de iconos (igual que antes, ajustado a isDarkText)
  const renderSocialIcons = (iconClass: string = "h-5 w-5", containerClass?: string) => {
    // Si el texto es oscuro, iconos usan color primario. Si es claro (blanco), iconos blancos.
    const iconStyle = isDarkText ? { color: primaryColor } : { color: "currentColor" }
    
    const icons = []
    // ... (Lógica de iconos igual que te pasé antes)
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
      <footer className={`${borderClass} py-12 transition-colors duration-300`} style={{ backgroundColor: finalBgColor, color: finalTextColor }}>
        <div className="container mx-auto px-4 flex flex-col items-center gap-6 text-center">
          <h3 className="text-2xl font-bold tracking-tight">{data.nombreEmpresa}</h3>
          <div className="flex gap-4 items-center">
            {renderSocialIcons()}
          </div>
          <p className={`text-sm ${mutedTextClass}`}>
            © {new Date().getFullYear()} {data.nombreEmpresa}. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    )
  }

  if (estiloVisual === "con-mapa") {
    return (
      <footer className={`${borderClass} transition-colors duration-300`} style={{ backgroundColor: finalBgColor, color: finalTextColor }}>
        <div className="container mx-auto px-4 py-16">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h3 className="text-3xl font-bold" style={{ color: isDarkText ? primaryColor : 'inherit' }}>
                  {data.nombreEmpresa}
                </h3>
                <p className={`${mutedTextClass} max-w-md text-lg`}>
                  {data.descripcion}
                </p>
              </div>
              <div className="space-y-4">
                {data.direccion && (
                  <div className="flex items-start gap-3">
                    <MapPin className="h-6 w-6 mt-1 shrink-0" style={isDarkText ? { color: primaryColor } : {}} />
                    <span className={mutedTextClass}>{data.direccion}</span>
                  </div>
                )}
                {/* ... resto de items de contacto ... */}
                 {data.email && (
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 shrink-0" style={isDarkText ? { color: primaryColor } : {}} />
                    <a href={`mailto:${data.email}`} className="hover:underline opacity-80 hover:opacity-100">{data.email}</a>
                  </div>
                )}
                {data.telefono && (
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 shrink-0" style={isDarkText ? { color: primaryColor } : {}} />
                    <a href={`tel:${data.telefono}`} className="hover:underline opacity-80 hover:opacity-100">{data.telefono}</a>
                  </div>
                )}
              </div>
              <div className="flex gap-4">
                {renderSocialIcons("h-5 w-5")}
              </div>
            </div>
            {/* Mapa (sin cambios) */}
            <div className="relative aspect-video w-full overflow-hidden rounded-xl border bg-muted shadow-lg">
              {data.imagenMapa ? (
                <Image src={data.imagenMapa} alt="Ubicación" fill className="object-cover" />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-slate-200 text-slate-400">
                  <span className="flex items-center gap-2"><MapPin className="h-8 w-8" /> Sin imagen de mapa</span>
                </div>
              )}
            </div>
          </div>
          <div className={`mt-16 border-t pt-8 text-center text-sm ${mutedTextClass}`} style={{ borderColor: isDarkText ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.2)' }}>
            <p>© {new Date().getFullYear()} {data.nombreEmpresa}. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    )
  }

  // COMPLETO
  return (
    <footer className="py-16 transition-colors duration-300" style={{ backgroundColor: finalBgColor, color: finalTextColor }}>
      <div className="container mx-auto px-4">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4 col-span-1 lg:col-span-2">
            <h3 className="text-2xl font-bold">{data.nombreEmpresa}</h3>
            <p className={`${mutedTextClass} max-w-sm leading-relaxed`}>{data.descripcion}</p>
            <div className="flex gap-4 pt-2">{renderSocialIcons("h-6 w-6")}</div>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Contacto</h4>
            <ul className={`space-y-3 text-sm ${mutedTextClass}`}>
              {/* ... Items de contacto con links ... */}
               {data.telefono && <li className="flex items-center gap-2"><Phone className="h-4 w-4" /> <a href={`tel:${data.telefono}`} className="hover:underline">{data.telefono}</a></li>}
               {data.email && <li className="flex items-center gap-2"><Mail className="h-4 w-4" /> <a href={`mailto:${data.email}`} className="hover:underline">{data.email}</a></li>}
               {data.direccion && <li className="flex items-start gap-2"><MapPin className="h-4 w-4 mt-1" /> <span>{data.direccion}</span></li>}
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Empresa</h4>
            <ul className={`space-y-2 text-sm ${mutedTextClass}`}>
              {navLinks.length > 0 ? navLinks.map((link, i) => (
                <li key={i}><Link href={link.url} className="hover:underline">{link.nombre}</Link></li>
              )) : (
                <li><Link href="#" className="hover:underline">Inicio</Link></li>
              )}
            </ul>
          </div>
        </div>
        <div className={`mt-16 pt-8 border-t text-center text-sm ${mutedTextClass}`} style={{ borderColor: isDarkText ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.2)' }}>
          <p>© {new Date().getFullYear()} {data.nombreEmpresa}. Creado con Page Builder.</p>
        </div>
      </div>
    </footer>
  )
}