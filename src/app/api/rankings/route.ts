import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';
import { successResponse, errorResponse } from '@/lib/responseHandler';

export const GET = async () => {
    const { data, error } = await supabase
        .from('game_results')
        .select('uuid, result')
        .eq('result', 'win');

    if (error) {
        return NextResponse.json(errorResponse(error.message, 500), { status: 500 });
    }

    const winCounts = data.reduce((acc, { uuid }) => {
        acc[uuid] = (acc[uuid] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    const sortedRankings = Object.entries(winCounts)
        .map(([uuid, wins]) => ({ uuid, wins }))
        .sort((a, b) => b.wins - a.wins);

    return NextResponse.json(successResponse(sortedRankings));
};
