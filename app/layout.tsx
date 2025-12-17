import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import DynamicFavicon from "@/components/DynamicFavicon"

const geist = Geist({ subsets: ["latin"] })
const geistMono = Geist_Mono({ subsets: ["latin"] }) // queda importada pero NO global

export const metadata: Metadata = {
  title: "Landing page con Admin CMS",
  description: "Creado por Ulieet",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={`${geist.className} font-sans antialiased min-h-screen flex flex-col`}
      >
        <DynamicFavicon />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
