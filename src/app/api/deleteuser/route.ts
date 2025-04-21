import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient'; // Adjust the import based on your setup

export async function DELETE(request: Request) {
  const { userId } = await request.json(); // Expecting the user ID in the request body

  if (!userId) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
  }

  const { error } = await supabase
    .from('game_results') // Updated to use 'game_results' table
    .delete()
    .eq('id', userId); // Assuming 'id' is the column name for user IDs

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ message: 'User deleted successfully' }, { status: 200 });
}
