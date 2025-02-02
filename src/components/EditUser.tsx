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
    onClose: () => void;
}

export default function EditUser({ onClose }: EditUserProps) {
    const [User, setUser] = useState('');

    const handleSendClick = () => {
        localStorage.setItem('user_id', User);
        console.log('User UserID updated to', User);
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
                            value={User}
                            onChange={(e) => setUser(e.target.value)}
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
