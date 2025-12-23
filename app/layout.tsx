import type { Metadata } from "next"
import { Geist } from "next/font/google"
import { Toaster } from "@/components/ui/toaster"
import "./globals.css"
import DynamicFavicon from "@/components/DynamicFavicon"
import { ThemeInitializer } from "@/components/theme-initializer"

const geist = Geist({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Mi Sitio Web",
  description: "Powered by Page Builder",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    // AGREGADO: suppressHydrationWarning evita el error "Attributes didn't match..."
    <html lang="es" suppressHydrationWarning>
      <head>
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