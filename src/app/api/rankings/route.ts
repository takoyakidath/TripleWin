import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase URL or anon key');
}
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const { data, error } = await supabase
            .from('game_results')
            .select('uuid, result')
            .eq('result', 'win');

        if (error) {
            return res.status(500).json({ error: error.message });
        }

        const winCounts = data.reduce((acc, { uuid }) => {
            acc[uuid] = (acc[uuid] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);

        const sortedRankings = Object.entries(winCounts)
            .map(([uuid, wins]) => ({ uuid, wins }))
            .sort((a, b) => b.wins - a.wins);

        return res.status(200).json(sortedRankings);
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
