import { ApiResponse } from '@/lib/ApiResponse';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase URL or anon key');
}
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function GET(req: Request) {
    const { data, error } = await supabase
        .from('game_results')
        .select('uuid, result')
        .eq('result', 'win');

    if (error) {
        return await ApiResponse({ error: error.message }, 500);
    }

    const winCounts = data.reduce((acc, { uuid }) => {
        acc[uuid] = (acc[uuid] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    const sortedRankings = Object.entries(winCounts)
        .map(([uuid, wins]) => ({ uuid, wins }))
        .sort((a, b) => b.wins - a.wins);


    return await ApiResponse(sortedRankings);
}