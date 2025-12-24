"use client"

import { useEffect, useState } from "react"
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"

const fixLeafletIcons = () => {
  // @ts-ignore
  delete L.Icon.Default.prototype._getIconUrl
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
    iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  })
}

function MapController({ 
  position, 
  onLocationSelect 
}: { 
  position: [number, number] | null, 
  onLocationSelect: (lat: number, lng: number) => void 
}) {
  const map = useMap()

  useEffect(() => {
    const timer = setTimeout(() => {
      map.invalidateSize()
      if (position) {
        map.flyTo(position, 13, { animate: false })
      }
    }, 200)

    return () => clearTimeout(timer)
  }, [map, position])

  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng
      onLocationSelect(lat, lng)
    },
  })

  return position ? <Marker position={position} /> : null
}

interface MapPickerProps {
  lat?: number | string | null
  lng?: number | string | null
  onChange: (lat: number, lng: number) => void
}

export default function MapPicker({ lat, lng, onChange }: MapPickerProps) {
  const [isMounted, setIsMounted] = useState(false)
  
  const numLat = (lat !== undefined && lat !== null && lat !== "") ? Number(lat) : null
  const numLng = (lng !== undefined && lng !== null && lng !== "") ? Number(lng) : null
  
  const defaultCenter: [number, number] = [-34.6037, -58.3816]
  const position: [number, number] | null = (numLat !== null && numLng !== null) ? [numLat, numLng] : null

  useEffect(() => {
    fixLeafletIcons()
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return (
      <div 
        className="w-full bg-slate-100 flex items-center justify-center text-slate-400"
        style={{ height: "300px" }} 
      >
        Cargando mapa...
      </div>
    )
  }

  return (
    <div 
      className="w-full rounded-md overflow-hidden border bg-slate-50 relative z-0 isolate"
      style={{ height: "300px" }} 
    >
      <MapContainer
        center={position || defaultCenter}
        zoom={13}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
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