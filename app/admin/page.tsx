"use client"

import { useEffect, useState } from "react"
import {
  cargarConfiguracion,
  guardarConfiguracion,
  eliminarBloque,
  esBloqueFijo,
  actualizarEstilos,
} from "@/lib/blocks-storage"
import type { Block, PageConfig } from "@/lib/types/blocks"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import {
  Plus,
  Trash2,
  Home,
  ImageIcon,
  Type,
  Grid3x3,
  ChevronUp,
  ChevronDown,
  EyeOff,
  Eye,
  Settings,
  Palette,
  CreditCard,
  FileText,
  FormInput,
  MoveHorizontal, // Icono para el carrusel
} from "lucide-react"
import Link from "next/link"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { EditorBloque } from "@/components/admin/editor-bloque"
import { NuevoBloqueDialog } from "@/components/admin/nuevo-bloque-dialog"
import { EditorEstilos } from "@/components/admin/editor-estilos"
import { cn } from "@/lib/utils"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Label } from "@/components/ui/label"

const getBlockIcon = (tipo: string) => {
  switch (tipo) {
    case "header":
      return Settings
    case "hero":
      return ImageIcon
    case "footer":
      return Type
    case "banner":
      return ImageIcon
    case "cards-3":
      return CreditCard
    case "text-image":
      return FileText
    case "form":
      return FormInput
    case "gallery":
      return Grid3x3
    case "logo-marquee":
      return MoveHorizontal
    default:
      return Type
  }
}

const getBlockName = (tipo: string) => {
  const names = {
    header: "Header / Navegación",
    hero: "Hero / Portada",
    footer: "Footer / Pie de Página",
    banner: "Banner",
    "cards-3": "Tarjetas (3 columnas)",
    "text-image": "Texto + Imagen",
    form: "Formulario",
    gallery: "Galería",
    "logo-marquee": "Carrusel de Logos",
  }
  return names[tipo as keyof typeof names] || tipo
}

