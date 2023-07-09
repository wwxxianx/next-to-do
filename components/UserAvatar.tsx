"use client";

import { User } from "next-auth";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/Avatar";

interface UserAvatarProps {
    userImage: string | null
}

export default async function UserAvatar({ userImage }: UserAvatarProps) {

    return (
        <Avatar>
            {userImage ? (
                <AvatarImage src={userImage} alt="User profile image"/>
            ) : (
                <AvatarFallback>CN</AvatarFallback>
            )}
        </Avatar>
    );
}
