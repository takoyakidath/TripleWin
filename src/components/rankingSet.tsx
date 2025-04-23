import React, { useEffect, useState } from 'react';

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
        
        const maxSize = 36; // 最大サイズを定義
        const trimmedData = data.map((item: { userid: string; displayName: string; number: string }) => ({
            ...item,
            userid: item.userid.length > maxSize ? item.userid.slice(0, maxSize) : item.userid, // 切り捨て処理
        }));
        return trimmedData;
    } catch (error) {
        console.error('Error fetching rankings:', error);
        return [];
    }
}

const RankingSet = () => {
    const [sortedRankings, setSortedRankings] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const fetchedRankings = await fetchRankings();
            const sorted = fetchedRankings.sort((a, b) => Number.parseInt(b.number) - Number.parseInt(a.number));
            setSortedRankings(sorted);
        };

        fetchData();
    }, []);

    return (
        <div>
            <h1>Rankings</h1>
            <table>
                <thead>
                    <tr>
                        <th>Display Name</th>
                        <th>Wins</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedRankings.map((ranking) => (
                        <tr key={ranking.userid}>
                            <td>{ranking.displayName}</td>
                            <td>{ranking.number !== null ? ranking.number : '0'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default RankingSet;
