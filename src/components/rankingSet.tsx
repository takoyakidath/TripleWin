"use client"

export async function fetchRankings(): Promise<{ userid: string; displayName: string; number: string }[]> {
    try {
        const response = await fetch(`${window.location.origin}/api/rankings`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch rankings');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching rankings:', error);
        return [];
    }
}

import { useEffect, useState } from 'react';

const RankingSet = () => {
    const [rankings, setRankings] = useState<{ userid: string; displayName: string; number: string }[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const fetchedRankings = await fetchRankings();
            setRankings(fetchedRankings);
        };
        fetchData();
    }, []); // Close the useEffect

    return (
        <div>
            <h1>Rankings</h1>
            <table>
                <thead>
                    <tr>
                        <th>Display Name</th>
                        <th>Number</th>
                    </tr>
                </thead>
                <tbody>
                    {rankings.map((ranking) => (
                        <tr key={ranking.userid}>
                            <td>{ranking.displayName}</td>
                            <td>{ranking.number}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default RankingSet;
