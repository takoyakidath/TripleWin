import { ApiResponse } from '@/lib/ApiResponse';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl: string = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const supabaseAnonKey: string  = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

export async function POST(request: Request) {
    try {
        const supabase = createClient(supabaseUrl, supabaseAnonKey);

        const { oldUserID, newUserID } = await request.json();

        // UUIDを取得
        const { data: userData, error: userError } = await supabase
            .from('users')
            .select('uuid')
            .eq('userid', oldUserID)
            .single();
    
        if (userError || !userData) {
            console.error('Error fetching user UUID from Supabase:', userError?.message || 'User not found');
            return ApiResponse({ error: userError?.message || 'User not found' }, 500);
        }
    
        const uuid = userData.uuid;
    
        // UUIDに基づいて他のカラムにuserIDを追加
        const { error } = await supabase
            .from('users')
            .update({ userid: newUserID })
            .eq('uuid', uuid);
    
        if (error) {
            console.error('Error updating user UUID in Supabase:', error.message);
            console.error('Supabase response:', error);
            return ApiResponse({ error: error.message, details: error.details, hint: error.hint }, 500);
        }
    
        console.log('Supabase response:', { userid: newUserID });
        return ApiResponse({ userid: newUserID });
    } catch (e: any) {
        return ApiResponse({ error: e.message });
    }
}
