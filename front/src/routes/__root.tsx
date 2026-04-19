import { createRootRoute, Link, Outlet } from '@tanstack/react-router'

export const Route = createRootRoute({
    component: () => (
        <>
            <nav className="flex gap-6 border-b px-6 py-4">
                <Link
                    to="/"
                    className="text-sm text-gray-500 transition-colors hover:text-gray-900"
                    activeProps={{ className: 'text-sm font-semibold text-gray-900' }}
                >
                    Calculateur
                </Link>
                <Link
                    to="/history"
                    className="text-sm text-gray-500 transition-colors hover:text-gray-900"
                    activeProps={{ className: 'text-sm font-semibold text-gray-900' }}
                >
                    Historique
                </Link>
            </nav>
            <Outlet />
        </>
    ),
})
