import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from 'react';

import { supabase } from '@/lib/supabaseClient';

interface EditUserProps {
    isOpen: boolean,
    onClose: () => void,
}

export default function EditUser({ isOpen, onClose }: EditUserProps) {
    const [userID, setUserID] = useState('');

    const handleSendClick = async () => {
        const oldUserID = localStorage.getItem('user_uuid');
        if (!oldUserID) {
            console.error('No user userID found in local storage.');
            return;
        }

        // Validate the userID
        if (!userID) {
            console.error('No userID entered.');
            alert('Please enter a userID.');
            return;
        }

        localStorage.setItem('user_userID', userID);
        console.log('User userID updated to', userID);

        const { data, error } = await supabase
            .from('game')
            .update({ userID: userID })
            .eq('userID', oldUserID);

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
        <Dialog open={isOpen} onOpenChange={onClose}>
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
            </DialogContent>
        </Dialog>
    );
}
