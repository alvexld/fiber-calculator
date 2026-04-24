import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { ScrollShadow } from "@heroui/react/scroll-shadow";
import { NavSidebar } from "../components/nav-sidebar/nav-sidebar";
import { getMe } from "../services/auth";

export const Route = createFileRoute("/_app")({
    loader: async () => {
        const user = await getMe();
        if (!user) throw redirect({ to: "/login" });
        return user;
    },
    staleTime: 60_000,
    component: AppLayout,
});

function AppLayout() {
    return (
        <div className="flex h-[calc(100vh-57px)]">
            <NavSidebar />
            <ScrollShadow className="flex-1 overflow-y-auto">
                <Outlet />
            </ScrollShadow>
        </div>
    );
}
