import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

export async function POST(request: Request) {
    const { username } = await request.json();

    // Create a new user in Supabase
    const { data, error } = await supabase
        .from('users')
        .insert([{ username }])
        .select();

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }

    // Assuming the user ID is returned in the data
    const user = data[0];
    localStorage.setItem('user_uuid', user.id); // Set the user ID in local storage

    return NextResponse.json({ user });
}
