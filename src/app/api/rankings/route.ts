import { NextResponse } from 'next/server';
import { supabase } from '../../../lib/supabaseClient';

export async function GET() {
    const { data, error } = await supabase
        .from('game_results')
        .select('userid, username, number')
        .order('number', { ascending: false }) // Ensure sorting by number in descending order

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }

    const sortedData = data.sort((a, b) => b.number - a.number); // Sort by number in descending order
    const rankings = sortedData.map((item, index) => ({
        rank: index + 1, // Assign rank based on sorted order
        userid: item.userid,
        displayName: item.username || item.userid, // Use username or userid if username is null
        number: item.number,
    }));

    return NextResponse.json(rankings);
}
