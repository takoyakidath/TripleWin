"use client"
import { useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/navigation'
// import router from 'next/router'; // Remove this line

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase URL or anon key');
}
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function Useradd() {
    const router = useRouter(); // useRouterをフックの外で宣言

    useEffect(() => {
        const createUser = async () => {
            const uuid = uuidv4();
            localStorage.setItem('user_uuid', uuid);
            console.log('User created with UUID:', uuid);

            // IPアドレスの取得
            const response = await fetch('https://api.ipify.org?format=json');
            const data = await response.json();
            const IP = data.ip;
            console.log('User IP Address:', IP);

            // SupabaseにUUIDとIPアドレスを保存
            const { data: supabaseData, error } = await supabase
                .from('users') // 'users' テーブルにデータを挿入
                .insert([{ uuid, IP, userid: uuid }]);

            if (error) {
                console.error('Error inserting UUID and IP into Supabase:', error.message, error.details);
                router.refresh(); // useRouterを使用
                return;
            }

            console.log('UUID and IP inserted into Supabase:', supabaseData);
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
    }, [router]);

    return <div>ユーザーを作成中...</div>;
}

//ユーザーを作るときに使うコンポーネント
//サイトが表示されたとき、supabaseのapiを叩いて、自動的にユーザーがないか確認し、なかった場合はユーザーを自動生成したuuidで、作成して、uuidは、ローカルストレージにも保存する
