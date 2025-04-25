import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

export async function POST(request: Request) {
    const { userid } = await request.json(); // Get the userid from the request body

    const { data, error } = await supabase
        .from('game_results')
        .insert([{ userid }]) // Use the userid from the request
        .select();

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
    const user = data[0];

    return NextResponse.json({ user });
}