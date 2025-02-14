import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { ReactNode } from "react";

// Create a client for React Query
const queryClient = new QueryClient();

const ReactQueryProvider = ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

export default ReactQueryProvider;
