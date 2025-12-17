"use client"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ImageUpload } from "../image-upload" // Importamos el componente de carga
import dynamic from "next/dynamic"

// Importar el mapa dinámicamente con ssr: false es VITAL
const MapPicker = dynamic(() => import("@/components/admin/map-picker"), { 
  ssr: false,
  loading: () => <div className="h-[300px] w-full bg-slate-100 flex items-center justify-center text-slate-400">Cargando mapa...</div>
})

export function FooterEditor({ data, onChange }: any) {
  
  const updateRedes = (key: string, value: string) => {
    onChange("redesSociales", { ...data.redesSociales, [key]: value })
  }

  const updatePersonalizacion = (key: string, value: any) => {
    onChange("personalizacion", { ...data.personalizacion, [key]: value })
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="contenido" className="w-full">
        <TabsList className="w-full grid grid-cols-3 bg-slate-100 p-1">
          <TabsTrigger value="contenido">Contenido</TabsTrigger>
          <TabsTrigger value="ubicacion">Ubicación</TabsTrigger>
          <TabsTrigger value="estilo">Diseño</TabsTrigger>
        </TabsList>

        <TabsContent value="contenido" className="space-y-5 pt-4">
          
          {/* IDENTIDAD: Nombre y Logo */}
          <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Nombre Empresa</Label>
                <Input value={data.nombreEmpresa || ""} onChange={(e) => onChange("nombreEmpresa", e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Logo Footer (Opcional)</Label>
                <div className="h-10">
                    {/* Reutilizamos el ImageUpload pequeño o puedes usar uno normal */}
                    <div className="flex gap-2 items-center">
                         <div className="w-full">
                            <ImageUpload 
                                value={data.logoUrl || ""} 
                                onChange={(val) => onChange("logoUrl", val)} 
                            />
                         </div>
                    </div>
                </div>
              </div>
          </div>

          <div className="space-y-2">
            <Label>Descripción</Label>
            <Textarea 
                value={data.descripcion || ""} 
                onChange={(e) => onChange("descripcion", e.target.value)} 
                className="h-20 resize-none"
            />
          </div>

          {/* IMAGEN ADICIONAL */}
          <div className="space-y-2 p-3 bg-slate-50 rounded-lg border">
            <Label>Imagen Adicional (Ej: Foto equipo, premio, sello)</Label>
            <ImageUpload 
                value={data.imagenAdicional || ""} 
                onChange={(val) => onChange("imagenAdicional", val)} 
            />
            <p className="text-[10px] text-muted-foreground mt-1">Se mostrará debajo de la descripción de la empresa.</p>
          </div>
          
          <Separator />
          
          <h4 className="font-medium text-sm">Contacto</h4>
          <div className="grid grid-cols-2 gap-4">
             <div className="space-y-2">
                <Label>Teléfono</Label>
                <Input value={data.telefono || ""} onChange={(e) => onChange("telefono", e.target.value)} />
             </div>
             <div className="space-y-2">
                <Label>Email</Label>
                <Input value={data.email || ""} onChange={(e) => onChange("email", e.target.value)} />
             </div>
          </div>
          
          <Separator />
          <h4 className="font-medium text-sm">Redes Sociales</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
             <Input placeholder="Instagram" value={data.redesSociales?.instagram || ""} onChange={(e) => updateRedes("instagram", e.target.value)} />
             <Input placeholder="Facebook" value={data.redesSociales?.facebook || ""} onChange={(e) => updateRedes("facebook", e.target.value)} />
             <Input placeholder="LinkedIn" value={data.redesSociales?.linkedin || ""} onChange={(e) => updateRedes("linkedin", e.target.value)} />
             <Input placeholder="WhatsApp" value={data.redesSociales?.whatsapp || ""} onChange={(e) => updateRedes("whatsapp", e.target.value)} />
          </div>
        </TabsContent>

        <TabsContent value="ubicacion" className="space-y-4 pt-4">
            <div className="space-y-2">
                <Label>Dirección (Texto)</Label>
                <Input value={data.direccion || ""} onChange={(e) => onChange("direccion", e.target.value)} />
            </div>

            <div className="space-y-2 pt-2">
                <div className="flex justify-between items-center mb-1">
                    <Label>Seleccionar punto en el mapa</Label>
                    <span className="text-[10px] text-muted-foreground bg-slate-100 px-2 py-1 rounded">
                        {data.lat ? "Ubicación fijada" : "Sin ubicación"}
                    </span>
                </div>
                <MapPicker 
                    lat={data.lat} 
                    lng={data.lng} 
                    onChange={(lat, lng) => {
                        onChange("lat", lat)
                        onChange("lng", lng)
                    }} 
                />
            </div>
        </TabsContent>

        <TabsContent value="estilo" className="space-y-6 pt-4">
           <div className="flex items-center justify-between border p-4 rounded-lg bg-white">
              <div className="space-y-0.5">
                 <Label className="text-base">Modo Simple</Label>
                 <p className="text-xs text-muted-foreground">Centrado, sin columnas de enlaces</p>
              </div>
              <Switch 
                checked={data.estiloVisual === "simple"} 
                onCheckedChange={(checked) => onChange("estiloVisual", checked ? "simple" : "completo")} 
              />
           </div>
           
           <div className="space-y-3">
              <Label>Fondo del Footer</Label>
              <div className="grid grid-cols-3 gap-2">
                 <button 
                    type="button"
                    onClick={() => updatePersonalizacion("tipoFondo", "default")}
                    className={`p-2 rounded border text-xs font-medium transition-all ${(!data.personalizacion?.tipoFondo || data.personalizacion?.tipoFondo === "default") ? "bg-slate-900 text-white border-slate-900 shadow-md" : "bg-white hover:bg-slate-50"}`}
                 >
                    Default
                 </button>
                 <button 
                    type="button"
                    onClick={() => updatePersonalizacion("tipoFondo", "transparente")}
                    className={`p-2 rounded border text-xs font-medium transition-all ${data.personalizacion?.tipoFondo === "transparente" ? "bg-slate-900 text-white border-slate-900 shadow-md" : "bg-white hover:bg-slate-50"}`}
                 >
                    Transparente
                 </button>
                 <button 
                    type="button"
                    onClick={() => updatePersonalizacion("tipoFondo", "custom")}
                    className={`p-2 rounded border text-xs font-medium transition-all ${data.personalizacion?.tipoFondo === "custom" ? "bg-slate-900 text-white border-slate-900 shadow-md" : "bg-white hover:bg-slate-50"}`}
                 >
                    Personalizado
                 </button>
              </div>

              {data.personalizacion?.tipoFondo === "custom" && (
                  <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-lg border mt-2">
                      <Input 
                          type="color" 
                          className="w-10 h-10 p-1 rounded cursor-pointer border-0 bg-white" 
                          value={data.personalizacion?.colorPersonalizado || "#000000"} 
                          onChange={(e) => updatePersonalizacion("colorPersonalizado", e.target.value)}
                      />
                      <div className="flex-1">
                          <Label className="text-xs mb-1 block">Color Hex</Label>
                          <Input 
                             value={data.personalizacion?.colorPersonalizado || "#000000"} 
                             onChange={(e) => updatePersonalizacion("colorPersonalizado", e.target.value)}
                             className="h-8 text-xs font-mono"
                          />
                      </div>
                  </div>
              )}
           </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}