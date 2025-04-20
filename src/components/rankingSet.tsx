"use server"

export async function fetchRankings(): Promise<{ uuid: string; wins: number }[]> {
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


const RankingSet = async () => {
    const rankings = await fetchRankings();

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
    );
};

export default RankingSet;
