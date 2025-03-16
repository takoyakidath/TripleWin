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
                let data = await response.json()
                
                console.log("Fetched data:", data) // デバッグ
                
                if (!Array.isArray(data)) {
                    console.warn("Expected an array but got:", data)
                    data = [] // 予期しないデータなら空配列にする
                }
                
                setRankings(data)
            } catch (error) {
                console.error('Error fetching rankings:', error)
                setRankings([]) // エラー時の対策
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
