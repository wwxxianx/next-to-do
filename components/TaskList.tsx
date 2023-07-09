"use client";

import TaskSkeleton from "./TaskSkeleton";
import TaskCard from "./TaskCard";
import { useEffect, useRef } from "react";
import { Button } from "./ui/Button";
import { MoveDown, MoveUp } from "lucide-react";
import { RootState } from "@/stores/store";
import { fetchTasks, toggleSort } from "@/stores/taskSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import autoAnimate from '@formkit/auto-animate'

export default function TaskList() {
    const animateParent = useRef(null);
    const dispatch = useAppDispatch();
    const {
        tasks,
        isFetchingTasks,
        sortByAsc,
    } = useAppSelector((state: RootState) => state.tasks);

    useEffect(() => {
        dispatch(fetchTasks());
    }, [dispatch]);

    useEffect(() => {
        animateParent.current && autoAnimate(animateParent.current);
    }, [animateParent])

    const handleSortToggle = () => {
        dispatch(toggleSort());
    };

    return (
        <div>
            {isFetchingTasks ? (
                <TaskSkeleton />
            ) : (
                tasks?.length !== 0 && (
                    <div ref={animateParent} className="flex flex-col gap-4">
                        <Button
                            variant="subtle"
                            className="w-fit rounded-full gap-2 text-zinc-600 text-sm"
                            onClick={() => handleSortToggle()}
                        >
                            {sortByAsc ? (
                                <MoveDown className="h-3 w-3" />
                            ) : (
                                <MoveUp className="h-3 w-3" />
                            )}
                            {sortByAsc ? "Ascending" : "Descending"}
                        </Button>
                        {tasks?.map((task) => {
                            return <TaskCard key={task.id} task={task} />;
                        })}
                    </div>
                )
            )}
        </div>
    );
}
