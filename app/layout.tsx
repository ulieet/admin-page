import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Toaster } from "@/components/ui/toaster"
import "./globals.css"
import DynamicFavicon from "@/components/DynamicFavicon"

const inter = Inter({ subsets: ["latin"] })

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
    <html lang="es">
      <body className={`${inter.className} antialiased min-h-screen flex flex-col bg-background text-foreground`}>
        <DynamicFavicon />
        {children}
        <Toaster />
      </body>
    </html>
  )
}