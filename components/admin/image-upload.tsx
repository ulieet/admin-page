import { ChangeEvent, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Upload, Image as ImageIcon, X } from "lucide-react"

interface ImageUploadProps {
  value: string
  onChange: (value: string) => void
}

export function ImageUpload({ value, onChange }: ImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isUploading, setIsUploading] = useState(false)

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    
    // Aquí simulamos la subida. En producción, aquí harías el upload real a tu servidor/cloud
    // y obtendrías la URL real.
    const fakeUrl = URL.createObjectURL(file)
    onChange(fakeUrl)
    
    setIsUploading(false)
  }

  return (
    <div className="flex gap-2 items-center">
      {/* Input oculto para el explorador de archivos */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="image/*"
      />

      {/* Input visible para ver la URL o pegarla manualmente */}
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="https://..."
        className="flex-1"
      />

      {/* Botón que activa el explorador de windows directamente */}
      <Button 
        type="button" 
        variant="secondary"
        onClick={() => fileInputRef.current?.click()}
        disabled={isUploading}
      >
        <Upload className="h-4 w-4 mr-2" />
        {isUploading ? "..." : "Subir"}
      </Button>

      {/* Previsualización rápida (opcional, ayuda a saber qué imagen es) */}
      {value && (
        <div className="relative w-10 h-10 border rounded overflow-hidden shrink-0">
             <img src={value} alt="Preview" className="w-full h-full object-cover" />
        </div>
      )}
    </div>
  )
}