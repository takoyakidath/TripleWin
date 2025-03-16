import type { NextRequest } from 'next/server';
import { supabase } from '@/lib/supabaseClient';
import { successResponse, errorResponse } from '@/lib/responseHandler';

export async function POST(req: NextRequest) {
    const { uuid, result, ip } = await req.json();

    if (!uuid || !result || !ip) {
        return new Response(errorResponse('UUID, result, and IP are required', 400).body, { status: 400 });
    }
    const { data, error } = await supabase
        .from('game_results')
        .insert([{ uuid, result, ip }]);

    if (error) {
        return new Response(errorResponse(error.message, 500).body, { status: 500 });
    }
    return new Response(successResponse(data).body, { status: 200 });
}
