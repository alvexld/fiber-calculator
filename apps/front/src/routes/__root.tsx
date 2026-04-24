import { createRootRoute, Outlet, useRouterState } from "@tanstack/react-router";
import { Button } from "@heroui/react/button";
import { Toast } from "@heroui/react/toast";
import { logout } from "../services/auth";

function RootComponent() {
    const pathname = useRouterState({ select: (s) => s.location.pathname });
    const isLoginPage = pathname === "/login";

    const handleLogout = async () => {
        await logout();
        window.location.href = "/login";
    };

    return (
        <>
            <Toast.Provider placement="bottom end" />
            <header className="flex h-[57px] items-center justify-between border-b border-slate-200 bg-white px-6">
                <span className="text-sm font-semibold text-slate-800">Calculateur de fibres</span>
                {!isLoginPage && (
                    <Button size="sm" variant="ghost" onPress={() => void handleLogout()}>
                        Se déconnecter
                    </Button>
                )}
            </header>
            <Outlet />
        </>
    );
}

export const Route = createRootRoute({ component: RootComponent });
