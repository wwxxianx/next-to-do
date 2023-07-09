'use client'

import { Button } from "./ui/Button";
import { signIn } from "next-auth/react"

export default function SignInButton() {
    return (
        <Button
            onClick={() => signIn("google")}
        >
            Sign in
        </Button>
    )
}