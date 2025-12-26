"use client"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ImageUpload } from "../image-upload"
import { LayoutTemplate, Map, AlignCenter } from "lucide-react"
import dynamic from "next/dynamic"

const MapPicker = dynamic(() => import("@/components/admin/map-picker"), { 
  ssr: false,
  loading: () => <div className="h-72 w-full bg-slate-100 flex items-center justify-center text-slate-400">Cargando mapa...</div>
})

export function FooterEditor({ data, onChange }: any) {
  
  const updateRedes = (key: string, value: string) => {
    onChange("redesSociales", { ...data.redesSociales, [key]: value })
  }

  const updatePersonalizacion = (key: string, value: any) => {
    onChange("personalizacion", { ...data.personalizacion, [key]: value })
  }

  const normalizeCoord = (value: any) => {
  if (value === null || value === undefined || value === "") return null
  if (typeof value === "string") return Number(value.replace(",", "."))
  return Number(value)
}


 const latValue = normalizeCoord(data.ubicacion?.lat ?? data.lat)
const lngValue = normalizeCoord(data.ubicacion?.lng ?? data.lng)

const tieneUbicacion =
  Number.isFinite(latValue) &&
  Number.isFinite(lngValue)


  const estiloActual = data.estiloVisual || "clasico"

  return (
    <div className="space-y-6">
      <Tabs defaultValue="contenido" className="w-full">
        <TabsList className="w-full grid grid-cols-3 bg-slate-100 p-1">
          <TabsTrigger value="contenido">Contenido</TabsTrigger>
          <TabsTrigger value="ubicacion">Ubicación</TabsTrigger>
          <TabsTrigger value="estilo">Diseño</TabsTrigger>
        </TabsList>

        <TabsContent value="contenido" className="space-y-5 pt-4">
          
          <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Nombre Empresa</Label>
                <Input value={data.nombreEmpresa || ""} onChange={(e) => onChange("nombreEmpresa", e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Logo Footer (Opcional)</Label>
                <div className="h-10">
                    <ImageUpload 
                        value={data.logoUrl || ""} 
                        onChange={(val) => onChange("logoUrl", val)} 
                    />
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

          <div className="space-y-2 p-3 bg-slate-50 rounded-lg border">
            <Label>Imagen Adicional (Ej: QR DataFiscal, premios)</Label>
            <ImageUpload 
                value={data.imagenAdicional || ""} 
                onChange={(val) => onChange("imagenAdicional", val)} 
            />
            <p className="text-[10px] text-muted-foreground mt-1">Se mostrará debajo de la descripción.</p>
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
              <Input placeholder="Instagram URL" value={data.redesSociales?.instagram || ""} onChange={(e) => updateRedes("instagram", e.target.value)} />
              <Input placeholder="Facebook URL" value={data.redesSociales?.facebook || ""} onChange={(e) => updateRedes("facebook", e.target.value)} />
              <Input placeholder="LinkedIn URL" value={data.redesSociales?.linkedin || ""} onChange={(e) => updateRedes("linkedin", e.target.value)} />
              <Input placeholder="WhatsApp URL" value={data.redesSociales?.whatsapp || ""} onChange={(e) => updateRedes("whatsapp", e.target.value)} />
              <Input placeholder="Twitter / X URL" value={data.redesSociales?.twitter || ""} onChange={(e) => updateRedes("twitter", e.target.value)} />
          </div>
        </TabsContent>

        <TabsContent value="ubicacion" className="space-y-4 pt-4">
            <div className="space-y-2">
                <Label>Dirección (Texto a mostrar)</Label>
                <Input value={data.direccion || ""} onChange={(e) => onChange("direccion", e.target.value)} />
            </div>

            <div className="space-y-2 pt-2">
                <div className="flex justify-between items-center mb-1">
                    <Label>Punto exacto en el mapa</Label>
                    <span className={`text-[10px] px-2 py-1 rounded border ${tieneUbicacion ? "bg-green-50 text-green-600 border-green-200" : "bg-slate-50 text-slate-500"}`}>
                        {tieneUbicacion ? "✓ Ubicación activa" : "Sin definir"}
                    </span>
                </div>
              
                <MapPicker 
                    lat={latValue} 
                    lng={lngValue} 
                    onChange={(lat, lng) => {
                        onChange("ubicacion", { lat, lng })
                    }} 
                />
            </div>
        </TabsContent>

        <TabsContent value="estilo" className="space-y-6 pt-4">
           <div className="space-y-3">
              <Label className="text-base font-medium">Distribución del Footer</Label>
              <div className="grid grid-cols-3 gap-3">
                  <button 
                    type="button"
                    onClick={() => onChange("estiloVisual", "clasico")}
                    className={`flex flex-col items-center gap-2 p-4 rounded-lg border transition-all ${estiloActual === "clasico" || estiloActual === "completo" ? "border-primary bg-primary/5 ring-1 ring-primary" : "hover:bg-slate-50"}`}
                  >
                    <LayoutTemplate className="w-6 h-6 text-slate-600" />
                    <span className="text-xs font-medium">Clásico</span>
                  </button>

                  <button 
                    type="button"
                    onClick={() => onChange("estiloVisual", "minimal")}
                    className={`flex flex-col items-center gap-2 p-4 rounded-lg border transition-all ${estiloActual === "minimal" || estiloActual === "simple" ? "border-primary bg-primary/5 ring-1 ring-primary" : "hover:bg-slate-50"}`}
                  >
                    <AlignCenter className="w-6 h-6 text-slate-600" />
                    <span className="text-xs font-medium">Minimalista</span>
                  </button>

                  <button 
                    type="button"
                    onClick={() => onChange("estiloVisual", "split")}
                    className={`flex flex-col items-center gap-2 p-4 rounded-lg border transition-all ${estiloActual === "split" ? "border-primary bg-primary/5 ring-1 ring-primary" : "hover:bg-slate-50"}`}
                  >
                    <Map className="w-6 h-6 text-slate-600" />
                    <span className="text-xs font-medium">Mapa Grande</span>
                  </button>
              </div>
           </div>
           
           <Separator />

           <div className="space-y-3">
              <Label>Color de Fondo</Label>
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