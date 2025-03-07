'use client';

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

interface EditUserProps {
    isOpen: boolean,
    onCloseAction: () => void,
}

export default function EditUser({ isOpen, onCloseAction }: EditUserProps) {
    const [userID, setUserID] = useState('');

    const handleSendClick = async () => {
        const oldUserID = localStorage.getItem('user_uuid');
        console.log(oldUserID);
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

        const response = await fetch('/api/editUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ oldUserID, newUserID: userID }),
        });

        if (!response.ok) {
            console.error('Error updating user UUID in Supabase:', response.statusText);
        } else {
            const data = await response.json();
            console.log('User UUID updated in Supabase:', data);
            // 新しいユーザーIDをローカルストレージに保存
            localStorage.setItem('user_id', userID);
        }

        onCloseAction();
    };

    return (
        <Dialog open={isOpen} onOpenChange={onCloseAction}>
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
