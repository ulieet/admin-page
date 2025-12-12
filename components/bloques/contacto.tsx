import type { ContactoBlock } from "@/lib/types/blocks"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone } from "lucide-react"

interface ContactoProps {
  data: ContactoBlock["datos"]
}

export function BloqueContacto({ data }: ContactoProps) {
  return (
    <section id="contacto" className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">{data.titulo}</h2>
          <p className="text-lg text-muted-foreground">{data.subtitulo}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="flex items-center gap-4 p-4 rounded-lg border bg-card">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
              <Mail className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="font-medium">{data.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-4 rounded-lg border bg-card">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
              <Phone className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Teléfono</p>
              <p className="font-medium">{data.telefono}</p>
            </div>
          </div>
        </div>

        <form className="space-y-6 bg-card p-8 rounded-lg border">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="nombre" className="text-sm font-medium">
                Nombre
              </label>
              <Input id="nombre" placeholder="Tu nombre" />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <Input id="email" type="email" placeholder="tu@email.com" />
            </div>
          </div>
          <div className="space-y-2">
            <label htmlFor="mensaje" className="text-sm font-medium">
              Mensaje
            </label>
            <Textarea id="mensaje" placeholder="Tu mensaje..." rows={5} />
          </div>
          <Button type="submit" className="w-full" size="lg">
            Enviar Mensaje
          </Button>
        </form>
      </div>
    </section>
  )
}
