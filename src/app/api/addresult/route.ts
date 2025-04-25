import { NextResponse } from 'next/server';
import { supabase } from '../../../lib/supabaseClient';
import { checkGameResultTable } from '../../../lib/responseHandler';
import { v4 as uuidv4 } from 'uuid'; // Importing UUID using ES module syntax

export async function POST(request: Request) {
    // Check if the game_result table exists
    const tableExists = await checkGameResultTable();
    if (tableExists === null) {
        return NextResponse.json({ error: 'The game_result table does not exist.' }, { status: 404 });
    }

    const { userid, win } = await request.json();

    // Check if it's the first visit
    if (!userid) {
        const randomUserId = uuidv4(); // Generate a UUID
        await supabase
            .from('game_result')
            .insert([{ userid: randomUserId, number: 0, username: null }]);
        return NextResponse.json({ userid: randomUserId });
    }

    // Update the number if the user wins
    if (win) {
        const { data, error } = await supabase
            .from('game_result')
            .select('number')
            .eq('userid', userid);

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 400 });
        }

        if (data && data.length > 0) {
            const newNumber = data[0].number + 1;
            const { error: updateError } = await supabase
                .from('game_result')
                .update({ number: newNumber })
                .eq('userid', userid);

            if (updateError) {
                return NextResponse.json({ error: updateError.message }, { status: 400 });
            }
        } else {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }
    }

    return NextResponse.json({ success: true, message: 'Result updated successfully' });
}
