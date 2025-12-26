"use client"

import { ChangeEvent, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Upload } from "lucide-react"

interface ImageUploadProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string 
}

export function ImageUpload({ value, onChange, placeholder }: ImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isUploading, setIsUploading] = useState(false)

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    
    const fakeUrl = URL.createObjectURL(file)
    onChange(fakeUrl)
    
    setIsUploading(false)
  }

  return (
    <div className="flex gap-2 items-center">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="image/*"
      />

      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder || "https://..."} 
        className="flex-1"
      />

      <Button 
        type="button" 
        variant="secondary"
        onClick={() => fileInputRef.current?.click()}
        disabled={isUploading}
      >
        <Upload className="h-4 w-4 mr-2" />
        {isUploading ? "..." : "Subir"}
      </Button>

      {value && (
        <div className="relative w-10 h-10 border rounded overflow-hidden shrink-0">
             <img src={value} alt="Preview" className="w-full h-full object-cover" />
        </div>
      )}
    </div>
  )
}