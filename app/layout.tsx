import type { Metadata } from "next"
import { Geist } from "next/font/google"
import { Toaster } from "@/components/ui/toaster"
import "./globals.css"
import DynamicFavicon from "@/components/DynamicFavicon"
import { ThemeInitializer } from "@/components/theme-initializer"

const geist = Geist({ subsets: ["latin"] })

// 1. Limpiamos iconos de los metadatos para que Next.js no genere etiquetas <link>
export const metadata: Metadata = {
  title: "Mi Sitio Web",
  description: "Powered by Page Builder",
  icons: {
    icon: [], // Esto le dice a Next.js que no genere iconos predeterminados
    apple: [],
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        {/* El DynamicFavicon debe estar aquí para que el navegador lo lea lo antes posible */}
        <ThemeInitializer />
      </head>
      <body className={`${geist.className} antialiased min-h-screen flex flex-col bg-background text-foreground`}>
        <DynamicFavicon />
        {children}
        <Toaster />
      </body>
    </html>
  )
}