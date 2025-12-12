import type { PageConfig, Block, StyleConfig } from "./types/blocks"

const STORAGE_KEY = "page-builder-config"

// Valores por defecto para estilos
const defaultStyles: StyleConfig = {
  colores: {
    primario: "#1e40af", // Azul royal
    secundario: "#1e3a8a", // Azul oscuro
    fondo: "#ffffff",
    texto: "#1f2937",
    acento: "#3b82f6",
  },
  tipografia: {
    fuente: "Inter",
    tamanoBase: "16px",
    tamanoTitulo: "48px",
    tamanoSubtitulo: "20px",
  },
}

const defaultConfig: PageConfig = {
  empresa: {
    nombre: "Empresa X",
  },
  estilos: defaultStyles,
  bloques: [
    {
      id: "header-fixed",
      tipo: "header",
      orden: 0,
      activo: true,
      datos: {
        logoImagen: "",
        logoTexto: "LOGO",
        nombreEmpresa: "Empresa X",
        navegacion: [
          { nombre: "Inicio", url: "#inicio" },
          { nombre: "Nosotros", url: "#nosotros" },
          { nombre: "Servicios", url: "#servicios" },
          { nombre: "Contacto", url: "#contacto" },
        ],
        botonTexto: "Contactar",
        botonUrl: "#contacto",
        alineacion: "derecha",
        transparente: false,
      },
    },
    {
      id: "hero-fixed",
      tipo: "hero",
      orden: 1,
      activo: true,
      datos: {
        titulo: "Soluciones empresariales para tu crecimiento",
        subtitulo: "Servicios profesionales diseñados para potenciar tu negocio",
        imagenFondo: "",
        botonPrimarioTexto: "Comenzar ahora",
        botonPrimarioUrl: "#contacto",
        botonSecundarioTexto: "Ver más",
        botonSecundarioUrl: "#nosotros",
      },
    },
    {
      id: "footer-fixed",
      tipo: "footer",
      orden: 999,
      activo: true,
      datos: {
        nombreEmpresa: "Empresa X",
        descripcion: "Soluciones empresariales innovadoras para tu negocio.",
        email: "info@empresa.com",
        telefono: "+54 (11) 1234-5678",
        direccion: "Av. Principal 1234, Buenos Aires",
        imagenMapa: "",
        redesSociales: {
          linkedin: "",
          facebook: "",
        },
      },
    },
  ],
}

export function cargarConfiguracion(): PageConfig {
  if (typeof window === "undefined") return defaultConfig

  const stored = localStorage.getItem(STORAGE_KEY)
  if (!stored) {
    guardarConfiguracion(defaultConfig)
    return defaultConfig
  }

  try {
    const config = JSON.parse(stored) as PageConfig

    // --- CORRECCIÓN CRÍTICA: Asegurar estilos ---
    // Si no existen estilos, usamos los default.
    // Si existen, hacemos merge para asegurar que no falten propiedades nuevas.
    if (!config.estilos) {
      config.estilos = defaultStyles
    } else {
      config.estilos = {
        colores: { ...defaultStyles.colores, ...(config.estilos.colores || {}) },
        tipografia: { ...defaultStyles.tipografia, ...(config.estilos.tipografia || {}) },
      }
    }
    // ---------------------------------------------

    const bloquesFijos: Record<string, Block> = {}
    const bloquesVariables: Block[] = []

    config.bloques.forEach((bloque) => {
      if (bloque.tipo === "header" || bloque.tipo === "hero" || bloque.tipo === "footer") {
        if (!bloquesFijos[bloque.tipo]) {
          bloquesFijos[bloque.tipo] = bloque
        }
      } else {
        bloquesVariables.push(bloque)
      }
    })

    if (!bloquesFijos.header) {
      bloquesFijos.header = defaultConfig.bloques.find((b) => b.tipo === "header")!
    }
    if (!bloquesFijos.hero) {
      bloquesFijos.hero = defaultConfig.bloques.find((b) => b.tipo === "hero")!
    }
    if (!bloquesFijos.footer) {
      bloquesFijos.footer = defaultConfig.bloques.find((b) => b.tipo === "footer")!
    }

    bloquesFijos.header.orden = 0
    bloquesFijos.hero.orden = 1
    bloquesFijos.footer.orden = 999

    config.bloques = [bloquesFijos.header, bloquesFijos.hero, ...bloquesVariables, bloquesFijos.footer]

    return config
  } catch {
    return defaultConfig
  }
}

export function guardarConfiguracion(config: PageConfig): void {
  if (typeof window === "undefined") return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(config))
}

export function actualizarBloque(id: string, bloque: Partial<Block>): void {
  const config = cargarConfiguracion()
  const index = config.bloques.findIndex((b) => b.id === id)

  if (index !== -1) {
    config.bloques[index] = { ...config.bloques[index], ...bloque } as Block
    guardarConfiguracion(config)
  }
}

export function actualizarEstilos(estilos: StyleConfig): void {
  const config = cargarConfiguracion()
  config.estilos = estilos
  guardarConfiguracion(config)
}

export function agregarBloque(bloque: Block): void {
  const config = cargarConfiguracion()

  if (bloque.tipo === "header" || bloque.tipo === "hero" || bloque.tipo === "footer") {
    console.error("No se pueden agregar bloques fijos duplicados")
    return
  }

  config.bloques.push(bloque)
  guardarConfiguracion(config)
}

export function eliminarBloque(id: string): void {
  const config = cargarConfiguracion()
  const bloque = config.bloques.find((b) => b.id === id)

  if (bloque && (bloque.tipo === "header" || bloque.tipo === "hero" || bloque.tipo === "footer")) {
    console.error("No se pueden eliminar bloques fijos")
    return
  }

  config.bloques = config.bloques.filter((b) => b.id !== id)
  guardarConfiguracion(config)
}

export function reordenarBloques(bloques: Block[]): void {
  const config = cargarConfiguracion()
  config.bloques = bloques
  guardarConfiguracion(config)
}

export function esBloqueFijo(tipo: string): boolean {
  return tipo === "header" || tipo === "hero" || tipo === "footer"
}

export function obtenerBloqueFijo(tipo: "header" | "hero" | "footer"): Block | undefined {
  const config = cargarConfiguracion()
  return config.bloques.find((b) => b.tipo === tipo)
}