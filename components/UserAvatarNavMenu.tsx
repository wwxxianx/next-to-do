'use client'

import { User } from "next-auth";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "./ui/DropdownMenu";
import UserAvatar from "./UserAvatar";
import { signOut } from "next-auth/react";

interface UserAvatarNavMenuProps {
    user: Pick<User, "email" | "image">
}

export default function UserAvatarNavMenu({ user }: UserAvatarNavMenuProps) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <UserAvatar userImage={user.image ? user.image : null}/>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuItem>
                    <p>{user.email}</p>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={() => signOut()}
                >
                    <p>Sign out</p>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
