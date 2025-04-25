export const successResponse = (data: unknown) => {
    return {
        status: 200,
        body: JSON.stringify({ data }),
    };
};

export const errorResponse = (message: string, status: number) => {
    return {
        status,
        body: JSON.stringify({ error: message }),
    };
};

import { supabase } from './supabaseClient';

export const checkGameResultTable = async () => {
    const { data, error } = await supabase
        .from('game_result')
        .select('*')
        .limit(1);

    if (error) {
        return null; // Table does not exist or another error occurred
    }
    return data; // Table exists
};
