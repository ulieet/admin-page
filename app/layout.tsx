import type { Metadata } from "next"
import { Geist } from "next/font/google"
import "./globals.css"

import { Toaster } from "@/components/ui/toaster"
import DynamicFavicon from "@/components/DynamicFavicon"
import { ThemeInitializer } from "@/components/theme-initializer"

const geist = Geist({ subsets: ["latin"] })

// ✅ FAVICON SERVER-SIDE → carga SIEMPRE al refrescar
export const metadata: Metadata = {
  title: "Mi Sitio Web",
  description: "Powered by Page Builder",
  icons: {
    icon: "/dynamic-favicon.png",
    apple: "/dynamic-favicon.png",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={`${geist.className} antialiased min-h-screen flex flex-col bg-background text-foreground`}
      >
        {/* Componentes que tocan DOM */}
        <ThemeInitializer />
        <DynamicFavicon />

        {children}
        <Toaster />
      </body>
    </html>
  )
}
