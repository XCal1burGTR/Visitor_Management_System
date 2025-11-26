'use client'

import { useEffect, useState } from 'react'

export function TimeDisplay({ date }: { date: Date }) {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return null // or a loading skeleton
    }

    return (
        <span>
            {new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
    )
}
