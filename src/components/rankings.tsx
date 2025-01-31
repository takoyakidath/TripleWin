"use client"
import { useEffect, useState } from 'react';
import { fetchRankings } from '@/components/rankingSet';

export default function Rankings() {
    const [rankings, setRankings] = useState<{ uuid: string; wins: number }[]>([]);

    useEffect(() => {
        const getRankings = async () => {
            const rankingsData = await fetchRankings();
            setRankings(rankingsData);
        };

        getRankings();
    }, []);

    return (<div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ display: 'flex', width: '100%', fontWeight: 'bold' }}>
                <div style={{ flex: 1, padding: '8px' }}>順位</div>
                <div style={{ flex: 2, padding: '8px' }}>UUID</div>
                <div style={{ flex: 1, padding: '8px' }}>勝利数</div>
            </div>
            {rankings.map((player, index) => (
                <div key={player.uuid} style={{ display: 'flex', width: '100%', borderBottom: '1px solid #ccc' }}>
                    <div style={{ flex: 1, padding: '8px' }}>{index + 1}</div>
                    <div style={{ flex: 2, padding: '8px' }}>{player.uuid}</div>
                    <div style={{ flex: 1, padding: '8px' }}>{player.wins}</div>
                </div>
            ))}
        </div>
        </div>
    );
}
