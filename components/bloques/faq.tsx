"use client"

import React from "react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

interface FaqItem {
  pregunta: string
  respuesta: string
}

interface FaqData {
  titulo: string
  descripcion?: string
  items: FaqItem[]
}

export function BloqueFaq({ data }: { data: FaqData }) {
  const items = Array.isArray(data.items) ? data.items : []

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          {data.titulo && (
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-slate-900">
              {data.titulo}
            </h2>
          )}
          {data.descripcion && (
            <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              {data.descripcion}
            </p>
          )}
        </div>

        <Accordion type="single" collapsible className="w-full space-y-4">
          {items.map((item, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`} 
              className="border border-slate-200 rounded-lg px-6 bg-white shadow-sm hover:shadow-md transition-shadow duration-200"
            >
             
              <AccordionTrigger 
                className="text-left text-lg font-medium hover:no-underline py-6"
                style={{ color: "var(--color-primario)" }}
              >
                {item.pregunta}
              </AccordionTrigger>
              <AccordionContent className="text-slate-600 text-base leading-relaxed pb-6">
                {item.respuesta}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}