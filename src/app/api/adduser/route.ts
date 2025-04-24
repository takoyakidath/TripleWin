import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';
import { v4 as uuidv4 } from 'uuid'; // UUID generation library

export async function POST() {
    // Generate a new UUID
    const newUUID = uuidv4();

    // Create a new entry in game_results
    const { data, error } = await supabase
        .from('game_results')
        .insert([{ userid: newUUID }])
        .select();

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }

    // Assuming the user ID is returned in the data
    const user = data[0];
    // Note: localStorage is not available in server-side code, consider removing this line
    // localStorage.setItem('user_uuid', user.id); // Set the user ID in local storage

    return NextResponse.json({ user });
}
