"use client"
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/navigation';

export default function Useradd() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    const handleClick = () => {
        console.log('Handle click function executed'); // Placeholder functionality
    };

    useEffect(() => {
        const createUser = async () => {
            const user = {
                userid: uuidv4(),
                username: 'New User' // Placeholder for username
            };
            console.log('Creating user with ID:', user.userid); // Debug log
            console.log('User creation process started.'); // Additional debug log
            localStorage.setItem('user_uuid', user.userid);
            console.log('User created with ID:', user.userid);

            try {
                const { error } = await supabase
                    .from('users')
                    .insert([{ userid: user.userid, username: user.username }]);

                if (error) {
                    console.error('An error occurred while adding the user:', error.message || error);
                    router.refresh();
                    return;
                }

                console.log('User inserted into Supabase:', user);
            } catch (error) {
                console.error('Error inserting user:', error);
            } finally {
                setLoading(false);
            }
        };

        const checkUser = async () => {
            const username = localStorage.getItem('username');
            if (!username) {
                await createUser();
            } else {
                console.log('User already exists with username:', username);
                setLoading(false);
            }
        };

        checkUser();
    }, [router]);

    return (
    <div>
        {loading ? 'ユーザーを作成中...' : 'ユーザーが作成されました。'}
        <button type="button" onClick={handleClick}>Click Me</button>
    </div>
);
}
