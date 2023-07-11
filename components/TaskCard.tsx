"use client";

import { MoreVertical, Trash2 } from "lucide-react";
import { Button } from "./ui/Button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "./ui/DropdownMenu";
import { format, parseISO } from "date-fns";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "./ui/Dialog";
import { useToast } from "./ui/use-toast";
import { ExtendedTask } from "@/types/db";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/hooks/redux";
import { deleteTask } from "@/stores/taskSlice";

interface TaskCardProps {
    task: ExtendedTask;
}

export default function TaskCard({ task }: TaskCardProps) {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const { toast } = useToast();

    const handleDeleteTask = (e: React.MouseEvent) => {
        e.stopPropagation();
        dispatch(deleteTask(task.id))
            .unwrap()
            .then((data) => toast({ description: `Task removed: ${task.title}`}))
            .catch((err) => toast({ description: 'Something went wrong', variant: "destructive"}))
    }

    const createdAtDate =
        typeof task.createdAt === "string"
            ? parseISO(task.createdAt)
            : task.createdAt;

    return (
        <div 
            className="rounded-lg shadow bg-white p-4 cursor-pointer hover:scale-101 transition-all"
            onClick={() => router.push(`/task/${task.id}`)}
        >
            <div className="flex justify-between">
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <h2 className="font-semibold text-lg">{task?.title}</h2>
                    <div className="flex gap-2 flex-wrap">
                        {task.tags?.length !== 0 &&
                            task.tags?.map((tag) => {
                                return (
                                    <p key={tag.id} className="text-sm text-blue-900 bg-blue-200 border border-blue-400 rounded-full px-2 py-1">
                                        {tag.name}
                                    </p>
                                );
                            })}
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    {/* <p className="text-sm text-zinc-400">6 hours left</p> */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="xs">
                                <MoreVertical className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem
                                className="cursor-pointer"
                                asChild
                            >
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button
                                            variant="ghost"
                                            className="gap-2 text-red-400"
                                            onClick={(e) => {e.stopPropagation()}}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                            Delete
                                        </Button>
                                    </DialogTrigger>

                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>
                                                Delete task
                                            </DialogTitle>
                                            <DialogDescription>
                                                By doing so will remove this
                                                task from your account
                                                permanently.
                                            </DialogDescription>
                                        </DialogHeader>

                                        <div className="flex gap-2 items-center">
                                            <DialogClose asChild>
                                                <Button
                                                    type="submit"
                                                    variant="ghost"
                                                    onClick={(e) => e.stopPropagation()}
                                                >
                                                    Cancel
                                                </Button>
                                            </DialogClose>
                                            <DialogClose asChild>
                                                <Button
                                                    type="submit"
                                                    variant="destructive"
                                                    className="bg-red-500"
                                                    onClick={(e) => handleDeleteTask(e)}
                                                >
                                                    Delete
                                                </Button>
                                            </DialogClose>
                                        </div>
                                    </DialogContent>
                                </Dialog>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

            <p className="mt-4 text-zinc-600">{task.description}</p>

            <p className="text-sm text-zinc-400 mt-10">
                Created at{" "}
                <time dateTime={task.createdAt.toString()}>
                    {format(createdAtDate, "MMMM, d, yyyy")}
                </time>
            </p>
        </div>
    );
}
