"use client"

import { MessageCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface WhatsappFloatingButtonProps {
  numero?: string
  mensaje?: string
  className?: string
}

export function WhatsappFloatingButton({ numero, mensaje, className }: WhatsappFloatingButtonProps) {
  if (!numero) return null

  const cleanNumber = numero.replace(/\D/g, '')
  
  const whatsappLink = `https://wa.me/${cleanNumber}${mensaje ? `?text=${encodeURIComponent(mensaje)}` : ""}`

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "fixed bottom-10 right-16 z-50 flex w-16 h-16 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl transition-all hover:scale-110 hover:bg-[#20bd5a] focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2",
        className,
      )}
      aria-label="Chatear con nosotros en WhatsApp"
    >
      <MessageCircle className="h-9 w-9" />
    </a>
  )
}