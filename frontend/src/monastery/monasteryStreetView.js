import React from 'react'

// Simple Google Street View embed using iframe at the given lat/lng.
// Does not require an API key. If Street View imagery isn't available nearby,
// Google shows a message in the embedded view.
function MonasteryStreetView({ center = { lat: 0, lng: 0 }, height = 400 }) {
  if (
    !center ||
    typeof center.lat !== 'number' ||
    typeof center.lng !== 'number'
  ) {
    return (
      <div className="alert alert-warning" role="alert">
        Street View unavailable: invalid coordinates.
      </div>
    )
  }

  // Use the classic Street View embed URL with cbll (camera base lat/lng)
  // and output=svembed to render the panorama viewer.
  const { lat, lng } = center
  const src = `https://maps.google.com/?q=&layer=c&cbll=${lat},${lng}&cbp=11,0,0,0,0&output=svembed`

  return (
    <div style={{ width: '100%', height }}>
      <iframe
        title="Street View"
        src={src}
        width="100%"
        height={height}
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  )
}

export default MonasteryStreetView
