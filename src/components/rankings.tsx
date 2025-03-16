"use client"

import { useEffect, useState } from "react"

interface Ranking {
    uuid: string
    wins: number
}

const Rankings = () => {
    const [rankings, setRankings] = useState<Ranking[]>([])

    useEffect(() => {
        const fetchRankings = async () => {
            try {
                const response = await fetch('/api/rankings')
                const data = await response.json()
                setRankings(data)
            } catch (error) {
                console.error('Error fetching rankings:', error)
            }
        }

        fetchRankings()
    }, [])

    return (
        <div>
            <h1>Rankings</h1>
            <ul>
                {rankings.map((ranking) => (
                    <li key={ranking.uuid}>
                        {ranking.uuid}: {ranking.wins}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Rankings
