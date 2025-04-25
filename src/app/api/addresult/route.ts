import { NextResponse } from 'next/server';
import { supabase } from '../../../lib/supabaseClient';
import { checkGameResultTable } from '../../../lib/responseHandler';
import { v4 as uuidv4 } from 'uuid'; // Importing UUID using ES module syntax

export async function POST(request: Request) {
    console.log('Incoming POST request to /api/addresult');

    // Check if the game_result table exists
    const tableExists = await checkGameResultTable();
    if (!tableExists) {
        console.error('The game_results table does not exist.');
        return NextResponse.json({ error: 'The game_result table does not exist.' }, { status: 404 });
    }

    const { userid, win } = await request.json();
    console.log('Request body:', { userid, win });

    // Check if it's the first visit
    if (!userid) {
        const randomUserId = uuidv4(); // Generate a UUID
        const { error } = await supabase
            .from('game_results')
            .insert([{ userid: randomUserId, number: 0, username: null }]);

        if (error) {
            console.error('Error inserting new user:', error.message);
            return NextResponse.json({ error: error.message }, { status: 400 });
        }

        console.log('New user created with userid:', randomUserId);
        return NextResponse.json({ userid: randomUserId });
    }

    // Update the number if the user wins
    if (win) {
        const { data, error } = await supabase
            .from('game_results')
            .select('number')
            .eq('userid', userid);

        if (error) {
            console.error('Error selecting number for userid:', userid, error.message);
            return NextResponse.json({ error: error.message }, { status: 400 });
        }

        if (data && data.length > 0) {
            const newNumber = data[0].number + 1;
            const { error: updateError } = await supabase
                .from('game_results')
                .update({ number: newNumber })
                .eq('userid', userid);

            if (updateError) {
                console.error('Error updating number for userid:', userid, updateError.message);
                return NextResponse.json({ error: updateError.message }, { status: 400 });
            }

            console.log('Number updated successfully for userid:', userid, 'New number:', newNumber);
        } else {
            console.error('User not found for userid:', userid);
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }
    }

    console.log('Result updated successfully for userid:', userid);
    return NextResponse.json({ success: true, message: 'Result updated successfully' });
}