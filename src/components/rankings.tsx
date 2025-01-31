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

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>順位</th>
                        <th>UUID</th>
                        <th>勝利数</th>
                    </tr>
                </thead>
                <tbody>
                    {rankings.map((player, index) => (
                        <tr key={player.uuid}>
                            <td>{index + 1}</td>
                            <td>{player.uuid}</td>
                            <td>{player.wins}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
