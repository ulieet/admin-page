"use client"

import { useEffect, useState } from "react"
import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  useMap,
} from "react-leaflet"
import "leaflet/dist/leaflet.css"

// --------------------
// Arregla resize cuando el mapa aparece
// --------------------
function MapResizer() {
  const map = useMap()

  useEffect(() => {
    // invalida tamaño inicial
    map.invalidateSize()

    // fuerza resize global (tabs / display:none)
    const timer = setTimeout(() => {
      window.dispatchEvent(new Event("resize"))
      map.invalidateSize()
    }, 300)

    return () => clearTimeout(timer)
  }, [map])

  return null
}

// --------------------
// Fix iconos Leaflet (Next.js)
// --------------------
async function fixLeafletIcons() {
  const L = (await import("leaflet")).default
  // @ts-ignore
  delete L.Icon.Default.prototype._getIconUrl
  L.Icon.Default.mergeOptions({
    iconRetinaUrl:
      "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
    iconUrl:
      "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
    shadowUrl:
      "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  })
}

// --------------------
// Marker clickeable
// --------------------
function LocationMarker({
  position,
  setPosition,
}: {
  position: [number, number] | null
  setPosition: (pos: [number, number]) => void
}) {
  const map = useMapEvents({
    click(e) {
      const pos: [number, number] = [e.latlng.lat, e.latlng.lng]
      setPosition(pos)
      map.flyTo(e.latlng, map.getZoom())
    },
  })

  return position ? <Marker position={position} /> : null
}

// --------------------
// Props
// --------------------
interface MapPickerProps {
  lat?: number
  lng?: number
  onChange: (lat: number, lng: number) => void
}

// --------------------
// COMPONENTE PRINCIPAL
// --------------------
export default function MapPicker({ lat, lng, onChange }: MapPickerProps) {
  const defaultCenter: [number, number] = [-34.6037, -58.3816] // CABA
  const [mounted, setMounted] = useState(false)
  const [position, setPosition] = useState<[number, number] | null>(
    lat && lng ? [lat, lng] : null
  )

  useEffect(() => {
    fixLeafletIcons()
    setMounted(true)
  }, [])

  useEffect(() => {
    if (lat && lng) setPosition([lat, lng])
  }, [lat, lng])

  const handleSetPosition = (pos: [number, number]) => {
    setPosition(pos)
    onChange(pos[0], pos[1])
  }

  if (!mounted) {
    return (
      <div className="h-[300px] w-full rounded-md border bg-slate-100 flex items-center justify-center text-slate-400">
        Cargando mapa...
      </div>
    )
  }

  return (
    <div className="h-[300px] w-full rounded-md overflow-hidden border bg-slate-50 relative">
      <MapContainer
        key={`${position?.[0] ?? "x"}-${position?.[1] ?? "y"}`}
        center={position || defaultCenter}
        zoom={13}
        style={{ height: "100%", width: "100%" }}
      >
        <MapResizer />

        <TileLayer
          attribution='&copy; OpenStreetMap'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <LocationMarker
          position={position}
          setPosition={handleSetPosition}
        />
      </MapContainer>
    </div>
  )
}
