import { supabase } from '@/lib/supabaseClient';
import { successResponse, errorResponse } from '@/lib/responseHandler';
import { type NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        // リクエストボディを取得
        const { uuid, result, ip } = await req.json();

        // 必要なパラメータが送信されているか確認
        if (!uuid || !result || !ip) {
            return NextResponse.json(errorResponse('UUID, result, and IP are required', 400), { status: 400 });
        }

        // game_resultsテーブルにデータを挿入
        const { data, error } = await supabase
            .from('game_results')
            .insert([{ uuid, result, ip }]);

        // エラーが発生した場合
        if (error) {
            return NextResponse.json(errorResponse(error.message, 500), { status: 500 });
        }

        // 挿入したデータを成功レスポンスで返す
        return NextResponse.json(successResponse(data), { status: 200 });
    } catch (error: unknown) {
        // 予期しないエラーが発生した場合
        const errorMessage = error instanceof Error ? error.message : 'Internal Server Error';
        return NextResponse.json(errorResponse(errorMessage, 500), { status: 500 });
    }
}
