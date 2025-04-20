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
            <Card className="bg-gray-700 text-primary-foreground border border-gray-700 shadow-sm m-4 p-4">
                <div className="flex items-center justify-between mb-4">
                    <h1 className="text-4xl font-bold">Ranking</h1>
                    <Button onClick={handleEditUserClick} className="ml-4">
                        {isEditing ? 'Close Edit' : 'Edit User'}
                    </Button>
                </div>
                <p>This ranking is created based on bot data.</p>
                <div style={{ height: '200px', overflowY: 'auto' }}>
                <Rankings />
                </div>
                <Button
                    // biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
                    onClick={() => window.location.href = "/"}
                    className="bg-gray-500 text-white hover:bg-gray-600 transition-colors duration-200 mt-8"
                >
                    Home
                </Button>
            </Card>
        </div>
    );
}

