"use client"

import { useState } from "react"
import type { 
  Block, 
  BlockType, 
  BannerBlock, 
  Cards3Block, 
  TextImageBlock, 
  FormBlock, 
  GalleryBlock, 
  LogoMarqueeBlock, 
  ImageCardListBlock, 
  TituloParrafosBlock,
  FaqBlock,
  AnnouncementBlock // <--- AGREGADO
} from "@/lib/types/blocks"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { EditorBloque } from "./editor-bloque"
import { 
  ImageIcon, 
  CreditCard, 
  FileText, 
  FormInput, 
  Grid3x3Icon, 
  MoveHorizontal, 
  LayoutGrid, 
  Split,
  HelpCircle,
  Megaphone 
} from "lucide-react"

interface NuevoBloqueDialogProps {
  onAgregar: (bloque: Block) => void
  siguienteOrden: number
}

const tiposBloques = [
  { tipo: "banner", nombre: "Banner", descripcion: "Sección destacada con imagen de fondo", icono: ImageIcon },
  { tipo: "cards-3", nombre: "Tarjetas (3 columnas)", descripcion: "3 tarjetas con iconos y contenido", icono: CreditCard },
  { tipo: "text-image", nombre: "Texto + Imagen", descripcion: "Sección con texto e imagen alternados", icono: FileText },
  { tipo: "form", nombre: "Formulario", descripcion: "Formulario de contacto personalizable", icono: FormInput },
  { tipo: "gallery", nombre: "Galería", descripcion: "Grid de imágenes", icono: Grid3x3Icon },
  { tipo: "logo-marquee", nombre: "Carrusel de Logos", descripcion: "Cinta deslizante infinita de marcas", icono: MoveHorizontal },
  { tipo: "image-card-list", nombre: "Lista de Tarjetas Destacadas", descripcion: "Múltiples tarjetas de imagen en 3 o 4 columnas", icono: LayoutGrid },
  { tipo: "titulo-parrafos", nombre: "Título y Párrafos Divididos", descripcion: "Sección con título primario y texto en 1 o 2 columnas.", icono: Split },
  { tipo: "faq", nombre: "Preguntas Frecuentes (FAQ)", descripcion: "Lista desplegable de preguntas y respuestas", icono: HelpCircle },
  // --- NUEVA OPCIÓN ---
  { tipo: "announcement", nombre: "Barra de Anuncios", descripcion: "Cinta superior para ofertas o avisos", icono: Megaphone },
]

