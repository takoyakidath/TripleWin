"use client"

export async function fetchRankings(userId?: string): Promise<{ uuid: string; wins: number; }[]> {
    try {
        const url = userId ? `/api/rankings?userId=${userId}` : '/api/rankings';
        const response = await fetch(url, {
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

