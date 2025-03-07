import { ApiResponse } from '@/lib/ApiResponse';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase URL or anon key');
}
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function GET(req: Request) {
    const url = new URL(req.url);
    const userId = url.searchParams.get('userId');

    let query = supabase
        .from('game_results')
        .select('uuid, result')
        .eq('result', 'win');

    if (userId) {
        query = query.eq('uuid', userId);
    }

    const { data, error } = await query;

    if (error) {
        return await ApiResponse({ error: error.message }, 500);
    }

    const userIds = await supabase
        .from('users')
        .select('userid, uuid')
        .in('uuid', data.map(({ uuid }) => uuid));

    if (userIds.error) {
        return await ApiResponse({ error: userIds.error.message }, 500);
    }

    const winCounts = data.reduce((acc, { uuid }) => {
        const user = userIds.data.find(user => user.uuid === uuid);
        const id = user ? user.userid : uuid;
        acc[id] = (acc[id] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    const sortedRankings = Object.entries(winCounts)
        .map(([id, wins]) => ({ id, wins }))
        .sort((a, b) => b.wins - a.wins);

    return await ApiResponse(sortedRankings);
}