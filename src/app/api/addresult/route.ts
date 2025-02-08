import { ApiResponse } from '@/lib/ApiResponse';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase URL or anon key');
}
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function POST(req: Request): Promise<Response> {
    const { uuid, result, ip } = await req.json();

    if (!uuid || !result || !ip) {
        return await ApiResponse({ error: 'UUID, result, and IP are required' }, 400);
    }

    const { error } = await supabase
        .from('game_results')
        .insert([{ uuid, result, ip }]);

    if (error) {
        return await ApiResponse({ error: error.message }, 500);
    }

    return await ApiResponse({ uuid, result, ip });
}