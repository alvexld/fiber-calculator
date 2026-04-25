import { scan } from "react-scan";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider, keepPreviousData } from "@tanstack/react-query";
import { routeTree } from "./routeTree.gen";
import "./index.css";

if (import.meta.env.DEV) {
    scan({ enabled: true });
}

const queryClient = new QueryClient({
    defaultOptions: {
        queries: { placeholderData: keepPreviousData },
    },
});
const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
    interface Register {
        router: typeof router;
    }
}

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
        </QueryClientProvider>
    </StrictMode>,
);
