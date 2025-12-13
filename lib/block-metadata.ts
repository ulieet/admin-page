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
        id: "default",
        name: "Estándar",
        description: "Banner con imagen de fondo y texto superpuesto",
        previewImage: "/standard-banner-background-image-overlay-text.jpg",
      },
      {
        id: "modern",
        name: "Card",
        description: "Banner estilo tarjeta con sombra",
        previewImage: "/card-style-banner-with-shadow.jpg",
      },
      {
        id: "minimal",
        name: "Flat",
        description: "Banner plano con color de fondo sólido",
        previewImage: "/flat-banner-solid-background-color.jpg",
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
        id: "default",
        name: "Con Bordes",
        description: "Tarjetas con bordes y hover effect",
        previewImage: "/placeholder.svg?height=150&width=400",
      },
      {
        id: "modern",
        name: "Con Sombra",
        description: "Tarjetas elevadas con sombras",
        previewImage: "/placeholder.svg?height=150&width=400",
      },
      {
        id: "minimal",
        name: "Sin Bordes",
        description: "Tarjetas sin bordes, solo contenido",
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
}

export function getBlockMetadata(type: string): BlockMetadata | undefined {
  return BLOCK_METADATA[type]
}

export function getVariantMetadata(type: string, variantId: string) {
  const metadata = BLOCK_METADATA[type]
  if (!metadata) return undefined
  return metadata.variants.find((v) => v.id === variantId)
}
