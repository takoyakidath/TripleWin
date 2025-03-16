import { supabase } from '@/lib/supabaseClient';
import { successResponse, errorResponse } from '@/lib/responseHandler';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        // リクエストボディを取得
        const { uuid, ip } = await req.json();

        // UUIDとIPが送信されているか確認
        if (!uuid || !ip) {
            return NextResponse.json(errorResponse('UUID and IP are required', 400), { status: 400 });
        }

        // usersテーブルにデータを挿入
        const { data, error } = await supabase
            .from('users')
            .insert([{ uuid, ip }]);

        // エラーが発生した場合
        if (error) {
            return NextResponse.json(errorResponse(error.message, 500), { status: 500 });
        }

        // 挿入したデータを成功レスポンスで返す
        return NextResponse.json(successResponse(data), { status: 200 });
    } catch (error: unknown) {
        // 予期しないエラーが発生した場合
        console.error(error);
        return NextResponse.json(errorResponse('Internal Server Error', 500), { status: 500 });
    }
}
