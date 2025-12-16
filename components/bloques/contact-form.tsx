"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface ContactFormData {
  titulo: string
  descripcion: string
  telefono: string
  email: string
  horario: string
}

export function BloqueContactForm({ data }: { data: ContactFormData }) {
  return (
    <section className="py-20 bg-[var(--color-fondo)] text-[var(--color-texto)]" id="contacto">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-16">
          
          {/* Información */}
          <div>
            <h2 className="text-4xl font-bold mb-6" style={{ color: "var(--color-primario)" }}>
                {data.titulo}
            </h2>
            <p className="opacity-80 mb-10 text-lg leading-relaxed">
                {data.descripcion}
            </p>
            
            <div className="space-y-6">
              <div className="pl-4 border-l-2" style={{ borderColor: "var(--color-primario)" }}>
                <h3 className="font-bold mb-1 uppercase text-sm tracking-wider opacity-60">Teléfono</h3>
                <p className="font-medium text-lg">{data.telefono}</p>
              </div>
              <div className="pl-4 border-l-2" style={{ borderColor: "var(--color-primario)" }}>
                <h3 className="font-bold mb-1 uppercase text-sm tracking-wider opacity-60">Email</h3>
                <p className="font-medium text-lg">{data.email}</p>
              </div>
              <div className="pl-4 border-l-2" style={{ borderColor: "var(--color-primario)" }}>
                <h3 className="font-bold mb-1 uppercase text-sm tracking-wider opacity-60">Horario</h3>
                <p className="font-medium text-lg">{data.horario}</p>
              </div>
            </div>
          </div>
          
          {/* Formulario */}
          <div className="rounded-2xl p-8 border shadow-sm bg-white/80">
            <h3 className="text-2xl font-bold mb-6" style={{ color: "var(--color-primario)" }}>
                Envíenos un mensaje
            </h3>
            <form className="space-y-5">
              <div>
                <Label htmlFor="nombre">Nombre Completo *</Label>
                <Input id="nombre" required className="bg-white" />
              </div>
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input id="email" type="email" required className="bg-white" />
              </div>
              <div>
                <Label htmlFor="telefono">Teléfono *</Label>
                <Input id="telefono" type="tel" required className="bg-white" />
              </div>
              <div>
                <Label htmlFor="mensaje">Mensaje *</Label>
                <Textarea id="mensaje" rows={4} required className="bg-white" />
              </div>
              
              <Button type="submit" className="w-full h-12 text-lg font-semibold text-white mt-2" 
                      style={{ backgroundColor: "var(--color-primario)" }}>
                Enviar consulta
              </Button>
            </form>
          </div>
          
        </div>
      </div>
    </section>
  )
}