import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase URL or anon key');
}
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function POST(request: Request) {
    const { oldUserID, newUserID } = await request.json();

    // UUIDを取得
    const { data: userData, error: userError } = await supabase
        .from('users')
        .select('uuid')
        .eq('userID', oldUserID)
        .single();

    if (userError || !userData) {
        console.error('Error fetching user UUID from Supabase:', userError?.message || 'User not found');
        return NextResponse.json({ error: userError?.message || 'User not found' }, { status: 500 });
    }

    const uuid = userData.uuid;

    // UUIDに基づいて他のカラムにuserIDを追加
    const { data, error } = await supabase
        .from('users')
        .update({ userID: newUserID })
        .eq('uuid', uuid);

    if (error) {
        console.error('Error updating user UUID in Supabase:', error.message);
        console.error('Supabase response:', error);
        return NextResponse.json({ error: error.message, details: error.details, hint: error.hint }, { status: 500 });
    }

    console.log('Supabase response:', data);
    return NextResponse.json({ data });
}
