import React from 'react'
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSearch } from '../SearchContext';

function MonasteryCard() {
    const [monasteries, setMonasteries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const BACKEND_URL = 'http://localhost:5000';
    const { query } = useSearch();

    const buildImageUrl = (p) => {
        if (!p) return '';
        if (/^https?:\/\//i.test(p)) return p; // already absolute
        let path = p.replace(/^\.\//, ''); // remove leading ./
        if (!path.startsWith('images/') && !path.startsWith('/images/')) {
            path = `images/${path}`;
        }
        if (!path.startsWith('/')) path = `/${path}`;
        return `${BACKEND_URL}${path}`;
    };

    useEffect(() => {
        const fetchMonasteries = async () => {
            try {
                const response = await fetch(`${BACKEND_URL}/api/monasteries`);
                if (!response.ok) throw new Error(`API ${response.status}`);
                const data = await response.json();
                setMonasteries(Array.isArray(data) ? data : []);
            } catch (e) {
                console.error('Failed to load monasteries:', e);
                setError(e.message);
            } finally {
                setLoading(false);
            }
        };
        fetchMonasteries();
    }, []);

    if (loading) {
        return <div className="container py-4">Loading monasteries…</div>;
    }

    if (error) {
        return (
            <div className="container py-4 text-danger">
                Failed to load monasteries: {error}
            </div>
        );
    }

    // client-side filter based on name and description
    const q = (query || '').trim().toLowerCase();
    const filtered = !q
        ? monasteries
        : monasteries.filter(m =>
            (m.name && m.name.toLowerCase().includes(q)) ||
            (m.description && m.description.toLowerCase().includes(q))
        );

    return (
        <div className="container py-3">
            <div className="d-flex flex-wrap gap-3 justify-content-center">
                {filtered.map((monastery) => (
                    <Link
                        key={monastery._id}
                        to={`/monastery/${monastery._id}`}
                        className="d-block text-decoration-none text-reset"
                        style={{ width: '18rem' }}
                    >
                        <div className="card h-100 hover-zoom">
                            {monastery.images?.[0] ? (
                                <img src={buildImageUrl(monastery.images?.[0])} className="card-img-top card-img-fixed" alt={monastery.name} />
                            ) : (
                                <div className="bg-light d-flex align-items-center justify-content-center" style={{height: 180}}>
                                    <span className="text-muted">No image</span>
                                </div>
                            )}
                            <div className="card-body">
                                <h3 className='fs-5'>{monastery.name}</h3>
                                <p className='card-text'>{monastery.description}</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default MonasteryCard;
