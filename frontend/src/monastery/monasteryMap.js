import React from 'react'
import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps'

function MonasteryMap({ center = { lat: 27.7172, lng: 85.3240 }, zoom = 10 }) {
    const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY

    if (!apiKey) {
        return (
            <div className="alert alert-warning" role="alert">
                Missing Google Maps API key. Set REACT_APP_GOOGLE_MAPS_API_KEY in .env and restart.
            </div>
        )
    }

    return (
        <div style={{ height: '400px', width: '100%' }}>
            <APIProvider apiKey={apiKey}>
                <Map
                    zoom={zoom}
                    center={center}
                    mapId={undefined}
                    disableDefaultUI={false}
                >
                    <Marker position={center} />
                </Map>
            </APIProvider>
        </div>
    )
}

export default MonasteryMap
