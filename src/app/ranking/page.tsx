"use client"
import { useState } from 'react';
import { Card } from "@/components/ui/card";
import Rankings from "@/components/rankings";
import { Button } from "@/components/ui/button";
import EditUser from "@/components/EditUser";

export default function Ranking() {
    const [isEditing, setIsEditing] = useState(false);

    const handleEditUserClick = () => {
        setIsEditing(!isEditing);
    };

    return (
        <div>
            {isEditing && <EditUser onClose={handleEditUserClick} isOpen={isEditing} />}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', width: '100%' }}>
                <Button style={{ position: 'absolute', top: '10px', right: '10px' }} onClick={handleEditUserClick}>
                    {isEditing ? 'Close Edit' : 'Edit User'}
                </Button>
            </div>
            <Card className="bg-gray-700 text-primary-foreground border border-gray-700 shadow">
                <h1 className="text-4xl font-bold">Ranking</h1>
                <p>This ranking is created based on bot data.</p>
                <Rankings />
            </Card>
            <Button
                // biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
                onClick={() => window.location.href = "/"}
                className="bg-gray-500 text-white hover:bg-gray-600 transition-colors duration-200 mt-4"
            >
                Home
            </Button>
        </div>
    );
}

