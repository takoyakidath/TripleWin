"use client"
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';

export default function Useradd() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const createUser = async () => {
            const user = {
                userid: uuidv4(),
            };
            console.log('Creating user with ID:', user.userid); // Debug log
            console.log('User creation process started.'); // Additional debug log
            localStorage.setItem('user_uuid', user.userid);
            console.log('User created with ID:', user.userid);

            try {
                const { error } = await supabase
                    .from('users')
                    .insert([{ userid: user.userid }]);

                if (error) {
                    if (error) {
                        console.error('An error occurred while adding the user:', error.message || error);
                    } else {
                        console.error('An error occurred while adding the user: Unknown error');
                    }
                    return;
                }

                console.log('User inserted into Supabase:', user);
            } catch (error) {
                console.error('Error inserting user:', error);
            } finally {
                setLoading(false);
                // router.refresh()をここで呼び出す
                router.refresh();
            }
        };

        const checkUser = async () => {
            const user_uuid = localStorage.getItem('user_uuid');
            if (!user_uuid) {
                await createUser();
            } else {
                console.log('User already exists with user_uuid:', user_uuid);
                setLoading(false);
            }
        };

        checkUser();
    }, [router]);

    return (
    <div>
        {loading ? 'ユーザーを作成中...' : 'ユーザーが作成されました。'}
    </div>
);
}
