"use client"

import { useEffect, useState } from "react"
import {
  cargarConfiguracion,
  guardarConfiguracion,
} from "@/lib/blocks-storage"
import type { Block, SiteConfig, PageData } from "@/lib/types/blocks"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Plus, Trash2, Settings, Palette,
  File, Layout, Monitor, LayoutTemplate,
  ChevronUp, Eye, EyeOff, Save, ImageIcon,
  Megaphone 
} from "lucide-react"
import Link from "next/link"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { EditorBloque } from "@/components/admin/editor-bloque"
import { NuevoBloqueDialog } from "@/components/admin/nuevo-bloque-dialog"
import { EditorEstilos } from "@/components/admin/editor-estilos"
import { HeaderEditor } from "@/components/admin/blocks/HeaderEditor"
import { FooterEditor } from "@/components/admin/blocks/FooterEditor"
import { HeroEditor } from "@/components/admin/blocks/HeroEditor"
import { cn } from "@/lib/utils"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"

export default function AdminPage() {
  const [config, setConfig] = useState<SiteConfig | null>(null)
  
  const [activeSection, setActiveSection] = useState<string>("home-page") 
  const [bloqueSeleccionadoId, setBloqueSeleccionadoId] = useState<string | null>(null)
  
  // Estados temporales
  const [tempHeaderData, setTempHeaderData] = useState<any>(null)
  const [tempFooterData, setTempFooterData] = useState<any>(null)
  const [tempHeroData, setTempHeroData] = useState<any>(null)
  const [tempHeroVariant, setTempHeroVariant] = useState<string>("default")

  const [dialogNewBlockOpen, setDialogNewBlockOpen] = useState(false)
  const [dialogNewPageOpen, setDialogNewPageOpen] = useState(false)
  const [newPageName, setNewPageName] = useState("")

  useEffect(() => {
    const root = document.documentElement
    root.style.removeProperty("--tamano-base")
    root.style.removeProperty("--fuente-base")
    root.style.fontSize = "16px" 
    root.style.fontFamily = "ui-sans-serif, system-ui, sans-serif"
    root.style.backgroundColor = "#ffffff"
    root.style.color = "#09090b"
    
    return () => {
      root.style.removeProperty("font-size")
      root.style.removeProperty("font-family")
      root.style.removeProperty("background-color")
      root.style.removeProperty("color")
    }
  }, [])

  useEffect(() => {
    const data = cargarConfiguracion()
    setConfig(data)
    setTempHeaderData(data.header.datos)
    setTempFooterData(data.footer.datos)
    
    const homePage = data.pages.find(p => p.slug === "home")
    const heroBlock = homePage?.blocks.find(b => b.tipo === "hero")
    
    if (heroBlock) {
      setTempHeroData(heroBlock.datos)
      setTempHeroVariant(heroBlock.variant || "default")
    } else {
      setTempHeroData({
        titulo: "Título Principal",
        subtitulo: "Texto de ejemplo",
        imagenes: [],
        botonPrimarioTexto: "Ver más",
        botonPrimarioUrl: "#"
      })
      setTempHeroVariant("default")
    }

    const home = data.pages.find(p => p.slug === "home")
    if (home) setActiveSection(home.id)
    else if (data.pages.length > 0) setActiveSection(data.pages[0].id)
    else setActiveSection("global-settings")
  }, [])

  useEffect(() => {
    if (config) {
        guardarConfiguracion(config)
    }
  }, [config])

  if (!config) return <div className="min-h-screen flex items-center justify-center">Cargando Admin...</div>

  const activePage = config.pages.find(p => p.id === activeSection)
  const currentBlocks = activePage ? activePage.blocks : []
  const isHomePage = activePage?.slug === "home"

  // Funciones de manejo
  const handleCreatePage = () => {
    if (!newPageName) return
    const slug = newPageName.toLowerCase().trim().replace(/\s+/g, '-')
    if (config.pages.some(p => p.slug === slug)) { alert("Ya existe una página con ese nombre/slug"); return }
    const newPage: PageData = { id: Math.random().toString(36).substr(2, 9), slug, title: newPageName, blocks: [] }
    const newConfig = { ...config, pages: [...config.pages, newPage] }
    setConfig(newConfig)
    setDialogNewPageOpen(false)
    setNewPageName("")
    setActiveSection(newPage.id)
  }

  const handleDeletePage = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    if (confirm("¿Borrar página?")) {
        const newPages = config.pages.filter(p => p.id !== id)
        setConfig({ ...config, pages: newPages })
        if (activeSection === id) {
            const home = newPages.find(p => p.slug === "home")
            setActiveSection(home ? home.id : "global-settings")
        }
    }
  }

  const handleAddBlock = (bloque: Block) => {
    if (!activePage) return
    const newBlocks = [...activePage.blocks, bloque]
    newBlocks.forEach((b, i) => b.orden = i)
    const updatedPages = config.pages.map(p => p.id === activeSection ? { ...p, blocks: newBlocks } : p)
    setConfig({ ...config, pages: updatedPages })
    setDialogNewBlockOpen(false)
    setBloqueSeleccionadoId(bloque.id)
  }

  const handleUpdateBlock = (bloqueActualizado: Block) => {
    if (activePage) {
        const updatedBlocks = activePage.blocks.map(b => b.id === bloqueActualizado.id ? bloqueActualizado : b)
        const updatedPages = config.pages.map(p => p.id === activeSection ? { ...p, blocks: updatedBlocks } : p)
        setConfig({ ...config, pages: updatedPages })
    }
  }

  const handleDeleteBlock = (blockId: string) => {
    if (!activePage) return
    if(confirm("¿Eliminar bloque?")) {
        const filtered = activePage.blocks.filter(b => b.id !== blockId)
        const updatedPages = config.pages.map(p => p.id === activeSection ? { ...p, blocks: filtered } : p)
        setConfig({ ...config, pages: updatedPages })
        setBloqueSeleccionadoId(null)
    }
  }

  const handleMoveBlock = (blockId: string, direction: 'up' | 'down', e: React.MouseEvent) => {
    e.stopPropagation()
    if (!activePage) return
    const index = activePage.blocks.findIndex(b => b.id === blockId)
    if (index === -1) return
    
    if (direction === 'up' && index === 0) return
    if (direction === 'down' && index === activePage.blocks.length - 1) return
    
    const newBlocks = [...activePage.blocks]
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    [newBlocks[index], newBlocks[targetIndex]] = [newBlocks[targetIndex], newBlocks[index]]
    newBlocks.forEach((b, i) => b.orden = i)
    const updatedPages = config.pages.map(p => p.id === activeSection ? { ...p, blocks: newBlocks } : p)
    setConfig({ ...config, pages: updatedPages })
  }

  const handleToggleVisibility = (blockId: string, e: React.MouseEvent) => {
    e.stopPropagation()
    if (!activePage) return
    const updatedBlocks = activePage.blocks.map(b => b.id === blockId ? { ...b, activo: !b.activo } : b)
    const updatedPages = config.pages.map(p => p.id === activeSection ? { ...p, blocks: updatedBlocks } : p)
    setConfig({ ...config, pages: updatedPages })
  }

  const saveHeader = () => {
     setConfig({ ...config, header: { ...config.header, datos: tempHeaderData } })
     alert("Header guardado")
  }

  const saveFooter = () => {
     setConfig({ ...config, footer: { ...config.footer, datos: tempFooterData } })
     alert("Footer guardado")
  }

  const saveHero = () => {
    if (!activePage) return
    let newBlocks = [...activePage.blocks]
    const heroIndex = newBlocks.findIndex(b => b.tipo === "hero")
    
    const newHeroBlock: Block = {
        id: heroIndex >= 0 ? newBlocks[heroIndex].id : "hero-home-fixed",
        tipo: "hero",
        activo: true,
        orden: 0, 
        variant: tempHeroVariant, 
        datos: tempHeroData       
    }

    if (heroIndex >= 0) {
        newBlocks[heroIndex] = newHeroBlock
    } else {
        newBlocks.unshift(newHeroBlock)
    }
    newBlocks.forEach((b, i) => b.orden = i)

    const updatedPages = config.pages.map(p => p.id === activeSection ? { ...p, blocks: newBlocks } : p)
    setConfig({ ...config, pages: updatedPages })
    alert("Portada guardada correctamente")
  }

  let bloqueEditando: Block | undefined
  if (bloqueSeleccionadoId && bloqueSeleccionadoId !== "fixed-hero-home" && activePage) {
      bloqueEditando = activePage.blocks.find(b => b.id === bloqueSeleccionadoId)
  }

  const renderMainEditor = () => {
    if (activeSection === "global-settings") {
        return (
            <div className="max-w-3xl mx-auto space-y-6 pb-20">
                <Card><CardHeader><CardTitle>Configuración de la Empresa</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2"><Label>Nombre</Label><Input value={config.empresa.nombre} onChange={(e) => setConfig({ ...config, empresa: { ...config.empresa, nombre: e.target.value } })} /></div>
                    <div className="space-y-2"><Label>WhatsApp</Label><Input value={config.empresa.whatsapp || ""} onChange={(e) => setConfig({ ...config, empresa: { ...config.empresa, whatsapp: e.target.value } })} /></div>
                </CardContent></Card>

                {/* --- SECCIÓN DE TRANSICIONES (CON SELECTOR) --- */}
                <Card>
                    <CardHeader><CardTitle>Experiencia de Usuario</CardTitle></CardHeader>
                    <CardContent>
                        <div className="flex flex-col gap-4 p-4 border rounded-lg bg-slate-50">
                            <div className="space-y-1">
                                <Label className="text-base font-semibold">Transiciones entre Páginas</Label>
                                <p className="text-sm text-muted-foreground">Elige cómo se anima la web al navegar de una página a otra.</p>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label className="text-xs uppercase font-bold text-slate-500">Tipo de Animación</Label>
                                    <select
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                        value={config.tipoAnimacion || "none"}
                                        onChange={(e) => setConfig({ ...config, tipoAnimacion: e.target.value as any })}
                                    >
                                        <option value="none">🚫 Ninguna (Carga instantánea)</option>
                                        <option value="fade">✨ Suave (Fade In)</option>
                                        <option value="slide">⬆️ Deslizar (Slide Up)</option>
                                        <option value="scale">🔍 Zoom (Scale Up)</option>
                                    </select>
                                </div>
                                
                                <div className="flex items-center justify-center p-4 bg-white border border-dashed rounded text-sm text-slate-400">
                                    {config.tipoAnimacion === "none" && "Sin efectos (Recomendado para velocidad)"}
                                    {config.tipoAnimacion === "fade" && "Aparición progresiva elegante"}
                                    {config.tipoAnimacion === "slide" && "Efecto moderno de subida"}
                                    {config.tipoAnimacion === "scale" && "Efecto sutil de crecimiento"}
                                    {(!config.tipoAnimacion) && "Sin efectos (Default)"}
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        )
    }

    // ... (Resto de secciones sin cambios)
    if (activeSection === "styles") {
        return (
            <div className="max-w-3xl mx-auto pb-20">
                 <h2 className="text-2xl font-bold mb-6">Estilos Globales</h2>
                 <EditorEstilos estilos={config.estilos} onGuardar={(nuevos) => setConfig({ ...config, estilos: nuevos })} />
            </div>
        )
    }

    if (activeSection === "header") {
        return (
            <div className="max-w-4xl mx-auto pb-20">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold">Editar Header</h2>
                    <Button onClick={saveHeader} className="bg-green-600 hover:bg-green-700"><Save className="w-4 h-4 mr-2" /> Guardar Cambios</Button>
                </div>
                <div className="bg-white p-6 rounded-lg border shadow-sm">
                    <HeaderEditor 
                        data={tempHeaderData} 
                        onChange={(campo, valor) => setTempHeaderData({ ...tempHeaderData, [campo]: valor })} 
                        variant={config.header.variant}
                        onVariantChange={(newVariant) => setConfig({ ...config, header: { ...config.header, variant: newVariant as any } })}
                    />
                </div>
            </div>
        )
    }

    if (activeSection === "footer") {
        return (
            <div className="max-w-4xl mx-auto pb-20">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold">Editar Footer</h2>
                    <Button onClick={saveFooter} className="bg-green-600 hover:bg-green-700"><Save className="w-4 h-4 mr-2" /> Guardar Cambios</Button>
                </div>
                <div className="bg-white p-6 rounded-lg border shadow-sm">
                    <FooterEditor data={tempFooterData} onChange={(campo, valor) => setTempFooterData({ ...tempFooterData, [campo]: valor })} />
                </div>
            </div>
        )
    }

    if (activeSection && isHomePage && bloqueSeleccionadoId === "fixed-hero-home") {
        return (
            <div className="max-w-4xl mx-auto pb-20">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <Button variant="ghost" className="pl-0" onClick={() => setBloqueSeleccionadoId(null)}>← Volver</Button>
                        <h2 className="text-2xl font-bold flex items-center gap-2">
                            <ImageIcon className="w-6 h-6"/> Editar Portada (Hero)
                        </h2>
                    </div>
                    <Button onClick={saveHero} className="bg-green-600 hover:bg-green-700">
                        <Save className="w-4 h-4 mr-2" /> Guardar Cambios
                    </Button>
                </div>
                
                <div className="bg-white p-6 rounded-lg border shadow-sm">
                    <HeroEditor 
                        data={tempHeroData} 
                        variant={tempHeroVariant}
                        onChange={(campo, valor) => setTempHeroData({ ...tempHeroData, [campo]: valor })} 
                    />
                    <div className="mt-6 pt-6 border-t">
                        <Label className="mb-2 block">Estilo de Portada</Label>
                        <div className="flex gap-2">
                            {["default", "modern", "minimal"].map(v => (
                                <Button 
                                    key={v}
                                    variant={tempHeroVariant === v ? "default" : "outline"}
                                    onClick={() => setTempHeroVariant(v)}
                                    size="sm"
                                    className="capitalize"
                                >
                                    {v}
                                </Button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    if (bloqueEditando) {
        return (
            <div className="max-w-4xl mx-auto pb-20">
                <div className="flex items-center justify-between mb-6">
                    <Button variant="ghost" className="pl-0" onClick={() => setBloqueSeleccionadoId(null)}>← Volver</Button>
                    <Button variant="destructive" size="sm" onClick={() => handleDeleteBlock(bloqueEditando!.id)}><Trash2 className="w-4 h-4 mr-2" /> Eliminar</Button>
                </div>
                <EditorBloque bloque={bloqueEditando} onGuardar={handleUpdateBlock} onCancelar={() => setBloqueSeleccionadoId(null)} />
            </div>
        )
    }

    if (activePage) {
        return (
            <div className="max-w-3xl mx-auto text-center py-20">
                <div className="w-20 h-20 bg-muted/30 rounded-full flex items-center justify-center mx-auto mb-6"><LayoutTemplate className="w-10 h-10 text-muted-foreground" /></div>
                <h2 className="text-2xl font-bold mb-2">Editando: {activePage.title}</h2>
                <Button size="lg" onClick={() => setDialogNewBlockOpen(true)}><Plus className="w-5 h-5 mr-2" /> Agregar Nuevo Bloque</Button>
            </div>
        )
    }
    return null
  }

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <aside className="w-72 border-r bg-white flex flex-col h-full shadow-sm z-10">
        <div className="p-4 border-b">
          <h1 className="font-bold text-lg flex items-center gap-2 text-primary"><Layout className="w-5 h-5" /> Admin Panel</h1>
        </div>
        <ScrollArea className="flex-1">
          <div className="p-4 space-y-6">
            <div>
              <p className="text-xs font-bold text-muted-foreground mb-3 px-2">GLOBALES</p>
              <nav className="space-y-1">
                <Button variant={activeSection === "global-settings" ? "secondary" : "ghost"} className="w-full justify-start" onClick={() => { setActiveSection("global-settings"); setBloqueSeleccionadoId(null) }}><Settings className="w-4 h-4 mr-2" /> Configuración</Button>
                <Button variant={activeSection === "styles" ? "secondary" : "ghost"} className="w-full justify-start" onClick={() => { setActiveSection("styles"); setBloqueSeleccionadoId(null) }}><Palette className="w-4 h-4 mr-2" /> Estilos</Button>
                <Button variant={activeSection === "header" ? "secondary" : "ghost"} className="w-full justify-start" onClick={() => { setActiveSection("header"); setBloqueSeleccionadoId(null) }}><LayoutTemplate className="w-4 h-4 mr-2 rotate-180" /> Header</Button>
                <Button variant={activeSection === "footer" ? "secondary" : "ghost"} className="w-full justify-start" onClick={() => { setActiveSection("footer"); setBloqueSeleccionadoId(null) }}><LayoutTemplate className="w-4 h-4 mr-2" /> Footer</Button>
              </nav>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2 px-2">
                <p className="text-xs font-bold text-muted-foreground">PÁGINAS</p>
                <Button size="icon" variant="ghost" className="h-6 w-6" onClick={() => setDialogNewPageOpen(true)}><Plus className="w-4 h-4" /></Button>
              </div>
              <nav className="space-y-1">
                {config.pages.map(page => (
                    <div key={page.id} className="group relative">
                        <Button variant={activeSection === page.id ? "secondary" : "ghost"} className="w-full justify-start pr-8" onClick={() => { setActiveSection(page.id); setBloqueSeleccionadoId(null) }}>
                            <File className="w-4 h-4 mr-2 opacity-70" /> <span className="truncate">{page.title}</span>
                        </Button>
                        {page.slug !== "home" && (
                            <button onClick={(e) => handleDeletePage(page.id, e)} className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 p-1 hover:text-red-500"><Trash2 className="w-3.5 h-3.5" /></button>
                        )}
                    </div>
                ))}
              </nav>
            </div>
            {activePage && (
                <div className="pt-4 border-t mt-2">
                    <div className="flex items-center justify-between mb-2 px-2">
                        <p className="text-xs font-bold text-primary truncate max-w-[120px]">{activePage.title.toUpperCase()}</p>
                        <Button size="icon" variant="ghost" className="h-6 w-6" onClick={() => setDialogNewBlockOpen(true)}><Plus className="w-3 h-3" /></Button>
                    </div>
                    <div className="space-y-1">
                        
                        {/* 1. SECCIÓN SUPERIOR: ANUNCIOS (TOP BAR) */}
                        {activePage.blocks
                            .filter(b => b.tipo === "announcement")
                            .map(bloque => (
                            <div 
                                key={bloque.id} 
                                onClick={() => setBloqueSeleccionadoId(bloque.id)} 
                                className={cn("flex items-center justify-between p-2 rounded-md text-sm cursor-pointer hover:bg-muted/50 border border-transparent mb-1", bloqueSeleccionadoId === bloque.id ? "bg-purple-50 border-purple-200 text-purple-900 font-medium" : "text-slate-600")}
                            >
                                <div className="flex items-center gap-2 overflow-hidden">
                                    <Megaphone className="w-4 h-4 opacity-70" />
                                    <span className="truncate">Barra de Anuncios</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <span className="text-[10px] bg-blue-100 text-blue-600 px-1.5 py-0.5 rounded border border-blue-200 mr-1">Top</span>
                                    <button onClick={(e) => handleToggleVisibility(bloque.id, e)}>
                                        {bloque.activo ? <Eye className="w-3 h-3 text-muted-foreground hover:text-foreground"/> : <EyeOff className="w-3 h-3 text-muted-foreground/50"/>}
                                    </button>
                                    <button onClick={(e) => { e.stopPropagation(); handleDeleteBlock(bloque.id); }} className="hover:text-red-500 ml-1">
                                        <Trash2 className="w-3 h-3" />
                                    </button>
                                </div>
                            </div>
                        ))}

                        {/* 2. HERO FIJO (SOLO EN HOME) */}
                        {isHomePage && (
                             <div 
                                onClick={() => setBloqueSeleccionadoId("fixed-hero-home")} 
                                className={cn("flex items-center justify-between p-2 rounded-md text-sm cursor-pointer hover:bg-muted/50 border border-transparent", bloqueSeleccionadoId === "fixed-hero-home" ? "bg-purple-50 border-purple-200 text-purple-900 font-medium" : "text-slate-600")}
                             >
                                <div className="flex items-center gap-2 overflow-hidden">
                                    <ImageIcon className="w-4 h-4 opacity-70" />
                                    <span className="truncate">Portada (Hero)</span>
                                </div>
                                <span className="text-[10px] bg-slate-100 px-1.5 py-0.5 rounded text-slate-500 border">Fijo</span>
                             </div>
                        )}

                        {/* 3. RESTO DE BLOQUES */}
                        {activePage.blocks
                            .filter(b => !(isHomePage && b.tipo === "hero") && b.tipo !== "announcement") 
                            .map((bloque, idx) => (
                            <div key={bloque.id} onClick={() => setBloqueSeleccionadoId(bloque.id)} className={cn("flex items-center justify-between p-2 rounded-md text-sm cursor-pointer hover:bg-muted/50 border border-transparent", bloqueSeleccionadoId === bloque.id ? "bg-muted border-border shadow-sm" : "")}>
                                <div className="flex items-center gap-2 overflow-hidden"><span className="text-xs text-muted-foreground w-4">{idx + 1}</span><span className="truncate capitalize">{bloque.tipo}</span></div>
                                <div className="flex gap-1">
                                    <button onClick={(e) => handleMoveBlock(bloque.id, 'up', e)}><ChevronUp className="w-3 h-3 text-muted-foreground hover:text-foreground" /></button>
                                    <button onClick={(e) => handleToggleVisibility(bloque.id, e)}>{bloque.activo ? <Eye className="w-3 h-3 text-muted-foreground hover:text-foreground"/> : <EyeOff className="w-3 h-3 text-muted-foreground/50"/>}</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
          </div>
        </ScrollArea>
        <div className="p-4 border-t bg-gray-50">
             <Link href="/"><Button variant="default" className="w-full"><Monitor className="w-4 h-4 mr-2" /> Ver Sitio Web</Button></Link>
        </div>
      </aside>
      <main className="flex-1 overflow-auto bg-slate-50 p-8">{renderMainEditor()}</main>
      
      <Dialog open={dialogNewBlockOpen} onOpenChange={setDialogNewBlockOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle>Agregar Bloque</DialogTitle></DialogHeader>
          <NuevoBloqueDialog onAgregar={handleAddBlock} siguienteOrden={currentBlocks.length} />
        </DialogContent>
      </Dialog>
      <Dialog open={dialogNewPageOpen} onOpenChange={setDialogNewPageOpen}>
        <DialogContent>
            <DialogHeader><DialogTitle>Crear Nueva Página</DialogTitle></DialogHeader>
            <div className="space-y-4 py-4">
                <div className="space-y-2"><label className="text-sm font-medium">Nombre</label><Input value={newPageName} onChange={(e) => setNewPageName(e.target.value)} placeholder="Ej: Contacto" /></div>
                <Button onClick={handleCreatePage} disabled={!newPageName}>Crear</Button>
            </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}