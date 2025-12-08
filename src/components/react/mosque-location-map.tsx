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
    const mosqueCoords: [number, number] = [
      6.99398058585594, 47.149850852833914,
    ]
    // Offset for centering (adjust the second value to move map center up/down)
    const mapCenterOffset: [number, number] = [0, 0.0004] // negative = moves center down
    const mapCenter: [number, number] = [
      mosqueCoords[0] + mapCenterOffset[0],
      mosqueCoords[1] + mapCenterOffset[1],
    ]
    // Parking coordinates
    const parkingPatinoireCoords: [number, number] = [
      6.994509243664554, 47.14814737096132,
    ]
    const parkingMigrosCoords: [number, number] = [
      6.995482165852466, 47.151296375443266,
    ]
    const parkingCentreCoords: [number, number] = [
      6.996121793876887, 47.15234866182876,
    ]
    // Train station coordinates
    const trainStationCoords: [number, number] = [
      7.000641270940067, 47.15158470772189,
    ]

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
      center: mapCenter,
      zoom: 15.4,
      cooperativeGestures: true,
    })

    // Add navigation controls with reset bearing and tilt
    map.current.addControl(
      new window.maplibregl!.NavigationControl({ visualizePitch: true }),
      'top-right',
    )

    // Wait for map to load, then add markers
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
                <a href="tel:+41799601790" style="color: #0d9488; text-decoration: none;">📞 079 960 17 90</a><br>
                <a href="mailto:contact@acmsi.ch" style="color: #0d9488; text-decoration: none;">✉️ contact@acmsi.ch</a>
              </div>
            </div>
          `),
        )
        .addTo(map.current!)

      // Add parking markers
      const createParkingMarker = (
        coords: [number, number],
        title: string,
        description: string,
      ) => {
        const parkingElement = document.createElement('div')
        parkingElement.className = 'parking-marker'
        parkingElement.innerHTML = `
          <div style="
            background-color: #3b82f6;
            color: white;
            width: 28px;
            height: 28px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            font-size: 14px;
            border: 2px solid white;
            box-shadow: 0 2px 4px rgba(0,0,0,0.2);
            cursor: pointer;
          ">P</div>
        `

        new window.maplibregl!.Marker({ element: parkingElement })
          .setLngLat(coords)
          .setPopup(
            new window.maplibregl!.Popup({ offset: 20 }).setHTML(`
              <div>
                <strong>🅿️ ${title}</strong><br>
                ${description}<br>
                <div style="margin-top: 6px;">
                  <a href="#" onclick="
                    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
                    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
                    const fallbackLink = 'https://maps.google.com/maps?q=${coords[1]},${coords[0]}';

                    if (isMobile && !navigator.userAgent.includes('Safari') || isIOS) {
                      window.location.href = 'geo:${coords[1]},${coords[0]}';
                      setTimeout(() => {
                        window.open(fallbackLink, '_blank');
                      }, 1000);
                    } else {
                      window.open(fallbackLink, '_blank');
                    }
                    return false;
                  " style="color: #0d9488; text-decoration: none; font-size: 12px;">📍 Itinéraire</a>
                </div>
              </div>
            `),
          )
          .addTo(map.current!)
      }

      // Add all parking locations
      createParkingMarker(
        parkingPatinoireCoords,
        'Parking',
        'A coté de la patinoire',
      )
      createParkingMarker(
        parkingMigrosCoords,
        'Parking',
        'En face de la Migros',
      )
      createParkingMarker(
        parkingCentreCoords,
        'Parking',
        'Au centre de la commune',
      )

      // Add train station marker
      const trainElement = document.createElement('div')
      trainElement.className = 'train-marker'
      trainElement.innerHTML = `
        <div style="
          background-color: #EC0000;
          color: white;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          font-size: 10px;
          border: 2px solid white;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
          cursor: pointer;
        ">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4.5 12H19.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M4.5 6.75H19.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M9 19.5L6.75 22.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M15 19.5L17.25 22.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M17.25 3H6.75C5.50736 3 4.5 4.00736 4.5 5.25V17.25C4.5 18.4926 5.50736 19.5 6.75 19.5H17.25C18.4926 19.5 19.5 18.4926 19.5 17.25V5.25C19.5 4.00736 18.4926 3 17.25 3Z" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M12 6.75V12" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M7.875 17.25C8.49632 17.25 9 16.7463 9 16.125C9 15.5037 8.49632 15 7.875 15C7.25368 15 6.75 15.5037 6.75 16.125C6.75 16.7463 7.25368 17.25 7.875 17.25Z" fill="currentColor"/>
            <path d="M16.125 17.25C16.7463 17.25 17.25 16.7463 17.25 16.125C17.25 15.5037 16.7463 15 16.125 15C15.5037 15 15 15.5037 15 16.125C15 16.7463 15.5037 17.25 16.125 17.25Z" fill="currentColor"/>
          </svg>
        </div>
      `

      new window.maplibregl!.Marker({ element: trainElement })
        .setLngLat(trainStationCoords)
        .setPopup(
          new window.maplibregl!.Popup({ offset: 20 }).setHTML(`
            <div>
              <strong>🚂 Gare CFF/SBB Saint-Imier</strong><br>
              Station de train principale<br>
              <span style="color: ##EC0000; font-weight: 600;">10 minutes à pied</span> de la mosquée<br>
              <div style="margin-top: 6px;">
                <a href="https://www.google.com/maps/dir/${trainStationCoords[1]},${trainStationCoords[0]}/Mosqu%C3%A9e+Nur,+Rue+de+la+Clef+45,+2610+Saint-Imier,+Suisse/@47.1506663,6.9947027,16z" target="_blank" rel="noopener noreferrer" style="color: #0d9488; text-decoration: none; font-size: 12px;">📍 Itinéraire vers la mosquée</a><br>
                <a href="https://www.sbb.ch/fr?stops=[{%22label%22:%22%22,%22type%22:%22ID%22,%22value%22:%22%22},{%22value%22:%22A=2@O=2610+St-Imier,+Rue+de+la+Clef+45@H=45@X=6993967@Y=47149869@U=103@L=990054260@p=1756116184@%22,%22type%22:%22ID%22,%22label%22:%222610+St-Imier,+Rue+de+la+Clef+45%22}]" target="_blank" rel="noopener noreferrer" style="color: #ec0000; text-decoration: none; font-size: 12px;">🚆 Horaires CFF/SBB</a>
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
    <div className="h-[460px] w-full overflow-hidden rounded-lg">
      <div ref={mapContainer} className="h-full w-full" />
      {!isLoaded && (
        <div className="flex h-full items-center justify-center bg-gray-200">
          <p className="text-gray-500">Chargement de la carte...</p>
        </div>
      )}
    </div>
  )
}
