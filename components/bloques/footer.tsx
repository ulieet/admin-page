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
  const r = parseInt(hexColor.substr(1, 2), 16)
  const g = parseInt(hexColor.substr(3, 2), 16)
  const b = parseInt(hexColor.substr(5, 2), 16)
  const yiq = (r * 299 + g * 587 + b * 114) / 1000
  return yiq >= 128 ? "#0f172a" : "#ffffff"
}

interface BloqueFooterProps {
  data: FooterBlock["datos"]
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
  const isDarkText = finalTextColor === "#0f172a"
  const borderColor = isDarkText
    ? "rgba(0,0,0,0.1)"
    : "rgba(255,255,255,0.2)"

  const renderSocialIcons = (iconClass = "h-5 w-5") => {
    const redes = data.redesSociales || {}
    const iconStyle = { color: primaryVar }

    return (
      <>
        {redes.linkedin && (
          <Link href={redes.linkedin} target="_blank">
            <Linkedin className={iconClass} style={iconStyle} />
          </Link>
        )}
        {redes.facebook && (
          <Link href={redes.facebook} target="_blank">
            <Facebook className={iconClass} style={iconStyle} />
          </Link>
        )}
        {redes.instagram && (
          <Link href={redes.instagram} target="_blank">
            <Instagram className={iconClass} style={iconStyle} />
          </Link>
        )}
        {redes.twitter && (
          <Link href={redes.twitter} target="_blank">
            <Twitter className={iconClass} style={iconStyle} />
          </Link>
        )}
        {redes.whatsapp && (
          <Link href={redes.whatsapp} target="_blank">
            <MessageCircle className={iconClass} style={iconStyle} />
          </Link>
        )}
      </>
    )
  }

  return (
    <footer
      className={`${hasBorderTop ? "border-t" : ""} pt-16 pb-8`}
      style={{
        backgroundColor: finalBgStyle,
        color: finalTextColor,
        borderColor,
      }}
    >
      <div className="container mx-auto px-4">
        {estiloVisual === "simple" ? (
          <div className="flex flex-col items-center gap-6 text-center">
            <h3
              className="text-2xl font-bold"
              style={{ color: primaryVar }}
            >
              {data.nombreEmpresa}
            </h3>
            <div className="flex gap-4">{renderSocialIcons()}</div>
            <p className="opacity-60 text-sm">
              © {new Date().getFullYear()} {data.nombreEmpresa}
            </p>
          </div>
        ) : (
          <>
            <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4 mb-12">
              {/* Empresa */}
              <div className="space-y-4">
                <h3
                  className="text-2xl font-bold"
                  style={{ color: primaryVar }}
                >
                  {data.nombreEmpresa}
                </h3>
                <p className="opacity-80 text-sm">
                  {data.descripcion}
                </p>
                <div className="flex gap-4">
                  {renderSocialIcons()}
                </div>
              </div>

              {/* Enlaces */}
              <div className="space-y-4">
                <h4
                  className="font-semibold text-lg"
                  style={{ color: primaryVar }}
                >
                  Enlaces
                </h4>
                <ul className="space-y-2 text-sm opacity-80">
                  {navLinks.length ? (
                    navLinks.map((l, i) => (
                      <li key={i}>
                        <Link href={l.url} className="hover:underline">
                          {l.nombre}
                        </Link>
                      </li>
                    ))
                  ) : (
                    <li>
                      <Link href="/" className="hover:underline">
                        Inicio
                      </Link>
                    </li>
                  )}
                </ul>
              </div>

              {/* Contacto */}
              <div className="space-y-4">
                <h4
                  className="font-semibold text-lg"
                  style={{ color: primaryVar }}
                >
                  Contacto
                </h4>
                <ul className="space-y-3 text-sm opacity-80">
                  {data.telefono && (
                    <li className="flex gap-2 items-center">
                      <Phone className="h-4 w-4" style={{ color: primaryVar }} />
                      {data.telefono}
                    </li>
                  )}
                  {data.email && (
                    <li className="flex gap-2 items-center">
                      <Mail className="h-4 w-4" style={{ color: primaryVar }} />
                      {data.email}
                    </li>
                  )}
                  {data.direccion && (
                    <li className="flex gap-2 items-start">
                      <MapPin
                        className="h-4 w-4 mt-1"
                        style={{ color: primaryVar }}
                      />
                      {data.direccion}
                    </li>
                  )}
                </ul>
              </div>

              {/* MAPA GRANDE */}
              <div className="relative rounded-xl overflow-hidden shadow-md bg-slate-100 min-h-[300px] md:min-h-[380px] lg:min-h-[420px]">
                {data.lat && data.lng ? (
                  <>
                    <iframe
                      title="Mapa"
                      loading="lazy"
                      className="absolute inset-0 w-full h-full border-0"
                      src={`https://maps.google.com/maps?q=${data.lat},${data.lng}&hl=es&z=15&output=embed`}
                    />
                    <a
                      href={`https://www.google.com/maps?q=${data.lat},${data.lng}`}
                      target="_blank"
                      className="absolute bottom-3 right-3 bg-white/90 text-xs px-3 py-1 rounded shadow hover:bg-white transition"
                    >
                      Ver en Google Maps
                    </a>
                  </>
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center opacity-50">
                    <MapPin className="h-8 w-8 mb-2" />
                    <span className="text-xs text-center">
                      Seleccioná la ubicación en el administrador
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div
              className="pt-8 border-t text-center text-sm opacity-60"
              style={{ borderColor }}
            >
              © {new Date().getFullYear()} {data.nombreEmpresa}. Todos los
              derechos reservados.
            </div>
          </>
        )}
      </div>
    </footer>
  )
}
