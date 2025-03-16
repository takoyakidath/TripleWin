import { supabase } from '@/lib/supabaseClient';
import { successResponse, errorResponse } from '@/lib/responseHandler';

export async function POST(req: Request) {
    const { uuid, ip } = await req.json();

    if (!uuid || !ip) {
        return new Response(errorResponse('UUID and IP are required', 400).body, { status: 400 });
    }
    const { data, error } = await supabase
        .from('users')
        .insert([{ uuid, ip }]);

    if (error) {
        return new Response(errorResponse(error.message, 500).body, { status: 500 });
    }
    return new Response(successResponse(data).body, { status: 200 });
}
