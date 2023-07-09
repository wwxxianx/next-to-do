import NavBar from "@/components/NavBar";
import Task from "@/components/TaskCard";
import TaskList from "@/components/TaskList";
import TaskSkeleton from "@/components/TaskSkeleton";
import { getAuthSession } from "@/lib/auth";

export default async function Home() {
    const session = await getAuthSession();

    return (
        <div className="h-full space-y-6">
            <NavBar />
            {session?.user ? (
                <TaskList />
            ) : (
                <div className="text-center pt-20">
                    <p className="text-zinc-600 font-medium text-xl">
                        Login to your account to get started!
                    </p>
                </div>
            )}
        </div>
    );
}
