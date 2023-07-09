import { Skeleton } from "./ui/Skeleton";

export default function TagSkeleton() {
    return (
        <div className="flex items-center gap-2">
            <Skeleton className="h-8 w-[70px] rounded-md bg-slate-200"/>
            <Skeleton className="h-8 w-[70px] rounded-md bg-slate-200"/>
            <Skeleton className="h-8 w-[70px] rounded-md bg-slate-200"/>
            <Skeleton className="h-8 w-[70px] rounded-md bg-slate-200"/>
            <Skeleton className="h-8 w-[70px] rounded-md bg-slate-200"/>
            <Skeleton className="h-8 w-[70px] rounded-md bg-slate-200"/>
        </div>
    )
}