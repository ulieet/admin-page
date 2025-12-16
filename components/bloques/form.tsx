"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { MapPin, Clock, Phone, Mail, Send } from "lucide-react"

interface BloqueFormProps {
  data: any
  variant?: string
}

export function BloqueForm({ data, variant = "default" }: BloqueFormProps) {
  const title = data.title || "CONTACTANOS"
  const description = data.description || "Realice su consulta y nos pondremos en contacto a la brevedad."
  const buttonText = data.buttonText || "ENVIAR"
  
  const address = data.address || "Dirección comercial aquí"
  const hours = data.hours || "Lunes a viernes de 9:00 a 18:00 hs"
  const phone = data.phone
  const emailDisplay = data.emailDisplay

  const primaryColor = "var(--color-primario)"
  const bgColor = "var(--color-fondo)"
  const textColor = "var(--color-texto)"

  // --- MODERN (Tarjeta Flotante) ---
  if (variant === "modern") {
    return (
      <section className="py-24 px-4 bg-slate-100">
        <div className="container mx-auto">
          <Card className="max-w-2xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden border-0">
             <div className="p-10 md:p-14">
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold text-slate-900 mb-4">{title}</h2>
                    <p className="text-slate-500">{description}</p>
                </div>
                <form className="space-y-5">
                    <div className="grid md:grid-cols-2 gap-5">
                        <div className="space-y-2"><Label>Nombre</Label><Input className="bg-slate-50 border-slate-200" style={{ caretColor: primaryColor }} /></div>
                        <div className="space-y-2"><Label>Apellido</Label><Input className="bg-slate-50 border-slate-200" style={{ caretColor: primaryColor }} /></div>
                    </div>
                    <div className="space-y-2"><Label>Email</Label><Input type="email" className="bg-slate-50 border-slate-200" style={{ caretColor: primaryColor }} /></div>
                    <div className="space-y-2"><Label>Mensaje</Label><Textarea className="min-h-[120px] bg-slate-50 border-slate-200" style={{ caretColor: primaryColor }} /></div>
                    
                    <Button className="w-full h-12 text-base font-medium rounded-xl text-white shadow-lg transition-all hover:opacity-90" 
                            style={{ backgroundColor: primaryColor }}>
                        {buttonText}
                    </Button>
                </form>
             </div>
          </Card>
        </div>
      </section>
    )
  }

  // --- MINIMAL (Limpio) ---
  if (variant === "minimal") {
    return (
      <section className="py-24 px-4" style={{ backgroundColor: bgColor, color: textColor }}>
        <div className="container mx-auto max-w-xl">
           <div className="text-left mb-10">
                <h2 className="text-4xl font-bold mb-4" style={{ color: primaryColor }}>{title}</h2>
                <p className="text-lg opacity-70">{description}</p>
           </div>
           <form className="space-y-6">
                <div className="space-y-1"><Input placeholder="Nombre completo" className="h-12 border-x-0 border-t-0 border-b-2 rounded-none px-0 focus-visible:ring-0 text-lg shadow-none bg-transparent" /></div>
                <div className="space-y-1"><Input type="email" placeholder="Correo electrónico" className="h-12 border-x-0 border-t-0 border-b-2 rounded-none px-0 focus-visible:ring-0 text-lg shadow-none bg-transparent" /></div>
                <div className="space-y-1"><Textarea placeholder="Escribe tu mensaje..." className="min-h-[100px] border-x-0 border-t-0 border-b-2 rounded-none px-0 focus-visible:ring-0 resize-none text-lg shadow-none bg-transparent" /></div>
                <div className="pt-4">
                    <Button variant="outline" className="h-12 px-8 border-2 font-bold tracking-wide bg-transparent hover:bg-transparent transition-opacity hover:opacity-70" 
                            style={{ borderColor: primaryColor, color: primaryColor }}>
                        {buttonText} <Send className="w-4 h-4 ml-2" />
                    </Button>
                </div>
           </form>
        </div>
      </section>
    )
  }

  // --- CLÁSICO (Default) ---
  return (
    <section className="py-24 px-4 bg-white">
      <div className="container mx-auto max-w-6xl">
        
        {/* Cabecera */}
        <div className="mb-12 border-l-4 pl-6" style={{ borderColor: primaryColor }}>
             <h2 className="text-3xl md:text-4xl font-bold text-black uppercase tracking-tight mb-2">
                {title}
             </h2>
             <p className="text-slate-500 max-w-2xl text-lg">
                {description}
             </p>
        </div>

        <div className="grid md:grid-cols-[1.2fr_2fr] gap-8 md:gap-16 items-start">
            
            <div className="space-y-8 h-full pt-2">
                <div className="space-y-2">
                    <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">Oficina</h3>
                    <div className="flex items-start gap-3 text-slate-800 font-medium">
                        <MapPin className="w-5 h-5 shrink-0" style={{ color: primaryColor }} />
                        <p>{address}</p>
                    </div>
                </div>

                <div className="space-y-2">
                    <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">Horario</h3>
                    <div className="flex items-start gap-3 text-slate-800 font-medium">
                        <Clock className="w-5 h-5 shrink-0" style={{ color: primaryColor }} />
                        <p>{hours}</p>
                    </div>
                </div>

                {(phone || emailDisplay) && (
                    <div className="space-y-2">
                        <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">Contacto</h3>
                        {phone && <div className="flex items-center gap-3 text-slate-800 font-medium"><Phone className="w-5 h-5 shrink-0" style={{ color: primaryColor }} /><p>{phone}</p></div>}
                        {emailDisplay && <div className="flex items-center gap-3 text-slate-800 font-medium"><Mail className="w-5 h-5 shrink-0" style={{ color: primaryColor }} /><p>{emailDisplay}</p></div>}
                    </div>
                )}
            </div>

            <form className="space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                    <div className="space-y-1">
                        <Label className="font-bold text-slate-900 text-xs uppercase">Nombre</Label>
                        <Input className="bg-slate-50 border-slate-200 h-12 rounded-none focus-visible:ring-1 focus-visible:ring-slate-400" />
                    </div>
                    <div className="space-y-1">
                        <Label className="font-bold text-slate-900 text-xs uppercase">Apellido</Label>
                        <Input className="bg-slate-50 border-slate-200 h-12 rounded-none focus-visible:ring-1 focus-visible:ring-slate-400" />
                    </div>
                </div>
                
                <div className="space-y-1">
                    <Label className="font-bold text-slate-900 text-xs uppercase">Email</Label>
                    <Input type="email" className="bg-slate-50 border-slate-200 h-12 rounded-none focus-visible:ring-1 focus-visible:ring-slate-400" />
                </div>

                <div className="space-y-1">
                    <Label className="font-bold text-slate-900 text-xs uppercase">Consulta</Label>
                    <Textarea className="bg-slate-50 border-slate-200 min-h-[160px] rounded-none focus-visible:ring-1 focus-visible:ring-slate-400 resize-none" />
                </div>

                <div className="pt-2 flex justify-end">
                    <Button 
                        className="w-full md:w-auto text-white rounded-none h-12 px-12 text-sm font-bold uppercase tracking-widest hover:opacity-90 transition-opacity"
                        style={{ backgroundColor: primaryColor }}
                    >
                        {buttonText}
                    </Button>
                </div>
            </form>

        </div>
      </div>
    </section>
  )
}