import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import MonasteryMap from './monasteryMap'

function MonasteryPage() {
    const { id } = useParams()
    const [monastery, setMonastery] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)

    const BACKEND_URL = 'http://localhost:5000'
    const buildImageUrl = (p) => {
        if (!p) return ''
        if (/^https?:\/\//i.test(p)) return p
        let path = p.replace(/^\.\//, '')
        if (!path.startsWith('images/') && !path.startsWith('/images/')) {
            path = `images/${path}`
        }
        if (!path.startsWith('/')) path = `/${path}`
        return `${BACKEND_URL}${path}`
    }

    useEffect(() => {
        const load = async () => {
            try {
                const res = await fetch(`http://localhost:5000/api/monasteries/${id}`)
                if (!res.ok) throw new Error(`Failed to load monastery: ${res.status}`)
                const data = await res.json()
                setMonastery(data)
            } catch (e) {
                setError(e.message)
            } finally {
                setLoading(false)
            }
        }
        load()
    }, [id])

    if (loading) return <div className="container py-4">Loading…</div>
    if (error) return <div className="container py-4 text-danger">{error}</div>
    if (!monastery) return <div className="container py-4">Not found</div>

    const center = { lat: monastery.latitude, lng: monastery.longitude }

    return (
        <div className="container py-4">
            <h1 className="mb-3">{monastery.name}</h1>
                    {Array.isArray(monastery.images) && monastery.images.length > 0 && (
                <div className="d-flex gap-3 flex-wrap mb-3">
                            {monastery.images.slice(0, 2).map((src, i) => (
                                <img key={i} src={buildImageUrl(src)} alt={`${monastery.name} ${i + 1}`} style={{ maxHeight: 200 }} />
                    ))}
                </div>
            )}
            <p className="mb-3">{monastery.description}</p>
            <MonasteryMap center={center} zoom={12} />
        </div>
    )
}

export default MonasteryPage
