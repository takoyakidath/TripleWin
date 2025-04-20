import { NextResponse } from 'next/server';
import { supabase } from '../../../lib/supabaseClient';

export async function GET() {
    const { data, error } = await supabase
        .from('game_result')
        .select('userid, username, number')
        .order('number', { ascending: false });

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }

    const rankings = data.map((item) => ({
        userid: item.userid,
        displayName: item.username || item.userid, // Use username or userid if username is null
        number: item.number,
    }));

    return NextResponse.json(rankings);
}