export function NuevoBloqueDialog({ onAgregar, siguienteOrden }: NuevoBloqueDialogProps) {
  const [tipoSeleccionado, setTipoSeleccionado] = useState<BlockType | null>(null)

  const crearBloqueBase = (tipo: BlockType): Block => {
    const id = `bloque-${Date.now()}`
    const base = { id, tipo: tipo as any, orden: siguienteOrden, activo: true }

    switch (tipo) {
      case "banner":
        return {
          ...base,
          tipo: "banner",
          datos: {
            titulo: "Título del Banner",
            subtitulo: "Subtítulo descriptivo",
            imagen: "/placeholder.jpg",
            botonTexto: "Ver más",
            botonUrl: "#",
            alineacion: "centro",
          },
        } as BannerBlock

      case "cards-3":
        return {
          ...base,
          tipo: "cards-3",
          datos: {
            titulo: "Nuestros Servicios",
            items: [
              { icono: "award", titulo: "Servicio 1", descripcion: "Descripción del servicio", botonTexto: "Más info", botonUrl: "#" },
              { icono: "users", titulo: "Servicio 2", descripcion: "Descripción del servicio", botonTexto: "Más info", botonUrl: "#" },
              { icono: "building", titulo: "Servicio 3", descripcion: "Descripción del servicio", botonTexto: "Más info", botonUrl: "#" },
            ],
          },
        } as Cards3Block

      case "text-image":
        return {
          ...base,
          tipo: "text-image",
          datos: {
            titulo: "Acerca de Nosotros",
            texto: "Este es un texto de ejemplo para describir tu empresa, producto o servicio. Puedes editarlo libremente.",
            imagen: "/placeholder.jpg",
            imagenDerecha: true, 
            posicionImagen: "derecha",
            puntos: ["Punto destacado 1", "Punto destacado 2", "Punto destacado 3"],
          },
        } as TextImageBlock

      case "form":
        return {
          ...base,
          tipo: "form",
          datos: {
            titulo: "Contáctanos",
            descripcion: "Completa el formulario y te responderemos pronto",
            campos: [
              { nombre: "nombre", tipo: "text", requerido: true, placeholder: "Nombre completo" },
              { nombre: "email", tipo: "email", requerido: true, placeholder: "Email" },
              { nombre: "telefono", tipo: "tel", requerido: false, placeholder: "Teléfono" },
              { nombre: "mensaje", tipo: "textarea", requerido: true, placeholder: "Mensaje" },
            ],
            botonTexto: "Enviar consulta",
            infoContacto: {
              telefono: "+54 11 1234-5678",
              email: "contacto@empresa.com",
              horario: "Lunes a Viernes — 9:00 a 18:00",
            },
          },
        } as FormBlock

      case "gallery":
        return {
          ...base,
          tipo: "gallery",
          datos: {
            titulo: "Galería de Proyectos",
            imagenes: [
              { url: "/placeholder.jpg", alt: "Proyecto 1" },
              { url: "/placeholder.jpg", alt: "Proyecto 2" },
              { url: "/placeholder.jpg", alt: "Proyecto 3" },
            ],
            columnas: 3,
          },
        } as GalleryBlock

      case "logo-marquee":
        return {
            ...base,
            tipo: "logo-marquee",
            datos: {
                titulo: "Nuestros Clientes",
                subtitulo: "Empresas que confían en nosotros",
                empresas: [
                    { nombre: "Empresa 1", logo: "/placeholder-logo.svg" },
                    { nombre: "Empresa 2", logo: "/placeholder-logo.svg" },
                    { nombre: "Empresa 3", logo: "/placeholder-logo.svg" },
                ]
            }
        } as LogoMarqueeBlock
      
      case "image-card-list":
        return {
          ...base,
          tipo: "image-card-list",
          datos: {
            titulo: "Proyectos Destacados",
            subtitulo: "Descubre nuestro trabajo más reciente.",
            columnas: 3,
            cards: [
              { imagenUrl: "/placeholder.jpg", altTexto: "Card 1", etiqueta: "Residential", titulo: "Hogar Moderno", descripcion: "Descripción del primer proyecto.", linkTexto: "Explorar", linkUrl: "#" },
              { imagenUrl: "/placeholder.jpg", altTexto: "Card 2", etiqueta: "Comercial", titulo: "Edificio Corporativo", descripcion: "Descripción del segundo proyecto.", linkTexto: "Explorar", linkUrl: "#" },
              { imagenUrl: "/placeholder.jpg", altTexto: "Card 3", etiqueta: "Urbanismo", titulo: "Parque Urbano", descripcion: "Descripción del tercer proyecto.", linkTexto: "Explorar", linkUrl: "#" },
            ],
          }
        } as ImageCardListBlock
        
      case "titulo-parrafos":
        return {
          ...base,
          tipo: "titulo-parrafos",
          datos: {
            titulo: "Título que usa el color primario del sitio.",
            parrafoIzquierda: "Este es el párrafo principal. Se utiliza para introducir la sección o dar contexto al texto dividido.",
            parrafoDerecha: "Este segundo párrafo se utiliza para el modo 'dividido'. Aquí puedes profundizar en la información presentada.",
            alineacion: "dividido",
            colorFondo: "#ffffff",
          }
        } as TituloParrafosBlock

      case "faq":
        return {
          ...base,
          tipo: "faq",
          datos: {
            titulo: "Preguntas Frecuentes",
            items: [
              { pregunta: "¿Cuál es el horario de atención?", respuesta: "Atendemos de lunes a viernes de 9:00 a 18:00hs." },
              { pregunta: "¿Realizan envíos al interior?", respuesta: "Sí, realizamos envíos a todo el país a través de correo privado." },
              { pregunta: "¿Cuáles son los medios de pago?", respuesta: "Aceptamos tarjetas de crédito, débito y transferencia bancaria." },
            ]
          }
        } as FaqBlock

      // --- CASE NUEVO ---
      case "announcement":
        return {
          ...base,
          tipo: "announcement",
          datos: {
            texto: "¡Oferta especial! 30% OFF en toda la tienda.",
            enlace: "",
            bgColor: "#000000",
            textColor: "#ffffff",
            animado: false,
          },
        } as AnnouncementBlock
      
      default:
        throw new Error("Tipo de bloque no soportado")
    }
  }

  if (!tipoSeleccionado) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {tiposBloques.map((tipo) => {
          const Icon = tipo.icono
          return (
            <Card
              key={tipo.tipo}
              className="cursor-pointer hover:border-primary hover:shadow-md transition-all"
              onClick={() => setTipoSeleccionado(tipo.tipo as BlockType)}
            >
              <CardHeader>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-base">{tipo.nombre}</CardTitle>
                    <CardDescription className="text-sm">{tipo.descripcion}</CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>
          )
        })}
      </div>
    )
  }

  const bloqueNuevo = crearBloqueBase(tipoSeleccionado)

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Button type="button" variant="outline" size="sm" onClick={() => setTipoSeleccionado(null)}>
          Volver
        </Button>
        <h3 className="font-semibold">Configurar {tiposBloques.find((t) => t.tipo === tipoSeleccionado)?.nombre}</h3>
      </div>
      <EditorBloque bloque={bloqueNuevo} onGuardar={onAgregar} onCancelar={() => setTipoSeleccionado(null)} />
    </div>
  )
}