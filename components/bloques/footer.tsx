"use client"

import type { FooterBlock } from "@/lib/types/blocks"
import {
  Facebook,
  Linkedin,
  Instagram,
  Twitter,
  MessageCircle,
} from "lucide-react"
import Link from "next/link"



function getContrastColor(hexColor?: string) {
  if (!hexColor || !hexColor.startsWith("#")) return "#0f172a"
  const r = parseInt(hexColor.slice(1, 3), 16)
  const g = parseInt(hexColor.slice(3, 5), 16)
  const b = parseInt(hexColor.slice(5, 7), 16)
  const yiq = (r * 299 + g * 587 + b * 114) / 1000
  return yiq >= 128 ? "#0f172a" : "#ffffff"
}

function normalizeCoord(value: unknown): number | null {
  if (value === null || value === undefined) return null
  if (typeof value === "string") {
    const n = Number(value.replace(",", "."))
    return Number.isFinite(n) ? n : null
  }
  return Number.isFinite(Number(value)) ? Number(value) : null
}



interface BloqueFooterProps {
  data?: FooterBlock["datos"] & {
    logoUrl?: string
    lat?: number | string | null
    lng?: number | string | null
    ubicacion?: { lat?: number | string; lng?: number | string }
    estiloVisual?: "clasico" | "minimal"
  }
  navLinks?: Array<{ nombre: string; url: string }>
  estilos?: any
}



export function BloqueFooter({
  data,
  navLinks = [],
  estilos,
}: BloqueFooterProps) {
  if (!data) return null

  const estiloVisual = data.estiloVisual === "minimal" ? "minimal" : "clasico"

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

 

  const lat = normalizeCoord(data.ubicacion?.lat ?? data.lat)
  const lng = normalizeCoord(data.ubicacion?.lng ?? data.lng)

  const hasMap = lat !== null && lng !== null


  const renderSocialIcons = () => {
    const redes = data.redesSociales || {}
    const style = { color: primaryVar }

    return (
      <div className="flex gap-4">
        {redes.linkedin && (
          <Link href={redes.linkedin} target="_blank">
            <Linkedin className="h-5 w-5" style={style} />
          </Link>
        )}
        {redes.facebook && (
          <Link href={redes.facebook} target="_blank">
            <Facebook className="h-5 w-5" style={style} />
          </Link>
        )}
        {redes.instagram && (
          <Link href={redes.instagram} target="_blank">
            <Instagram className="h-5 w-5" style={style} />
          </Link>
        )}
        {redes.twitter && (
          <Link href={redes.twitter} target="_blank">
            <Twitter className="h-5 w-5" style={style} />
          </Link>
        )}
        {redes.whatsapp && (
          <Link href={redes.whatsapp} target="_blank">
            <MessageCircle className="h-5 w-5" style={style} />
          </Link>
        )}
      </div>
    )
  }

  

  if (estiloVisual === "minimal") {
    return (
      <footer
        className={`${hasBorderTop ? "border-t" : ""} py-16`}
        style={{ backgroundColor: finalBgStyle, color: finalTextColor, borderColor }}
      >
        <div className="container mx-auto px-4 text-center flex flex-col items-center gap-6">
          {data.logoUrl ? (
            <img src={data.logoUrl} alt={data.nombreEmpresa} className="h-16 w-auto" />
          ) : (
            <h3 className="text-2xl font-bold" style={{ color: primaryVar }}>
              {data.nombreEmpresa}
            </h3>
          )}
          {renderSocialIcons()}
        </div>
      </footer>
    )
  }

  

  return (
    <footer
      className={`${hasBorderTop ? "border-t" : ""} pt-16 pb-8`}
      style={{ backgroundColor: finalBgStyle, color: finalTextColor, borderColor }}
    >
      <div className="container mx-auto px-4 grid gap-12 lg:grid-cols-3">
        <div className="flex flex-col gap-6">
          <h3 className="text-3xl font-bold" style={{ color: primaryVar }}>
            {data.nombreEmpresa}
          </h3>
          {renderSocialIcons()}
        </div>

        <div>
          <h4 className="font-semibold mb-4" style={{ color: primaryVar }}>
            Enlaces
          </h4>
          <ul className="space-y-2 opacity-80">
            {navLinks.map((l, i) => (
              <li key={i}>
                <Link href={l.url}>{l.nombre}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-4" style={{ color: primaryVar }}>
            Ubicación
          </h4>

          {hasMap ? (
            <iframe
              className="w-full h-56 rounded-lg border"
              src={`https://www.google.com/maps?q=${lat},${lng}&z=14&output=embed`}
              loading="lazy"
            />
          ) : (
            <p className="opacity-60">Ubicación no disponible</p>
          )}
        </div>
      </div>
    </footer>
  )
}
