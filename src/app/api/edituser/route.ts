import { NextResponse } from 'next/server';
import { supabase } from '../../../lib/supabaseClient';

export async function POST(request: Request) {
    const { userid, username } = await request.json();

    if (!userid || !username) {
        return NextResponse.json({ error: 'userid and username are required' }, { status: 400 });
    }

    const { error } = await supabase
        .from('game_result')
        .update({ username })
        .eq('userid', userid);

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, message: 'Username updated successfully' });
}
