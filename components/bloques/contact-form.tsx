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
    <section className="py-16 bg-background" id="contacto">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-4xl font-bold mb-4">{data.titulo}</h2>
            <p className="text-muted-foreground mb-8">{data.descripcion}</p>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-1">Teléfono</h3>
                <p className="text-muted-foreground">{data.telefono}</p>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Email</h3>
                <p className="text-muted-foreground">{data.email}</p>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Horario</h3>
                <p className="text-muted-foreground">{data.horario}</p>
              </div>
            </div>
          </div>
          <div className="bg-primary/5 rounded-lg p-8">
            <h3 className="text-2xl font-bold mb-6 text-primary">Formulario de contacto</h3>
            <form className="space-y-4">
              <div>
                <Label htmlFor="nombre">Nombre Completo *</Label>
                <Input id="nombre" required />
              </div>
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input id="email" type="email" required />
              </div>
              <div>
                <Label htmlFor="telefono">Teléfono *</Label>
                <Input id="telefono" type="tel" required />
              </div>
              <div>
                <Label htmlFor="empresa">Empresa</Label>
                <Input id="empresa" />
              </div>
              <div>
                <Label htmlFor="mensaje">Mensaje *</Label>
                <Textarea id="mensaje" rows={5} required />
              </div>
              <Button type="submit" className="w-full">
                Enviar consulta
              </Button>
              <p className="text-sm text-muted-foreground">* Campos obligatorios</p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
