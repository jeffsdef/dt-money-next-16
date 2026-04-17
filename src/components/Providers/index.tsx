'use client';

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export type ProvidersProps = {
    children: React.ReactNode;
}

const client =  new QueryClient();
export function Providers({ children }: ProvidersProps) {
    return (
        <QueryClientProvider client={client}>
            {children}
        </QueryClientProvider>
    )
}