export default function AdminPage() {
  const [config, setConfig] = useState<PageConfig | null>(null)
  const [bloqueSeleccionado, setBloqueSeleccionado] = useState<string | null>(null)
  const [dialogNuevoAbierto, setDialogNuevoAbierto] = useState(false)
  const [vistaActual, setVistaActual] = useState<"bloques" | "configuracion" | "estilos">("bloques")

  // Efecto de carga inicial y recuperación de estado
  useEffect(() => {
    const configuracion = cargarConfiguracion()
    setConfig(configuracion)

    const savedState = localStorage.getItem("admin_last_state")
    let estadoRestaurado = false

    if (savedState) {
      try {
        const parsedState = JSON.parse(savedState)
        const bloqueExiste = parsedState.bloqueSeleccionado 
          ? configuracion.bloques.some(b => b.id === parsedState.bloqueSeleccionado) 
          : false

        if (parsedState.vistaActual) {
          setVistaActual(parsedState.vistaActual)
        }

        if (bloqueExiste) {
          setBloqueSeleccionado(parsedState.bloqueSeleccionado)
          estadoRestaurado = true
        } else if (parsedState.vistaActual !== "bloques") {
          estadoRestaurado = true
        }
      } catch (e) {
        console.error("Error al restaurar estado del admin:", e)
      }
    }

    if (!estadoRestaurado) {
      const bloquesFijos = configuracion.bloques.filter((b) => esBloqueFijo(b.tipo))
      if (bloquesFijos.length > 0) {
        setBloqueSeleccionado(bloquesFijos[0].id)
      }
    }
  }, [])

  // Efecto para guardar configuración
  useEffect(() => {
    if (config) {
      guardarConfiguracion(config)
    }
  }, [config])

  // Guardar posición actual
  useEffect(() => {
    if (config) { 
      const stateToSave = {
        vistaActual,
        bloqueSeleccionado
      }
      localStorage.setItem("admin_last_state", JSON.stringify(stateToSave))
    }
  }, [vistaActual, bloqueSeleccionado, config])

  if (!config) {
    return <div className="min-h-screen flex items-center justify-center">Cargando...</div>
  }

  const handleToggleActivo = (id: string) => {
    const nuevosBloqueo = config.bloques.map((b) => (b.id === id ? { ...b, activo: !b.activo } : b))
    setConfig({ ...config, bloques: nuevosBloqueo })
  }

  const handleEliminar = (id: string) => {
    const bloque = config.bloques.find((b) => b.id === id)
    if (bloque && esBloqueFijo(bloque.tipo)) {
      alert("No puedes eliminar bloques fijos como Header, Hero o Footer")
      return
    }

    if (confirm("¿Estás seguro de eliminar este bloque?")) {
      const nuevosBloqueo = config.bloques.filter((b) => b.id !== id)
      setConfig({ ...config, bloques: nuevosBloqueo })
      eliminarBloque(id)
      if (bloqueSeleccionado === id) {
        const bloquesFijos = nuevosBloqueo.filter((b) => esBloqueFijo(b.tipo))
        setBloqueSeleccionado(bloquesFijos.length > 0 ? bloquesFijos[0].id : null)
      }
    }
  }

  const handleMoverArriba = (id: string) => {
    const index = config.bloques.findIndex((b) => b.id === id)
    if (index <= 0) return

    const bloque = config.bloques[index]
    const bloqueAnterior = config.bloques[index - 1]

    if (esBloqueFijo(bloqueAnterior.tipo)) return

    const nuevosBloqueo = [...config.bloques]
    ;[nuevosBloqueo[index - 1], nuevosBloqueo[index]] = [nuevosBloqueo[index], nuevosBloqueo[index - 1]]
    nuevosBloqueo.forEach((b, i) => (b.orden = i))
    setConfig({ ...config, bloques: nuevosBloqueo })
  }

  const handleMoverAbajo = (id: string) => {
    const index = config.bloques.findIndex((b) => b.id === id)
    if (index === config.bloques.length - 1) return

    const bloque = config.bloques[index]
    const bloqueSiguiente = config.bloques[index + 1]

    if (esBloqueFijo(bloqueSiguiente.tipo)) return

    const nuevosBloqueo = [...config.bloques]
    ;[nuevosBloqueo[index + 1], nuevosBloqueo[index]] = [nuevosBloqueo[index], nuevosBloqueo[index + 1]]
    nuevosBloqueo.forEach((b, i) => (b.orden = i))
    setConfig({ ...config, bloques: nuevosBloqueo })
  }

  const handleAgregarBloque = (bloque: Block) => {
    const footerIndex = config.bloques.findIndex((b) => b.tipo === "footer")
    const nuevosBloqueo = [...config.bloques]

    if (footerIndex !== -1) {
      nuevosBloqueo.splice(footerIndex, 0, bloque)
    } else {
      nuevosBloqueo.push(bloque)
    }

    nuevosBloqueo.forEach((b, i) => (b.orden = i))

    setConfig({ ...config, bloques: nuevosBloqueo })
    setDialogNuevoAbierto(false)
    setBloqueSeleccionado(bloque.id)
    setVistaActual("bloques")
  }

  const handleActualizarBloque = (bloqueActualizado: Block) => {
    setConfig((prev) => {
      if (!prev) return prev
      return {
        ...prev,
        bloques: prev.bloques.map((b) => (b.id === bloqueActualizado.id ? bloqueActualizado : b)),
      }
    })
  }

  const handleGuardarEstilos = (estilos: typeof config.estilos) => {
    setConfig({ ...config, estilos })
    actualizarEstilos(estilos)
  }

  const bloquesFijos = config.bloques.filter((b) => esBloqueFijo(b.tipo))
  const bloquesVariables = config.bloques.filter((b) => !esBloqueFijo(b.tipo))

  const bloqueActual = config.bloques.find((b) => b.id === bloqueSeleccionado)

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-primary shadow-sm">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
              <Grid3x3 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white">Page Builder</h1>
              <p className="text-xs text-white/70">Panel de Administración</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Button asChild variant="secondary" size="sm" className="bg-white/10 text-white hover:bg-white/20 border-0">
              <Link href="/">
                <Home className="w-4 h-4 mr-2" />
                Ver Sitio
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-4rem)]">
        <aside className="w-80 border-r bg-sidebar/50 flex flex-col">
          <div className="p-5 border-b bg-background/50">
            <h2 className="font-semibold text-base mb-3 text-foreground/80">Estructura de Página</h2>
            <Button onClick={() => setDialogNuevoAbierto(true)} className="w-full" size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Agregar Bloque
            </Button>
          </div>

          <ScrollArea className="flex-1">
            <div className="p-3 space-y-4">
              <div>
                <p className="text-xs font-semibold text-muted-foreground mb-2 px-2">SECCIONES FIJAS</p>
                <div className="space-y-2">
                  {bloquesFijos.map((bloque) => {
                    const Icon = getBlockIcon(bloque.tipo)
                    const isSelected = bloqueSeleccionado === bloque.id && vistaActual === "bloques"

                    return (
                      <div
                        key={bloque.id}
                        className={cn(
                          "rounded-lg border transition-all",
                          isSelected ? "bg-primary shadow-sm" : "bg-background hover:bg-muted/50",
                        )}
                      >
                        <button
                          onClick={() => {
                            setBloqueSeleccionado(bloque.id)
                            setVistaActual("bloques")
                          }}
                          className="w-full text-left p-3"
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={cn(
                                "w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0",
                                isSelected ? "bg-white/20" : "bg-primary/10",
                              )}
                            >
                              <Icon
                                className={cn(
                                  "w-5 h-5",
                                  isSelected ? "text-white" : "text-primary",
                                  !bloque.activo && "opacity-50",
                                )}
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <p
                                  className={cn(
                                    "font-medium text-sm truncate",
                                    isSelected ? "text-white" : "text-foreground",
                                    !bloque.activo && "opacity-50",
                                  )}
                                >
                                  {getBlockName(bloque.tipo)}
                                </p>
                                {!bloque.activo ? (
                                  <EyeOff
                                    className={cn(
                                      "w-3.5 h-3.5 flex-shrink-0",
                                      isSelected ? "text-white/70" : "text-muted-foreground",
                                    )}
                                  />
                                ) : (
                                  <Eye
                                    className={cn(
                                      "w-3.5 h-3.5 flex-shrink-0",
                                      isSelected ? "text-white/70" : "text-muted-foreground",
                                    )}
                                  />
                                )}
                              </div>
                            </div>
                          </div>
                        </button>
                      </div>
                    )
                  })}
                </div>
              </div>

              {bloquesVariables.length > 0 && (
                <div>
                  <p className="text-xs font-semibold text-muted-foreground mb-2 px-2">CONTENIDO PERSONALIZADO</p>
                  <div className="space-y-2">
                    {bloquesVariables.map((bloque) => {
                      const Icon = getBlockIcon(bloque.tipo)
                      const isSelected = bloqueSeleccionado === bloque.id && vistaActual === "bloques"
                      const indexEnBloquesVariables = bloquesVariables.findIndex((b) => b.id === bloque.id)

                      return (
                        <div
                          key={bloque.id}
                          className={cn(
                            "rounded-lg border transition-all",
                            isSelected ? "bg-primary shadow-sm" : "bg-background hover:bg-muted/50",
                          )}
                        >
                          <button
                            onClick={() => {
                              setBloqueSeleccionado(bloque.id)
                              setVistaActual("bloques")
                            }}
                            className="w-full text-left p-3"
                          >
                            <div className="flex items-start gap-3">
                              <div
                                className={cn(
                                  "w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0",
                                  isSelected ? "bg-white/20" : "bg-primary/10",
                                )}
                              >
                                <Icon
                                  className={cn(
                                    "w-5 h-5",
                                    isSelected ? "text-white" : "text-primary",
                                    !bloque.activo && "opacity-50",
                                  )}
                                />
                              </div>
                              <div className="flex-1 min-w-0 pt-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <p
                                    className={cn(
                                      "font-medium text-sm truncate",
                                      isSelected ? "text-white" : "text-foreground",
                                      !bloque.activo && "opacity-50",
                                    )}
                                  >
                                    {getBlockName(bloque.tipo)}
                                  </p>
                                  {!bloque.activo ? (
                                    <EyeOff
                                      className={cn(
                                        "w-3.5 h-3.5 flex-shrink-0",
                                        isSelected ? "text-white/70" : "text-muted-foreground",
                                      )}
                                    />
                                  ) : (
                                    <Eye
                                      className={cn(
                                        "w-3.5 h-3.5 flex-shrink-0",
                                        isSelected ? "text-white/70" : "text-muted-foreground",
                                      )}
                                    />
                                  )}
                                </div>
                                <p className={cn("text-xs", isSelected ? "text-white/70" : "text-muted-foreground")}>
                                  Posición {indexEnBloquesVariables + 1}
                                </p>
                              </div>
                            </div>
                          </button>

                          <div className="px-3 pb-3 flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleMoverArriba(bloque.id)}
                              disabled={indexEnBloquesVariables === 0}
                              className={cn("h-8 flex-1", isSelected && "text-white hover:bg-white/10")}
                            >
                              <ChevronUp className="w-4 h-4 mr-1" />
                              <span className="text-xs">Subir</span>
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleMoverAbajo(bloque.id)}
                              disabled={indexEnBloquesVariables === bloquesVariables.length - 1}
                              className={cn("h-8 flex-1", isSelected && "text-white hover:bg-white/10")}
                            >
                              <ChevronDown className="w-4 h-4 mr-1" />
                              <span className="text-xs">Bajar</span>
                            </Button>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}

              {config.bloques.length === 0 && (
                <div className="text-center py-12 px-4">
                  <div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center mx-auto mb-3">
                    <Grid3x3 className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <p className="text-sm font-medium text-foreground mb-1">Sin bloques</p>
                  <p className="text-xs text-muted-foreground">Agrega tu primer bloque para comenzar</p>
                </div>
              )}
            </div>
          </ScrollArea>

          <div className="p-4 border-t bg-background space-y-2">
            <button
              onClick={() => {
                setVistaActual("configuracion")
                setBloqueSeleccionado(null)
              }}
              className={cn(
                "w-full p-3 rounded-lg border transition-colors text-left",
                vistaActual === "configuracion" ? "bg-primary text-white" : "bg-background hover:bg-muted/50",
              )}
            >
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    "w-10 h-10 rounded-lg flex items-center justify-center",
                    vistaActual === "configuracion" ? "bg-white/20" : "bg-primary/10",
                  )}
                >
                  <Settings
                    className={cn("w-5 h-5", vistaActual === "configuracion" ? "text-white" : "text-primary")}
                  />
                </div>
                <div>
                  <p
                    className={cn(
                      "font-medium text-sm",
                      vistaActual === "configuracion" ? "text-white" : "text-foreground",
                    )}
                  >
                    Configuración
                  </p>
                  <p
                    className={cn(
                      "text-xs",
                      vistaActual === "configuracion" ? "text-white/70" : "text-muted-foreground",
                    )}
                  >
                    Datos de empresa
                  </p>
                </div>
              </div>
            </button>

            <button
              onClick={() => {
                setVistaActual("estilos")
                setBloqueSeleccionado(null)
              }}
              className={cn(
                "w-full p-3 rounded-lg border transition-colors text-left",
                vistaActual === "estilos" ? "bg-primary text-white" : "bg-background hover:bg-muted/50",
              )}
            >
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    "w-10 h-10 rounded-lg flex items-center justify-center",
                    vistaActual === "estilos" ? "bg-white/20" : "bg-primary/10",
                  )}
                >
                  <Palette className={cn("w-5 h-5", vistaActual === "estilos" ? "text-white" : "text-primary")} />
                </div>
                <div>
                  <p
                    className={cn("font-medium text-sm", vistaActual === "estilos" ? "text-white" : "text-foreground")}
                  >
                    Estilos
                  </p>
                  <p className={cn("text-xs", vistaActual === "estilos" ? "text-white/70" : "text-muted-foreground")}>
                    Colores y fuentes
                  </p>
                </div>
              </div>
            </button>
          </div>
        </aside>

        <main className="flex-1 overflow-auto bg-muted/20">
          {vistaActual === "configuracion" ? (
            <div className="container max-w-3xl mx-auto p-8">
              <Card>
                <CardHeader>
                  <CardTitle>Configuración General</CardTitle>
                  <CardDescription>Información básica de tu empresa</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Nombre de la Empresa */}
                  <div className="space-y-2">
                    <Label>Nombre de la Empresa</Label>
                    <Input
                      placeholder="Ej: Mi Empresa S.A."
                      value={config.empresa.nombre || ""}
                      onChange={(e) =>
                        setConfig({
                          ...config,
                          empresa: { ...config.empresa, nombre: e.target.value },
                        })
                      }
                    />
                  </div>

                  {/* WhatsApp Flotante */}
                  <div className="space-y-2">
                    <Label>WhatsApp Flotante</Label>
                    <Input
                      placeholder="Ej: 5491112345678 (Código país + Número)"
                      value={config.empresa.whatsapp || ""}
                      onChange={(e) =>
                        setConfig({
                          ...config,
                          empresa: { ...config.empresa, whatsapp: e.target.value },
                        })
                      }
                    />
                    <p className="text-xs text-muted-foreground">
                      Ingresa el número completo solo con dígitos. Aparecerá un botón flotante en tu web.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : vistaActual === "estilos" ? (
            <div className="container max-w-3xl mx-auto p-8">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-foreground mb-2">Estilos Globales</h2>
                <p className="text-sm text-muted-foreground">
                  Personaliza los colores, fuentes y tamaños de tu sitio web
                </p>
              </div>
              <EditorEstilos estilos={config.estilos} onGuardar={handleGuardarEstilos} />
            </div>
          ) : bloqueActual ? (
            <div className="container max-w-3xl mx-auto p-8">
              <div className="mb-6">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-foreground mb-2">{getBlockName(bloqueActual.tipo)}</h2>
                    <p className="text-sm text-muted-foreground">Personaliza el contenido de este bloque</p>
                  </div>
                  {!esBloqueFijo(bloqueActual.tipo) && (
                    <Button variant="destructive" size="sm" onClick={() => handleEliminar(bloqueActual.id)}>
                      <Trash2 className="w-4 h-4 mr-2" />
                      Eliminar
                    </Button>
                  )}
                </div>

                <div className="flex items-center gap-3 p-4 bg-card border rounded-lg mb-6">
                  <Switch checked={bloqueActual.activo} onCheckedChange={() => handleToggleActivo(bloqueActual.id)} />
                  <div>
                    <p className="font-medium text-sm">Mostrar en página</p>
                    <p className="text-xs text-muted-foreground">
                      {bloqueActual.activo ? "Visible para los visitantes" : "Oculto temporalmente"}
                    </p>
                  </div>
                </div>
              </div>

              <EditorBloque
                bloque={bloqueActual}
                onGuardar={handleActualizarBloque}
                onCancelar={() => setBloqueSeleccionado(null)}
              />
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="w-20 h-20 rounded-full bg-muted/50 flex items-center justify-center mx-auto mb-4">
                  <Grid3x3 className="w-10 h-10 text-muted-foreground" />
                </div>
                <p className="text-lg font-medium text-foreground mb-2">Selecciona un bloque</p>
                <p className="text-sm text-muted-foreground">
                  Elige un bloque de la barra lateral para comenzar a editar
                </p>
              </div>
            </div>
          )}
        </main>
      </div>

      <Dialog open={dialogNuevoAbierto} onOpenChange={setDialogNuevoAbierto}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Agregar Nuevo Bloque</DialogTitle>
            <DialogDescription>Elige el tipo de bloque que deseas agregar a tu página</DialogDescription>
          </DialogHeader>
          <NuevoBloqueDialog
            onAgregar={handleAgregarBloque}
            siguienteOrden={config.bloques.length > 0 ? Math.max(...config.bloques.map((b) => b.orden)) + 1 : 0}
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}