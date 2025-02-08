"use client"

export async function fetchRankings(): Promise<{ uuid: string; wins: number; }[]> {
    try {
        const response = await fetch('/api/rankings', {
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

