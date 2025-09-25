import React from 'react'
import { APIProvider, Map, AdvancedMarker, Pin, Marker } from '@vis.gl/react-google-maps'

function MonasteryMap({ center = { lat: 27.7172, lng: 85.3240 }, zoom = 10 }) {
    const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY
    const mapId = process.env.REACT_APP_GOOGLE_MAPS_MAP_ID

    if (!apiKey) {
        return (
            <div className="alert alert-warning" role="alert">
                Missing Google Maps API key. Set REACT_APP_GOOGLE_MAPS_API_KEY in .env and restart.
            </div>
        )
    }

    const hasMapId = !!mapId

    return (
        <div style={{ height: '400px', width: '100%' }}>
            <APIProvider apiKey={apiKey} libraries={["marker"]}>
                {!hasMapId && (
                    <div className="small text-warning mb-1">
                        Missing REACT_APP_GOOGLE_MAPS_MAP_ID. Advanced Markers may be limited; falling back to classic marker.
                    </div>
                )}
                <Map
                    zoom={zoom}
                    center={center}
                    mapId={mapId}
                    disableDefaultUI={false}
                >
                    {hasMapId ? (
                        <AdvancedMarker position={center}>
                            <Pin background={'#1a73e8'} borderColor={'#0d47a1'} glyph={'★'} />
                        </AdvancedMarker>
                    ) : (
                        <Marker position={center} />
                    )}
                </Map>
            </APIProvider>
        </div>
    )
}

export default MonasteryMap
