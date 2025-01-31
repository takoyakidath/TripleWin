import { useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function Useradd() {
    useEffect(() => {
        const createUser = async () => {
            const { data, error } = await supabase.auth.signUp({
                email: 'user@example.com',
                password: 'password'
            });

            if (error) {
                console.error('Error creating user:', error);
                return;
            }

            if (data.user) {
                localStorage.setItem('user_uuid', data.user.id);
                console.log('User created with UUID:', data.user.id);
            }
        };

        const checkUser = async () => {
            const userUuid = localStorage.getItem('user_uuid');
            if (!userUuid) {
                await createUser();
            } else {
                console.log('User already exists with UUID:', userUuid);
            }
        };

        checkUser();
    }, []);

    return <div>ユーザーを作成中...</div>;
}
//ユーザーを作るときに使うコンポーネント
//サイトが表示されたとき、supabaseのapiを叩いて、自動的にユーザーがないか確認し、なかった場合はユーザーを作成して、uuidは、ローカルストレージにも保存する
