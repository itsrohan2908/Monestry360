import React from 'react'

function Footer() {
    const year = new Date().getFullYear()
    return (
        <footer className="border-top bg-body-tertiary mt-4">
            <div className="container py-3">
                <p className="mb-0 text-center text-secondary small">
                    © {year} — All rights reserved to the Travel and Tourism Department of Sikkim
                </p>
            </div>
        </footer>
    )
}

export default Footer