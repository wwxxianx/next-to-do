"use client";

import { Toaster } from "@/components/ui/Toaster";
import store from "@/stores/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";

export default function Providers({ children }: { children: React.ReactNode }) {
    const queryClient = new QueryClient();

    return (
        <QueryClientProvider client={queryClient}>
            <Provider store={store}>
                <Toaster />
                {children}
            </Provider>
        </QueryClientProvider>
    );
}
