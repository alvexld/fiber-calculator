import { createRootRoute, Outlet } from "@tanstack/react-router";

export const Route = createRootRoute({
    component: () => (
        <>
            <header className="flex h-[57px] items-center border-b px-6">
                <span className="text-sm font-semibold">Calculateur de fibres</span>
            </header>
            <Outlet />
        </>
    ),
});
