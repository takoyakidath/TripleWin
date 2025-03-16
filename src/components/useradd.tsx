"use client"
import { useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/navigation';

export default function Useradd() {
    const router = useRouter();

    useEffect(() => {
        const createUser = async () => {
            const uuid = uuidv4();
            localStorage.setItem('user_uuid', uuid);
            console.log('User created with UUID:', uuid);

            const response = await fetch('https://api.ipify.org?format=json');
            const data = await response.json();
            const ip = data.ip;
            console.log('User IP Address:', ip);

            const { data: supabaseData, error } = await supabase
                .from('users')
                .insert([{ uuid, ip }]);

            if (error) {
                console.error('Error inserting UUID and IP into Supabase:', error.message, error.details);
                router.refresh();
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
