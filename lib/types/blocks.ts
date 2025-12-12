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
  variant?: BlockVariant // Added variant property
}

// SECCIONES FIJAS (únicas, no se pueden duplicar)

export interface HeaderBlock extends BaseBlock {
  tipo: "header"
  datos: {
    logoImagen?: string // URL de la imagen del logo
    logoTexto?: string // Texto alternativo si no hay imagen
    nombreEmpresa: string
    navegacion: Array<{
      nombre: string
      url: string
    }>
    botonTexto: string
    botonUrl: string
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
      instagram: string
    }
  }
}

// BLOQUES VARIABLES (genéricos, reutilizables)

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
      icono: string // Puede ser nombre de lucide icon o base64 de imagen
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
      alt: string
      descripcion?: string
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
