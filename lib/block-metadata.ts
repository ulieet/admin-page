export interface BlockMetadata {
  type: string
  name: string
  description: string
  icon: string
  category: "fixed" | "content"
  previewImage: string 
  variants: {
    id: string
    name: string
    description: string
    previewImage: string
  }[]
}

export const BLOCK_METADATA: Record<string, BlockMetadata> = {
  header: {
    type: "header",
    name: "Header / Navegación",
    description: "Barra de navegación superior con logo y menú",
    icon: "Settings",
    category: "fixed",
    previewImage: "/navbar.png",
    variants: [
      {
        id: "default",
        name: "Clásico",
        description: "Header con navegación centrada y botón CTA",
        previewImage: "/classic-header-centered-navigation.jpg",
      },
      {
        id: "modern",
        name: "Moderno",
        description: "Header minimalista con logo grande",
        previewImage: "/modern-minimalist-header-large-logo.jpg",
      },
      {
        id: "minimal",
        name: "Minimalista",
        description: "Header compacto con navegación simple",
        previewImage: "/minimal-compact-header-simple-nav.jpg",
      },
    ],
  },
  hero: {
    type: "hero",
    name: "Hero / Portada",
    description: "Sección principal con imagen de fondo y llamado a la acción",
    icon: "ImageIcon",
    category: "fixed",
    previewImage: "/portada.png",
    variants: [
      {
        id: "default",
        name: "Centrado",
        description: "Contenido centrado con imagen de fondo completa",
        previewImage: "/centrado.png",
      },
      {
        id: "modern",
        name: "Split",
        description: "Texto a la izquierda, imagen a la derecha",
        previewImage: "/split.png",
      },
      {
        id: "minimal",
        name: "Gradiente",
        description: "Hero con gradiente de color y texto grande",
        previewImage: "/gradiente.png",
      },
    ],
  },
  footer: {
    type: "footer",
    name: "Footer / Pie de Página",
    description: "Pie de página con información de contacto y redes sociales",
    icon: "Type",
    category: "fixed",
    previewImage: "/footer.png",
    variants: [
      {
        id: "default",
        name: "Completo",
        description: "Footer con múltiples columnas de información",
        previewImage: "/footer-multiple-columns-information.jpg",
      },
      {
        id: "modern",
        name: "Compacto",
        description: "Footer minimalista con info esencial",
        previewImage: "/compact-minimalist-footer-essential-info.jpg",
      },
      {
        id: "minimal",
        name: "Simple",
        description: "Footer simple con copyright y enlaces",
        previewImage: "/simple-footer-copyright-links.jpg",
      },
    ],
  },
  banner: {
    type: "banner",
    name: "Banner",
    description: "Banner promocional con imagen y texto",
    icon: "ImageIcon",
    category: "content",
    previewImage: "/promotional-banner-with-image-text.jpg",
    variants: [
      {
        id: "standard",
        name: "Estándar",
        description: "Banner con imagen de fondo y texto superpuesto",
        previewImage: "/standard-banner-background-image-overlay-text.jpg",
      },
      {
        id: "card",
        name: "Card",
        description: "Banner estilo tarjeta flotante con sombra",
        previewImage: "/card-style-banner-with-shadow.jpg",
      },
      {
        id: "flat",
        name: "Flat",
        description: "Banner plano con color de fondo sólido",
        previewImage: "/flat-banner-solid-background-color.jpg",
      },
    ],
  },
  "logo-marquee": {
    type: "logo-marquee",
    name: "Carrusel de Logos",
    description: "Cinta deslizante infinita de marcas o clientes",
    icon: "MoveHorizontal", 
    category: "content",
    previewImage: "/placeholder.svg?height=150&width=400",
    variants: [
      {
        id: "default",
        name: "Estándar",
        description: "Desplazamiento horizontal continuo",
        previewImage: "/placeholder.svg?height=150&width=400",
      },
    ],
  },
  "cards-3": {
    type: "cards-3",
    name: "Tarjetas (3 columnas)",
    description: "Grid de 3 tarjetas con íconos y descripciones",
    icon: "CreditCard",
    category: "content",
    previewImage: "/placeholder.svg?height=150&width=400",
    variants: [
      {
        id: "corporate",
        name: "Corporativo",
        description: "Tarjetas con borde, centradas y formales",
        previewImage: "/placeholder.svg?height=150&width=400",
      },
      {
        id: "interactive",
        name: "Interactivo",
        description: "Fondos suaves y animaciones al pasar el mouse",
        previewImage: "/placeholder.svg?height=150&width=400",
      },
      {
        id: "minimal",
        name: "Minimalista",
        description: "Sin bordes, alineación izquierda, mucho aire",
        previewImage: "/placeholder.svg?height=150&width=400",
      },
    ],
  },
  "text-image": {
    type: "text-image",
    name: "Texto + Imagen",
    description: "Sección con texto y imagen en columnas",
    icon: "FileText",
    category: "content",
    previewImage: "/placeholder.svg?height=150&width=400",
    variants: [
      {
        id: "default",
        name: "50/50",
        description: "Texto e imagen en columnas iguales",
        previewImage: "/placeholder.svg?height=150&width=400",
      },
      {
        id: "modern",
        name: "60/40",
        description: "Más espacio para texto, imagen secundaria",
        previewImage: "/placeholder.svg?height=150&width=400",
      },
      {
        id: "minimal",
        name: "Superpuesto",
        description: "Texto superpuesto sobre imagen",
        previewImage: "/placeholder.svg?height=150&width=400",
      },
    ],
  },
  form: {
    type: "form",
    name: "Formulario",
    description: "Formulario de contacto personalizable",
    icon: "FormInput",
    category: "content",
    previewImage: "/placeholder.svg?height=150&width=400",
    variants: [
      {
        id: "default",
        name: "Clásico",
        description: "Formulario tradicional con etiquetas",
        previewImage: "/placeholder.svg?height=150&width=400",
      },
      {
        id: "modern",
        name: "Flotante",
        description: "Labels flotantes y estilo moderno",
        previewImage: "/placeholder.svg?height=150&width=400",
      },
      {
        id: "minimal",
        name: "Inline",
        description: "Formulario compacto en una línea",
        previewImage: "/placeholder.svg?height=150&width=400",
      },
    ],
  },
  stats: {
    type: "stats",
    name: "Estadísticas",
    description: "Mostrar números y métricas importantes",
    icon: "BarChart3",
    category: "content",
    previewImage: "/placeholder.svg?height=150&width=400",
    variants: [
      {
        id: "default",
        name: "Grid",
        description: "Estadísticas en grid con íconos",
        previewImage: "/placeholder.svg?height=150&width=400",
      },
      {
        id: "modern",
        name: "Cards",
        description: "Cada estadística en tarjeta individual",
        previewImage: "/placeholder.svg?height=150&width=400",
      },
      {
        id: "minimal",
        name: "Inline",
        description: "Estadísticas en línea horizontal",
        previewImage: "/placeholder.svg?height=150&width=400",
      },
    ],
  },
  gallery: {
    type: "gallery",
    name: "Galería",
    description: "Galería de imágenes en grid",
    icon: "Grid3x3",
    category: "content",
    previewImage: "/galeria.png",
    variants: [
      {
        id: "default",
        name: "Grid Regular",
        description: "Grid uniforme de imágenes",
        previewImage: "/placeholder.svg?height=150&width=400",
      },
      {
        id: "modern",
        name: "Masonry",
        description: "Layout tipo Pinterest con alturas variables",
        previewImage: "/placeholder.svg?height=150&width=400",
      },
      {
        id: "minimal",
        name: "Carousel",
        description: "Galería en carrusel deslizable",
        previewImage: "/placeholder.svg?height=150&width=400",
      },
    ],
  },
  "image-card-list": { 
    type: "image-card-list",
    name: "Lista de Tarjetas Destacadas",
    description: "Una sección con múltiples tarjetas de imagen y contenido, dispuestas en 3 o 4 columnas.",
    icon: "LayoutGrid",
    category: "content",
    previewImage: "/placeholder.svg?text=Lista+de+Tarjetas", 
    variants: [
      {
        id: "default",
        name: "3 Columnas",
        description: "Diseño espacioso con 3 tarjetas por fila.",
        previewImage: "/placeholder.svg?text=3+Columnas",
      },
      {
        id: "compact",
        name: "4 Columnas",
        description: "Diseño compacto con 4 tarjetas por fila.",
        previewImage: "/placeholder.svg?text=4+Columnas",
      },
    ],
  },
  "titulo-parrafos": { 
    type: "titulo-parrafos",
    name: "Título y Párrafos Divididos",
    description: "Sección con título primario y texto en 1 o 2 columnas.",
    icon: "Split",
    category: "content",
    previewImage: "/placeholder.svg?text=Titulo+Parrafos", 
    variants: [
      {
        id: "centrado",
        name: "Título Centrado",
        description: "Título centrado y un solo bloque de texto.",
        previewImage: "/placeholder.svg?text=Centrado",
      },
      {
        id: "dividido",
        name: "Título + 2 Párrafos",
        description: "Título a la izquierda, dos párrafos a la derecha.",
        previewImage: "/placeholder.svg?text=Dividido",
      },
    ],
  },
  // NUEVO BLOQUE FAQ
  faq: {
    type: "faq",
    name: "Preguntas Frecuentes",
    description: "Lista desplegable de preguntas y respuestas (Acordeón)",
    icon: "HelpCircle",
    category: "content",
    previewImage: "/placeholder.svg?text=FAQ",
    variants: [
      {
        id: "default",
        name: "Clásico",
        description: "Acordeón limpio con fondo blanco",
        previewImage: "/placeholder.svg?text=FAQ+Clasico",
      },
    ],
  },
}

export function getBlockMetadata(type: string): BlockMetadata | undefined {
  return BLOCK_METADATA[type]
}

export function getVariantMetadata(type: string, variantId: string) {
  const metadata = BLOCK_METADATA[type]
  if (!metadata) return undefined
  return metadata.variants.find((v) => v.id === variantId)
}