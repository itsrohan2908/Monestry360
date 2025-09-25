import React from 'react'

// Simple Google Street View embed using iframe at the given lat/lng.
// Does not require an API key. If Street View imagery isn't available nearby,
// Google shows a message in the embedded view.
function MonasteryStreetView({ center = { lat: 0, lng: 0 }, height = 400, srcOverride }) {
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
  // If caller passes a candidate URL, try to normalize it to an embeddable Street View URL
  // Avoid naked https://www.google.com/ as it sets X-Frame-Options: sameorigin.
  let src = undefined
  const normalizeEmbed = (url) => {
    try {
      const u = new URL(url)
      // Only allow maps.google.com or www.google.com/maps embeds
      const isMaps = /(^|\.)google\.com$/i.test(u.hostname) && (u.pathname.startsWith('/maps') || u.search.includes('layer=c'))
      if (!isMaps) return null
      // Force maps.google.com/maps with output=svembed when possible
      const ll = `${lat},${lng}`
      return `https://maps.google.com/maps?q=&layer=c&cbll=${ll}&cbp=11,0,0,0,0&output=svembed`
    } catch {
      return null
    }
  }
  if (srcOverride) {
    const normalized = normalizeEmbed(srcOverride)
    if (normalized) src = normalized
  }
  if (!src) {
    src = `https://maps.google.com/maps?q=&layer=c&cbll=${lat},${lng}&cbp=11,0,0,0,0&output=svembed`
  }

  return (
    <div style={{ width: '100%', height }}>
      <iframe
        title="Street View"
  src={src}
        width="100%"
        height={height}
        style={{ border: 0 }}
        allow="accelerometer; gyroscope; magnetometer; fullscreen"
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  )
}

export default MonasteryStreetView