"use client"
import { useEffect, useState } from 'react';
import { fetchRankings } from '@/components/rankingSet';
import { Button } from './ui/button';

export default function Rankings() {
    const [rankings, setRankings] = useState<{ uuid: string; wins: number }[]>([]);
    const [myUUID, setMyUUID] = useState<string | null>(null);

    useEffect(() => {
        const getRankings = async () => {
            const rankingsData = await fetchRankings();
            setRankings(rankingsData);
        };

        const storedUUID = localStorage.getItem('user_uuid');
        setMyUUID(storedUUID);

        getRankings();
    }, []);

    return (
        <div className='scroll-overflow flex flex-col items-center'>
            <div style={{ display: 'flex', width: '100%', fontWeight: 'bold' }}>
                <div style={{ flex: 1, padding: '8px' }}>順位</div>
                <div style={{ flex: 2, padding: '8px' }}>NAME</div>
                <div style={{ flex: 1, padding: '8px' }}>勝利数</div>
            </div>
            {rankings.map((player: { uuid: string; wins: number; userid?: string }, index) => (
                <div key={player.uuid} style={{ display: 'flex', width: '100%', borderBottom: '1px solid #ccc' }} className='scroll-overflow'>
                    <div style={{ flex: 1, padding: '8px' }}>{index + 1}</div>
                    <div style={{ flex: 2, padding: '8px' }}>
                        {player.userid || player.uuid}
                        {player.uuid === myUUID && <span style={{ marginLeft: '8px', color: 'white' }}>←You</span>}
                    </div>
                    <div style={{ flex: 1, padding: '8px' }}>{player.wins}</div>
                </div>
            ))}
        </div>
    );
}
