"use client"
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase URL or anon key');
}
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function fetchRankings() {
    const { data, error } = await supabase
        .from('game_results')
        .select('uuid, result')
        .eq('result', 'win');

    if (error) {
        console.error('Error fetching game results from Supabase:', error.message, error.details);
        return [];
    }

    const winCounts = data.reduce((acc, { uuid }) => {
        acc[uuid] = (acc[uuid] || 0) + 1;
        return acc;
    }, {});

    const sortedRankings = Object.entries(winCounts)
        .map(([uuid, wins]) => ({ uuid, wins }))
        .sort((a, b) => b.wins - a.wins);

    return sortedRankings;
}

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
            <h1>ランキング</h1>
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
