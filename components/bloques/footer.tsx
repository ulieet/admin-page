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
  const borderColor =
    finalTextColor === "#0f172a"
      ? "rgba(0,0,0,0.1)"
      : "rgba(255,255,255,0.2)"

  const renderSocialIcons = (iconClass = "h-5 w-5") => {
    const redes = data.redesSociales || {}
    const style = { color: primaryVar }

    return (
      <>
        {redes.linkedin && (
          <Link href={redes.linkedin} target="_blank">
            <Linkedin className={iconClass} style={style} />
          </Link>
        )}
        {redes.facebook && (
          <Link href={redes.facebook} target="_blank">
            <Facebook className={iconClass} style={style} />
          </Link>
        )}
        {redes.instagram && (
          <Link href={redes.instagram} target="_blank">
            <Instagram className={iconClass} style={style} />
          </Link>
        )}
        {redes.twitter && (
          <Link href={redes.twitter} target="_blank">
            <Twitter className={iconClass} style={style} />
          </Link>
        )}
        {redes.whatsapp && (
          <Link href={redes.whatsapp} target="_blank">
            <MessageCircle className={iconClass} style={style} />
          </Link>
        )}
      </>
    )
  }

  return (
    <footer
      className={`${hasBorderTop ? "border-t" : ""} pt-14 pb-8`}
      style={{
        backgroundColor: finalBgStyle,
        color: finalTextColor,
        borderColor,
      }}
    >
      <div className="container mx-auto px-4">
        {/* ================= SIMPLE ================= */}
        {estiloVisual === "simple" ? (
          <div className="flex flex-col items-center gap-6 text-center">
            <h3 className="text-2xl font-bold" style={{ color: primaryVar }}>
              {data.nombreEmpresa}
            </h3>

            {data.descripcion && (
              <p className="text-sm opacity-70 max-w-xl">
                {data.descripcion}
              </p>
            )}

            <div className="flex gap-4">
              {renderSocialIcons()}
            </div>

            <p className="opacity-60 text-sm">
              © {new Date().getFullYear()} {data.nombreEmpresa}
            </p>
          </div>
        ) : (
          /* ================= COMPLETO ================= */
          <>
            <div className="grid gap-12 lg:grid-cols-4 mb-14">
              {/* Empresa */}
              <div className="space-y-4 lg:col-span-1">
                <h3 className="text-3xl font-bold" style={{ color: primaryVar }}>
                  {data.nombreEmpresa}
                </h3>
                <p className="opacity-80 text-base leading-relaxed">
                  {data.descripcion}
                </p>
                <div className="flex gap-4">
                  {renderSocialIcons("h-6 w-6")}
                </div>
              </div>

              {/* Enlaces */}
              <div className="space-y-4">
                <h4 className="font-semibold text-xl" style={{ color: primaryVar }}>
                  Enlaces
                </h4>
                <ul className="space-y-2 text-base opacity-80">
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
                <h4 className="font-semibold text-xl" style={{ color: primaryVar }}>
                  Contacto
                </h4>
                <ul className="space-y-3 text-base opacity-80">
                  {data.telefono && (
                    <li className="flex gap-2 items-center">
                      <Phone className="h-5 w-5" style={{ color: primaryVar }} />
                      {data.telefono}
                    </li>
                  )}
                  {data.email && (
                    <li className="flex gap-2 items-center">
                      <Mail className="h-5 w-5" style={{ color: primaryVar }} />
                      {data.email}
                    </li>
                  )}
                  {data.direccion && (
                    <li className="flex gap-2 items-start">
                      <MapPin className="h-5 w-5 mt-1" style={{ color: primaryVar }} />
                      {data.direccion}
                    </li>
                  )}
                </ul>
              </div>

              {/* Mapa */}
              {data.lat && data.lng && (
                <div className="w-full h-[320px] lg:h-full rounded-xl overflow-hidden shadow-md lg:col-span-1">
                  <iframe
                    title="Mapa"
                    loading="lazy"
                    className="w-full h-full border-0"
                    src={`https://maps.google.com/maps?q=${data.lat},${data.lng}&hl=es&z=15&output=embed`}
                  />
                </div>
              )}
            </div>

            <div
              className="pt-8 border-t text-center text-sm opacity-60"
              style={{ borderColor }}
            >
              © {new Date().getFullYear()} {data.nombreEmpresa}. Todos los derechos reservados.
            </div>
          </>
        )}
      </div>
    </footer>
  )
}
