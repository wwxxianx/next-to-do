import Providers from "@/providers/Providers";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "To-do Next",
    description: "Generated by create next app",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className="min-h-screen min-w-full">
                <Providers>
                    <main className="bg-slate-50 min-h-screen antialiased pt-12 pb-20">
                        <div className="container h-full">{children}</div>
                    </main>
                </Providers>
            </body>
        </html>
    );
}
