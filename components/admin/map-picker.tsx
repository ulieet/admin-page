"use client"

import { useEffect, useState } from "react"
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css" // Importamos CSS directamente

// --- CONFIGURACIÓN DE ICONOS ---
// Esto soluciona el problema de los marcadores invisibles en Next.js
const fixLeafletIcons = () => {
  // @ts-ignore
  delete L.Icon.Default.prototype._getIconUrl
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
    iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  })
}

// --- COMPONENTE CONTROLADOR ---
// Maneja los clics y asegura que el mapa se redibuje correctamente
function MapController({ 
  position, 
  onLocationSelect 
}: { 
  position: [number, number] | null, 
  onLocationSelect: (lat: number, lng: number) => void 
}) {
  const map = useMap()

  // 1. Invalidar tamaño al montar para evitar el cuadro gris
  useEffect(() => {
    map.invalidateSize()
  }, [map])

  // 2. Mover el mapa si cambia la posición externa (ej: al cargar datos guardados)
  useEffect(() => {
    if (position) {
      map.flyTo(position, 13, { animate: true })
    }
  }, [position, map])

  // 3. Escuchar clics para poner el marcador
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng
      onLocationSelect(lat, lng)
      map.flyTo([lat, lng], map.getZoom())
    },
  })

  return position ? <Marker position={position} /> : null
}

// --- PROPS ---
interface MapPickerProps {
  lat?: number | null
  lng?: number | null
  onChange: (lat: number, lng: number) => void
}

// --- COMPONENTE PRINCIPAL ---
export default function MapPicker({ lat, lng, onChange }: MapPickerProps) {
  const [isMounted, setIsMounted] = useState(false)
  
  // Coordenadas por defecto (CABA, Argentina) o las que vienen por props
  const defaultCenter: [number, number] = [-34.6037, -58.3816]
  const position: [number, number] | null = (lat && lng) ? [lat, lng] : null

  useEffect(() => {
    fixLeafletIcons()
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return (
      <div className="h-[300px] w-full rounded-md border bg-slate-100 flex items-center justify-center text-slate-400 animate-pulse">
        Cargando mapa...
      </div>
    )
  }

  return (
    <div className="h-[300px] w-full rounded-md overflow-hidden border bg-slate-50 relative z-0">
      <MapContainer
        center={position || defaultCenter}
        zoom={13}
        scrollWheelZoom={false} // Evita scroll accidental al bajar por la página
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <MapController 
          position={position} 
          onLocationSelect={onChange} 
        />
      </MapContainer>
    </div>
  )
}