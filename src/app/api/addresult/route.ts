import { ApiResponse } from '@/lib/ApiResponse';
import { createClient } from '@supabase/supabase-js';
import { NextApiRequest, NextApiResponse } from 'next';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase URL or anon key');
}
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
const { uuid, result, ip, userid } = req.body;

        if (!uuid || !result || !ip || !userid) {
            return await ApiResponse({ error: 'UUID, result, and IP are required' }, 400);
        }

    const { error } = await supabase
        .from('game_results')
        .insert([{ uuid, result, ip, userid }]);

    if (error) {
        return await ApiResponse({ error: error.message }, 500);
    }

    return await ApiResponse({ uuid, result, ip });
    }
}