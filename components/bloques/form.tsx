"use client"

import type React from "react"

import type { FormBlock, StyleConfig } from "@/lib/types/blocks"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Phone, Mail, Clock } from "lucide-react"
import { useState } from "react"

interface BloqueFormProps {
  data: FormBlock["datos"]
  estilos?: StyleConfig | null
}

export function BloqueForm({ data, estilos }: BloqueFormProps) {
  const [formData, setFormData] = useState<Record<string, string>>({})

  const primaryColor = estilos?.colores.primario || "#1e40af"
  const textColor = estilos?.colores.texto || "#1f2937"
  // </CHANGE>

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Formulario enviado:", formData)
    alert("Formulario enviado correctamente")
  }

  return (
    <section className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold" style={{ color: textColor }}>
              {data.titulo}
            </h2>
            {/* </CHANGE> */}
            <p className="text-lg text-muted-foreground">{data.descripcion}</p>

            {data.infoContacto && (
              <div className="space-y-4 pt-6">
                {data.infoContacto.telefono && (
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5" style={{ color: primaryColor }} />
                    {/* </CHANGE> */}
                    <span>{data.infoContacto.telefono}</span>
                  </div>
                )}
                {data.infoContacto.email && (
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5" style={{ color: primaryColor }} />
                    {/* </CHANGE> */}
                    <span>{data.infoContacto.email}</span>
                  </div>
                )}
                {data.infoContacto.horario && (
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5" style={{ color: primaryColor }} />
                    {/* </CHANGE> */}
                    <span>{data.infoContacto.horario}</span>
                  </div>
                )}
              </div>
            )}
          </div>

          <Card>
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                {data.campos.map((campo, index) => (
                  <div key={index} className="space-y-2">
                    <Label htmlFor={campo.nombre}>
                      {campo.placeholder}
                      {campo.requerido && <span className="text-red-500 ml-1">*</span>}
                    </Label>
                    {campo.tipo === "textarea" ? (
                      <Textarea
                        id={campo.nombre}
                        name={campo.nombre}
                        placeholder={campo.placeholder}
                        required={campo.requerido}
                        value={formData[campo.nombre] || ""}
                        onChange={(e) => setFormData({ ...formData, [campo.nombre]: e.target.value })}
                        rows={4}
                      />
                    ) : (
                      <Input
                        id={campo.nombre}
                        name={campo.nombre}
                        type={campo.tipo}
                        placeholder={campo.placeholder}
                        required={campo.requerido}
                        value={formData[campo.nombre] || ""}
                        onChange={(e) => setFormData({ ...formData, [campo.nombre]: e.target.value })}
                      />
                    )}
                  </div>
                ))}
                <Button type="submit" className="w-full" size="lg" style={{ backgroundColor: primaryColor }}>
                  {data.botonTexto}
                </Button>
                {/* </CHANGE> */}
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
