export type BlockType =
  | "header"
  | "hero"
  | "footer"
  | "banner"
  | "cards-3"
  | "text-image"
  | "form"
  | "stats"
  | "gallery"

// Configuración global de estilos
export interface StyleConfig {
  colores: {
    primario: string
    secundario: string
    fondo: string
    texto: string
    acento: string
  }
  tipografia: {
    fuente: string
    tamanoBase: string
    tamanoTitulo: string
    tamanoSubtitulo: string
  }
}

export type BlockVariant = "default" | "modern" | "minimal" | "bold"

export interface BaseBlock {
  id: string
  tipo: BlockType
  orden: number
  activo: boolean
  variant?: BlockVariant
}

// SECCIONES FIJAS

export interface HeaderBlock extends BaseBlock {
  tipo: "header"
  datos: {
    logoImagen?: string
    logoTexto?: string
    nombreEmpresa: string
    navegacion: Array<{
      nombre: string
      url: string
    }>
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
    imagenMapa: string
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

// BLOQUES VARIABLES

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

export interface StatsBlock extends BaseBlock {
  tipo: "stats"
  datos: {
    estadisticas: Array<{
      numero: string
      label: string
      icono?: string
    }>
    fondoOscuro: boolean
  }
}

export interface GalleryBlock extends BaseBlock {
  tipo: "gallery"
  datos: {
    titulo?: string
    imagenes: Array<{
      url: string
      alt: string // Mantenemos alt para accesibilidad interna, pero el usuario editará el link
      link?: string // Nuevo campo para el enlace
    }>
    columnas: 2 | 3 | 4
  }
}

export type Block =
  | HeaderBlock
  | HeroBlock
  | FooterBlock
  | BannerBlock
  | Cards3Block
  | TextImageBlock
  | FormBlock
  | StatsBlock
  | GalleryBlock

export interface PageConfig {
  bloques: Block[]
  estilos: StyleConfig
  empresa: {
    nombre: string
    logo?: string
  }
}