"use client"
import { useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/navigation';

export default function Useradd() {
    const router = useRouter();

    useEffect(() => {
        const createUser = async () => {
            const user = {
                uuid: uuidv4(),
                ip: '' // Placeholder for IP
            };
            localStorage.setItem('user_uuid', user.uuid);
            console.log('User created with UUID:', user.uuid);

            const response = await fetch('https://api.ipify.org?format=json');
            const data = await response.json();
            const ip = data.ip;
            console.log('User IP Address:', ip);

            // Insert user into the users table
            const { data: supabaseData, error: userError } = await supabase
                .from('users')
                .insert([{ uuid: user.uuid, ip: user.ip }]);

            if (userError) {
                console.error('Error inserting UUID and IP into Supabase:', userError.message, userError.details);
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
