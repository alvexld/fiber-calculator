import { LayoutDashboard, Utensils, Salad, Activity } from "lucide-react";
import { Link } from "@tanstack/react-router";

const NAV_BASE = "flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors";
const NAV_INACTIVE = `${NAV_BASE} text-muted hover:bg-surface-secondary hover:text-accent`;
const NAV_ACTIVE = `${NAV_BASE} font-semibold text-foreground`;

export const NavSidebar = () => (
    <aside className="flex h-full w-64 shrink-0 flex-col border-r border-border bg-surface">
        <div className="flex flex-col gap-0.5 px-3 py-3">
            <Link to="/dashboard" className={NAV_INACTIVE} activeProps={{ className: NAV_ACTIVE }}>
                <LayoutDashboard className="h-4 w-4 shrink-0" />
                Tableau de bord
            </Link>

            <p className="mt-2 px-3 pb-1 text-[10px] font-semibold uppercase tracking-wide text-muted">
                Saisie
            </p>
            <Link
                to="/meals"
                activeOptions={{ exact: false }}
                className={NAV_INACTIVE}
                activeProps={{ className: NAV_ACTIVE }}
            >
                <Utensils className="h-4 w-4 shrink-0" />
                Repas
            </Link>
            <Link to="/bristol" className={NAV_INACTIVE} activeProps={{ className: NAV_ACTIVE }}>
                <Activity className="h-4 w-4 shrink-0" />
                Bristol
            </Link>

            <p className="mt-2 px-3 pb-1 text-[10px] font-semibold uppercase tracking-wide text-muted">
                Admin
            </p>
            <Link
                to="/ingredients"
                className={NAV_INACTIVE}
                activeProps={{ className: NAV_ACTIVE }}
            >
                <Salad className="h-4 w-4 shrink-0" />
                Ingrédients
            </Link>
        </div>
    </aside>
);
