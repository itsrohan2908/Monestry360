import React, { useMemo, useState } from 'react'

// Simple Google Street View embed using iframe at the given lat/lng.
// Does not require an API key. If Street View imagery isn't available nearby,
// Google shows a message in the embedded view.
function MonasteryStreetView({ center = { lat: 0, lng: 0 }, height = 400, srcOverride }) {
  const hasValidCenter = !!center && typeof center.lat === 'number' && typeof center.lng === 'number'

  // Use the classic Street View embed URL with cbll (camera base lat/lng)
  // and output=svembed to render the panorama viewer.
  const { lat, lng } = hasValidCenter ? center : { lat: 0, lng: 0 }
  // If caller passes a candidate URL, try to normalize it to an embeddable Street View URL
  // Avoid naked https://www.google.com/ as it sets X-Frame-Options: sameorigin.
  let src = undefined
  const normalizeEmbed = (url) => {
    try {
      const u = new URL(url)
      const hostOk = /(^|\.)google\.com$/i.test(u.hostname)
      if (!hostOk) return null
      const path = u.pathname || ''
      const search = u.search || ''
      // If this is an official Google Maps embed (pb-based or embed/v1), or already a Street View svembed, keep it as-is
      if (
        path.startsWith('/maps/embed') ||
        path.startsWith('/maps/embed/v1') ||
        search.includes('output=svembed') ||
        search.includes('layer=c')
      ) {
        return u.toString()
      }
      // Otherwise, fall back to a coordinate-based Street View embed near the provided lat/lng
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
  const svFallback = useMemo(
    () => `https://maps.google.com/maps?q=&layer=c&cbll=${lat},${lng}&cbp=11,0,0,0,0&output=svembed`,
    [lat, lng]
  )
  if (!src) {
    src = svFallback
  }

  const [useFallback, setUseFallback] = useState(false)
  const finalSrc = useFallback ? svFallback : src

  return (
    <div style={{ width: '100%', height }}>
      {!hasValidCenter && (
        <div className="alert alert-warning" role="alert">
          Street View unavailable: invalid coordinates.
        </div>
      )}
      <iframe
        title="Street View"
        src={finalSrc}
        width="100%"
        height={height}
        style={{ border: 0 }}
        allow="fullscreen"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        onError={() => {
          // If embed fails to load (blocked or invalid), fall back to coordinate-based svembed
          if (!useFallback) setUseFallback(true)
        }}
      />
      <div className="mt-2">
        <a
          href={srcOverride || finalSrc}
          target="_blank"
          rel="noreferrer"
          className="small"
        >
          Open 3D view in Google Maps
        </a>
      </div>
    </div>
  )
}

export default MonasteryStreetView