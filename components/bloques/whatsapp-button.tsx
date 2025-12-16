"use client"

import { MessageCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface WhatsappFloatingButtonProps {
  // Aceptamos data si viene de un bloque, o props directas si se usa en layout
  data?: {
    numero?: string
    mensaje?: string
  }
  numero?: string
  mensaje?: string
  className?: string
}

export function WhatsappFloatingButton({ numero, mensaje, data, className }: WhatsappFloatingButtonProps) {
  // Priorizamos los datos del bloque (data) si existen, sino usamos las props directas
  const finalNumber = data?.numero || numero
  const finalMessage = data?.mensaje || mensaje

  if (!finalNumber) return null

  const cleanNumber = finalNumber.replace(/\D/g, '')
  const whatsappLink = `https://wa.me/${cleanNumber}${finalMessage ? `?text=${encodeURIComponent(finalMessage)}` : ""}`

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "fixed bottom-8 right-6 md:bottom-10 md:right-10 z-50 flex w-14 h-14 md:w-16 md:h-16 items-center justify-center rounded-full bg-[#25D366] text-white shadow-2xl transition-all duration-300 hover:scale-110 hover:bg-[#20bd5a] hover:rotate-3 focus:outline-none focus:ring-4 focus:ring-[#25D366]/50",
        className,
      )}
      aria-label="Contactar por WhatsApp"
    >
      <MessageCircle className="h-7 w-7 md:h-9 md:w-9" />
      
      {/* Onda de animación opcional (Ping) */}
      <span className="absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-20 animate-ping"></span>
    </a>
  )
}