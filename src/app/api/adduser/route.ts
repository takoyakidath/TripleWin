import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';
import { v4 as uuidv4 } from 'uuid'; // UUID生成のためのライブラリをインポート

export async function POST(request: Request) {
    const { username } = await request.json();

    // Check if the user already exists
    const { data: existingUsers, error: fetchError } = await supabase
        .from('game_results')
        .select('userid')
        .eq('username', username);

    if (fetchError) {
        return NextResponse.json({ error: fetchError.message }, { status: 400 });
    }

    // If the user already exists, return the existing user
    if (existingUsers.length > 0) {
        return NextResponse.json({ user: existingUsers[0] });
    }

    // Generate a new UUID
    const newUUID = uuidv4();

    // Create a new entry in game_results
    const { data, error } = await supabase
        .from('game_results')
        .insert([{ username, userid: newUUID }])
        .select();

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }

    // Assuming the user ID is returned in the data
    const user = data[0];
    localStorage.setItem('user_uuid', user.id); // Set the user ID in local storage

    return NextResponse.json({ user });
}
