import { createFileRoute } from "@tanstack/react-router";
import { useMealHistory } from "../hooks/use-meal-history";
import { useBristol } from "../hooks/use-bristol";
import { DashboardView } from "../views/dashboard/dashboard.view";

export const Route = createFileRoute("/_app/dashboard")({
    component: DashboardRoute,
});

function DashboardRoute() {
    const { meals } = useMealHistory();
    const { bristols } = useBristol();
    return <DashboardView meals={meals} bristols={bristols} />;
}
