'use client'

import { useEffect, useRef, useState } from 'react'

// Type declarations for MapLibre GL JS
interface MapLibreMap {
  on: (event: string, callback: () => void) => void
  fitBounds: (bounds: unknown, options: Record<string, unknown>) => void
  remove: () => void
  addControl: (control: unknown, position?: string) => void
}

interface MapLibreMarker {
  setLngLat: (coords: [number, number]) => MapLibreMarker
  setPopup: (popup: unknown) => MapLibreMarker
  addTo: (map: MapLibreMap) => MapLibreMarker
}

interface MapLibrePopup {
  setHTML: (html: string) => MapLibrePopup
}

interface MapLibreNavigationControl {
  new (options?: { visualizePitch?: boolean }): unknown
}

declare global {
  interface Window {
    maplibregl?: {
      Map: new (options: Record<string, unknown>) => MapLibreMap
      Marker: new (options: Record<string, unknown>) => MapLibreMarker
      Popup: new (options: Record<string, unknown>) => MapLibrePopup
      NavigationControl: MapLibreNavigationControl
      LngLatBounds: new (sw: [number, number], ne: [number, number]) => unknown
    }
  }
}

export default function MosqueLocationMap() {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<MapLibreMap | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Load MapLibre CSS and JS dynamically
    const loadMapLibre = async () => {
      // Load CSS
      if (!document.querySelector('link[href*="maplibre-gl.css"]')) {
        const cssLink = document.createElement('link')
        cssLink.href =
          'https://unpkg.com/maplibre-gl@4.7.1/dist/maplibre-gl.css'
        cssLink.rel = 'stylesheet'
        document.head.appendChild(cssLink)
      }

      // Load JS
      if (!window.maplibregl) {
        const script = document.createElement('script')
        script.src = 'https://unpkg.com/maplibre-gl@4.7.1/dist/maplibre-gl.js'
        script.onload = () => setIsLoaded(true)
        document.head.appendChild(script)
      } else {
        setIsLoaded(true)
      }
    }

    loadMapLibre()
  }, [])

  useEffect(() => {
    if (!isLoaded || !mapContainer.current || map.current) return

    // Mosque coordinates (Rue de la Clef 45, 2610 Saint-Imier)
    const mosqueCoords: [number, number] = [6.99398058585594, 47.149850852833914]

    // Initialize map
    map.current = new window.maplibregl!.Map({
      container: mapContainer.current,
      style: {
        version: 8,
        sources: {
          osm: {
            type: 'raster',
            tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
            tileSize: 256,
            attribution: '© OpenStreetMap contributors',
          },
        },
        layers: [
          {
            id: 'osm',
            type: 'raster',
            source: 'osm',
          },
        ],
      },
      center: mosqueCoords,
      zoom: 16,
      cooperativeGestures: true,
    })

    // Add navigation controls with reset bearing and tilt
    map.current.addControl(
      new window.maplibregl!.NavigationControl({ visualizePitch: true }),
      'top-right',
    )

    // Wait for map to load, then add marker
    map.current.on('load', () => {
      // Add mosque marker
      new window.maplibregl!.Marker({
        color: '#0d9488', // nur-teal-600 color
        scale: 1.2,
      })
        .setLngLat(mosqueCoords)
        .setPopup(
          new window.maplibregl!.Popup({ offset: 25 }).setHTML(`
            <div>
              <strong>Mosquée Nur - ACMSI</strong><br>
              Rue de la Clef 45<br>
              2610 Saint-Imier, Suisse<br>
              <div style="margin-top: 8px;">
                <a href="#" onclick="
                  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
                  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
                  const fallbackLink = 'https://maps.google.com/maps?q=47.149850852833914,6.99398058585594';
                  
                  if (isMobile && !navigator.userAgent.includes('Safari') || isIOS) {
                    // Mobile devices (except Safari on desktop) - try geo:
                    window.location.href = 'geo:47.149850852833914,6.99398058585594';
                    // Fallback after delay
                    setTimeout(() => {
                      window.open(fallbackLink, '_blank');
                    }, 1000);
                  } else {
                    // Desktop or Safari - direct to Google Maps
                    window.open(fallbackLink, '_blank');
                  }
                  return false;
                " style="color: #0d9488; text-decoration: none;">📍 Itinéraire</a><br>
                <a href="tel:+41792763500" style="color: #0d9488; text-decoration: none;">📞 079 276 35 00</a><br>
                <a href="mailto:contact@acmsi.ch" style="color: #0d9488; text-decoration: none;">✉️ contact@acmsi.ch</a>
              </div>
            </div>
          `),
        )
        .addTo(map.current!)
    })

    // Clean up on unmount
    return () => {
      if (map.current) {
        map.current.remove()
        map.current = null
      }
    }
  }, [isLoaded])

  return (
    <div className="h-[400px] w-full overflow-hidden rounded-lg">
      <div ref={mapContainer} className="h-full w-full" />
      {!isLoaded && (
        <div className="flex h-full items-center justify-center bg-gray-200">
          <p className="text-gray-500">Chargement de la carte...</p>
        </div>
      )}
    </div>
  )
}
