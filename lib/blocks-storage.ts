import type { SiteConfig, PageData, Block, StyleConfig } from "./types/blocks"

const STORAGE_KEY = "site-builder-config-v3"

const generateId = () => Math.random().toString(36).substr(2, 9)

const defaultStyles: StyleConfig = {
  colores: {
    primario: "#1e40af",
    fondo: "#ffffff",
    texto: "#1f2937",
  },
  tipografia: {
    fuente: "Inter",
    tamanoBase: "16px",
    tamanoTitulo: "48px",
    tamanoSubtitulo: "20px",
  },
}

const defaultHero: Block = {
  id: "hero-home-default",
  tipo: "hero",
  orden: 0,
  activo: true,
  variant: "default",
  datos: {
    titulo: "Bienvenido a mi Sitio",
    subtitulo: "Creamos experiencias digitales únicas.",
    imagenes: [],
    botonPrimarioTexto: "Ver Servicios",
    botonPrimarioUrl: "/servicios",
    botonSecundarioTexto: "Contacto",
    botonSecundarioUrl: "/contacto"
  }
}

const defaultSiteConfig: SiteConfig = {
  header: {
    id: "header-global",
    tipo: "header",
    orden: 0,
    activo: true,
    variant: "default",
    datos: {
      nombreEmpresa: "Mi Empresa",
      navegacion: [{ nombre: "Inicio", url: "/" }, { nombre: "Contacto", url: "/contacto" }],
      botonTexto: "Contacto",
      botonUrl: "/contacto",
      alineacion: "derecha"
    },
  },
  footer: {
    id: "footer-global",
    tipo: "footer",
    orden: 999,
    activo: true,
    datos: {
      nombreEmpresa: "Mi Empresa",
      descripcion: "Footer global",
      email: "info@ejemplo.com",
      telefono: "+54 9 11 1234 5678",
      direccion: "Calle Falsa 123",
      redesSociales: { linkedin: "", facebook: "", instagram: "", twitter: "", whatsapp: "" },
    },
  },
  pages: [
    {
      id: "home-page",
      slug: "home",
      title: "Inicio",
      blocks: [defaultHero],
    },
  ],
  estilos: defaultStyles,
  empresa: { nombre: "Mi Empresa" },
}

export function cargarConfiguracion(): SiteConfig {
  if (typeof window === "undefined") return defaultSiteConfig

  const stored = localStorage.getItem(STORAGE_KEY)
  if (!stored) {
    guardarConfiguracion(defaultSiteConfig)
    return defaultSiteConfig
  }

  try {
    return JSON.parse(stored) as SiteConfig
  } catch {
    return defaultSiteConfig
  }
}

export function guardarConfiguracion(config: SiteConfig): void {
  if (typeof window === "undefined") return
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(config))

  window.dispatchEvent(new Event("storage-update"))
}

export function crearPagina(titulo: string, slug: string): void {
    const config = cargarConfiguracion()
    if (config.pages.some(p => p.slug === slug)) return

    const newPage: PageData = {
        id: generateId(),
        slug: slug.toLowerCase().replace(/\s+/g, '-'),
        title: titulo,
        blocks: []
    }
    config.pages.push(newPage)
    guardarConfiguracion(config)
}