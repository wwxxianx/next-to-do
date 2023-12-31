"use client";

import { Button, buttonVariants } from "@/components/ui/Button";
import { ChevronLeft, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import TextareaAutosize from "react-textarea-autosize";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { startTransition, useEffect, useState } from "react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/Popover";
import { Input } from "@/components/ui/Input";
import { cn } from "@/lib/utils";
import { TagPayload, UpdateTaskPayload } from "@/lib/validators/task";
import { Tag } from "@prisma/client";
import { Toggle } from "@/components/ui/Toggle";
import TagSkeleton from "@/components/TagSkeleton";
import { useToast } from "@/components/ui/use-toast";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { RootState } from "@/stores/store";
import { fetchTask, updateTask } from "@/stores/taskSlice";

export default function TaskDetail({ params }: { params: { id: string } }) {
    const taskId = params.id;
    const dispatch = useAppDispatch();
    const { isUpdatingTask } = useAppSelector(
        (state: RootState) => state.tasks
    );
    const { toast } = useToast();
    const router = useRouter();
    const queryClient = useQueryClient();
    const [tagInput, setTagInput] = useState("");
    const [description, setDescription] = useState("");
    const [title, setTitle] = useState("");
    const [selectedTag, setSelectedTag] = useState<Set<string>>(new Set());

    useEffect(() => {
        dispatch(fetchTask(taskId))
            .unwrap()
            .then((data) => {
                // Init UI with fetched data
                setTitle(data.title);
                if (data.tags?.length !== 0) {
                    const tagsId = data?.tags?.map((tag) => tag.id);
                    setSelectedTag(new Set(tagsId));
                }
                setDescription(data.description);
            })
            .catch((err) => console.log(err));
    }, [dispatch]);

    const handleUpdateTask = () => {
        const payload: UpdateTaskPayload = {
            id: taskId,
            title: title,
            tagsId: Array.from(selectedTag),
            description: description,
        };
        dispatch(updateTask(payload))
            .unwrap()
            .then((data) => toast({ description: data }));
    };

    const { isFetching: isFetchingTag, data: tags } = useQuery({
        queryKey: ["tags"],
        queryFn: async () => {
            const { data } = await axios.get("/api/tag");
            return data as Tag[];
        },
    });

    const { mutate: createTag, isLoading: isCreateTagLoading } = useMutation({
        mutationFn: async () => {
            const payload: TagPayload = { name: tagInput };

            const { data } = await axios.put("/api/tag", payload);

            return data;
        },
        onSuccess: (newTag: Tag) => {
            queryClient.setQueryData<Tag[]>(["tags"], (oldTags = []) => {
                startTransition(() => {
                    setTimeout(() => {
                        router.refresh();
                    }, 1000);
                });
                return [...oldTags, newTag];
            });
        },
    });

    const handleTagPress = (pressedState: boolean, tagId: string) => {
        if (pressedState) {
            setSelectedTag((prev) => new Set(prev).add(tagId));
        } else {
            setSelectedTag((prev) => {
                const newSet = new Set(prev);
                newSet.delete(tagId);
                return newSet;
            });
        }
    };

    return (
        <div>
            <Button
                variant="ghost"
                className="items-center gap-2"
                onClick={() => router.push("/")}
            >
                <ChevronLeft size={16} />
                Create Task
            </Button>

            <div className="pl-5 pt-5 space-y-5">
                <div>
                    <TextareaAutosize
                        placeholder="Task Title"
                        className="resize-none bg-slate-50 outline-none font-bold text-3xl placeholder:text-zinc-400"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>

                <div className="flex items-center gap-4 flex-wrap">
                    <p>Tags:</p>
                    {isFetchingTag ? (
                        <TagSkeleton />
                    ) : (
                        tags?.length !== 0 &&
                        tags?.map((tag) => {
                            return (
                                <Toggle
                                    key={tag.id}
                                    variant="outline"
                                    pressed={selectedTag.has(tag.id)}
                                    onPressedChange={(pressedState) =>
                                        handleTagPress(pressedState, tag.id)
                                    }
                                >
                                    {tag.name}
                                </Toggle>
                            );
                        })
                    )}

                    <Popover>
                        <PopoverTrigger>
                            <div className={cn(buttonVariants(), "gap-2")}>
                                <Plus size={14} />
                                Create tag
                            </div>
                        </PopoverTrigger>

                        <PopoverContent>
                            <div className="flex item-center gap-2">
                                <Input
                                    placeholder="Tag name"
                                    value={tagInput}
                                    onChange={(e) =>
                                        setTagInput(e.target.value)
                                    }
                                />
                                <Button
                                    isLoading={isCreateTagLoading}
                                    variant="ghost"
                                    disabled={tagInput.length === 0}
                                    className="disabled:cursor-not-allowed"
                                    onClick={() => createTag()}
                                >
                                    Create
                                </Button>
                            </div>
                        </PopoverContent>
                    </Popover>
                </div>

                <div>
                    <TextareaAutosize
                        placeholder="What is this task for?"
                        className="w-full resize-none bg-slate-50 outline-none font-semibold text-xl placeholder:text-zinc-400"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>

                <Button
                    isLoading={isUpdatingTask}
                    onClick={() => handleUpdateTask()}
                >
                    Update task
                </Button>
            </div>
        </div>
    );
}
