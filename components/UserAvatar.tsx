"use client";

import { Avatar, AvatarFallback, AvatarImage } from "./ui/Avatar";

interface UserAvatarProps {
    userImage: string | null
}

export default async function UserAvatar({ userImage }: UserAvatarProps) {

    return (
        <Avatar>
            <AvatarImage src={userImage ?? ""} alt="User profile image"/>
            <AvatarFallback>HR</AvatarFallback>
            {/* {userImage ? (
                <AvatarImage src={userImage} alt="User profile image"/>
            ) : (
                <AvatarFallback>CN</AvatarFallback>
            )} */}
        </Avatar>
    );
}
