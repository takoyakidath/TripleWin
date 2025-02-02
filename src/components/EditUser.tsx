import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase URL or anon key');
}
const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface EditUserProps {
    onClose: () => void;
}

export default function EditUser({ onClose }: EditUserProps) {
    const [userID, setUserID] = useState('');

    const handleSendClick = async () => {
        const oldUserID = localStorage.getItem('user_uuid');
        if (!oldUserID) {
            console.error('No user UUID found in local storage.');
            return;
        }

        localStorage.setItem('user_uuid', userID);
        console.log('User UUID updated to', userID);

        const { data, error } = await supabase
            .from('users')
            .update({ uuid: userID })
            .eq('uuid', oldUserID);

        if (error) {
            console.error('Error updating user UUID in Supabase:', error.message, error.details);
        } else if (data) {
            console.log('User UUID updated in Supabase:', data);
        } else {
            console.log('No data returned from Supabase update.');
        }

        onClose();
    };

    return (
        <Dialog open={true}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Edit UserName</DialogTitle>
                    <DialogDescription>
                        Please change your username
                    </DialogDescription>
                </DialogHeader>
                <div className="flex items-center space-x-2">
                    <div className="grid flex-1 gap-2">
                        <Label htmlFor="name" className="sr-only">
                            Name
                        </Label>
                        <Input
                            id="name"
                            value={userID}
                            onChange={(e) => setUserID(e.target.value)}
                        />
                    </div>
                    <Button type="button" onClick={handleSendClick}>
                        Send
                    </Button>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button type="button" onClick={onClose}>Close</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
