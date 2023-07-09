"use client";

import { Plus } from "lucide-react";
import { Button } from "./ui/Button";
import { useRouter } from "next/navigation";

export default function NavigateNewTaskButton() {
    const router = useRouter();
    return (
        <Button 
            className="gap-2"
            onClick={() => router.push('/task/create')}    
        >
            <Plus size={16} />
            Add task
        </Button>
    );
}
