import { Skeleton } from "./ui/Skeleton";

export default function TaskSkeleton() {
    return (
        <div className="flex flex-col gap-6">
            <div className="rounded-lg shadow bg-white px-4 py-4 cursor-pointer hover:scale-101 transition-all">
                <div className="flex justify-between">
                    <div className="flex items-center gap-4">
                        <Skeleton className="h-4 w-[100px] bg-slate-200"/>
                        <Skeleton className="h-4 w-[100px] rounded-full bg-slate-200"/>
                    </div>

                    <Skeleton className="h-4 w-[100px] bg-slate-200"/>
                </div>

                <div className="mt-4 space-y-2">
                    <Skeleton className="h-4 w-full bg-slate-200"/>
                    <Skeleton className="h-4 w-full bg-slate-200"/>
                    <Skeleton className="h-4 w-full bg-slate-200"/>
                </div>

                <Skeleton className="mt-10 h-4 w-[100px] bg-slate-200"/>
            </div>

            <div className="rounded-lg shadow bg-white px-4 py-4 cursor-pointer hover:scale-101 transition-all">
                <div className="flex justify-between">
                    <div className="flex items-center gap-4">
                        <Skeleton className="h-4 w-[100px] bg-slate-200"/>
                        <Skeleton className="h-4 w-[100px] rounded-full bg-slate-200"/>
                    </div>

                    <Skeleton className="h-4 w-[100px] bg-slate-200"/>
                </div>

                <div className="mt-4 space-y-2">
                    <Skeleton className="h-4 w-full bg-slate-200"/>
                    <Skeleton className="h-4 w-full bg-slate-200"/>
                    <Skeleton className="h-4 w-full bg-slate-200"/>
                </div>

                <Skeleton className="mt-10 h-4 w-[100px] bg-slate-200"/>
            </div>

            <div className="rounded-lg shadow bg-white px-4 py-4 cursor-pointer hover:scale-101 transition-all">
                <div className="flex justify-between">
                    <div className="flex items-center gap-4">
                        <Skeleton className="h-4 w-[100px] bg-slate-200"/>
                        <Skeleton className="h-4 w-[100px] rounded-full bg-slate-200"/>
                    </div>

                    <Skeleton className="h-4 w-[100px] bg-slate-200"/>
                </div>

                <div className="mt-4 space-y-2">
                    <Skeleton className="h-4 w-full bg-slate-200"/>
                    <Skeleton className="h-4 w-full bg-slate-200"/>
                    <Skeleton className="h-4 w-full bg-slate-200"/>
                </div>

                <Skeleton className="mt-10 h-4 w-[100px] bg-slate-200"/>
            </div>
        </div>
    );
}
