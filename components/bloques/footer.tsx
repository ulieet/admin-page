"use client"

import type { FooterBlock } from "@/lib/types/blocks"
import {
  Facebook,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Instagram,
  Twitter,
  MessageCircle,
} from "lucide-react"
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
  }
  navLinks?: Array<{ nombre: string; url: string }>
  estilos?: any
}

export function BloqueFooter({
  data,
  navLinks = [],
  estilos,
}: BloqueFooterProps) {
  const estiloVisual = data.estiloVisual || "completo"
  const personalizacion = data.personalizacion || { tipoFondo: "default" }
  const primaryVar = "var(--color-primario)"

  const globalBg = estilos?.colores?.fondo || "#ffffff"
  let bgToCheck = globalBg
  let finalBgStyle: string = "var(--color-fondo)"
  let hasBorderTop = true

  if (personalizacion.tipoFondo === "transparente") {
    finalBgStyle = "transparent"
    hasBorderTop = false
  } else if (
    personalizacion.tipoFondo === "custom" &&
    personalizacion.colorPersonalizado
  ) {
    bgToCheck = personalizacion.colorPersonalizado
    finalBgStyle = personalizacion.colorPersonalizado
  }

  const finalTextColor = getContrastColor(bgToCheck)
  const borderColor =
    finalTextColor === "#0f172a"
      ? "rgba(0,0,0,0.1)"
      : "rgba(255,255,255,0.2)"

  // 🔥 FIX DEFINITIVO MAPA
  const lat = Number(data.lat)
  const lng = Number(data.lng)
  const hasMap = Number.isFinite(lat) && Number.isFinite(lng)

  const renderSocialIcons = (iconClass = "h-5 w-5") => {
    const redes = data.redesSociales || {}
    const style = { color: primaryVar }

    return (
      <>
        {redes.linkedin && <Link href={redes.linkedin} target="_blank"><Linkedin className={iconClass} style={style} /></Link>}
        {redes.facebook && <Link href={redes.facebook} target="_blank"><Facebook className={iconClass} style={style} /></Link>}
        {redes.instagram && <Link href={redes.instagram} target="_blank"><Instagram className={iconClass} style={style} /></Link>}
        {redes.twitter && <Link href={redes.twitter} target="_blank"><Twitter className={iconClass} style={style} /></Link>}
        {redes.whatsapp && <Link href={redes.whatsapp} target="_blank"><MessageCircle className={iconClass} style={style} /></Link>}
      </>
    )
  }

  return (
    <footer
      className={`${hasBorderTop ? "border-t" : ""} pt-16 pb-8`}
      style={{ backgroundColor: finalBgStyle, color: finalTextColor, borderColor }}
    >
      <div className="container mx-auto px-4">
        <div className="grid gap-12 lg:grid-cols-4 mb-14">
          {/* Empresa */}
          <div className="flex flex-col gap-6">
            {data.logoUrl ? (
              <img src={data.logoUrl} alt={data.nombreEmpresa} className="h-16 md:h-20 w-auto object-contain" />
            ) : (
              <h3 className="text-3xl font-bold" style={{ color: primaryVar }}>
                {data.nombreEmpresa}
              </h3>
            )}

            <p className="opacity-80">{data.descripcion}</p>
            <div className="flex gap-4">{renderSocialIcons()}</div>

            {data.imagenAdicional && (
              <img
                src={data.imagenAdicional}
                alt="Imagen adicional"
                className="w-full aspect-[3/1] max-h-[120px] object-cover rounded-xl shadow-sm"
              />
            )}
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-xl mb-4" style={{ color: primaryVar }}>
              Enlaces
            </h4>
            <ul className="space-y-2 opacity-80">
              {navLinks.map((l, i) => (
                <li key={i}>
                  <Link href={l.url} className="hover:underline">
                    {l.nombre}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h4 className="font-semibold text-xl mb-4" style={{ color: primaryVar }}>
              Contacto
            </h4>
            <ul className="space-y-3 opacity-80">
              {data.telefono && (
                <li className="flex gap-2 items-center">
                  <Phone className="h-5 w-5" style={{ color: primaryVar }} />
                  <a href={`tel:${data.telefono}`} className="hover:underline">
                    {data.telefono}
                  </a>
                </li>
              )}
              {data.email && (
                <li className="flex gap-2 items-center">
                  <Mail className="h-5 w-5" style={{ color: primaryVar }} />
                  <a href={`mailto:${data.email}`} className="hover:underline">
                    {data.email}
                  </a>
                </li>
              )}
              {data.direccion && (
                <li className="flex gap-2">
                  <MapPin className="h-5 w-5 mt-1" style={{ color: primaryVar }} />
                  {data.direccion}
                </li>
              )}
            </ul>
          </div>

          {/* MAPA */}
          {hasMap && (
            <div className="rounded-xl overflow-hidden shadow-lg">
              <iframe
                title="Mapa"
                className="w-full h-full min-h-[220px] border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src={`https://maps.google.com/maps?q=${lat},${lng}&z=15&output=embed`}
              />
            </div>
          )}
        </div>

        <div className="border-t pt-6 text-center text-sm opacity-60">
          © {new Date().getFullYear()} {data.nombreEmpresa}. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  )
}
