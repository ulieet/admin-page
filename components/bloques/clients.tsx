"use client"

import Image from "next/image"

interface ClientsData {
  titulo: string
  subtitulo: string
  empresas: Array<{
    nombre: string
    logo: string
  }>
}

export function BloqueClients({ data }: { data: ClientsData }) {
  return (
    <section className="py-16 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3">{data.titulo}</h2>
          <p className="text-muted-foreground">{data.subtitulo}</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {data.empresas.map((empresa, index) => (
            <div key={index} className="flex items-center justify-center p-6 bg-background rounded-lg">
              {empresa.logo ? (
                <Image
                  src={empresa.logo || "/placeholder.svg"}
                  alt={empresa.nombre}
                  width={120}
                  height={60}
                  className="object-contain"
                />
              ) : (
                <span className="text-lg font-semibold text-muted-foreground">{empresa.nombre}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
