"use client"

import { Linkedin, Instagram } from "lucide-react"
import Image from "next/image"
import type { StyleConfig } from "@/lib/types/blocks"

interface FooterData {
  nombreEmpresa: string
  descripcion: string
  email: string
  telefono: string
  direccion: string
  imagenMapa: string
  redesSociales: {
    linkedin: string
    instagram: string
  }
}

export function BloqueFooter({ data, estilos }: { data: FooterData; estilos?: StyleConfig }) {
  const bgColor = estilos?.colores.secundario || "#1e293b"
  const textColor = estilos?.colores.texto || "#ffffff"
  const accentColor = estilos?.colores.primario || "#3b82f6"

  return (
    <footer className="text-white py-12" style={{ backgroundColor: bgColor, color: textColor }}>
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4">{data.nombreEmpresa}</h3>
            <p className="opacity-80 mb-4">{data.descripcion}</p>
            <div className="flex gap-3">
              {data.redesSociales.linkedin && (
                <a
                  href={data.redesSociales.linkedin}
                  className="transition-colors"
                  style={{ color: textColor }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = accentColor)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = textColor)}
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              )}
              {data.redesSociales.instagram && (
                <a
                  href={data.redesSociales.instagram}
                  className="transition-colors"
                  style={{ color: textColor }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = accentColor)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = textColor)}
                >
                  <Instagram className="h-5 w-5" />
                </a>
              )}
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contacto</h4>
            <div className="space-y-2 opacity-80">
              <p>{data.email}</p>
              <p>{data.telefono}</p>
              <p>{data.direccion}</p>
            </div>
          </div>
          <div>
            {data.imagenMapa ? (
              <Image
                src={data.imagenMapa || "/placeholder.svg"}
                alt="Mapa ubicación"
                width={400}
                height={300}
                className="rounded-lg"
              />
            ) : (
              <div
                className="w-full h-48 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: `${bgColor}dd`, opacity: 0.6 }}
              >
                <span>Mapa ubicación</span>
              </div>
            )}
          </div>
        </div>
        <div className="border-t pt-6 text-center opacity-70" style={{ borderColor: `${textColor}33` }}>
          <p>
            &copy; {new Date().getFullYear()} {data.nombreEmpresa}. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
