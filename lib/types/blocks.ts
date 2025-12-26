
export type BlockType =
  | "header"
  | "hero"
  | "footer"
  | "banner"
  | "cards-3"
  | "text-image"
  | "form"
  | "gallery"
  | "logo-marquee"
  | "image-card-list"
  | "titulo-parrafos"
  | "features"
  | "cta"
  | "stats"
  | "faq"
  | "announcement"

// =====================
// CONFIGURACIÓN GLOBAL
// =====================

export interface StyleConfig {
  colores: {
    primario: string
    fondo: string
    texto: string
  }
  tipografia: {
    fuente: string
    tamanoBase: string
    tamanoTitulo: string
    tamanoSubtitulo: string
  }
}

export type BlockVariant =
  | "default"
  | "modern"
  | "minimal"
  | "bold"
  | "centered"

// =====================
// BLOQUE BASE
// =====================

export interface BaseBlock {
  id: string
  tipo: BlockType
  orden: number
  activo: boolean
  variant?: BlockVariant
  locked?: boolean
}

// =====================
// BLOQUES ESTRUCTURALES
// =====================

export interface HeaderBlock extends BaseBlock {
  tipo: "header"
  datos: {
    logoImagen?: string
    logoTexto?: string
    nombreEmpresa: string
    navegacion: Array<{ nombre: string; url: string }>
    botonTexto: string
    botonUrl: string
    alineacion?: "izquierda" | "centro" | "derecha"
    transparente?: boolean
  }
}

export interface HeroBlock extends BaseBlock {
  tipo: "hero"
  datos: {
    titulo: string
    subtitulo: string
    imagenes: string[]
    botonPrimarioTexto: string
    botonPrimarioUrl: string
    botonSecundarioTexto: string
    botonSecundarioUrl: string
  }
}

export interface FooterBlock extends BaseBlock {
  tipo: "footer"
  datos: {
    nombreEmpresa: string
    descripcion: string
    email: string
    telefono: string
    direccion: string

    lat?: number
    lng?: number

    imagenMapa?: string
    redesSociales: {
      linkedin: string
      facebook: string
      instagram: string
      twitter: string
      whatsapp: string
    }
    estiloVisual?: "simple" | "con-mapa" | "completo"
    personalizacion?: {
      tipoFondo: "default" | "custom" | "transparente"
      colorPersonalizado?: string
      textoOscuro?: boolean
    }
  }
}

// =====================
// BLOQUES DE CONTENIDO
// =====================

export interface BannerBlock extends BaseBlock {
  tipo: "banner"
  datos: {
    titulo: string
    subtitulo: string
    imagen: string
    botonTexto: string
    botonUrl: string
    alineacion: "izquierda" | "centro" | "derecha"
  }
}



export interface TextImageBlock extends BaseBlock {
  tipo: "text-image"
  datos: {
    titulo: string
    texto: string
    imagen: string
    imagenDerecha: boolean
    posicionImagen?: "izquierda" | "derecha"
    puntos?: string[]
  }
}

export interface TituloParrafosBlock extends BaseBlock {
  tipo: "titulo-parrafos"
  datos: {
    titulo: string
    parrafoIzquierda: string
    parrafoDerecha: string
    alineacion: "centrado" | "dividido"
    colorFondo: string
  }
}

export interface StatsBlock extends BaseBlock {
  tipo: "stats"
  datos: {
    fondoOscuro?: boolean
    estadisticas: Array<{ numero: string; etiqueta: string }>
  }
}

export interface FaqBlock extends BaseBlock {
  tipo: "faq"
  datos: {
    titulo: string
    descripcion?: string
    items: Array<{
      pregunta: string
      respuesta: string
    }>
  }
}

export interface AnnouncementBlock extends BaseBlock {
  tipo: "announcement"
  datos: {
    texto: string
    enlace?: string
    bgColor: string
    textColor: string
    animado: boolean
  }
}

// =====================
// TARJETAS Y LISTAS
// =====================

export interface Cards3Block extends BaseBlock {
  tipo: "cards-3"
  datos: {
    titulo?: string
    items: Array<{
      icono: string
      titulo: string
      descripcion: string
      botonTexto?: string
      botonUrl?: string
    }>
  }
}



export interface FeaturesBlock extends BaseBlock {
  tipo: "features"
  datos: {
    caracteristicas: Array<{
      icono: string
      titulo: string
      descripcion: string
      botonTexto?: string
    }>
  }
}



// =====================
// IMAGE CARD LIST
// =====================

export interface ImageCardData {
  imagenUrl: string
  altTexto: string
  etiqueta: string
  titulo: string
  descripcion: string
  linkTexto: string
  linkUrl: string
}

export interface ImageCardListBlock extends BaseBlock {
  tipo: "image-card-list"
  datos: {
    titulo: string
    subtitulo: string
    columnas: 3 | 4
    cards: ImageCardData[]
  }
}

// =====================
// FORMULARIOS Y CTA
// =====================

export interface FormBlock extends BaseBlock {
  tipo: "form"
  datos: {
    titulo: string
    descripcion: string
    campos: Array<{
      nombre: string
      tipo: "text" | "email" | "tel" | "textarea"
      requerido: boolean
      placeholder: string
    }>
    botonTexto: string
    infoContacto?: {
      telefono: string
      email: string
      horario: string
    }
    alineacion?: "izquierda" | "centro" | "derecha"
    estiloVisual?: "clasico" | "tarjeta" | "minimal"
  }
}



export interface CtaBlock extends BaseBlock {
  tipo: "cta"
  datos: {
    titulo: string
    subtitulo: string
    botonPrimarioTexto: string
    botonPrimarioUrl: string
    botonSecundarioTexto: string
    botonSecundarioUrl: string
    textoInferior?: string
  }
}

// =====================
// GALERÍAS Y CLIENTES
// =====================

export interface LogoMarqueeBlock extends BaseBlock {
  tipo: "logo-marquee"
  datos: {
    titulo?: string
    subtitulo?: string
    empresas: Array<{
      nombre: string
      logo: string
    }>
  }
}

export interface GalleryBlock extends BaseBlock {
  tipo: "gallery"
  datos: {
    titulo?: string
    imagenes: Array<{
      url: string
      alt: string
      link?: string
    }>
    columnas: 2 | 3 | 4
  }
}

// =====================
// UNIÓN DE BLOQUES
// =====================

export type Block =
  | HeaderBlock
  | HeroBlock
  | FooterBlock
  | BannerBlock
  | TextImageBlock
  | TituloParrafosBlock
  | StatsBlock
  | FaqBlock 
  | Cards3Block
  | FeaturesBlock
  | ImageCardListBlock
  | FormBlock
  | CtaBlock
  | LogoMarqueeBlock
  | GalleryBlock
  | AnnouncementBlock 

// =====================
// MULTI PAGE
// =====================

export interface PageData {
  id: string
  slug: string
  title: string
  seoTitle?: string
  seoDescription?: string
  blocks: Block[]
}

export interface SiteConfig {
  header: HeaderBlock
  footer: FooterBlock
  pages: PageData[]
  estilos: StyleConfig
  
  tipoAnimacion?: "none" | "fade" | "slide" | "scale"
  
  empresa: {
    nombre: string
    logo?: string
    whatsapp?: string
  }
}