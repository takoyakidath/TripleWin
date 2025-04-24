import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';
import { v4 as uuidv4 } from 'uuid'; // UUID generation library

export async function POST() {

    const newUUID = uuidv4();

    const { data, error } = await supabase
        .from('game_results')
        .insert([{ userid: newUUID }])
        .select();

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
    const user = data[0];


    return NextResponse.json({ user });
}
