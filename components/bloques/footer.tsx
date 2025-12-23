"use client"

import type { FooterBlock } from "@/lib/types/blocks"
import { Facebook, Linkedin, Mail, MapPin, Phone, Instagram, Twitter, MessageCircle } from "lucide-react"
import Link from "next/link"

function getContrastColor(hexColor: string) {
  if (!hexColor || !hexColor.startsWith("#")) return "#0f172a"
  const r = parseInt(hexColor.slice(1, 3), 16)
  const g = parseInt(hexColor.slice(3, 5), 16)
  const b = parseInt(hexColor.slice(5, 7), 16)
  const yiq = (r * 299 + g * 587 + b * 114) / 1000
  return yiq >= 128 ? "#0f172a" : "#ffffff"
}

interface BloqueFooterProps {
  data: FooterBlock["datos"] & {
    logoUrl?: string
    imagenAdicional?: string
    lat?: number | string | null
    lng?: number | string | null
    ubicacion?: { lat: number; lng: number }
    mostrarMapa?: boolean // Nueva propiedad
    estiloVisual?: "clasico" | "minimal" | "split" | "simple" | "completo"
  }
  navLinks?: Array<{ nombre: string; url: string }>
  estilos?: any
}

export function BloqueFooter({ data, navLinks = [], estilos }: BloqueFooterProps) {
  // Normalizar variantes viejas
  let estiloVisual = data.estiloVisual || "clasico"
  if (estiloVisual === "completo") estiloVisual = "clasico"
  if (estiloVisual === "simple") estiloVisual = "minimal"

  const personalizacion = data.personalizacion || { tipoFondo: "default" }
  const primaryVar = "var(--color-primario)"

  const globalBg = estilos?.colores?.fondo || "#ffffff"
  let bgToCheck = globalBg
  let finalBgStyle: string = "var(--color-fondo)"
  let hasBorderTop = true

  if (personalizacion.tipoFondo === "transparente") {
    finalBgStyle = "transparent"
    hasBorderTop = false
  } else if (personalizacion.tipoFondo === "custom" && personalizacion.colorPersonalizado) {
    bgToCheck = personalizacion.colorPersonalizado
    finalBgStyle = personalizacion.colorPersonalizado
  }

  const finalTextColor = getContrastColor(bgToCheck)
  const borderColor = finalTextColor === "#0f172a" ? "rgba(0,0,0,0.1)" : "rgba(255,255,255,0.2)"

  // --- LÓGICA DE MAPA ---
  const rawLat = data.ubicacion?.lat ?? data.lat
  const rawLng = data.ubicacion?.lng ?? data.lng
  const lat = Number(rawLat)
  const lng = Number(rawLng)
  
  // 1. Verificamos si hay coordenadas válidas
  const hasCoordinates = !isNaN(lat) && !isNaN(lng) && lat !== 0 && lng !== 0
  
  // 2. Verificamos la preferencia del usuario (switch). Default true.
  const userWantsMap = data.mostrarMapa !== false

  // 3. Regla: Si es "Split", forzamos el mapa (si hay coords). Si no, respetamos el switch.
  const isSplit = estiloVisual === "split"
  const hasMap = hasCoordinates && (isSplit || userWantsMap)
  
  const nombreCodificado = encodeURIComponent(data.nombreEmpresa || "Ubicación")
  // URL corregida con '$' y puntero desactivado
  const mapUrl = `https://maps.google.com/maps?q=$${lat},${lng}+(${nombreCodificado})&hl=es&z=15&output=embed&iwloc=near`

  const renderSocialIcons = (iconClass = "h-5 w-5") => {
    const redes = data.redesSociales || {}
    const style = { color: primaryVar }
    return (
      <div className="flex gap-4">
        {redes.linkedin && <Link href={redes.linkedin} target="_blank"><Linkedin className={iconClass} style={style} /></Link>}
        {redes.facebook && <Link href={redes.facebook} target="_blank"><Facebook className={iconClass} style={style} /></Link>}
        {redes.instagram && <Link href={redes.instagram} target="_blank"><Instagram className={iconClass} style={style} /></Link>}
        {redes.twitter && <Link href={redes.twitter} target="_blank"><Twitter className={iconClass} style={style} /></Link>}
        {redes.whatsapp && <Link href={redes.whatsapp} target="_blank"><MessageCircle className={iconClass} style={style} /></Link>}
      </div>
    )
  }

  // --- DISEÑO 1: MINIMALISTA ---
  if (estiloVisual === "minimal") {
    return (
      <footer className={`${hasBorderTop ? "border-t" : ""} py-16`} style={{ backgroundColor: finalBgStyle, color: finalTextColor, borderColor }}>
        <div className="container mx-auto px-4 text-center flex flex-col items-center gap-6">
           {data.logoUrl ? (
              <img src={data.logoUrl} alt={data.nombreEmpresa} className="h-16 w-auto object-contain" />
            ) : (
              <h3 className="text-2xl font-bold" style={{ color: primaryVar }}>{data.nombreEmpresa}</h3>
            )}
            <p className="max-w-lg opacity-80">{data.descripcion}</p>
            {renderSocialIcons()}
            <div className="flex flex-wrap justify-center gap-6 text-sm opacity-80 mt-4">
               {data.email && <a href={`mailto:${data.email}`} className="hover:underline">{data.email}</a>}
               {data.telefono && <a href={`tel:${data.telefono}`} className="hover:underline">{data.telefono}</a>}
               {data.direccion && <span>{data.direccion}</span>}
            </div>
            {data.imagenAdicional && <img src={data.imagenAdicional} alt="Extra" className="h-12 w-auto object-contain mt-4 opacity-80" />}
            <div className="border-t w-full max-w-xs mt-8 pt-8 text-xs opacity-50" style={{ borderColor }}>
              © {new Date().getFullYear()} {data.nombreEmpresa}
            </div>
        </div>
      </footer>
    )
  }

  // --- DISEÑO 2: SPLIT ---
  if (estiloVisual === "split") {
    return (
      <footer className={`${hasBorderTop ? "border-t" : ""}`} style={{ backgroundColor: finalBgStyle, color: finalTextColor, borderColor }}>
        <div className="grid lg:grid-cols-2 min-h-[450px]">
           <div className="p-12 lg:p-20 flex flex-col justify-center gap-8">
              <div>
                {data.logoUrl ? (
                  <img src={data.logoUrl} alt={data.nombreEmpresa} className="h-14 w-auto object-contain mb-4" />
                ) : (
                  <h3 className="text-3xl font-bold mb-4" style={{ color: primaryVar }}>{data.nombreEmpresa}</h3>
                )}
                <p className="opacity-80 text-lg leading-relaxed">{data.descripcion}</p>
              </div>
              <div className="space-y-4 text-sm font-medium">
                  {data.direccion && <div className="flex items-center gap-3"><MapPin className="text-primary"/> {data.direccion}</div>}
                  {data.email && <div className="flex items-center gap-3"><Mail className="text-primary"/> {data.email}</div>}
                  {data.telefono && <div className="flex items-center gap-3"><Phone className="text-primary"/> {data.telefono}</div>}
              </div>
              {renderSocialIcons("h-6 w-6")}
              <div className="text-xs opacity-50 mt-auto pt-8">© {new Date().getFullYear()} {data.nombreEmpresa}</div>
           </div>
           
           <div className="bg-gray-100 relative min-h-[300px]">
              {hasMap ? (
                 <iframe 
                    title="Mapa Grande" 
                    className="absolute inset-0 w-full h-full border-0 pointer-events-none" 
                    loading="lazy" 
                    src={mapUrl} 
                    allowFullScreen 
                 />
              ) : (
                 <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-200">
                    <div className="flex flex-col items-center text-center p-4">
                        <MapPin className="w-10 h-10 mb-2 opacity-20"/>
                        <p>Sin ubicación definida.<br/><span className="text-xs">Haz clic en el mapa del admin para fijarla.</span></p>
                    </div>
                 </div>
              )}
           </div>
        </div>
      </footer>
    )
  }

  // --- DISEÑO 3: CLÁSICO ---
  return (
    <footer className={`${hasBorderTop ? "border-t" : ""} pt-16 pb-8`} style={{ backgroundColor: finalBgStyle, color: finalTextColor, borderColor }}>
      <div className="container mx-auto px-4">
        <div className="grid gap-12 lg:grid-cols-5 mb-14">
          <div className="flex flex-col gap-6 lg:col-span-1">
            {data.logoUrl ? <img src={data.logoUrl} alt={data.nombreEmpresa} className="h-16 md:h-20 w-auto object-contain" /> : <h3 className="text-3xl font-bold" style={{ color: primaryVar }}>{data.nombreEmpresa}</h3>}
            <p className="opacity-80">{data.descripcion}</p>
            {renderSocialIcons()}
            {data.imagenAdicional && <img src={data.imagenAdicional} alt="Imagen adicional" className="w-full aspect-[3/1] max-h-[120px] object-cover rounded-xl shadow-sm" />}
          </div>
          
          <div className="lg:col-span-1">
            <h4 className="font-semibold text-xl mb-4" style={{ color: primaryVar }}>Enlaces</h4>
            {navLinks && navLinks.length > 0 ? (
                <ul className="space-y-2 opacity-80">
                {navLinks.map((l, i) => (
                    <li key={i}><Link href={l.url} className="hover:underline">{l.nombre}</Link></li>
                ))}
                </ul>
            ) : (
                <p className="text-sm opacity-50 italic">No hay enlaces configurados.</p>
            )}
          </div>
          
          <div className="lg:col-span-1">
            <h4 className="font-semibold text-xl mb-4" style={{ color: primaryVar }}>Contacto</h4>
            <ul className="space-y-3 opacity-80">
              {data.telefono && <li className="flex gap-2 items-center"><Phone className="h-5 w-5" style={{ color: primaryVar }} /><a href={`tel:${data.telefono}`} className="hover:underline">{data.telefono}</a></li>}
              {data.email && <li className="flex gap-2 items-center"><Mail className="h-5 w-5" style={{ color: primaryVar }} /><a href={`mailto:${data.email}`} className="hover:underline">{data.email}</a></li>}
              {data.direccion && <li className="flex gap-2"><MapPin className="h-5 w-5 mt-1" style={{ color: primaryVar }} />{data.direccion}</li>}
            </ul>
          </div>
          
          {hasMap && (
            <div className="rounded-xl overflow-hidden shadow-lg h-96 lg:col-span-2 relative">
              <iframe 
                 title="Mapa Pequeño" 
                 className="w-full h-full border-0 pointer-events-none" 
                 loading="lazy" 
                 src={mapUrl} 
                 allowFullScreen
              />
              <a 
                 href={`https://maps.google.com/maps?q=$${lat},${lng}`} 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="absolute inset-0 z-10"
                 aria-label="Abrir mapa en Google Maps"
              />
            </div>
          )}
        </div>
        <div className="border-t pt-6 text-center text-sm opacity-60" style={{ borderColor }}>
          © {new Date().getFullYear()} {data.nombreEmpresa}. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  )
}