import { getAuthSession } from "@/lib/auth";
import SignInButton from "./SignInButton";
import UserAvatarNavMenu from "./UserAvatarNavMenu";
import NavigateNewTaskButton from "./NavigateNewTaskButton";

export default async function NavBar() {
    const session = await getAuthSession();

    return (
        <nav className="flex justify-between">
            <h1 className="font-bold text-2xl">To-do Application</h1>
            {/* Search Bar */}
            {session?.user ? (
                <div className="flex items-center gap-12">
                    <NavigateNewTaskButton />

                    <UserAvatarNavMenu user={session.user}/>
                </div>
            ) : (
                <SignInButton />
            )}
        </nav>
    );
}
