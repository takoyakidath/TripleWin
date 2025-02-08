import { createClient } from '@supabase/supabase-js';
import { ApiResponse } from '@/lib/ApiResponse';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase URL or anon key');
}
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function POST(req: Request) {
    const { uuid, ip } = await req.json();

    if (!uuid || !ip) {
        return await ApiResponse({}, 400);
    }

    const { data, error } = await supabase
        .from('users')
        .insert([{ uuid, ip }]);

    if (error) {
        return await ApiResponse({ error: error.message }, 500);
    }

    return await ApiResponse({ data }); 
}
