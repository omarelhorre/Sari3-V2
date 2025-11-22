import { useEffect, useRef } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Fix for default marker icons in React-Leaflet
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
})

// Custom hospital icon
const hospitalIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
})

export default function MapView() {
  const mapRef = useRef(null)

  // Saniat Rmel Hospital coordinates (Tetouan, Morocco)
  const saniatRmel = [35.5889, -5.3626]

  // Mock nearby hospitals
  const hospitals = [
    {
      id: 1,
      name: 'Saniat Rmel Hospital',
      position: saniatRmel,
      isMain: true,
    },
    {
      id: 2,
      name: 'Tetouan Medical Center',
      position: [35.5950, -5.3700],
      isMain: false,
    },
    {
      id: 3,
      name: 'Ibn Sina Hospital',
      position: [35.5820, -5.3550],
      isMain: false,
    },
    {
      id: 4,
      name: 'Al Andalus Clinic',
      position: [35.5920, -5.3750],
      isMain: false,
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-4xl font-bold text-secondary mb-2">Hospital Locations</h1>
          <p className="text-text">Find Saniat Rmel Hospital and nearby medical facilities</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div style={{ height: '600px', width: '100%' }}>
            <MapContainer
              center={saniatRmel}
              zoom={14}
              style={{ height: '100%', width: '100%' }}
              ref={mapRef}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {hospitals.map((hospital) => (
                <Marker
                  key={hospital.id}
                  position={hospital.position}
                  icon={hospital.isMain ? hospitalIcon : undefined}
                >
                  <Popup>
                    <div className="p-2">
                      <h3 className="font-bold text-secondary text-lg mb-1">
                        {hospital.name}
                      </h3>
                      {hospital.isMain && (
                        <p className="text-sm text-primary font-semibold">
                          Main Hospital
                        </p>
                      )}
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </div>

        <div className="mt-6 bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-secondary mb-4">Hospital Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {hospitals.map((hospital) => (
              <div
                key={hospital.id}
                className={`p-4 rounded-lg border-2 ${
                  hospital.isMain
                    ? 'border-primary bg-primary/5'
                    : 'border-gray-200 bg-gray-50'
                }`}
              >
                <h3 className="font-bold text-secondary mb-1">{hospital.name}</h3>
                <p className="text-sm text-text">
                  Coordinates: {hospital.position[0].toFixed(4)}, {hospital.position[1].toFixed(4)}
                </p>
                {hospital.isMain && (
                  <span className="inline-block mt-2 px-3 py-1 bg-primary text-white text-sm rounded-full">
                    Main Location
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

